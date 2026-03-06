# Vercel 배포 세부 구현 계획서 (v2)

> 작성일: 2026-03-05
> 결정사항: Upstash Redis + Vercel Blob, 카페24 도메인 연결, 원본 이미지 삭제
> 상태: **승인 대기**

---

## 0. Vercel KV 폐지 및 Upstash Redis 전환 배경

### Vercel KV 서비스 종료 현황

| 항목 | 내용 |
|------|------|
| 상태 | **공식 폐지(deprecated)** — 신규 스토어 생성 불가 |
| 대체 서비스 | Upstash Redis (Vercel Marketplace 통합) |
| 패키지 | `@vercel/kv` → **`@upstash/redis`** |
| 환경변수 | `KV_REST_API_URL` / `KV_REST_API_TOKEN` → **`UPSTASH_REDIS_REST_URL`** / **`UPSTASH_REDIS_REST_TOKEN`** |
| 근거 | Vercel 공식 문서 (vercel.com/docs/redis), Vercel Marketplace |

### 왜 Upstash Redis인가?

- **Vercel 공식 권장**: Vercel이 직접 Upstash를 Marketplace 파트너로 통합
- **호환성**: REST API 기반 — Serverless/Edge 환경에서 TCP 연결 없이 사용 가능
- **서울 리전**: Upstash는 `ap-northeast-2` (서울) 리전 제공 → 레이턴시 최소화
- **무료 티어**: 일 10,000 요청, 256MB — 뉴스 CRUD 용도에 충분
- **자동 연동**: Vercel Marketplace에서 Upstash 스토어 생성 시 환경변수 자동 주입

---

## 1. 구현 범위 요약

| 작업 | 설명 |
|------|------|
| 뉴스 데이터 → Upstash Redis | `fs.readFile/writeFile` → `@upstash/redis` REST |
| 이미지 업로드 → Vercel Blob | `fs.writeFile` → `@vercel/blob` CDN |
| NewsBoard → API fetch | 정적 import → 클라이언트 fetch |
| 원본 이미지 삭제 | `pc001007479_original.jpg` (7.5MB) 제거 |
| vercel.json 생성 | 서울 리전 설정 |
| 데이터 시딩 API | 기존 news.ts 데이터를 Redis에 초기 저장 |

---

## 2. 세부 구현 단계

### Step 1: 패키지 설치

```bash
npm install @upstash/redis @vercel/blob
```

> `@vercel/kv`는 설치하지 않음 (폐지됨)

### Step 2: Redis 헬퍼 생성 (`src/lib/redis.ts`)

```typescript
// src/lib/redis.ts (신규)
import { Redis } from "@upstash/redis";

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});
```

**장점:**
- 싱글턴 인스턴스로 관리 → 여러 API에서 import
- 환경변수 관리 일원화
- 추후 테스트 시 mock 용이

### Step 3: 뉴스 CRUD API 리팩토링 (`src/app/api/admin/news/route.ts`)

**현재 (파일시스템):**
```
readNewsData()  → fs.readFile('src/data/news.ts') → eval() → NewsItem[]
writeNewsData() → fs.writeFile('src/data/news.ts')
```

**변경 (Upstash Redis):**
```
readNewsData()  → redis.get<NewsItem[]>('news-items') → NewsItem[]
writeNewsData() → redis.set('news-items', items)
```

**변경 코드 구조:**
```typescript
// src/app/api/admin/news/route.ts
import { redis } from "@/lib/redis";
import type { NewsItem } from "@/data/news";

const REDIS_KEY = "news-items";

async function readNewsData(): Promise<NewsItem[]> {
  return (await redis.get<NewsItem[]>(REDIS_KEY)) ?? [];
}

async function writeNewsData(items: NewsItem[]): Promise<void> {
  await redis.set(REDIS_KEY, items);
}

// GET/POST/PUT/DELETE 로직은 동일하게 유지
```

**핵심 변경:**
- `fs`, `path` import 제거
- `eval()` 제거 (보안 개선)
- `DATA_FILE` 상수 제거
- 나머지 CRUD 로직은 그대로 유지

### Step 4: 뉴스 공개 조회 API 신규 생성 (`src/app/api/news/route.ts`)

현재 NewsBoard는 `import { newsItems } from "@/data/news"`로 정적 import.
Redis 전환 후에는 API에서 데이터를 가져와야 함.

```typescript
// src/app/api/news/route.ts (신규 — 인증 불필요, 공개 API)
import { redis } from "@/lib/redis";
import type { NewsItem } from "@/data/news";

export const revalidate = 60; // 60초 캐시 (ISR)

export async function GET() {
  const items = (await redis.get<NewsItem[]>("news-items")) ?? [];
  const featured = items.filter((item) => item.published && item.featured);
  return Response.json(featured);
}
```

### Step 5: 이미지 업로드 API 리팩토링 (`src/app/api/admin/upload/route.ts`)

**현재:**
```
sharp 최적화 → fs.writeFile → public/assets/images/news/{file}.webp
```

**변경:**
```
sharp 최적화 → blob.put() → Vercel Blob CDN URL
```

**변경 코드 구조:**
```typescript
// src/app/api/admin/upload/route.ts
import { put } from "@vercel/blob";
import sharp from "sharp";

export async function POST(request: NextRequest) {
  // ... 검증 동일 ...

  const optimized = await sharp(buffer)
    .resize({ width: 800, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toBuffer();

  const blob = await put(`news/${timestamp}-${slug}.webp`, optimized, {
    access: "public",
    contentType: "image/webp",
  });

  return NextResponse.json({
    path: blob.url,  // Vercel Blob CDN URL
    // ... 나머지 메타 동일 ...
  });
}
```

**핵심 변경:**
- `fs`, `path` import 제거
- `OUTPUT_DIR` 상수 제거
- `blob.url`이 CDN URL로 반환 (예: `https://xxxxx.public.blob.vercel-storage.com/news/...`)
- 썸네일 경로가 절대 URL로 변경 → NewsCard의 next/image `src`에 그대로 사용 가능

### Step 6: NewsBoard 데이터 소스 변경 (`src/components/home/NewsBoard.tsx`)

**현재:**
```typescript
import { newsItems } from "@/data/news";
// ...
const featured = newsItems.filter((item) => item.published && item.featured);
```

**변경:**
```typescript
// 정적 import 제거, API에서 fetch
const [items, setItems] = useState<NewsItem[]>([]);

useEffect(() => {
  fetch("/api/news")
    .then((res) => res.json())
    .then(setItems);
}, []);

// items를 사용 (이전의 featured 변수 대체)
```

### Step 7: news.ts 정리 (`src/data/news.ts`)

**현재:** 타입 + 상수 + 데이터 배열
**변경:** 타입 + 상수만 유지, 데이터 배열 제거

```typescript
// src/data/news.ts (변경 후)
export type NewsCategory = "소식" | "보도자료" | "블로그" | "이벤트";

export interface NewsItem {
  id: string;
  title: string;
  category: NewsCategory;
  thumbnail: string;
  source: string;
  date: string;
  link: string;
  published: boolean;
  featured: boolean;
}

export const categoryColors: Record<NewsCategory, string> = {
  소식: "#D60000",
  보도자료: "#3B82F6",
  블로그: "#10B981",
  이벤트: "#F59E0B",
};

// newsItems 배열 삭제 — Upstash Redis로 이전
```

### Step 8: 데이터 시딩 API (`src/app/api/admin/seed/route.ts`)

기존 news.ts 데이터를 Redis에 1회 저장하는 엔드포인트.
배포 후 1회만 호출하면 됨.

```typescript
// src/app/api/admin/seed/route.ts (신규)
import { redis } from "@/lib/redis";
import { verifyAdmin, unauthorizedResponse } from "@/lib/admin-auth";

// 기존 데이터를 하드코딩으로 포함
const SEED_DATA = [ /* 현재 news.ts의 데이터 배열 복사 */ ];

export async function POST(request: NextRequest) {
  if (!verifyAdmin(request)) return unauthorizedResponse();
  const existing = await redis.get("news-items");
  if (existing) {
    return NextResponse.json({ error: "이미 데이터 존재" }, { status: 409 });
  }
  await redis.set("news-items", SEED_DATA);
  return NextResponse.json({ success: true, count: SEED_DATA.length });
}
```

### Step 9: next/image 리모트 패턴 (`next.config.ts`)

현재 `hostname: '**'`로 이미 전체 허용이므로 **수정 불필요**.
프로덕션 보안 강화 시 아래처럼 특정 도메인만 허용 권장:

```typescript
{
  protocol: 'https',
  hostname: '*.public.blob.vercel-storage.com',
}
```

### Step 10: 원본 이미지 삭제

```bash
rm public/assets/images/pc001007479_original.jpg
```

코드에서 참조 없음 확인 완료. 7.5MB 절감.

### Step 11: vercel.json 생성

```json
{
  "regions": ["icn1"],
  "framework": "nextjs"
}
```

### Step 12: 로컬 개발 환경변수 (`.env.local`)

```bash
# Upstash Redis (Vercel Marketplace 연동 시 자동 주입되지만, 로컬에서는 수동 설정)
UPSTASH_REDIS_REST_URL=https://xxxx.upstash.io
UPSTASH_REDIS_REST_TOKEN=AxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxW

# Vercel Blob
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_xxxxxxxxxx

# Admin
ADMIN_PASSWORD=your-admin-password
```

### Step 13: 타입체크 + 빌드

```bash
npx tsc --noEmit
npx next build
```

---

## 3. 수정 파일 전체 목록

| 파일 | 변경 유형 | 내용 |
|------|----------|------|
| `package.json` | 수정 | `@upstash/redis`, `@vercel/blob` 추가 |
| `src/lib/redis.ts` | **신규** | Upstash Redis 싱글턴 인스턴스 |
| `src/app/api/admin/news/route.ts` | **전면 수정** | fs → Upstash Redis |
| `src/app/api/admin/upload/route.ts` | **전면 수정** | fs → Vercel Blob |
| `src/app/api/news/route.ts` | **신규** | 공개 뉴스 조회 API (featured 필터) |
| `src/app/api/admin/seed/route.ts` | **신규** | 데이터 시딩 (1회용) |
| `src/components/home/NewsBoard.tsx` | 수정 | 정적 import → API fetch |
| `src/data/news.ts` | 수정 | 데이터 배열 제거, 타입만 유지 |
| `vercel.json` | **신규** | 서울 리전 설정 |
| `public/assets/images/pc001007479_original.jpg` | **삭제** | 7.5MB 절감 |

---

## 4. 구현 순서 (의존성 순)

```
===== 로컬 구현 =====
Step 1:  npm install @upstash/redis @vercel/blob
Step 2:  src/lib/redis.ts 생성 (Redis 싱글턴)
Step 3:  뉴스 CRUD API → Upstash Redis
Step 4:  공개 뉴스 조회 API (신규)
Step 5:  이미지 업로드 API → Vercel Blob
Step 6:  NewsBoard → API fetch
Step 7:  news.ts 데이터 배열 제거
Step 8:  시딩 API (신규)
Step 9:  (next.config.ts 확인 — 수정 불필요)
Step 10: 원본 이미지 삭제
Step 11: vercel.json 생성
Step 12: 타입체크 + 빌드
===== Vercel 배포 =====
Step 13: Vercel 프로젝트 생성
Step 14: Vercel Marketplace → Upstash Redis 스토어 연결 (서울 리전)
Step 15: Vercel Storage → Blob 스토어 연결
Step 16: 환경변수 확인 (자동 주입 + ADMIN_PASSWORD 수동)
Step 17: 배포 (vercel deploy --prod)
Step 18: 시딩 API 호출 (1회)
Step 19: 카페24 도메인 DNS 변경
Step 20: 배포 후 검증
```

---

## 5. Vercel Marketplace에서 Upstash Redis 설정 가이드

1. **Vercel Dashboard** → 프로젝트 → **Storage** 탭
2. **Browse Marketplace** → **Upstash Redis** 선택
3. **Create Store**:
   - Name: `damha-news` (또는 원하는 이름)
   - Region: **ap-northeast-2 (Seoul)** — 필수! (icn1 Vercel 리전과 매칭)
   - Plan: **Free** (일 10,000 요청, 256MB)
4. 스토어 연결 시 환경변수 자동 주입:
   - `UPSTASH_REDIS_REST_URL`
   - `UPSTASH_REDIS_REST_TOKEN`
5. **재배포** 필요 (환경변수 반영)

---

## 6. 카페24 도메인 연결

1. Vercel Dashboard → 프로젝트 → Settings → Domains → 도메인 추가
2. Vercel이 제공하는 DNS 레코드 확인:
   - **A 레코드**: `76.76.21.21`
   - **CNAME**: `cname.vercel-dns.com`
3. 카페24 도메인 관리 → DNS 설정:
   - 기존 레코드 삭제 (카페24 서버 가리키는 것)
   - `@` (루트) → A 레코드 `76.76.21.21`
   - `www` → CNAME `cname.vercel-dns.com`
4. SSL 인증서: Vercel에서 자동 발급 (Let's Encrypt)
5. DNS 전파 대기 (최대 24~48시간, 보통 몇 분)

---

## 7. 환경변수 설정 (Vercel Dashboard)

| 변수 | 설정 방법 |
|------|----------|
| `ADMIN_PASSWORD` | 직접 입력 |
| `UPSTASH_REDIS_REST_URL` | Marketplace → Upstash 연결 시 자동 |
| `UPSTASH_REDIS_REST_TOKEN` | Marketplace → Upstash 연결 시 자동 |
| `BLOB_READ_WRITE_TOKEN` | Storage → Blob 스토어 연결 시 자동 |

---

## 8. `@vercel/kv` vs `@upstash/redis` 비교

| 항목 | `@vercel/kv` (폐지) | `@upstash/redis` (현행) |
|------|---------------------|------------------------|
| 상태 | Deprecated (2025.06~) | Active, Vercel 공식 권장 |
| 설치 | `npm i @vercel/kv` | `npm i @upstash/redis` |
| Import | `import { kv } from "@vercel/kv"` | `import { Redis } from "@upstash/redis"` |
| 초기화 | 자동 (env 자동 감지) | `new Redis({ url, token })` |
| 환경변수 | `KV_REST_API_URL`, `KV_REST_API_TOKEN` | `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` |
| API | `kv.get()`, `kv.set()` | `redis.get()`, `redis.set()` |
| Edge 지원 | O | O |
| 서울 리전 | O | O (ap-northeast-2) |
| 무료 티어 | 일 30,000 req | 일 10,000 req, 256MB |

> API 사용법이 거의 동일하여 마이그레이션 비용 최소. `kv.get()` → `redis.get()` 수준의 변경.

---

## 9. 배포 후 검증 체크리스트

- [ ] 메인 뉴스 보드 정상 표시 (API fetch)
- [ ] 자동 슬라이딩 동작
- [ ] 어드민 로그인 + 뉴스 CRUD
- [ ] 이미지 업로드 → Blob CDN URL 반환
- [ ] featured 토글 → 메인 반영
- [ ] 모바일 반응형
- [ ] 커스텀 도메인 접속
- [ ] HTTPS/SSL 인증서
- [ ] OG 메타태그 확인
- [ ] 404 페이지

---

## 10. 리스크 및 대응 방안

| 리스크 | 영향 | 대응 |
|--------|------|------|
| sharp 빌드 실패 (Vercel) | 이미지 업로드 불가 | `@vercel/blob`은 sharp 없이도 저장 가능. Vercel은 sharp를 공식 지원하므로 문제 가능성 낮음 |
| Upstash 무료 한도 초과 | Redis 접근 차단 | 뉴스 CRUD는 일 수십 건 수준 — 10,000 요청 한도 내 충분 |
| DNS 전파 지연 | 도메인 일시 접속 불가 | Vercel 기본 도메인(*.vercel.app)으로 우선 검증 후 DNS 변경 |
| 기존 뉴스 이미지 로컬 경로 | Redis 전환 후 이미지 깨짐 | 시딩 시 기존 이미지는 `public/` 경로 그대로 유지. 신규 업로드만 Blob URL |

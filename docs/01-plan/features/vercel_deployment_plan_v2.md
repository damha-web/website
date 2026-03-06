# Vercel 배포 세부 구현 계획서 (v2 - Upstash Redis 적용)

> 작성일: 2026-03-05
> 결정사항: Vercel Blob + Upstash Redis (Vercel KV 대체), 카페24 도메인 연결, 원본 이미지 삭제
> 상태: **승인 대기**

---

## 1. 구현 범위 요약

| 작업 | 설명 |
|------|------|
| 뉴스 데이터 → Upstash Redis | `fs.readFile/writeFile` → `@upstash/redis` (Vercel KV Deprecated 대응) |
| 이미지 업로드 → Vercel Blob | `fs.writeFile` → `@vercel/blob` CDN |
| NewsBoard → API fetch | 정적 import → 서버사이드 fetch |
| 원본 이미지 삭제 | `pc001007479_original.jpg` (7.5MB) 제거 |
| vercel.json 생성 | 서울 리전 설정 |
| 데이터 시딩 API | 기존 news.ts 데이터를 Redis에 초기 저장 |

---

## 2. 세부 구현 단계

### Step 1: 패키지 관리

`@vercel/kv`가 지원 종료(Deprecated)되었으므로, 공식 권장 사항인 `@upstash/redis`를 사용합니다.

```bash
# 잘못 설치된 패키지 제거 (있을 경우)
npm uninstall @vercel/kv

# 올바른 패키지 설치
npm install @upstash/redis @vercel/blob
```

### Step 2: 뉴스 CRUD API 리팩토링 (`src/app/api/admin/news/route.ts`)

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
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();
const KV_KEY = "news-items";

async function readNewsData(): Promise<NewsItem[]> {
  return (await redis.get<NewsItem[]>(KV_KEY)) ?? [];
}

async function writeNewsData(items: NewsItem[]): Promise<void> {
  await redis.set(KV_KEY, items);
}

// GET/POST/PUT/DELETE 로직은 동일하게 유지
```

**핵심 변경:**
- `fs`, `path` import 제거
- `eval()` 제거 (보안 개선)
- `DATA_FILE` 상수 제거
- 나머지 CRUD 로직은 그대로 유지

### Step 3: 뉴스 공개 조회 API 신규 생성 (`src/app/api/news/route.ts`)

현재 NewsBoard는 `import { newsItems } from "@/data/news"`로 정적 import.
Redis 전환 후에는 API에서 데이터를 가져와야 함.

```typescript
// src/app/api/news/route.ts (신규 — 인증 불필요, 공개 API)
import { Redis } from "@upstash/redis";
import type { NewsItem } from "@/data/news";

export const revalidate = 60; // 60초 캐시 (ISR)

const redis = Redis.fromEnv();

export async function GET() {
  const items = (await redis.get<NewsItem[]>("news-items")) ?? [];
  const featured = items.filter((item) => item.published && item.featured);
  return Response.json(featured);
}
```

### Step 4: 이미지 업로드 API 리팩토링 (`src/app/api/admin/upload/route.ts`)

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
  // ... 검증 로직 동일 ...

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
- `blob.url`이 CDN URL로 반환

### Step 5: NewsBoard 데이터 소스 변경 (`src/components/home/NewsBoard.tsx`)

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

### Step 6: news.ts 정리 (`src/data/news.ts`)

**변경:** 타입 + 상수만 유지, 하드코딩된 데이터 배열 제거

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

// newsItems 배열 삭제 — Redis로 이전
```

### Step 7: 데이터 시딩 API (`src/app/api/admin/seed/route.ts`)

기존 news.ts 데이터를 Redis에 1회 저장하는 엔드포인트.
배포 후 1회만 호출하면 됨.

```typescript
// src/app/api/admin/seed/route.ts (신규)
import { Redis } from "@upstash/redis";
import { verifyAdmin, unauthorizedResponse } from "@/lib/admin-auth";

const redis = Redis.fromEnv();

// 기존 데이터를 하드코딩으로 임시 포함 (1회성 실행 후 제거 권장)
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

### Step 8: next/image 리모트 패턴 추가 (`next.config.ts`)

Vercel Blob URL이 외부 도메인이므로 next/image에 허용 필요.

```typescript
// next.config.ts images.remotePatterns에 추가
{
  protocol: 'https',
  hostname: '*.public.blob.vercel-storage.com',
}
```

현재 `hostname: '**'`로 이미 전체 허용이므로 **수정 불필요**. 다만 프로덕션에서 보안을 강화하려면 특정 호스트네임으로 한정하는 것을 권장.

### Step 9: 원본 이미지 삭제

```bash
rm public/assets/images/pc001007479_original.jpg
```

### Step 10: vercel.json 생성

```json
{
  "regions": ["icn1"],
  "framework": "nextjs"
}
```

### Step 11: 카페24 도메인 연결

1. Vercel Dashboard → 프로젝트 → Settings → Domains → 도메인 추가
2. Vercel DNS 레코드 확인:
   - **A 레코드**: `76.76.21.21`
   - **CNAME**: `cname.vercel-dns.com`
3. 카페24 도메인 관리 → DNS 설정 변경:
   - `@` → A 레코드 `76.76.21.21` 추가
   - `www` → CNAME `cname.vercel-dns.com` 추가
4. DNS 전파 대기 및 자동 SSL 적용 확인

### Step 12: 환경변수 설정 (Vercel Dashboard)

| 변수 | 설정 방법 |
|------|----------|
| `ADMIN_PASSWORD` | Vercel 대시보드에서 직접 입력 |
| `UPSTASH_REDIS_REST_URL` | Vercel Integrations (Marketplace)에서 Upstash 연동 시 자동 생성 |
| `UPSTASH_REDIS_REST_TOKEN` | Vercel Integrations (Marketplace)에서 Upstash 연동 시 자동 생성 |
| `BLOB_READ_WRITE_TOKEN` | Storage → Blob 스토어 연결 시 자동 생성 |

### Step 13: 타입체크 + 빌드 + 배포

```bash
npx tsc --noEmit
npm run build
```

---

## 3. 수정 파일 전체 목록

| 파일 | 변경 유형 | 내용 |
|------|----------|------|
| `package.json` | 수정 | `@upstash/redis`, `@vercel/blob` 추가 (`@vercel/kv` 제거) |
| `src/app/api/admin/news/route.ts` | **전면 수정** | fs → Upstash Redis |
| `src/app/api/admin/upload/route.ts` | **전면 수정** | fs → Vercel Blob |
| `src/app/api/news/route.ts` | **신규** | 공개 뉴스 조회 API (featured 필터) |
| `src/app/api/admin/seed/route.ts` | **신규** | 데이터 시딩 (1회용) |
| `src/components/home/NewsBoard.tsx` | 수정 | 정적 import → API fetch |
| `src/data/news.ts` | 수정 | 데이터 배열 제거, 타입만 유지 |
| `vercel.json` | **신규** | 서울 리전 설정 |
| `public/assets/images/pc001007479_original.jpg` | **삭제** | 용량 절감 |

---

## 4. 구현 순서 (의존성 순)

1. **로컬 환경 설정 및 개발**
   - Step 1: `npm uninstall @vercel/kv` / `npm install @upstash/redis @vercel/blob`
   - Step 2: 뉴스 CRUD API → Upstash Redis
   - Step 3: 공개 뉴스 조회 API (신규)
   - Step 4: 이미지 업로드 API → Vercel Blob
   - Step 5: NewsBoard → API fetch 로직 수정
   - Step 6: `news.ts` 데이터 배열 분리
   - Step 7: 시딩 API 신규 생성
   - Step 8-10: Vercel 설정 및 용량 정리 (vercel.json 생성, 원본 이미지 삭제)
   - Step 11: 로컬 타입체크 및 빌드 검증

2. **Vercel 설정 및 배포 준비**
   - Step 12: Vercel 프로젝트 연결, Upstash/Blob Integration 연동 및 환경변수 설정
   - Step 13: 도메인 설정 (카페24) 및 GitHub/Vercel CLI를 통한 배포
   - Step 14: 시딩 API 1회 호출
   - Step 15: 배포 환경 동작 확인

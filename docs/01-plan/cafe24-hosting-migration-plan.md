# 카페24 호스팅 전환 계획서

> 작성일: 2026-03-12
> 목적: 현재 Vercel에서 운영 중인 Next.js 앱을 카페24 호스팅으로 전환하기 위한 검토 및 실행 계획

---

## 1. 현황 분석 요약

### 현재 구조
```
사용자 → www.damha.kr → Vercel (Next.js 16 서버리스)
                          ├── @vercel/blob  (뉴스 이미지 CDN)
                          └── Upstash Redis (뉴스 데이터 저장)
```

### Vercel 의존 기능 목록

| 기능 | 파일 | 의존성 | 전환 필요 여부 |
|------|------|--------|--------------|
| 뉴스 이미지 업로드 | `api/admin/upload/route.ts` | `@vercel/blob` | **필수** |
| 뉴스 데이터 저장 | `lib/redis.ts` | `@upstash/redis` | 불필요 (외부 서비스) |
| ISR 캐시 | `api/news/route.ts` (`revalidate=60`) | Vercel 인프라 | VPS면 자동 지원 |
| SSL/HTTPS | 도메인 설정 | Vercel 자동 발급 | 수동 설정 필요 |
| CI/CD | GitHub push → 자동 배포 | Vercel 연동 | 수동 배포 스크립트 필요 |
| 이미지 최적화 | `next/image` | Vercel 서버 | VPS에서 자체 처리 |

---

## 2. 카페24 호스팅 종류별 전환 가능성

| 항목 | 공유호스팅 (리눅스) | VPS (가상서버) |
|------|-----------------|--------------|
| Next.js 실행 | **불가** (PHP 전용) | **가능** (Node.js 직접 설치) |
| API Routes | 불가 | 가능 |
| ISR 지원 | 불가 | 가능 (자체 캐시) |
| `next/image` 최적화 | 불가 | 가능 |
| SSL 자동 발급 | 기본 제공 | 직접 설정 (Let's Encrypt) |
| CI/CD | 불가 | 수동 또는 별도 구성 |
| 월 비용(예상) | 약 5,000~15,000원 | 약 30,000~60,000원 |
| 관리 난이도 | 낮음 | **높음** (서버 직접 관리) |

> **결론: 공유호스팅은 Next.js 앱 호스팅 불가. VPS(가상서버) 만 전환 가능.**

---

## 3. Vercel vs 카페24 VPS 비교

| 항목 | Vercel (현재) | 카페24 VPS |
|------|-------------|-----------|
| 비용 | 무료 (Hobby) / $20/월 (Pro) | 약 3~6만원/월 |
| Next.js 지원 | 완벽 (공식 플랫폼) | 수동 구성 |
| 서버 관리 | 불필요 | **직접 관리** (패치, 재시작 등) |
| 자동 배포 | GitHub push 연동 | 스크립트 필요 (PM2 + git pull) |
| HTTPS | 자동 | Let's Encrypt 설치 필요 |
| 글로벌 CDN | 기본 제공 | 별도 설정 필요 |
| 장애 대응 | Vercel이 처리 | **직접 대응** |
| 스케일링 | 자동 | 수동 플랜 업그레이드 |
| 현재 상태 | 운영 중 ✅ | 처음부터 설정 필요 |

---

## 4. 전환 시 코드 변경 사항

### 4-1. @vercel/blob 교체 (필수 — 1개 파일)

**현재**: `src/app/api/admin/upload/route.ts`
```ts
import { put } from "@vercel/blob";
// ...
const blob = await put(`news/${filename}`, optimized, { access: "public" });
return NextResponse.json({ path: blob.url, ... });
```

**방안 A — 서버 파일시스템 저장** (단순, 별도 비용 없음)
- VPS `/www/uploads/news/` 디렉토리에 직접 저장
- nginx로 `/uploads/` 경로 정적 파일 서빙
- 단점: 서버 이전 시 파일도 이동 필요, CDN 없음

**방안 B — Cloudflare R2** (권장)
- S3 호환 API, 무료 10GB/월, 글로벌 CDN
- `@aws-sdk/client-s3` 또는 `aws4fetch` 사용
- 기존 Vercel Blob 이미지 URL도 R2로 일괄 마이그레이션 가능
- `@vercel/blob` 제거 → 약 5줄 코드 변경

**방안 C — AWS S3** (유료, 복잡)
- 기업 표준이지만 설정 복잡, 월 비용 발생
- 현재 규모에서는 과도함

→ **권장: 방안 A (파일시스템)** — 관리 단순, 규모 작음, 별도 비용 없음

---

### 4-2. next.config.ts 이미지 도메인 수정

현재 `remotePatterns: [{ hostname: '**' }]` — 모든 도메인 허용 상태이므로 별도 변경 불필요.

파일시스템 방식 선택 시: `blob.vercel-storage.com` → `www.damha.kr/uploads/...` (상대 경로)

---

### 4-3. 환경변수 이전

Vercel 대시보드 환경변수 → 서버 `.env.local` 또는 PM2 `ecosystem.config.js`

| 변수 | 현재 위치 | 이전 후 |
|------|---------|--------|
| `KV_REST_API_URL` | Vercel | `.env.local` |
| `KV_REST_API_TOKEN` | Vercel | `.env.local` |
| `BLOB_READ_WRITE_TOKEN` | Vercel (삭제 가능) | 불필요 (파일시스템 전환 시) |
| `ADMIN_PASSWORD` | Vercel | `.env.local` |
| `KAKAOWORK_WEBHOOK_URL` | Vercel | `.env.local` |

---

## 5. VPS 마이그레이션 단계별 계획

### Phase 1 — 카페24 VPS 신청 (30분)
1. 카페24 → 서버호스팅 → 가상서버호스팅 신청
2. OS: Ubuntu 22.04 LTS 선택
3. 사양: 2vCPU / 4GB RAM 이상 권장 (Next.js + sharp 구동)
4. SSH 키 설정

### Phase 2 — 서버 환경 구성 (2~3시간)
```bash
# Node.js 20 LTS 설치
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# PM2 (프로세스 매니저) 설치
npm install -g pm2

# nginx 설치 (리버스 프록시 + 정적 파일)
sudo apt-get install -y nginx

# Let's Encrypt SSL
sudo apt-get install -y certbot python3-certbot-nginx
sudo certbot --nginx -d www.damha.kr -d damha.kr
```

### Phase 3 — @vercel/blob 교체 — 파일시스템 방식 (1시간)

`src/app/api/admin/upload/route.ts` 수정:
```ts
// import { put } from "@vercel/blob";  ← 삭제
import fs from "fs/promises";
import path from "path";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads", "news");

// put() 호출 부분 교체:
await fs.mkdir(UPLOAD_DIR, { recursive: true });
await fs.writeFile(path.join(UPLOAD_DIR, filename), optimized);
const publicUrl = `/uploads/news/${filename}`;

return NextResponse.json({ path: publicUrl, ... });
```

`package.json`에서 `@vercel/blob` 제거:
```bash
npm uninstall @vercel/blob
```

### Phase 4 — 코드 배포 (30분)
```bash
# 서버에서:
git clone https://github.com/damha-web/website.git /var/www/damha
cd /var/www/damha
cp .env.local.example .env.local  # 환경변수 직접 편집
npm ci
npm run build
pm2 start npm --name "damha" -- start
pm2 startup  # 서버 재시작 시 자동 시작 등록
```

### Phase 5 — nginx 설정 (30분)
```nginx
server {
    server_name www.damha.kr damha.kr;

    location /uploads/ {
        alias /var/www/damha/public/uploads/;
        expires 30d;
    }

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Phase 6 — 도메인 전환 (5분)
- 현재: `www.damha.kr` A record → `76.76.21.21` (Vercel)
- 변경: `www.damha.kr` A record → 카페24 VPS IP
- 전파 후 Vercel에서 프로젝트 제거 가능

---

## 6. 기존 Vercel Blob 이미지 마이그레이션

현재 Redis에 저장된 뉴스 아이템들의 `imageUrl`이 Vercel Blob CDN URL을 가리킴.
→ Phase 4 완료 후, 어드민 페이지에서 뉴스 이미지를 재업로드하거나,
→ 마이그레이션 스크립트로 일괄 다운로드 후 새 위치에 저장 필요.

---

## 7. 전체 작업량 요약

| 단계 | 난이도 | 소요 시간 | 비고 |
|------|--------|---------|------|
| VPS 신청 | 낮음 | 30분 | 카드 결제 |
| 서버 환경 구성 | **높음** | 2~3시간 | Linux 지식 필요 |
| 코드 수정 (@vercel/blob) | 낮음 | 1시간 | 1개 파일 |
| 배포 및 PM2 설정 | 중간 | 1시간 | |
| nginx + SSL | 중간 | 1시간 | |
| 도메인 전환 | 낮음 | 5분 + 대기 | |
| 기존 이미지 마이그레이션 | 중간 | 1~2시간 | |
| **합계** | | **6~9시간** | |

---

## 8. 권고 사항

### 전환을 권장하지 않는 경우
- **현재 Vercel Hobby(무료) 플랜 사용 중** → 이미 무료이므로 전환 이득 없음
- 서버 직접 관리 경험이 없는 경우 → 장애 시 복구 어려움

### 전환이 의미 있는 경우
- Vercel Pro($20/월) 사용 중이고 비용 절감이 목적인 경우
- 이미 카페24 VPS를 보유하고 있는 경우
- 서버 완전 통제가 필요한 경우 (데이터 규제 등)

### 대안: 현행 유지 + 비용 최적화
현재 구조(Vercel Hobby + Upstash Free + damha.kr 도메인)는 **월 비용 0원**으로 운영 가능.
카페24 VPS 전환 시 오히려 월 3~6만원 비용이 발생하며 관리 부담이 증가함.

---

## 9. 결정 요청

진행 여부 결정 전 확인 필요:

- [ ] **현재 Vercel 플랜**: 무료(Hobby) / Pro($20/월) 중 어느 것인가?
- [ ] **카페24 VPS 기 보유 여부**: 이미 계약된 VPS가 있는가?
- [ ] **전환 목적**: 비용 절감 / 서버 통제 / 기타
- [ ] **서버 관리 경험**: Linux 서버 직접 관리 경험 유무

결정 후 Phase 1부터 순서대로 진행하겠습니다.

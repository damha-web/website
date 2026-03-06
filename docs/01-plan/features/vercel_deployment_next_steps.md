# Vercel 배포 — 완료 현황 및 남은 단계 계획서

> 작성일: 2026-03-06
> 상태: **검토 대기**

---

## Part A. 완료된 작업 (로컬 구현)

### A-1. 코드 마이그레이션

| # | 작업 | 상태 | 비고 |
|---|------|------|------|
| 1 | 패키지 설치 | 완료 | `@upstash/redis` 1.36.3, `@vercel/blob` 2.3.1 |
| 2 | Redis 헬퍼 생성 | 완료 | `src/lib/redis.ts` — Upstash Redis 싱글턴 |
| 3 | 뉴스 CRUD API 전환 | 완료 | `fs`+`eval()` 제거 → `redis.get/set` |
| 4 | 공개 뉴스 조회 API 생성 | 완료 | `src/app/api/news/route.ts` (60초 ISR) |
| 5 | 이미지 업로드 API 전환 | 완료 | `fs.writeFile` 제거 → `@vercel/blob` `put()` |
| 6 | NewsBoard 데이터 소스 전환 | 완료 | 정적 import → `fetch("/api/news")` |
| 7 | news.ts 데이터 배열 제거 | 완료 | 타입 + `categoryColors`만 유지 |
| 8 | 시딩 API 생성 | 완료 | `src/app/api/admin/seed/route.ts` (9개 데이터) |
| 9 | 원본 이미지 삭제 | 완료 | `pc001007479_original.jpg` 7.5MB 절감 |
| 10 | vercel.json 생성 | 완료 | 서울 리전 `icn1` |
| 11 | 타입체크 + 빌드 | 완료 | `tsc --noEmit` + `next build` 통과 |

### A-2. 변경된 파일 목록

| 파일 | 변경 유형 |
|------|----------|
| `src/lib/redis.ts` | 신규 |
| `src/app/api/news/route.ts` | 신규 |
| `src/app/api/admin/seed/route.ts` | 신규 |
| `vercel.json` | 신규 |
| `src/app/api/admin/news/route.ts` | 전면 수정 |
| `src/app/api/admin/upload/route.ts` | 전면 수정 |
| `src/components/home/NewsBoard.tsx` | 수정 |
| `src/data/news.ts` | 수정 (데이터 배열 삭제) |
| `public/assets/images/pc001007479_original.jpg` | 삭제 |

---

## Part B. 남은 단계 (Vercel 배포)

### Step 1: Git 커밋 + GitHub 푸시

로컬 변경사항을 커밋하고 GitHub에 푸시합니다.

```
대상: 위 A-2 변경 파일 전체
```

### Step 2: Vercel 프로젝트 생성

1. [vercel.com](https://vercel.com) → **Add New Project**
2. GitHub 저장소 연결 (`damha`)
3. Framework Preset: **Next.js** (자동 감지)
4. Root Directory: `.` (기본값)
5. **아직 Deploy 클릭하지 않음** — 환경변수 먼저 설정

### Step 3: Upstash Redis 스토어 연결

1. Vercel Dashboard → 프로젝트 → **Storage** 탭
2. **Browse Marketplace** → **Upstash Redis** 선택
3. Create Store 설정:
   - Name: `damha-news`
   - **Region: `ap-northeast-2` (Seoul)** — 필수
   - Plan: **Free** (일 10,000 요청, 256MB)
4. 연결 완료 시 자동 주입되는 환경변수:
   - `UPSTASH_REDIS_REST_URL`
   - `UPSTASH_REDIS_REST_TOKEN`

### Step 4: Vercel Blob 스토어 연결

1. Vercel Dashboard → 프로젝트 → **Storage** 탭
2. **Blob** → **Create Store**
3. 연결 완료 시 자동 주입되는 환경변수:
   - `BLOB_READ_WRITE_TOKEN`

### Step 5: 환경변수 수동 설정

1. Vercel Dashboard → 프로젝트 → **Settings** → **Environment Variables**
2. 추가:

| 변수명 | 값 | 대상 환경 |
|--------|------|----------|
| `ADMIN_PASSWORD` | (관리자 비밀번호) | Production, Preview, Development |

### Step 6: 첫 배포

```bash
# Vercel Dashboard에서 Deploy 클릭
# 또는 CLI:
vercel deploy --prod
```

- 빌드 시 Redis 환경변수가 주입되어 경고 없이 완료될 것
- 배포 URL (예: `damha-xxx.vercel.app`) 확인

### Step 7: 데이터 시딩 (1회)

배포 완료 후 기존 뉴스 데이터를 Redis에 저장합니다.

```bash
curl -X POST https://[배포URL]/api/admin/seed \
  -H "x-admin-token: [ADMIN_PASSWORD]"
```

응답 예시: `{"success": true, "count": 9}`

> 이미 데이터가 있으면 409 반환 (중복 방지)

### Step 8: 배포 검증

| # | 검증 항목 | 확인 방법 |
|---|----------|----------|
| 1 | 메인 뉴스 보드 표시 | 메인 페이지 하단 뉴스 카드 6개 표시 확인 |
| 2 | 자동 슬라이딩 | 5초 간격 자동 전환, 호버 시 정지 |
| 3 | 어드민 로그인 | `/admin/news` 접속 → 비밀번호 입력 |
| 4 | 뉴스 CRUD | 글 생성/수정/삭제 → 새로고침 후 반영 확인 |
| 5 | 이미지 업로드 | 새 글 작성 시 이미지 업로드 → Blob CDN URL 반환 |
| 6 | Featured 토글 | 별 아이콘 토글 → 메인 페이지 반영 |
| 7 | 모바일 반응형 | PC 3열 / 태블릿 2열 / 모바일 1열 |
| 8 | 기타 페이지 | `/about`, `/services`, `/portfolio`, `/web` 정상 |

### Step 9: 카페24 도메인 DNS 변경

1. Vercel Dashboard → Settings → **Domains** → 도메인 추가
2. 카페24 도메인 관리에서 DNS 레코드 수정:

| 호스트 | 레코드 유형 | 값 |
|--------|-----------|------|
| `@` (루트) | A | `76.76.21.21` |
| `www` | CNAME | `cname.vercel-dns.com` |

3. 기존 카페24 서버를 가리키는 레코드 삭제
4. SSL 인증서: Vercel에서 Let's Encrypt 자동 발급
5. DNS 전파: 보통 수 분, 최대 24~48시간

### Step 10: 최종 검증

- [ ] 커스텀 도메인으로 접속 확인
- [ ] HTTPS 정상 동작
- [ ] OG 메타태그 (SNS 공유 미리보기)
- [ ] 404 페이지
- [ ] 모든 서브페이지 정상 렌더링

---

## 참고: 로컬 개발 시 환경변수

Vercel 배포 후 로컬에서도 개발하려면 `.env.local` 파일이 필요합니다:

```bash
# Vercel CLI로 자동 가져오기 (권장)
vercel env pull .env.local
```

또는 수동 설정:

```env
UPSTASH_REDIS_REST_URL=https://xxxx.upstash.io
UPSTASH_REDIS_REST_TOKEN=AxxxxW
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_xxxx
ADMIN_PASSWORD=your-password
```

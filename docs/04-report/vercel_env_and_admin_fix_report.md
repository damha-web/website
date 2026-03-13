# Vercel 환경변수 연결 및 Admin 로그인 이슈 해결 보고서

> 작성일: 2026-03-13
> 관련 문서: `docs/04-report/admin_news_login_issue_report.md`

---

## 1. 문제 요약

`/admin/news` 로그인 시 비밀번호가 맞아도 "비밀번호가 올바르지 않습니다."가 반복 표시되는 증상.

**실제 원인**: Redis 환경변수 누락으로 `/api/admin/news`가 500 에러 반환.
UI가 401(인증실패)과 500(서버오류)을 구분하지 않고 동일 메시지 출력해 원인 파악이 어려웠음.

---

## 2. 원인 분석 과정

| 단계 | 확인 내용 | 결과 |
|------|-----------|------|
| Vercel 환경변수 확인 | `ADMIN_PASSWORD`만 등록, Redis 변수 없음 | ❌ 누락 확인 |
| Vercel Storage 탭 확인 | `upstash-kv-beige-planet`, `website-r1cs-blob` 존재하나 **미연결** 상태 | ❌ Connect 필요 |
| 이전 기록 검토 | 2026-03-06 스토어 생성했으나 프로젝트 연결이 끊어진 상태 | 원인 확정 |

---

## 3. 해결 내용

### 3-1. Vercel Storage 연결 (사용자 작업)

| 스토어 | 종류 | 조치 |
|--------|------|------|
| `upstash-kv-beige-planet` | Upstash Redis | Connect 클릭 → 환경변수 자동 주입 |
| `website-r1cs-blob` | Vercel Blob | Connect 클릭 → 환경변수 자동 주입 |

연결 후 자동 주입된 환경변수:
- `KV_REST_API_URL`
- `KV_REST_API_TOKEN`
- `KV_REST_API_READ_ONLY_TOKEN`
- `KV_URL`
- `REDIS_URL`
- `BLOB_READ_WRITE_TOKEN`

> **참고**: `UPSTASH_REDIS_REST_*` 대신 `KV_REST_API_*` 형태로 주입됨.
> `src/lib/redis.ts`에 이미 폴백 코드가 구현되어 있어 정상 동작.
> ```ts
> url: process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL,
> token: process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN,
> ```

### 3-2. 코드 개선 (AI 작업)

**`src/app/admin/layout.tsx`** — 에러 메시지 분기 처리
```diff
- setError("비밀번호가 올바르지 않습니다.");
+ if (res.status === 401) {
+   setError("비밀번호가 올바르지 않습니다.");
+ } else {
+   setError("서버 오류로 로그인할 수 없습니다. 관리자에게 문의하세요.");
+ }
```

**`src/lib/redis.ts`** — 환경변수 누락 시 명확한 경고 로그
```diff
- export const redis = new Redis({
-   url: process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL!,
-   token: process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN!,
- });
+ const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
+ const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
+
+ if (!url || !token) {
+   console.error("[Redis] Missing environment variables. Admin features will not work.");
+ }
+
+ export const redis = new Redis({ url: url || "", token: token || "" });
```

### 3-3. Redeploy

환경변수 추가 후 Vercel Deployments에서 Redeploy 실행 → 정상 배포 완료.

---

## 4. 현재 Vercel 인프라 구성 (2026-03-13 기준)

| 구성 요소 | 리소스명 | 상태 |
|-----------|---------|------|
| Vercel 프로젝트 | `website` | ✅ 운영 중 |
| Redis | `upstash-kv-beige-planet` | ✅ 연결됨 |
| Blob Storage | `website-r1cs-blob` | ✅ 연결됨 (105kB 사용) |
| 도메인 | `www.damha.co.kr` | ✅ 연결됨 |
| Admin 비밀번호 | `ADMIN_PASSWORD` 환경변수 | ✅ 설정됨 (기본값: `damha2026!`) |

---

## 5. Admin 페이지 접속 정보

| 항목 | 내용 |
|------|------|
| URL | `https://www.damha.co.kr/admin/news` |
| 비밀번호 | Vercel 환경변수 `ADMIN_PASSWORD` 값 (기본: `damha2026!`) |
| 인증 방식 | sessionStorage 토큰 캐싱 (브라우저 탭 닫으면 재로그인 필요) |

---

## 6. 향후 주의사항

> [!WARNING]
> Vercel Storage 스토어를 새로 만들거나 프로젝트 재생성 시, 반드시 스토어를 다시 **Connect** 해야 합니다.
> 환경변수는 스토어 연결 시 자동 주입되며, 연결이 끊기면 즉시 500 에러가 발생합니다.

> [!TIP]
> 환경변수 변경 후에는 반드시 **Redeploy**를 실행해야 적용됩니다.
> Vercel Deployments → 최근 배포 ⋮ → Redeploy

> [!NOTE]
> 로컬 개발 환경에서 Admin 기능을 테스트하려면 `.env.local`에 Redis 환경변수를 추가해야 합니다.
> Vercel CLI를 사용하면 자동으로 가져올 수 있습니다:
> ```bash
> vercel link
> vercel env pull .env.local
> ```

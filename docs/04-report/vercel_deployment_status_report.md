# Vercel 배포 진행 현황 보고서

> 작성일: 2026-03-06
> 기반 문서: `vercel_deployment_roles_and_guide.md`, `vercel_deployment_next_steps.md`

---

## 전체 진행률: Phase 1~2 완료 / Phase 3~4 미완

---

## 1. 완료된 작업

### Phase 1: 코드 마이그레이션 (AI 담당) — 완료

| # | 작업 | 상태 |
|---|------|------|
| 1 | `@upstash/redis`, `@vercel/blob` 패키지 설치 | 완료 |
| 2 | `src/lib/redis.ts` Redis 싱글턴 헬퍼 생성 | 완료 |
| 3 | 뉴스 CRUD API `fs`+`eval()` → `redis.get/set` 전환 | 완료 |
| 4 | 공개 뉴스 조회 API 신규 생성 (`/api/news`) | 완료 |
| 5 | 이미지 업로드 API `fs.writeFile` → `@vercel/blob` 전환 | 완료 |
| 6 | NewsBoard 정적 import → `fetch("/api/news")` 전환 | 완료 |
| 7 | `news.ts` 데이터 배열 제거 (타입만 유지) | 완료 |
| 8 | 시딩 API 생성 (`/api/admin/seed`) | 완료 |
| 9 | 원본 이미지 삭제 (7.5MB 절감) | 완료 |
| 10 | `vercel.json` 서울 리전 설정 | 완료 |
| 11 | Vercel 빌드 호환성 패치 (`lightningcss` EBADPLATFORM 해결) | 완료 |
| 12 | Vercel KV 환경변수 호환성 패치 (`KV_REST_API_*` 폴백) | 완료 |
| 13 | Redis 미연결 시 폴백 데이터 적용 (`fallbackNewsItems`) | 완료 |
| 14 | `.gitignore` AI 도구/임시 폴더 추가 | 완료 |
| 15 | Git 커밋 + GitHub 푸시 | 완료 |

### Phase 2: Vercel 프로젝트 세팅 (사용자 담당) — 완료

| # | 작업 | 상태 |
|---|------|------|
| 1 | GitHub 레포 `damha-web/website` 생성 + 코드 Push | 완료 |
| 2 | Vercel 프로젝트 생성 (`website`) | 완료 |
| 3 | Vercel Blob 스토리지 생성 (Public 접근) | 완료 |
| 4 | Vercel KV 기반 Upstash Redis 생성 + 환경변수 주입 | 완료 |
| 5 | `ADMIN_PASSWORD` 환경변수 수동 설정 | 완료 |
| 6 | Vercel 배포 (Redeploy) → 빌드 성공 (`Ready`) | 완료 |

---

## 2. 남은 작업

### Phase 3: 카페24 도메인 DNS 변경 — 미진행 (사용자 전담)

| 단계 | 작업 | 상세 |
|------|------|------|
| 3-1 | Vercel Domains 추가 | 프로젝트 Settings → Domains → 실제 도메인 입력 → Add |
| 3-2 | 카페24 DNS 레코드 수정 | 기존 A/CNAME 삭제 후 아래 값으로 교체 |
| 3-3 | DNS 전파 대기 | 보통 수 분, 최대 24~48시간 |
| 3-4 | SSL 확인 | Vercel Let's Encrypt 자동 발급 대기 |

**카페24 DNS 설정값:**

| 호스트 | 레코드 유형 | 값 |
|--------|-----------|------|
| `@` (루트) | A | `76.76.21.21` |
| `www` | CNAME | `cname.vercel-dns.com` |

### Phase 4: 뉴스 데이터 시딩 — 미진행 (AI 또는 사용자)

배포된 서버의 Redis에 기존 뉴스 9개를 1회 저장하는 작업입니다.

**실행 방법 (택 1):**

**A) AI 대행** — 배포 도메인과 관리자 비밀번호를 알려주시면 실행

**B) 사용자 직접 실행:**
```bash
curl -X POST https://[배포도메인]/api/admin/seed \
  -H "x-admin-token: [ADMIN_PASSWORD]"
```
정상 응답: `{"success": true, "count": 9}`

> 도메인 연결(Phase 3) 전이라도 Vercel 임시 도메인(`website-xxxx.vercel.app`)으로 즉시 시딩 가능

### Phase 5: 배포 후 최종 검증 — 미진행

| # | 검증 항목 | 확인 방법 |
|---|----------|----------|
| 1 | 메인 뉴스 보드 | 메인 페이지 하단 뉴스 카드 표시 |
| 2 | 자동 슬라이딩 | 5초 간격 전환, 호버 정지 |
| 3 | 어드민 CRUD | `/admin/news` 로그인 → 글 생성/수정/삭제 |
| 4 | 이미지 업로드 | 새 글 작성 시 Blob CDN URL 반환 |
| 5 | Featured 토글 | 별 아이콘 → 메인 반영 |
| 6 | 모바일 반응형 | PC 3열 / 태블릿 2열 / 모바일 1열 |
| 7 | 커스텀 도메인 접속 | HTTPS 정상 동작 |
| 8 | OG 메타태그 | SNS 공유 미리보기 |
| 9 | 404 페이지 | 존재하지 않는 URL 접근 |
| 10 | 서브페이지 전체 | `/about`, `/services`, `/portfolio`, `/web` |

---

## 3. 요약

| Phase | 내용 | 담당 | 상태 |
|-------|------|------|------|
| 1 | 코드 마이그레이션 (15항목) | AI | 완료 |
| 2 | Vercel 프로젝트 + 스토어 연결 (6항목) | 사용자 | 완료 |
| 3 | 카페24 도메인 DNS 변경 | 사용자 | **미진행** |
| 4 | 뉴스 데이터 시딩 (1회) | AI/사용자 | **미진행** |
| 5 | 배포 후 최종 검증 (10항목) | 공동 | **미진행** |

**다음 권장 순서:** Phase 4 (시딩) → Phase 5 (검증) → Phase 3 (도메인)
시딩은 임시 도메인에서 바로 가능하므로, 도메인 연결보다 먼저 진행하는 것이 효율적입니다.

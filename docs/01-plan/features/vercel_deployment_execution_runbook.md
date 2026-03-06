# Vercel 배포 실행 런북 (역할 분리 버전)

> 기준 문서: `docs/01-plan/features/vercel_deployment_next_steps.md`  
> 작성일: 2026-03-06  
> 목적: 배포 작업을 `Codex가 처리할 일`과 `사용자가 직접 해야 할 일`로 명확히 분리

---

## 1. 역할 분리 기준

- `Codex 수행 가능`: 로컬 코드/문서 수정, 빌드 점검, 커맨드 작성, 체크리스트 정리
- `사용자 필수`: 계정 로그인, Vercel 대시보드 클릭 작업, 비밀번호/시크릿 입력, 도메인 DNS 변경

이 기준으로 아래 실행 순서를 작성한다.

---

## 2. Codex가 알아서 할 수 있는 작업

### A. 로컬 코드/문서 점검
1. 마이그레이션 반영 파일 점검 (`src/lib/redis.ts`, API 라우트, `vercel.json` 등)
2. 배포 문서 최신화 (런북, 체크리스트, 실패 대응 절차)
3. 필요한 실행 명령어 초안 작성

### B. 로컬 검증
1. `npm run typecheck` 또는 `tsc --noEmit` 실행
2. `npm run build` 실행
3. 실패 시 원인 파악 후 코드 수정

### C. 배포 지원 산출물 준비
1. 시딩/검증용 `curl` 명령 준비
2. QA 체크리스트 준비
3. 사용자 수행 단계별 확인 포인트 정리

---

## 3. 사용자가 반드시 해야 하는 작업 (상세 가이드)

### Task 1. GitHub 원격 푸시

### 왜 사용자 작업인가
- 원격 저장소 인증(SSH 키/토큰)과 브랜치 정책 권한은 사용자 계정 권한 영역

### 상세 절차
1. 배포할 브랜치 체크아웃
```bash
git checkout [배포브랜치]
```
2. 변경 파일 확인
```bash
git status
```
3. 필요한 파일만 스테이징
```bash
git add src/lib/redis.ts \
  src/app/api/news/route.ts \
  src/app/api/admin/seed/route.ts \
  src/app/api/admin/news/route.ts \
  src/app/api/admin/upload/route.ts \
  src/components/home/NewsBoard.tsx \
  src/data/news.ts \
  vercel.json \
  docs/01-plan/features/vercel_deployment_execution_runbook.md
```
4. 커밋
```bash
git commit -m "feat: finalize vercel deployment runbook and migration changes"
```
5. 푸시
```bash
git push origin [배포브랜치]
```

### 완료 확인
- GitHub 저장소 웹 화면에서 최신 커밋 SHA 확인

### 실패 시 대응
- `non-fast-forward` 발생 시:
```bash
git pull --rebase origin [배포브랜치]
git push origin [배포브랜치]
```

---

### Task 2. Vercel 프로젝트 생성

### 왜 사용자 작업인가
- Vercel 계정 로그인 및 저장소 연결 승인(OAuth)은 사용자 권한 필요

### 상세 절차
1. `https://vercel.com` 로그인
2. `Add New Project` 클릭
3. GitHub 저장소 `damha` 선택
4. Framework Preset이 `Next.js`인지 확인
5. Root Directory `.` 확인
6. 이 시점에서는 배포 버튼 누르지 말고 Storage 먼저 연결

### 완료 확인
- 프로젝트 대시보드 진입 가능

### 실패 시 대응
- 저장소가 목록에 없으면 GitHub 연동 권한(Repository Access) 재승인

---

### Task 3. Upstash Redis 연결

### 왜 사용자 작업인가
- Vercel Marketplace 연동 및 요금제/리전 선택은 계정 소유자 권한 필요

### 상세 절차
1. Vercel 프로젝트 > `Storage` 탭 이동
2. `Browse Marketplace` > `Upstash Redis` 선택
3. Store 생성
- Name: `damha-news` (권장)
- Region: `ap-northeast-2 (Seoul)` 반드시 선택
- Plan: Free
4. 프로젝트와 연결 완료

### 완료 확인
- Environment Variables에 자동 생성 확인
- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`

### 실패 시 대응
- Region 잘못 선택 시 지연 증가 가능, 필요하면 스토어 재생성

---

### Task 4. Vercel Blob 연결

### 왜 사용자 작업인가
- Blob Store 생성/연결은 Vercel 프로젝트 소유 권한 필요

### 상세 절차
1. Vercel 프로젝트 > `Storage`
2. `Blob` > `Create Store`
3. 생성 후 현재 프로젝트에 연결

### 완료 확인
- Environment Variables에 `BLOB_READ_WRITE_TOKEN` 자동 주입

### 실패 시 대응
- 토큰이 안 보이면 프로젝트 연결 상태 확인 후 재연결

---

### Task 5. 환경변수 수동 등록 (`ADMIN_PASSWORD`)

### 왜 사용자 작업인가
- 관리자 비밀번호는 민감정보이며 사용자만 값 결정 가능

### 상세 절차
1. Vercel 프로젝트 > `Settings` > `Environment Variables`
2. 변수 추가
- Name: `ADMIN_PASSWORD`
- Value: 강한 비밀번호(권장 16자 이상)
- Environment: `Production`, `Preview`, `Development` 모두 체크
3. 저장 후 기존 배포가 있으면 재배포 예정

### 완료 확인
- 변수 목록에 `ADMIN_PASSWORD` 표시

### 실패 시 대응
- 오타/공백 포함 입력 주의
- 값 변경 후 반드시 재배포

---

### Task 6. Production 배포 실행

### 왜 사용자 작업인가
- Vercel 배포 권한 및 프로젝트 소유 계정 인증 필요

### 상세 절차 (대시보드 방식)
1. Vercel 프로젝트 대시보드에서 최신 커밋 확인
2. `Deploy` 또는 `Redeploy` 실행
3. 빌드 로그에서 실패 유무 확인

### 상세 절차 (CLI 방식)
```bash
vercel login
vercel link
vercel deploy --prod
```

### 완료 확인
- Deployment 상태 `Ready`
- `https://[프로젝트].vercel.app` 접속 성공

### 실패 시 대응
- 환경변수 누락 오류: Variables 화면 확인 후 재배포
- 타입/빌드 오류: 로컬 수정 후 다시 푸시

---

### Task 7. 초기 데이터 시딩 (1회)

### 왜 사용자 작업인가
- 운영 URL 호출, 관리자 토큰 사용은 운영 보안 권한 영역

### 상세 절차
1. 배포 URL 확인 (예: `https://damha-xxx.vercel.app`)
2. 아래 명령 1회 실행
```bash
curl -X POST https://[배포URL]/api/admin/seed \
  -H "x-admin-token: [ADMIN_PASSWORD]"
```
3. 같은 명령을 한 번 더 실행해 중복 방지 확인

### 완료 확인
1. 첫 호출: `{"success": true, "count": 9}` 유사 응답
2. 두 번째 호출: `409` 응답

### 실패 시 대응
- `401`: 헤더 토큰값 재확인
- `500`: Redis 변수/스토리지 연결 상태 재확인

---

### Task 8. 기능 QA 검증

### 왜 사용자 작업인가
- 실제 브라우저 확인, 관리자 로그인, 운영 UI 검증은 사람 확인이 가장 정확

### 상세 절차
1. 메인 페이지에서 뉴스 카드/슬라이딩 확인
2. `/admin/news` 로그인 후 생성/수정/삭제 테스트
3. 이미지 업로드 후 Blob CDN URL 저장 확인
4. Featured 토글 반영 확인
5. 모바일 폭에서 레이아웃 확인
6. `/about`, `/services`, `/portfolio`, `/web` 확인

### 완료 확인
- 핵심 기능 차단 이슈(P0/P1) 0건

### 실패 시 대응
- 재현 경로/계정/입력값/응답코드 기록 후 핫픽스 진행

---

### Task 9. 카페24 DNS 전환

### 왜 사용자 작업인가
- 도메인 소유자 계정 접근 및 DNS 변경 권한 필요

### 상세 절차
1. Vercel > `Settings` > `Domains`에서 도메인 추가
2. 카페24 DNS 관리에서 레코드 설정
- `@` : A : `76.76.21.21`
- `www` : CNAME : `cname.vercel-dns.com`
3. 기존 서버를 가리키는 중복/충돌 레코드 삭제
4. 전파 대기(보통 수분, 최대 24~48시간)

### 완료 확인
- Vercel 도메인 상태 `Valid Configuration`
- 커스텀 도메인 HTTPS 접속 정상

### 실패 시 대응
- 레코드 오타, TTL, 중복 레코드 재점검

---

## 4. 핸드오프 순서 (실행용)

1. Codex: 로컬 점검/문서/명령 정리 완료
2. 사용자: Task 1~6 수행 (푸시~배포)
3. Codex: 필요 시 빌드 오류 수정 지원
4. 사용자: Task 7~9 수행 (시딩~QA~DNS)
5. Codex: 이슈 재현 정리 및 핫픽스 지원

---

## 5. 최종 체크리스트

- [ ] GitHub 최신 커밋 푸시 완료
- [ ] Upstash Redis(Seoul) 연결 완료
- [ ] Blob 연결 완료
- [ ] `ADMIN_PASSWORD` 설정 완료
- [ ] Production 배포 Ready 확인
- [ ] 시딩 성공 + 재시도 409 확인
- [ ] 기능 QA 통과
- [ ] DNS 전환 완료
- [ ] 커스텀 도메인 HTTPS 최종 확인

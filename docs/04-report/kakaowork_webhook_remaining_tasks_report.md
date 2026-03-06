# 카카오워크 웹훅 연동 — 진행 현황 비교 및 남은 작업

> 작성일: 2026-03-06
> 기준 문서: `kakaowork_webhook_implementation_report.md`

---

## 1. 계획 vs 실제 구현 비교

| # | 계획 항목 | 상태 | 비고 |
|---|----------|------|------|
| 1 | 환경변수 `KAKAOWORK_WEBHOOK_URL` 추가 | 완료 | 로컬 `.env.local` 설정됨 |
| 2 | `route.ts` — 카카오워크 webhook 전송 | 완료 | 계획보다 강화 구현 (3초 타임아웃, 응답 검증, 전화번호 마스킹, 메시지 1000자 제한) |
| 3 | `ContactForm.tsx` — 연락처 자동 포맷/검증 | 완료 | 계획에 없던 추가 개선 (자동 하이픈, blur 시 검증, 제출 전 차단) |
| 4 | 메시지 형식 — Block Kit 구조화 | 미적용 | 플레인 텍스트(`text`만) 사용 중. 현재 상태 유지 |
| 5 | 폼 제출 완료 UI | 현재 유지 | 폼 전체가 완료 메시지 UI로 교체되는 현재 방식 유지 |
| 6 | Vercel 환경변수 추가 | **미완료** | 프로덕션 배포 시 `KAKAOWORK_WEBHOOK_URL` 추가 필요 |
| 7 | 프로덕션 테스트 | **미진행** | 환경변수 설정 후 테스트 필요 |

---

## 2. 완료된 작업 상세

### A. 카카오워크 웹훅 전송 (`src/app/api/web-contact/route.ts`)

- `sendKakaoWorkNotification()` 함수로 분리된 알림 전송 로직
- AbortController 기반 3초 타임아웃
- 응답 `ok` 여부 검증 + 실패 시 상세 로그 (status, statusText, response body)
- 전화번호 마스킹 (`maskPhone`) — 로그에 원본 전화번호 노출 방지
- 입력값 정규화 (`normalizeText`) + 문의 내용 1000자 제한 (`truncateText`)
- Webhook 실패 시에도 사용자 폼 제출은 성공 처리 (알림 실패 격리)

### B. 연락처 입력 UX (`src/components/web/ContactForm.tsx`)

- `formatMobilePhone()` — 숫자 입력 시 자동 하이픈 포맷 (010-1234-5678)
- `isValidMobilePhone()` — `01x-xxxx-xxxx` 형식 실시간 검증
- blur 이후 오류 표시 (입력 중에는 방해하지 않음)
- 제출 시 형식 불일치하면 API 요청 전 차단

---

## 3. 남은 작업

| 우선순위 | 작업 | 담당 | 설명 |
|---------|------|------|------|
| 필수 | Vercel 환경변수 설정 | 사용자 | Vercel 대시보드 → Settings → Environment Variables → `KAKAOWORK_WEBHOOK_URL` 추가 (Production + Preview) |
| 필수 | 프로덕션 테스트 | 사용자 | `website-r1cs.vercel.app/web`에서 폼 제출 → 카카오워크 채팅방 알림 수신 확인 |
| 대기 | 카페24 도메인 DNS 변경 | 사용자 | 프로젝트 다듬기 후 진행 예정 |

---

## 4. Vercel 환경변수 설정 가이드

1. [Vercel 대시보드](https://vercel.com) → 프로젝트 `website-r1cs` 선택
2. Settings → Environment Variables
3. 추가:
   - Key: `KAKAOWORK_WEBHOOK_URL`
   - Value: 카카오워크에서 발급받은 Webhook URL
   - Environment: Production, Preview 모두 체크
4. Save → 자동 재배포 또는 수동 Redeploy 트리거

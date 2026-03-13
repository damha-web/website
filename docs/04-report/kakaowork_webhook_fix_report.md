# 카카오워크 웹훅 누락 문제 해결 보고서

> 작성일: 2026-03-13
> 관련 파일: `src/app/api/web-contact/route.ts`, `.env.local`

---

## 1. 문제 요약

`/web` 하단의 상담 신청 폼을 통해 문의를 접수했을 때, 코드는 정상 동작하여 "상담 신청이 접수되었습니다" 메시지가 나오지만 **실제 카카오워크 알림톡이 오지 않는 문제** 발생.

**실제 원인**: 로컬(`.env.local`)에는 `KAKAOWORK_WEBHOOK_URL`이 설정되어 있었으나, **Vercel 환경변수(Environment Variables)에는 이 값이 누락**되어 있었습니다.

---

## 2. 코드 분석

`src/app/api/web-contact/route.ts` 파일 내부를 확인해보면 환경변수가 없으면 에러를 발생시키는 대신, 단순히 알림 전송을 건너뛰고(`return`) 사용자에게는 "성공" 응답을 주도록 구현되어 있습니다.

```typescript
// 관련 코드 발췌
const webhookUrl = process.env.KAKAOWORK_WEBHOOK_URL?.trim();

// 환경변수가 없으면 바로 return (에러 처리 안 함)
if (!webhookUrl) return; 
```

이 때문에 폼 제출 자체는 성공으로 보였지만 실제 알림톡 쏘는 로직이 실행되지 않았습니다.

---

## 3. 해결 내용 (사용자 작업)

Vercel 설정에 누락된 웹훅 URL을 등록했습니다.

1. **Vercel 대시보드** ➔ 프로젝트 **Settings** ➔ **Environment Variables**
2. 아래 정보로 새로운 환경변수 추가:
   - **Key**: `KAKAOWORK_WEBHOOK_URL`
   - **Value**: `https://kakaowork.com/bots/hook/00ae0ec00c71445481f672ff970635e5` (로컬 `.env.local`에서 복사)
   - **Environments**: 전체 선택 (Production, Preview, Development)
3. Vercel **Deployments** 탭에서 가장 최근 배포 **Redeploy** 실행

---

## 4. 시사점 및 주의사항

> [!WARNING]
> 이번의 Redis 연결 문제와 웹훅 알림 누락 문제 모두 **공통적으로 Vercel 환경변수 설정 누락**이 원인이었습니다.
> 로컬 환경(`.env.local`)에서 정상 동작하더라도, 배포 시에는 반드시 **사용되는 모든 환경변수 목록을 Vercel 대시보드에 동일하게 입력해야 함**을 주의해야 합니다.

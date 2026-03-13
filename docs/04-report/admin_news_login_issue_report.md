# /admin/news 로그인 실패 원인 보고서

작성일: 2026-03-12

## 요약
- `/admin/news`에서 비밀번호를 입력해도 실패하는 원인은 **비밀번호 불일치가 아니라 `/api/admin/news`가 500 에러로 실패**하기 때문입니다.
- `/api/admin/news`는 Redis 연결이 필수인데, **Vercel 환경변수에 Redis 설정이 누락**되어 있을 가능성이 높습니다.

## 증상
- `/admin/news` 로그인 시 “비밀번호가 올바르지 않습니다.”가 반복 표시됨
- 헤더 포함 테스트에서도 `/api/admin/news`가 **500 Internal Server Error** 반환

## 재현 방법
1. 브라우저 또는 curl로 `/api/admin/news`에 인증 헤더 포함 호출
   ```bash
   curl -i "https://www.damha.kr/api/admin/news" -H "x-admin-token: damha2026!"
   ```
2. 결과: `HTTP/1.1 500 Internal Server Error`

## 기대 동작
- 인증이 맞으면 `200 OK`와 뉴스 목록 JSON 반환
- 인증이 틀리면 `401 Unauthorized`와 `{ "error": "인증이 필요합니다." }` 반환

## 실제 동작
- 인증 헤더를 넣어도 `500 Internal Server Error`

## 원인 분석
- `/api/admin/news`는 내부에서 Redis를 사용합니다.
- Redis 설정이 없으면 서버가 런타임에서 예외를 발생시키고 500이 발생합니다.

관련 코드:
- `src/lib/redis.ts`
  ```ts
  export const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN!,
  });
  ```

즉, 아래 환경변수 중 **한 세트라도 누락되면 500**이 발생합니다.
- Upstash 사용 시:
  - `UPSTASH_REDIS_REST_URL`
  - `UPSTASH_REDIS_REST_TOKEN`
- Vercel KV 사용 시:
  - `KV_REST_API_URL`
  - `KV_REST_API_TOKEN`

## 참고 사항 (혼동 지점)
- `/admin/news` 로그인 실패 메시지는 **401(인증 실패)와 500(서버 오류)을 구분하지 않고 동일한 문구**를 보여줍니다.
- 따라서 실제 원인이 비밀번호가 아닐 가능성이 높습니다.

## 해결 방법
1. Vercel 프로젝트 환경변수에 Redis 값 등록
   - Upstash 사용 시:
     - `UPSTASH_REDIS_REST_URL`
     - `UPSTASH_REDIS_REST_TOKEN`
   - Vercel KV 사용 시:
     - `KV_REST_API_URL`
     - `KV_REST_API_TOKEN`
2. Vercel에서 **Redeploy**
3. 정상 확인:
   ```bash
   curl -i "https://www.damha.kr/api/admin/news" -H "x-admin-token: damha2026!"
   ```
   - `200 OK`이면 정상

## 추가 개선 제안
- `/admin/news` 로그인 실패 메시지를 아래처럼 분기 처리하여 원인 파악 가능하게 개선
  - 401 → “비밀번호가 올바르지 않습니다.”
  - 500 → “서버 오류로 로그인할 수 없습니다. 관리자에게 문의하세요.”


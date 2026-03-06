# Vercel 배포 계획 심층 검토 및 보완 계획서

> 검토 대상: `docs/01-plan/features/vercel_deployment_plan.md`  
> 검토 기준일: 2026-03-05  
> 목적: 최신 공식 문서 기준으로 사실 정확도 점검 + 수정/보완 실행안 제시

---

## 1) 최신 정보 반영 정확도 점검

| 항목 | 기존 계획서 내용 | 검증 결과 | 조치 |
|---|---|---|---|
| Vercel KV 상태 | deprecated, Upstash Redis 전환 | 정확 | 유지 |
| Redis 환경변수 | `UPSTASH_REDIS_REST_URL/TOKEN` | 정확 | 유지 |
| Upstash 무료 한도 | 일 10,000 요청, 256MB | **최신 문서와 불일치** (현재 500K commands/month, 256MB 표기) | **수정 필요(P0)** |
| Blob 서버 업로드 | sharp 후 `put()` 업로드 | 방향은 맞음 | 유지 |
| 업로드 용량 정책 | API 10MB 허용 | **Vercel 서버 업로드 제한(4.5MB)과 충돌** | **수정 필요(P0)** |
| 뉴스 API 캐시 | `revalidate=60`로 60초 ISR | **최신 Next 캐시 동작 기준으로 설명 부정확** (GET Route Handler 기본 uncached) | **수정 필요(P1)** |
| 도메인 DNS | CNAME `cname.vercel-dns.com` | **문서 예시와 불일치 가능** (`cname.vercel-dns-0.com` 예시) | **수정 필요(P1)** |
| 리전 설정 | `vercel.json`에 `regions: ["icn1"]` | 기술적으로 가능하나, 실행환경/함수 유형별 보완 설명 필요 | **보완 필요(P1)** |

---

## 2) 핵심 수정 권고 (우선순위)

## P0 (배포 실패/장애 방지)

1. 업로드 API 파일 제한을 `4MB` 수준으로 즉시 하향
- 이유: Vercel 서버 업로드 방식은 4.5MB 제한이 있어 현재 10MB 정책으로는 프로덕션에서 413/실패 가능.
- 반영 위치: `src/app/api/admin/upload/route.ts`의 `MAX_FILE_SIZE`.
- 문서 반영: Step 5/검증 체크리스트에 “4.5MB 제한 대응” 명시.

2. Upstash 무료 플랜 수치 최신화
- 이유: 운영 예상 트래픽 산정 근거가 구형 수치면 용량/비용 예측이 틀어짐.
- 문서 반영: 섹션 0, 5, 8의 무료 티어 설명 수정.

## P1 (운영 안정성/일관성)

1. Route Handler 캐시 설명 정정
- 기존: `export const revalidate = 60`만으로 60초 캐시.
- 보완: Next 최신 기준에서 GET Route Handler 기본 uncached. 캐시를 원하면 명시적 캐시 전략(정적화/태그 기반/헤더)을 설계해야 함.
- 문서 반영: Step 4에 “실제 캐시 정책 선택안” 추가.

2. DNS 레코드 안내를 “대시보드 기준값 우선”으로 교체
- 이유: 문서 예시 호스트는 시점에 따라 달라질 수 있음.
- 문서 반영: Step 6에 고정값 대신 “Vercel이 제시한 값 그대로 입력” 원칙 + 대표 예시 병기.

3. 리전 설정 설명 보완
- `regions`는 함수/런타임 구성에 따라 적용 방식이 달라질 수 있으므로, “서버리스 함수 기준”과 “Edge 런타임 시 preferredRegion”을 구분해서 문서화.

## P2 (품질 향상)

1. `next.config.ts` 이미지 허용 도메인 축소
- 현재 `hostname: '**'`는 과도하게 넓음.
- `*.public.blob.vercel-storage.com` + 필요한 내부 도메인만 허용 권장.

2. 데이터 동기화 전략 명시
- Admin CRUD 이후 목록 반영 지연을 방지하려면 캐시 미사용(`no-store`) 또는 명시적 revalidation 전략 중 하나를 문서에서 선택.

---

## 3) 보완된 실행 계획 (검토/승인용)

### Step A. 계획서 문구 업데이트 (문서 선반영)
- 무료 티어 수치 최신화.
- Blob 업로드 제한(4.5MB) 반영.
- 캐시 전략 문구 수정.
- DNS 레코드 “고정값” 표현 완화.

### Step B. 코드 선조치 (리스크 제거)
- `src/app/api/admin/upload/route.ts`
  - `MAX_FILE_SIZE` 10MB -> 4MB.
  - 에러 메시지에 Vercel 서버 제한 근거 반영.

### Step C. 캐시 정책 확정 (둘 중 하나)
1. 즉시 반영 우선: `/api/news` 응답을 uncached 유지 + 클라이언트 기본 fetch 유지.
2. 트래픽 절감 우선: 명시적 캐시 전략 도입(정적/태그 기반) + Admin 변경 시 무효화.

### Step D. 리전/도메인 운영 가이드 확정
- 리전: `icn1` 적용 범위(서버리스 vs Edge) 구분 문서화.
- 도메인: Vercel Domains 화면의 실제 레코드값을 단일 진실원천으로 지정.

### Step E. 배포 검증 강화
- 기존 체크리스트 + 아래 3개 추가:
  - 4.5MB 초과 이미지 업로드 실패가 의도대로 안내되는지.
  - Admin에서 뉴스 수정 후 메인 보드 반영 지연 여부.
  - 서울 외 지역 접속 시 뉴스 API 응답 지연(체감) 확인.

---

## 4) 계획서에 바로 반영할 문구 초안

1. Step 5(업로드)
- “Vercel 서버 업로드 제한(4.5MB)을 고려하여 업로드 상한을 4MB로 제한한다.”

2. Step 4(공개 뉴스 API)
- “Route Handler GET은 최신 Next 기준 기본 uncached 동작이므로, `revalidate=60` 단독 사용을 ISR 보장으로 간주하지 않는다. 캐시 정책은 별도 선택한다.”

3. Step 6(도메인)
- “DNS 값은 Vercel Domains 화면에서 제시한 값을 우선 사용한다. (문서 예시값은 시점별로 다를 수 있음)”

4. Step 0/5/8(플랜 비교/비용)
- “Upstash 무료 플랜 수치는 문서 작성 시점 기준으로 재확인 후 반영한다.”

---

## 5) 최종 권장 결론

- 현재 계획서는 방향성은 좋고(Upstash/Blob 전환), 핵심 아키텍처도 타당함.
- 다만 **업로드 용량 제한(4.5MB)** 과 **캐시 설명 정확성**은 배포 성공/운영 체감에 직접 영향이 있어 선수정이 필요.
- 위 P0/P1 반영 후 Step 2~8 구현으로 넘어가면 배포 리스크를 크게 줄일 수 있음.

---

## 6) 검증 근거 링크 (최신 공식 문서)

- Vercel KV deprecation / Upstash 이동: https://vercel.com/docs/storage/vercel-kv
- Vercel Redis (Upstash): https://vercel.com/docs/storage/vercel-redis
- Vercel Blob server upload 제한(4.5MB): https://vercel.com/docs/storage/vercel-blob/server-upload
- Vercel Domains DNS 설정: https://vercel.com/docs/domains/working-with-dns
- Vercel Functions region 설정: https://vercel.com/docs/functions/configuring-functions/region
- Vercel 지역 코드 목록(`icn1` 포함): https://vercel.com/docs/edge-network/regions#region-list
- Next.js Route Handlers 캐시 변경(최신): https://nextjs.org/docs/app/guides/upgrading/version-15#route-handlers
- Upstash Redis pricing: https://upstash.com/docs/redis/overall/pricing

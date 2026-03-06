# 클라이언트 아이콘 클라우드 (텍스트→이미지) 전환 — 구현 검토 보고서

> 작성일: 2026-03-06
> 검토 대상: `home-client-icon-cloud-image-refactor-report.md` 및 관련 소스 코드
> 검토 범위: 구현 정합성, 이미지 자산, 성능, 접근성, 데이터 품질

---

## 1. 검토 결과 요약

| 구분 | 상태 | 비고 |
|------|------|------|
| 타입 체크 (`tsc --noEmit`) | 통과 | 오류 없음 |
| 이미지 자산 (19장) | 전체 존재 | `자산 2.png` ~ `자산 20.png` 확인 |
| 데이터 매핑 | 정상 | `CLIENT_LOGOS` 19개 = 이미지 19장 일치 |
| 컴포넌트 연결 | 정상 | `PortfolioPreview` → `ClientIconCloud` → `CLIENT_LOGOS` |
| Hydration 방어 | 유지 | `mounted` state 패턴 |

**종합 판정**: 핵심 전환 작업은 정상 완료. 아래 7가지 항목에서 보완이 필요합니다.

---

## 2. 발견된 이슈

### P0 — 즉시 수정 권장

#### 2.1 CLIENT_LOGOS 이름이 모두 제네릭 (`Client 2`, `Client 3`, ...)

- **파일**: `src/data/clients.ts:42-46`
- **현상**:
  ```ts
  export const CLIENT_LOGOS: ClientLogo[] = Array.from({ length: 19 }, (_, i) => ({
      id: i + 2,
      name: `Client ${i + 2}`,  // ← 실제 병원명이 아님
      imagePath: `/assets/images/client/자산 ${i + 2}.png`
  }));
  ```
- **영향**:
  - `aria-label`에 "Client 2" 등 의미 없는 값 전달 → 접근성 무의미
  - `alt` 속성에도 "Client 2" → SEO/스크린리더에서 로고 식별 불가
  - 네이티브 툴팁(`tooltip: "native"`)에 "Client 2" 표시
- **제안**: 각 로고에 대응하는 실제 병원명 매핑 필요
  ```ts
  const CLIENT_LOGO_NAMES = [
      "일신기독병원", "센텀종합병원", "해동병원", ...
  ];
  export const CLIENT_LOGOS: ClientLogo[] = CLIENT_LOGO_NAMES.map((name, i) => ({
      id: i + 2,
      name,
      imagePath: `/assets/images/client/자산 ${i + 2}.png`
  }));
  ```

#### 2.2 FEATURED_CLIENTS 배열이 미사용 상태로 잔존

- **파일**: `src/data/clients.ts:16-34`
- **현상**: 기존 텍스트 클라우드용 `FEATURED_CLIENTS` 배열(45개 항목)이 어디서도 import되지 않음
- **영향**: Dead code (번들 크기에는 tree-shaking으로 영향 없으나, 유지보수 혼란)
- **제안**: 삭제하거나, `CLIENT_LOGOS` 이름 매핑 소스로 활용

---

### P1 — 품질 개선 권장

#### 2.3 `<img>` 태그 사용 — Next.js Image 미활용

- **파일**: `src/components/ui/client-icon-cloud.tsx:64-70`
- **현상**: HTML `<img>` 직접 사용 (Next.js `next/image` 미사용)
- **영향**:
  - 자동 WebP 변환, lazy loading, srcset 미적용
  - 19장 × 평균 8KB = 약 152KB 원본 PNG 로드
- **고려사항**: `react-icon-cloud` 캔버스 엔진이 `<img>` 태그의 `src`를 직접 읽으므로 `next/image`의 blur placeholder 등이 간섭할 수 있음
- **제안**:
  - `next/image` 호환 테스트 후 적용 가능하면 전환
  - 호환 불가 시, 이미지를 WebP로 사전 변환하여 용량 절감 (평균 60% 감소 기대)

#### 2.4 이미지 비율 편차가 큼

- **현상**: 원본 이미지 비율이 제각각
  | 파일 | 원본 크기 | 비율 |
  |------|----------|------|
  | 자산 3.png | 207×41 | 5.0:1 |
  | 자산 10.png | 395×112 | 3.5:1 |
  | 자산 12.png | 514×74 | 6.9:1 |
  | 자산 4.png | 179×64 | 2.8:1 |
- **영향**: `width={90} height={45}` (2:1 비율)로 고정 렌더링 시 일부 로고가 찌그러지거나 과도한 여백 발생
- **제안**: `object-fit: contain`이 이미 적용되어 있으므로 찌그러짐은 없으나, 캔버스 엔진이 `width/height` 속성을 박스 크기로 사용하면 비율별 여백 차이 발생. 실제 렌더링 결과를 육안 확인 필요

#### 2.5 로딩 상태 빈 화면

- **파일**: `src/components/ui/client-icon-cloud.tsx:76-78`
- **현상**: `mounted` 전까지 400px 빈 공간 표시
- **제안**: 로고 placeholder 또는 pulse 애니메이션 추가로 CLS 완화

---

### P2 — 선택적 개선

#### 2.6 파일명 한글 인코딩 리스크

- **현상**: 이미지 경로에 한글 포함 (`/assets/images/client/자산 2.png`)
- **영향**:
  - 브라우저 URL 인코딩: `자산` → `%EC%9E%90%EC%82%B0` (정상 동작하나 디버깅 시 가독성 저하)
  - 일부 CI/CD 파이프라인이나 CDN에서 한글 경로 처리 이슈 가능
  - Vercel 배포에서는 일반적으로 문제 없음
- **제안**: 장기적으로 `client-01.png` ~ `client-19.png` 등 영문 파일명으로 정규화 고려

#### 2.7 cloudProps 잔존 텍스트 설정

- **파일**: `src/components/ui/client-icon-cloud.tsx:31-32`
- **현상**: 이미지 클라우드로 전환했으나 텍스트 전용 설정이 남아있음
  ```ts
  textFont: "var(--font-pretendard), sans-serif",
  textColour: "#4b5563",
  ```
- **영향**: 이미지 모드에서는 실질적으로 미사용 (기능 문제 없음)
- **제안**: 혼동 방지를 위해 제거 또는 주석 표기

---

## 3. 보고서 원본 대비 사실 검증

| 보고서 기술 내용 | 실제 확인 | 일치 여부 |
|-----------------|----------|-----------|
| 19장 로고 이미지 매핑 | `자산 2.png`~`자산 20.png` 19장 존재 | 일치 |
| `ClientLogo` 타입 추가 | `id`, `name`, `imagePath` 필드 존재 | 일치 |
| `CLIENT_LOGOS` 데이터 구축 | `Array.from({ length: 19 })` 생성 | 일치 |
| 글래스모피즘 CSS 제거 | 인라인 스타일에서 `backdrop-filter`, `border` 등 제거됨 | 일치 |
| `imageScale: 2` → `1` 변경 | `cloudProps.options.imageScale: 1` | 일치 |
| `<img>` 태그에 `width={90}` `height={45}` 명시 | 코드 확인 | 일치 |
| `FEATURED_CLIENTS` 해지 | `PortfolioPreview`에서 `CLIENT_LOGOS` import으로 변경됨 | 일치 |
| 이미지 겹침 해결 | `imageScale` + 명시적 크기 부여 (코드상 확인, 렌더링 미확인) | 부분 일치 |
| 로고 이름 "실제 병원명 기반" | `name: "Client ${i+2}"` (제네릭 값) | **불일치** |

---

## 4. 권장 조치 요약

| 우선순위 | 항목 | 예상 작업량 |
|---------|------|-----------|
| P0 | CLIENT_LOGOS name에 실제 병원명 매핑 | 15분 |
| P0 | FEATURED_CLIENTS 미사용 배열 정리 | 2분 |
| P1 | 이미지 WebP 사전 변환 검토 | 20분 |
| P1 | 이미지 비율 편차 육안 확인 | 5분 |
| P1 | 로딩 Skeleton 추가 | 5분 |
| P2 | 파일명 영문 정규화 | 10분 |
| P2 | cloudProps 미사용 텍스트 설정 정리 | 2분 |

---

*본 보고서는 코드 리뷰 및 파일 시스템 검증 기반으로 작성되었습니다. 실제 브라우저 렌더링 결과(로고 겹침, 비율 왜곡 등)는 육안 확인이 필요합니다.*

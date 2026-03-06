# 홈 화면 3D 클라이언트 클라우드 — P0 수정 완료 보고서

> 작성일: 2026-03-06
> 근거 문서: `home-client-icon-cloud-review-report.md`
> 수정 범위: P0 (즉시 수정) 3건

---

## 1. 수정 내역

### 1.1 useTheme 제거 — light 모드 고정

| 항목 | 내용 |
|------|------|
| 파일 | `src/components/ui/client-icon-cloud.tsx` |
| 문제 | `next-themes`의 `useTheme()` 호출하나 `layout.tsx`에 `ThemeProvider` 미설정 → `theme` 값 항상 `undefined` |
| 조치 | `useTheme` import 및 호출 제거, 스타일 값을 light 모드로 고정 |
| 상세 변경 | `backgroundColor`, `border`, `color` 등 `theme === "dark"` 삼항 분기 → light 값 하드코딩 |

### 1.2 `<a href="#">` 접근성 보완

| 항목 | 내용 |
|------|------|
| 파일 | `src/components/ui/client-icon-cloud.tsx` |
| 문제 | 클라이언트 배지가 `<a href="#">`로 감싸져 스크린리더가 "링크"로 오인 |
| 조치 | `<a>` 태그 유지 (react-icon-cloud가 `<a>` 자식만 인식하는 제약) + 접근성 속성 추가 |
| 상세 변경 | `role="presentation"`, `aria-label={client}`, `cursor: "default"`, 아이콘에 `aria-hidden="true"` 추가 |
| 비고 | 최초 `<button>`으로 변경 시도했으나 react-icon-cloud가 `<a>` 태그만 파싱하여 클라우드 렌더링 불가 → `<a>` 복원 |

### 1.3 CTA 버튼 링크 수정

| 항목 | 내용 |
|------|------|
| 파일 | `src/components/home/PortfolioPreview.tsx` |
| 문제 | 버튼 텍스트 "성공 사례 확인하기" → 링크 대상 `/services` (불일치) |
| 조치 | `href="/services"` → `href="/portfolio"` 변경 |

---

## 2. 변경 파일 목록

| 파일 | 변경 유형 |
|------|----------|
| `src/components/ui/client-icon-cloud.tsx` | 수정 (import 정리, 스타일 고정, 접근성 보완) |
| `src/components/home/PortfolioPreview.tsx` | 수정 (CTA 링크 변경) |

---

## 3. 검증 결과

| 검증 항목 | 결과 |
|----------|------|
| `tsc --noEmit` 타입 체크 | 통과 (오류 없음) |
| 3D 클라우드 렌더링 | 정상 (react-icon-cloud `<a>` 제약 확인 후 복원) |
| CTA 버튼 동작 | `/portfolio` 페이지로 정상 이동 |

---

## 4. 미수정 항목 (P1/P2)

아래 항목은 이번 작업 범위에서 제외되었으며, 필요 시 별도 진행 가능합니다.

| 우선순위 | 항목 |
|---------|------|
| P1 | 모바일 클라우드 높이 조정 (min-h-[400px] 과도) |
| P1 | 마운트 전 Skeleton 로딩 상태 추가 |
| P2 | transition 인라인/className 이중 적용 정리 |
| P2 | 아이콘 배정 로직 의미 부여 (index % 3 순환) |
| P2 | cloudProps 미사용 설정 정리 (textColour 등) |

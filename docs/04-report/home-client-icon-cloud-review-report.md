# 홈 화면 3D 클라이언트 클라우드 — 구현 검토 보고서

> 작성일: 2026-03-06
> 검토 대상: `home-client-icon-cloud-redesign-report.md` 및 관련 소스 코드
> 검토 범위: 코드 품질, 접근성, 성능, 모바일 대응, SEO, UX 일관성

---

## 1. 검토 결과 요약

| 구분 | 상태 | 비고 |
|------|------|------|
| 타입 체크 (`tsc --noEmit`) | 통과 | 타입 오류 없음 |
| 의존성 설치 | 정상 | `react-icon-cloud`, `next-themes` 설치 확인 |
| Hydration 방어 | 구현됨 | `mounted` state 패턴 적용 |
| 데이터 연동 | 정상 | `FEATURED_CLIENTS` 22개 항목 |
| 애니메이션 | 정상 | Framer Motion stagger + fade-up |

**종합 판정**: 핵심 기능은 정상 동작하나, 아래 10가지 항목에서 보완이 필요합니다.

---

## 2. 발견된 이슈 (우선순위별)

### P0 — 즉시 수정 권장

#### 2.1 ThemeProvider 미설정

- **파일**: `src/app/layout.tsx`
- **현상**: `client-icon-cloud.tsx`에서 `useTheme()` 호출하지만, `layout.tsx`에 `ThemeProvider`가 감싸져 있지 않음
- **영향**: `theme` 값이 `undefined` 반환 → dark 모드 분기가 항상 light로 폴백
- **현재 동작**: 사이트가 light 모드 전용이므로 런타임 에러는 없으나, 불필요한 의존성 사용
- **제안**:
  - **(A)** 사이트가 light 전용이면 `useTheme()` 제거하고 light 스타일을 하드코딩
  - **(B)** 향후 다크 모드 지원 예정이면 `layout.tsx`에 `ThemeProvider` 추가

#### 2.2 `<a href="#">` 안티패턴

- **파일**: `src/components/ui/client-icon-cloud.tsx:58-59`
- **현상**: 클라이언트 배지를 `<a href="#">`로 감싸고 `preventDefault()` 처리
- **문제점**:
  - 스크린리더가 "링크"로 읽지만 실제 이동 없음 (시맨틱 오류)
  - 브라우저 히스토리에 `#` entry 추가 가능
  - SEO 크롤러 혼동
- **제안**: `<a>` → `<button type="button">` 또는 `<span role="presentation">`으로 변경
  - 단, `react-icon-cloud`가 내부적으로 `<a>` 태그를 요구하는지 확인 필요

#### 2.3 CTA 버튼 링크와 텍스트 불일치

- **파일**: `src/components/home/PortfolioPreview.tsx:60-61`
- **현상**: 버튼 텍스트 "성공 사례 확인하기" → 링크 대상 `/services`
- **문제점**: 사용자는 "성공 사례"를 클릭하면 포트폴리오를 기대하나, 서비스 페이지로 이동
- **제안**:
  - 링크를 `/portfolio`로 변경, 또는
  - 텍스트를 "서비스 알아보기"로 변경

---

### P1 — 품질 개선 권장

#### 2.4 접근성(A11y) 미비

- **파일**: `src/components/ui/client-icon-cloud.tsx`
- **문제점**:
  - 각 클라이언트 배지에 `aria-label` 없음
  - 아이콘(Plus, Building2, ArrowUpRight)에 `aria-hidden="true"` 미지정
  - 키보드 포커스 관리 없음 (3D 클라우드는 본질적으로 마우스 중심)
- **제안**:
  - 배지에 `aria-label={client}` 추가
  - 아이콘에 `aria-hidden="true"` 추가
  - 클라우드 컨테이너에 `role="region" aria-label="클라이언트 목록"` 추가

#### 2.5 모바일 반응형 보완

- **파일**: `src/components/home/PortfolioPreview.tsx:74,81`
- **문제점**:
  - 클라우드 컨테이너 `min-h-[400px]`이 소형 모바일에서 과도
  - `aspect-square` + `max-w-[600px]`이 좁은 화면에서 세로 공간 과점유
  - 클라이언트 배지 `fontSize: "16px"` 고정 — 클라우드 축소 시 비례 축소 안 됨
- **제안**:
  - 모바일: `min-h-[300px]` 또는 `min-h-[50vh]`로 조정
  - 컨테이너에 `sm:max-w-[400px]` 추가 고려

#### 2.6 로딩 상태 빈 화면

- **파일**: `src/components/ui/client-icon-cloud.tsx:84-86`
- **현상**: `mounted` 전까지 400px 높이의 빈 `<div>` 표시
- **문제점**: CLS(Cumulative Layout Shift) 지표 영향 + UX 저하
- **제안**: Skeleton 또는 subtle pulse 애니메이션 표시
  ```tsx
  if (!mounted) {
    return (
      <div className="... min-h-[400px] flex items-center justify-center">
        <div className="w-48 h-48 rounded-full border border-gray-200 animate-pulse" />
      </div>
    );
  }
  ```

---

### P2 — 선택적 개선

#### 2.7 인라인 스타일과 Tailwind 클래스 이중 적용

- **파일**: `src/components/ui/client-icon-cloud.tsx:73-75`
- **현상**: `style={{ transition: "all 0.3s ease" }}`와 `className="transition-all duration-300"` 동시 적용
- **영향**: 인라인이 우선 적용되어 Tailwind의 easing 함수가 무시됨 (기능적 문제 없으나 코드 혼란)
- **제안**: 인라인 `transition` 제거하고 Tailwind 클래스로 통일

#### 2.8 아이콘 배정 로직의 의미 부재

- **파일**: `src/components/ui/client-icon-cloud.tsx:53`
- **현상**: `index % 3`으로 Plus, Building2, ArrowUpRight 아이콘 순환 배정
- **문제점**: 아이콘과 클라이언트 업종 간 의미적 연관 없음 (장식적 사용)
- **제안**:
  - 모든 배지를 동일 아이콘(Building2)으로 통일, 또는
  - `clients.ts`에 카테고리 필드 추가하여 업종별 아이콘 매핑

#### 2.9 보고서 내 정보 정확성

- **보고서 2.3절**: "Python 스크립팅으로 PDF 데이터 추출" 기술 → 실제 Python 스크립트 파일 미확인
  - 프로젝트 내 Python 파일 없음. 수작업 입력인지 스크립팅인지 명확히 기재 필요
- **보고서 2.2절**: "다크/라이트 모드 지원" 기술 → 실제로는 ThemeProvider 미설정으로 동작하지 않음
  - 보고서 수정 또는 ThemeProvider 설정 필요

#### 2.10 `cloudProps` 설정 미세 조정

- **파일**: `src/components/ui/client-icon-cloud.tsx:8-36`
- **검토 항목**:
  - `imageScale: 2` — 배지 크기가 클 수 있음, 모바일에서 겹침 가능
  - `textColour: "#D60000"` — 주석에 "overridden by element styling" 명시되어 있으나 실제로 인라인 `color`가 `#1f1f1f`로 설정됨. 미사용 설정이면 제거 권장
  - `tooltip: "native"` — 네이티브 툴팁은 모바일에서 표시 안 됨

---

## 3. 보고서 원본 대비 사실 검증

| 보고서 기술 내용 | 실제 코드 확인 | 일치 여부 |
|-----------------|---------------|-----------|
| 메인 타이틀 카피 | `PortfolioPreview.tsx:48-49` 일치 | 일치 |
| Trusted By 롤링 삭제 | 코드에 롤링 컴포넌트 없음 | 일치 |
| Framer Motion stagger | `containerVariants.staggerChildren: 0.2` | 일치 |
| CTA 그라데이션 효과 | hover시 `via-white/10` 글로우 존재 | 일치 |
| 글래스모피즘 배지 | `backdropFilter: "blur(8px)"` + 반투명 bg | 일치 |
| `maxSpeed: 0.04` | `cloudProps.options.maxSpeed` | 일치 |
| 호버 시 레드 강조 | `hover:border-primary hover:text-primary` | 일치 |
| 다크/라이트 모드 전환 | `useTheme()` 존재하나 ThemeProvider 미설정 | **불일치** |
| Python 스크립팅 데이터 추출 | Python 스크립트 파일 미발견 | **미확인** |
| Hydration Error 방지 | `mounted` state 패턴 적용 | 일치 |
| 고객사 20여 개 | `FEATURED_CLIENTS` 22개 | 일치 |
| Console Error Free 검증 | 타입 체크 통과 (런타임 미확인) | 부분 일치 |

---

## 4. 권장 조치 요약

| 우선순위 | 항목 | 예상 작업량 |
|---------|------|-----------|
| P0 | ThemeProvider 설정 또는 useTheme 제거 | 10분 |
| P0 | `<a href="#">` → `<button>` 변경 | 5분 |
| P0 | CTA 링크/텍스트 일치시키기 | 2분 |
| P1 | ARIA 레이블 추가 | 10분 |
| P1 | 모바일 높이 조정 | 5분 |
| P1 | 로딩 Skeleton 추가 | 5분 |
| P2 | transition 이중 적용 정리 | 3분 |
| P2 | 아이콘 배정 로직 정리 | 5분 |
| P2 | 보고서 내 부정확한 기술 수정 | 5분 |
| P2 | cloudProps 미사용 설정 정리 | 3분 |

---

*본 보고서는 코드 리뷰 및 자동 분석 도구 기반으로 작성되었으며, 실기기 테스트(iOS Safari, Android Chrome)는 포함되지 않았습니다.*

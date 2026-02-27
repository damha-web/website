# 🚀 2-2단계: 고급 인터랙션 및 애니메이션 설계 (Interaction Plan)

사용자 요청에 따라 `Next.js App Router` 환경 내에서 최적화된 마이크로 인터랙션과 스무스 스크롤을 전역에 적용하기 위한 세부 계획서입니다. 성능 저하 및 돔(DOM) 충돌 방지에 초점을 맞춥니다.

---

## 🔍 기술 아키텍처 및 요구사항 패키지

- **패키지 설치 대상:** `lenis`(부드러운 스크롤), `gsap`, `@gsap/react`(스크롤/패럴랙스 애니메이션)
- **렌더링 정책:** 상호작용 관련 로직은 반드시 클라이언트 컴포넌트(`"use client"`)에서 처리하고, React의 생명주기에 맞게 Clean-up 로직을 구성.

---

## 🛠️ 섹션별 구현 계획

### 1. 전역 스무스 스크롤 (Lenis)

- **목표:** 네이티브 스크롤보다 부드럽고 가벼운 관성(Inertia)으로 즉각적인 감속 효과 부여.
- **적용 계획:**
  - `src/components/providers/SmoothScrollProvider.tsx` 루트 단위 컴포넌트를 제작.
  - `layout.tsx`에서 전체 앱을 감싸 전역(Global) 스크롤 제어.
  - 지나치게 무겁지 않은 설정값 제안: `lerp: 0.1`, `smoothWheel: true`, `duration: 1.2` 적용.

### 2. 스크롤 리빌 효과 (GSAP ScrollTrigger Reveal)

- **목표:** 뷰포트 하단 80% 지점에 도달 시 요소들이 아래에서 위로(y: 50 -> 0) 투명도를 가지며 등장(Opacity: 0 -> 1). Stagger 애니메이션 포함.
- **적용 계획:**
  - 재사용 가능한 `<FadeInStagger>` 래퍼 컴포넌트 제작.
  - 자식 요소들을 찾아 GSAP `stagger` 파라미터를 활용해 순차 등장(0.1 ~ 0.2초 간격) 적용.
  - **ScrollTrigger 설정:** `start: "top 80%"` 제어.

### 3. 패럴랙스(시차) 효과 (GSAP Parallax)

- **목표:** 스크롤 시 이미지가 미세하게 느리게 이동하여 공간감(Depth) 창출.
- **적용 계획:**
  - 메인 배너(`Hero.tsx`)와 기타 이미지 섹션이 될 곳의 오버레이 이미지에 백그라운드 Y값 보간 애니메이션 적용.
  - `ScrollTrigger`의 `scrub: true` 옵션을 사용해 마우스 휠 스크롤 양과 1:1로 부드럽게 연동되도록 세팅.

### 4. 마그네틱 버튼 호버 (GSAP + Math.lerp)

- **목표:** 마우스가 자석처럼 버튼을 미세하게 당기는 물리적 UX 구현(mousemove 기반).
- **적용 계획:**
  - `<MagneticButton>` 래퍼 컴포넌트 작성 방식 채택. (`.magnetic-btn` 대체)
  - 마우스 이벤트(`mousemove`, `mouseleave`)를 감지하여 버튼의 중심점과 마우스 커서의 거리를 측정(BoundingClientRect).
  - GSAP의 `quickTo`를 이용해 가볍게 x/y 좌표를 변환하거나 React State기반의 수동 Lerp 공식을 써서 부드러운 자력 당김 (x, y 각각 20px~30px 반경 이내) 구현.

### 5. 가벼운 CSS 호버 인터랙션 (텍스트/카드)

- **목표:** 텍스트 반전 및 부드러운 왼쪽-오른쪽 텍스트 밑줄 효과 구현.
- **적용 계획:**
  - Tailwind CSS `group`, `after:`, `before:` 가상 클래스(Pseudo-elements)를 적극 활용해 CSS만으로 처리하여 메인 스레드 연산 절약.
  - `transition-all duration-300 ease-in-out` 속성을 기본 베이스로 깔아둠.
  - 밑줄 효과는 `after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-primary group-hover:after:w-full after:transition-all after:duration-300 after:ease-in-out` 의 Tailwind 유틸리티 패턴(클래스 조합)으로 제작.

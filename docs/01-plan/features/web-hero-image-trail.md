# Web Hero Image Trail Integration Plan (PDCA) - V2

## 🎯 Objective
기존 `WebHero.tsx`에 존재하던 3D Carousel 애니메이션 요소를 **완전히 제거**하고, 사용자가 제공한 `ImageTrail` 코드를 핵심 비주얼로 삼아 영웅 영역(Hero Section)을 화면 중앙 타이포그래피와 백그라운드 인터랙션 중심으로 **전면 재구성**합니다.

---

## 📅 P (Plan) - 분석 및 설계

### 1. 기존 요소 제거 (Tear-down)
*   **기존 컴포넌트 삭제**: `WebHero.tsx` 내부의 `CarouselArea`, `CAROUSEL_IMAGES` 등 3D 캐러셀 관련 코드 전부 제거.
*   **상태 최소화**: 마우스 위치 회전(`mouseX`, `mouseY`, `rotationAngles` 등)에 사용되던 복잡한 로직 및 인터벌 상태 삭제.
*   **레이아웃 단순화**: 2단 분할(텍스트 영역 / 캐러셀 영역) 레이아웃 대신 화면 전체(`w-full h-screen`)를 통합된 캔버스로 사용하도록 구조 변경.

### 2. 신규 아키텍처 (Image Trail) 설계
*   **종속성**: `framer-motion` (기존 유지), `uuid` (신규: `npm i uuid @types/uuid`) 추가 필요.
*   **유틸리티 훅 추가**: `src/components/hooks/use-mouse-vector.ts` 훅 생성 (마우스 및 터치 위치 기반 궤적 벡터 계산용).
*   **기반 UI 컴포넌트 생성**: `src/components/ui/image-trail.tsx` 컴포넌트 생성. 

### 3. 영웅 영역(Hero Section) 재구축
*   **디자인 레이어 분리**:
    *   **Background (z-0)**: `ImageTrail` 컨테이너가 화면 전체를 채우도록 절대 배치(`absolute inset-0`). Unsplash 이미지 6종이 마우스 움직임에 따라 잔상을 남기며 나타남.
    *   **Foreground (z-10)**: 화면 정중앙에 시선을 사로잡는 대형 타이포그래피(예: "ALBUM" 혹은 "WEB INNOVATION")와 기존 브랜드 카피(신뢰, 혁신 등)를 배치. 
    *   텍스트는 `pointer-events-none` 혹은 배경 그라디언트 텍스트(`bg-clip-text text-transparent`)를 적용하여 배경 위에서도 잘 보이도록 세팅.

---

## 🚀 D (Do) - 실행 계획 세부 스텝
1.  **터미널 의존성 추가**: 
    ```bash
    npm install uuid
    npm install -D @types/uuid
    ```
2.  **공통 컴포넌트 및 Hook 생성**:
    *   `src/components/hooks/use-mouse-vector.ts` 코드를 붙여넣기 및 저장.
    *   `src/components/ui/image-trail.tsx` 코드를 생성 및 저장.
3.  **`WebHero.tsx` 전면 리팩토링**:
    *   기존의 3D 캐러셀 로직을 모두 지우고 `useRef`를 추가하여 통합 컨테이너 구현.
    *   `ImageTrailDemo` 컴포넌트의 레이아웃 패턴을 참고하되, 기존 섹션의 내용(기획부터 런칭까지 체계적 프로세스 등)이 어우러지도록 레이아웃 결합.
    *   Unsplash URL 6개를 활용하여 Tailwind의 `hover:scale-110`, `rounded-lg` 등으로 이미지 노드 스타일링.

---

## 🔍 C (Check) - 검증 전략
*   **타입/린트 에러 무결성**: 사용하지 않게 된 기존 캐러셀 관련 코드가 에러를 발생시키지 않는지 `npm run lint`로 체크.
*   **렌더링 충돌 테스트**: 전체 화면이 `h-screen overflow-hidden` 상태일 때 메인 페이지 네비게이션(GNB)이나 이후 섹션 스크롤에 지장을 주지 않는지 점검.
*   **모바일/데스크톱 인터랙션**: 마우스 이동(`mousemove`) 및 터치 스와이프(`touchmove`) 시 이미지가 매끄럽게 등장하고, 정해진 시간(`interval`, `duration`) 뒤 자연스레 축소/소멸(`scale: 0`) 되는지 프레임레이트(60fps) 확인.

---

## 🛠 A (Act) - 보완 및 개선
*   만약 마우스의 이동 궤적을 덮는 이미지가 과도하게 커서 텍스트를 가린다면 크기(현재 `w-24 h-24` 등)를 조금 축소하거나 알파값(Opacity)을 적용.
*   배경이 화이트(`bg-white`)일 경우 텍스트 혼동이 올 수 있으므로 프로젝트 테마(Grand Nature Theme / Glassmorphism)에 맞춰 컨테이너 배경색 미세 조정 가능성 고려.

# Web Hero Image Trail 작업 결과 보고서

## 📋 작업 개요
*   **작업 일시**: 2026-03-04
*   **작업 목적**: Web 페이지의 Hero 영역(최상단 비주얼 영역)에 기존 3D 캐러셀을 제거하고, 마우스/터치 모션에 반응하는 동적인 'Image Trail(이미지 잔상)' 효과를 통합하여 사용자 경험을 고도화함.
*   **관련 컴포넌트**: 
    - `src/components/web/WebHero.tsx`
    - `src/components/ui/image-trail.tsx` (신규)
    - `src/components/hooks/use-mouse-vector.ts` (신규)

---

## 👨‍💻 사용자의 주요 지시사항 (History)

1.  **초기 요구사항 (V1)**: 
    - 전달된 `ImageTrail` React 컴포넌트를 코드로 통합.
    - shadcn 프로젝트 구조(`components/ui`), Tailwind CSS, TypeScript 지원 유지. 
    - 계획안 우선 수립 후 검토 및 승인.
2.  **구조 전면 개편 (V2)**: 
    - 기존 3D 캐러셀 애니메이션을 완전히 삭제.
    - Hero 영역 전체를 재구성하여 화면 중앙 타이포그래피와 백그라운드 인터랙션(Image Trail)으로 전환.
3.  **데이터 및 가시성 개선 (V3)**: 
    - 잔상이 더 선명하게 보이도록 수정 (어두운 오버레이 제거).
    - Unsplash 샘플 이미지가 아닌, 실제 포트폴리오 썸네일(`WEB_PORTFOLIO`)을 무작위로 추출하여 노출되도록 구성.
4.  **UI 디테일 조정**:
    - 중앙 텍스트 컨테이너에 임시로 적용되었던 불투명 상자(Background Box) 스타일을 제거하여 궤적 이미지가 시원하게 보이도록 복원.

---

## 🛠 주요 작업 및 구현 내용

### 1. 의존성 및 유틸리티 구축
*   각 요소 독립적 ID 생성을 위해 `uuid` 패키지 설치 (`npm i uuid @types/uuid`).
*   마우스와 터치 이동 벡터 및 위치를 최적화하여 계산(60fps)하는 `useMouseVector` 커스텀 훅 개발.
*   Framer Motion의 `useAnimate` 및 `useAnimationFrame`을 사용하여 렌더링 성능을 극대화한 핵심 UI 컴포넌트 `<ImageTrail />` 구현. (React Hooks의 참조(ref) 관련 Linter 오류를 해결하기 위해 상태 `useState`로 재구성).

### 2. 컴포넌트 통합 및 리팩토링 (`WebHero.tsx`)
*   기존 2단(텍스트, 캐러셀) 구조와 상태(`rotationAngles`, `perspective` 등) 코드를 삭제하고, 전체 화면 크기 기준 싱글 컬럼 아키텍처로 리팩토링 완료.
*   Next.js `<Image />` 태그를 도입하여 동적으로 로드되는 프로젝트 썸네일 이미지 최적화.
*   **Hydration 방지 처리**: 서버 렌더링과 클라이언트 렌더링의 무작위 값(Math.random) 차이로 인해 오류가 나지 않도록 `useEffect` 내부에서 포트폴리오 배열을 섞어(Shuffle) 주입.

### 3. 스타일 최적화
*   어색한 어두운 그림자와 Dim 처리(`bg-secondary/30`, `mask-image-radial`)를 제거.
*   `z-0` 레이어에는 100% 밝기의 ImageTrail, `z-10` 레이어에는 Glow 효과와 Drop Shadow가 적용된 대형 영문 타이포그래피("WEB INNOVATION")와 메시지를 배치.

---

## ✅ 검증 (Check)
*   **Linter**: 전체 소스 코드 린트 통과 완료 (`npm run lint` Exit code 0).
*   **동작 테스트**: 브라우저상에서 마우스 커서 이동 및 간격(`interval`)에 따라 셔플된 포트폴리오 썸네일이 잔상을 남기고 정확히 소멸(`scale 0`)함을 확인.

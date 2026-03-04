# Web Hero Image Trail Integration Plan (PDCA) - V3

## 🎯 Objective
기존 구축된 Image Trail 효과를 더욱 **선명하고 강렬하게 개선**하며, 정적인 외부 샘플(Unsplash) 이미지를 제거하고 실제 프로젝트의 **웹 포트폴리오 썸네일 데이터**를 무작위로 호출하여 궤적으로 뿌려주는 형태로 고도화합니다.

---

## 📅 P (Plan) - 분석 및 설계

### 1. 포트폴리오 데이터 연동 (Data Integration)
*   **데이터 소스**: `@/data/web-portfolio` 내의 `WEB_PORTFOLIO` 배열(실제 프로젝트 썸네일) 활용.
*   **방식**: 단순 순차 렌더링이 아닌, 새로고침 시마다 혹은 렌더링 시점에 배열을 섞어(Shuffle) 다채로운 포트폴리오 이미지가 무작위(Random)로 나오도록 구성.
*   이미지의 일관된 렌더링을 위해 Next.js의 `<Image/>` 컴포넌트 혹은 일반 <img> 코드를 사용할 때 포트폴리오 썸네일 경로(`.thumbnail`)를 주입.

### 2. 가시성 및 선명도 개선 (Visibility Enhancement)
*   **현재 문제점**: 백그라운드 효과로 인해 이미지가 다소 어둡게 보이거나(Glow, Overlay 등에 가려짐) 크기, 지속 시간이 짧게 설정되어 있을 수 있음.
*   **개선 방안**:
    1.  **Overlay 조정**: 이미지를 덮고 있는 어두운 오버레이(`mask-image-radial`, `bg-secondary/30` 등)를 축소하거나 뒷배경(z-index)으로 확실히 분리하여, 이미지 본연의 밝기를 유지.
    2.  **크기 및 그림자**: 이미지 사이즈를 살짝 키우거나(`md:w-36 md:h-36`) 보더 굵기 조정. 그림자를 통해 텍스트와 분리감을 높임.
    3.  **애니메이션 지속 시간(Duration)**: `ImageTrail` 컴포넌트 내 `animationSequence`의 `duration` 값(현재 축소되는 애니메이션이 0.5초 등)을 더 길게 가져가거나, 잔상이 사라지는 템포를 약간 조절하여 눈에 띄게 변경 가능성 검토 (일단은 CSS 측면의 선명도 향상에 집중). 

---

## 🚀 D (Do) - 실행 계획 세부 스텝

1.  **`WebHero.tsx` 데이터 교체**:
    *   기존 정의된 `TRAIL_IMAGES` 상수 제거.
    *   `WEB_PORTFOLIO` 임포트 후 `useMemo`나 렌더 플로우 내에서 포트폴리오 데이터에서 `.thumbnail`만 추출하여 셔플된 배열을 만들도록 로직 작성:
        ```typescript
        const portfolioImages = WEB_PORTFOLIO.map(p => p.thumbnail)
                                             .sort(() => Math.random() - 0.5);
        ```
2.  **가시성(UI/UX) 조정**:
    *   이미지 컨테이너의 크기를 반응형에 맞춰 조금 더 키움.(`w-32 h-32` → `w-28 h-28 md:w-36 md:h-36` 최적화)
    *   `<img />` 대신 Next.js의 `<Image />` 최적화 혹은 로컬 이미지 로딩에 맞는 설정 적용 (기존 궤적용으로는 `<img/>`가 가벼울 수도 있으니 유지하되 퀄리티 유지).
    *   `absolute inset-0 bg-secondary/30 backdrop-blur-[2px]` 같은 딤(Dim) 처리 오버레이를 제거하거나, 텍스트 가독성은 확보하되 이미지에는 영향을 덜 주게 CSS 블러/그라디언트로 변경 (`text-center` 영역의 백그라운드 블러만 강화하는 등).

---

## 🔍 C (Check) - 검증 전략
*   **무작위 썸네일 확인**: 새로 궤적을 만들 때마다 다른/셔플된 포트폴리오(예: 고운빔, 교보 등) 이미지가 노출되는지 브라우저에서 확인.
*   **가시성 테스트**: 배경 텍스트("WEB INNOVATION")와 포트폴리오 이미지 간의 시각적 간섭(Contrast)을 점검하고, 이미지가 원래 색상대로 밝고 선명하게 뜨는지 확인.

---

## 🛠 A (Act) - 보완 및 개선
*   포트폴리오 이미지가 너무 선명해서 중앙 텍스트가 안 보일 경우, 중앙 텍스트 패널 주변에만 부드러운 뒷배경(Radial Gradient)을 깔아서 텍스트 가독성과 이미지 선명도의 밸런스를 잡을 계획.

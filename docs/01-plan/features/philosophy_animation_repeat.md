# Philosophy Section 반복 애니메이션 (Re-trigger) 구현 계획

## 1. 목적 및 개요
현재 `PhilosophySection`의 모든 등장 애니메이션(텍스트 리빌, 형광펜 하이라이트, 켄 번즈 확대 등)은 페이지 로드 후 처음 스크롤할 때 한 번(`once: true`)만 실행되도록 설정되어 있습니다.
사용자의 요청에 따라, **이 섹션으로 스크롤해서 돌아올 때마다 애니메이션이 다시 실행되어 생동감을 유지**하도록 Framer Motion의 `viewport` 설정을 전면 수정합니다.

## 2. 변경 대상 및 범위
**대상 파일:** `src/components/home/PhilosophySection.tsx`

섹션 내에 존재하는 모든 `motion` 컴포넌트의 가시성(in-view) 트리거 속성을 다음과 같이 변경합니다:
- 기존: `viewport={{ once: true }}` 또는 `viewport={{ once: true, margin: "-100px" }}` 등
- 변경: `viewport={{ once: false, amount: 0.2 }}` 
  *(화면에 요소가 20% 이상 보일 때마다 애니메이션 재실행, `once: false`를 통해 반복 트리거 활성화)*

### 구체적 수정 위치
1. **좌측 영역 (Hero Image & Overlay)**
   - 배경 이미지 켄 번즈 컨테이너 (`viewport={{ once: true, margin: "-100px" }}`)
   - "Why Damha Works" 알파벳 Stagger 컨테이너 (`viewport={{ once: true }}`)
   - "담하가 만드는 결정적 차이" Glow 텍스트 (`viewport={{ once: true }}`)
   - 하단 인용구 글래스모피즘 카드 (`viewport={{ once: true }}`)

2. **우측 영역 (Content & Accordion)**
   - "우리는 단순한 마케팅 대행사가 아닙니다" 타이틀 컨테이너 (`viewport={{ once: true }}`)
   - "브랜드 파트너" 형광펜 모션 (`viewport={{ once: true }}`)
   - 타이틀 하단 그라데이션 구분선 늘어나기 모션 (`viewport={{ once: true }}`)

## 3. 기대 효과 및 고려사항
- **몰입감 극대화**: 스크롤 업/다운을 통해 섹션에 재진입할 때마다 모든 시각 효과가 초기화되었다가 다시 재생되어 지속적인 생동감을 전달합니다.
- **성능 최적화**: 애니메이션 반복으로 인한 불필요한 퍼포먼스 저하를 방지하기 위해 `amount: 0.2`(또는 요소 크기에 맞는 적절한 가시 범위)를 적용하여 화면에 확실히 들어왔을 때만 렌더링되도록 조정합니다.

---
> **진행 대기:** 위 계획서를 검토하신 후 승인(OK)해 주시면, 바로 `PhilosophySection.tsx` 파일 내 `viewport` 속성들을 일괄 업데이트하여 수정 작업을 진행하겠습니다!

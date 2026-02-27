# Phase 3 Execution Plan (Visual & Content Polishing)

상태: 🏗️ 계획 중 (2026-02-25)

## 1. 목표와 범위
- 목표: 사이트 전반의 비주얼 인터랙션을 정교화하고, 브랜드 메시지를 강화하여 사용자 경험의 완성도를 높인다.
- 범위:
    1. **Text Reveal Animation**: 단어 또는 글자 단위로 나타나는 세련된 등장 효과.
    2. **Magnetic Button**: 마우스의 인력을 느끼게 하는 인터랙티브 CTA 버튼.
    3. **Cursor Enhancement**: `CanvasTrail` 기반 커서의 피드백 최적화.
    4. **Content Rewriting**: '담하'의 전문성을 강조하는 카피라이팅 적용.

## 2. 작업 분해 (WBS)

### Step 1 - Text Reveal Animation 구현
- `src/components/ui/text-reveal.tsx` (가칭) 컴포넌트 생성.
- Framer Motion의 `staggerChildren`과 `variants`를 활용하여 아래에서 위로(y: 20 -> 0) 올라오며 투명도가 조절되는 효과.
- Hero 섹션의 메인 슬로건 및 각 섹션 헤더에 적용.

### Step 2 - Magnetic Button Hover 적용
- `src/components/ui/magnetic-button.tsx` 생성.
- `MagneticCard`에서 사용한 로직을 버튼 규모에 맞게 조정 (stiffness, damping 최적화).
- GNB의 문의하기 버튼, Hero의 CTA 버튼 등에 일괄 적용.

### Step 3 - Custom Cursor (Canvas Trail) 개선
- `src/components/ui/canvas-trail-effect.tsx` 분석 및 개선.
- 링크 호버 시 커서 크기 확대 또는 색상 반전 효과 추가.
- 클릭 시 파동(Ripple) 효과 트리거 검토.

### Step 4 - 컨텐츠 리라이팅 및 최종 점검
- `PROJECT_BRIEF.md` 및 `DESIGN.md`를 참고하여 임시 텍스트를 실제 서비스 문구로 교체.
- 전체 섹션의 여백(Spacing) 및 타이포그래피 일관성 최종 검수.

---
계획이 승인되면 바로 Step 1부터 진행하겠습니다.

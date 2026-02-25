# Phase 2: 디자인 고도화 및 컨텐츠 리뉴얼 계획서

## 📋 현재 상태 분석

### ✅ 이미 구현된 요소 (Phase 1 완료)
1. **기본 아키텍처**
   - Next.js 14 + App Router
   - Tailwind CSS + Design Tokens
   - Framer Motion 애니메이션
   - 반응형 레이아웃

2. **구현된 섹션**
   - Hero (메인 비주얼 + 타이포그래피)
   - Products (3개 서비스 카드)
   - ShaderCallout (WebGL 효과)
   - PortfolioPreview (인터랙티브 아코디언)
   - TrustSection (교차 애니메이션)
   - FabContact (플로팅 버튼)

3. **구현된 효과**
   - Framer Motion 페이드/슬라이드 애니메이션
   - Hover 효과 (카드, 이미지)
   - Canvas Trail Effect (마우스 트레일)
   - 기본 parallax (배경 이미지 fixed)

---

## 🎯 참조 사이트 분석 (ThinkCreative 기준)

### 적용할 주요 디자인 요소

#### 1. **스크롤 기반 인터랙션**
- **Fixed Parallax Sections**: 섹션 전환 시 배경/이미지가 고정되고 텍스트만 이동
- **Scroll-triggered Animations**: 스크롤 진행도에 따라 요소가 점진적으로 나타남
- **Layered Depth Effect**: 여러 레이어가 다른 속도로 움직이는 깊이감

#### 2. **이미지 배치 전략**
- **Split Screen Layout**: 좌측 고정 이미지 + 우측 스크롤 텍스트
- **Image Mask Effects**: 원형, 불규칙한 모양의 마스크 적용
- **Grid with Asymmetry**: 비대칭 그리드 레이아웃으로 시각적 리듬 생성
- **Overlay Text on Image**: 이미지 위에 큰 타이포그래피 오버레이

#### 3. **텍스트 효과**
- **Gradual Reveal**: 문장이 단어/글자 단위로 순차 등장
- **Text Morphing**: 텍스트가 변형/교체되는 애니메이션
- **Stroke to Fill**: 아웃라인에서 채워지는 타이포그래피
- **Scale on Scroll**: 스크롤에 따라 텍스트 크기 변화

#### 4. **호버 & 마우스오버 효과**
- **Magnetic Hover**: 마우스를 따라 요소가 끌려오는 효과
- **Image Zoom + Pan**: 호버 시 이미지 확대 + 미세 이동
- **Color Transition**: 호버 시 그라데이션 색상 전환
- **Cursor Trail**: 커스텀 커서 + 트레일 효과 (이미 구현됨)

#### 5. **섹션 전환 효과**
- **Slide In/Out**: 섹션이 슬라이드로 등장/퇴장
- **Opacity Fade with Scale**: 페이드 + 스케일 조합
- **Clip Path Reveal**: 클립 패스로 영역이 확장되며 나타남

---

## 🎨 컨텐츠 방향성 (참조 사이트 메시지 분석)

### ThinkCreative 메시지 구조
- "생각이 만드는 창의적 솔루션"
- 문제 해결 중심의 스토리텔링
- 클라이언트 성공 사례 강조

### Yourplan 메시지 구조
- "당신의 계획을 현실로"
- 고객 관점의 공감 메시지
- 단계별 프로세스 시각화

### Brandio 메시지 구조
- "브랜드의 본질적 가치 발견"
- 철학적이고 깊이 있는 톤
- 브랜딩 전문성 강조

### 담하에 적용할 메시지 전략
```
기존: "BEYOND THE HOSPITAL MARKETING"
→ 유지하되, 섹션별 세부 메시지 강화

추가할 스토리텔링 포인트:
1. 병원 마케팅의 본질 (Why)
2. 담하만의 차별화된 접근법 (How)
3. 실제 성과와 변화 (Result)
4. 10년 노하우의 구체적 근거 (Trust)
```

---

## 🚀 Phase 2 구현 계획

### Priority 1: 스크롤 인터랙션 고도화 ⭐⭐⭐⭐⭐

#### Task 1-1: Scroll-triggered Progressive Animations
- **라이브러리**: `framer-motion` + `useScroll` hook
- **적용 섹션**:
  - Hero: 타이틀이 스크롤 진행도에 따라 opacity + scale 변화
  - Products: 각 카드가 순차적으로 clip-path reveal
  - TrustSection: 숫자 카운트업 애니메이션 (스크롤 진입 시)

#### Task 1-2: Fixed Parallax Section (Split Layout)
- **새 섹션 추가**: "Our Philosophy" 또는 "Why Damha"
- **레이아웃**:
  - 좌측 50%: 고정된 대형 이미지 (position: sticky)
  - 우측 50%: 스크롤되는 텍스트 컨텐츠 (3-4개 파트)
- **효과**: 우측 스크롤 시 좌측 이미지가 opacity/blur 변화

#### Task 1-3: Layered Depth Parallax (Hero 개선)
- **현재**: 단순 fixed background
- **개선**:
  - 배경 레이어 (0.2x 속도)
  - 메시 데코 레이어 (0.5x 속도)
  - 메인 이미지 레이어 (0.7x 속도)
  - 텍스트 레이어 (1.0x 속도)

---

### Priority 2: 이미지 & 레이아웃 고도화 ⭐⭐⭐⭐

#### Task 2-1: Portfolio Grid 개선
- **현재**: Interactive Accordion (가로 확장)
- **추가**:
  - 비대칭 그리드 뷰 옵션 (Masonry Layout)
  - 호버 시 이미지 Zoom + Color Overlay 전환
  - "View Project" 버튼이 magnetic hover 효과로 등장

#### Task 2-2: Case Study Detail Page (신규)
- **레이아웃**:
  - Full-width Hero Image + Overlay Title
  - Split Content (좌: 프로젝트 정보 / 우: 상세 설명)
  - Image Gallery (Grid + Lightbox)
  - Next/Prev Project Navigation

#### Task 2-3: Image Mask Effects
- **적용 위치**:
  - Hero 이미지: 현재 rounded-t-full → 더 독특한 SVG mask
  - Trust Section: 작은 이미지들에 다양한 geometric mask

---

### Priority 3: 텍스트 효과 강화 ⭐⭐⭐⭐

#### Task 3-1: Text Reveal Animation
- **라이브러리**: `framer-motion` custom variants
- **적용**:
  - Hero 타이틀: 단어별 순차 등장 (0.1s delay)
  - 섹션 헤딩: 라인별 slide-up + fade-in

#### Task 3-2: Animated Counter (숫자 효과)
- **적용 섹션**: Trust Section
- **데이터**:
  - "10+ 년 경력"
  - "200+ 프로젝트"
  - "98% 고객 만족도"
- **효과**: 0부터 목표 숫자까지 카운트업 (스크롤 진입 시)

#### Task 3-3: Text Gradient + Stroke Effect
- **적용**:
  - Hero 서브타이틀: 그라데이션 텍스트
  - CTA 버튼: 호버 시 stroke → fill 전환

---

### Priority 4: 호버 & 인터랙션 디테일 ⭐⭐⭐

#### Task 4-1: Magnetic Button Hover
- **적용**:
  - 모든 CTA 버튼
  - Portfolio 카드
- **효과**: 마우스 위치에 따라 요소가 미세하게 따라옴 (±10px)

#### Task 4-2: Custom Cursor Enhancement
- **현재**: Canvas Trail (이미 구현)
- **추가**:
  - 호버 가능한 요소에서 커서 변형 (확대/색상 변경)
  - 드래그 가능한 영역에서 "Drag" 텍스트 표시

#### Task 4-3: Card Interaction Refinement
- **Products 카드**:
  - 호버 시 배경 그라데이션 애니메이션
  - 아이콘 rotate + scale 효과
  - 테두리 gradient border 추가

---

### Priority 5: 컨텐츠 & 카피라이팅 개선 ⭐⭐⭐

#### Task 5-1: Hero 섹션 메시지 강화
```
현재:
"넘쳐나는 마케팅 속에서 단순한 광고를 쫓지 않습니다.
원장님의 철학과 가치를 환자의 마음에 정확히 닿게 하는 것,
그것이 담하가 만드는 프리미엄의 본질입니다."

개선 방향:
→ 더 임팩트 있고 간결하게
→ 문제 제기 + 솔루션 구조
→ 감성적이면서 전문적인 톤
```

#### Task 5-2: 새로운 섹션 추가: "Why Damha Works"
- **구조**:
  1. 문제 인식 ("대부분의 병원 마케팅이 실패하는 이유")
  2. 담하의 접근법 ("우리는 다르게 생각합니다")
  3. 구체적 프로세스 (3단계 시각화)
  4. 결과 증명 (수치 + 사례)

#### Task 5-3: Trust Section 컨텐츠 확장
- **추가 요소**:
  - 주요 클라이언트 로고 (스크롤 애니메이션)
  - 간단한 추천사 슬라이더
  - 수상/인증 배지

---

## 📊 구현 우선순위 및 예상 시간

| Priority | Task | 예상 시간 | 기술 난이도 |
|----------|------|-----------|-------------|
| 1 | Scroll-triggered Animations | 4-6h | ⭐⭐⭐ |
| 1 | Fixed Parallax Section | 3-4h | ⭐⭐⭐⭐ |
| 2 | Portfolio Grid 개선 | 3-4h | ⭐⭐⭐ |
| 2 | Case Study Detail Page | 5-6h | ⭐⭐⭐⭐ |
| 3 | Text Reveal Animation | 2-3h | ⭐⭐ |
| 3 | Animated Counter | 2h | ⭐⭐ |
| 4 | Magnetic Hover | 3h | ⭐⭐⭐ |
| 4 | Custom Cursor Enhancement | 2h | ⭐⭐ |
| 5 | 컨텐츠 리라이팅 | 4-5h | ⭐ (기획) |
| 5 | 새 섹션 추가 | 6-8h | ⭐⭐⭐ |

**총 예상 시간**: 34-41시간

---

## 🎬 실행 로드맵

### Week 1: 스크롤 인터랙션 고도화
- [ ] Day 1-2: Scroll-triggered Animations 구현
- [ ] Day 3-4: Fixed Parallax Section 개발
- [ ] Day 5: Layered Depth Parallax 적용

### Week 2: 비주얼 & 레이아웃 강화
- [ ] Day 1-2: Portfolio Grid 개선
- [ ] Day 3-4: Case Study Detail Page 구축
- [ ] Day 5: Image Mask Effects 적용

### Week 3: 인터랙션 디테일 & 컨텐츠
- [ ] Day 1: Text Reveal + Counter 애니메이션
- [ ] Day 2: Magnetic Hover + Cursor 개선
- [ ] Day 3-4: 컨텐츠 리라이팅 및 새 섹션 추가
- [ ] Day 5: 전체 QA 및 성능 최적화

---

## 🛠️ 기술 스택 추가 필요

```json
{
  "dependencies": {
    "react-intersection-observer": "^9.x", // 스크롤 감지 최적화
    "yet-another-react-lightbox": "^3.x", // 이미지 라이트박스
    "react-countup": "^6.x" // 숫자 카운트업
  }
}
```

---

## 📝 참고 리소스

1. **Framer Motion Scroll Animations**: https://www.framer.com/motion/scroll-animations/
2. **Parallax Best Practices**: https://web.dev/parallax/
3. **Magnetic Hover Effect**: Custom implementation with `useRef` + `mousemove`
4. **Text Reveal Techniques**: Split text into spans + stagger animation

---

**작성일**: 2026-02-25
**버전**: 2.0
**상태**: 계획 단계 → 사용자 승인 대기

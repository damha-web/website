# Design: Week 3 Visual & Content Polishing

- **ID**: `week3-polishing`
- **Status**: `Designing`
- **Created**: 2026-02-25
- **Reference Plan**: `docs/01-plan/features/week3-polishing.plan.md`

## 1. Technical Architecture

### 1.1 Text Reveal Animation (`src/components/ui/text-reveal.tsx`)
- **Library**: `framer-motion`
- **Logic**:
  - Split text into words (or characters).
  - Use `variants` for animation:
    ```typescript
    const container = {
      hidden: { opacity: 0 },
      visible: (i = 1) => ({
        opacity: 1,
        transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
      }),
    };
    const child = {
      visible: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", damping: 12, stiffness: 100 },
      },
      hidden: { opacity: 0, y: 20 },
    };
    ```
- **Usage**: `<TextReveal text="DAMHA Creative" />`

### 1.2 Magnetic Button (`src/components/ui/magnetic-button.tsx`)
- **Logic**: Similar to `MagneticCard` but with tighter constraints.
- **Physics**:
  - `stiffness`: 150 (Fast response)
  - `damping`: 15 (Smooth stop)
  - `distance`: Max 20px translation.
- **Component Wrapper**: Wraps any `button` or `Link`.

### 1.3 Custom Cursor Enhancement (`src/components/ui/canvas-trail-effect.tsx`)
- **Feedback**:
  - **Hover**: Increase circle size, change color to `primary`.
  - **Click**: Trigger a "ripple" effect in the canvas.
  - **Global Context**: Use a custom hook or global state to track hover status of interactive elements.

### 1.4 Enhanced Search UI (`src/components/home/Hero.tsx`)
- **Data Source**: Expand `SERVICE_CARDS` and add a `SEARCH_KEYWORDS` index.
- **Filtering Logic**: 
  - Fuzzy search on title, tags, and description.
  - Category-based filtering via hashtags.
- **UI/UX**:
  - Result dropdown with category icons and short summaries.
  - "No result" view with "Recommended Keywords" (from PDF).
  - Smooth expansion animation using `AnimatePresence`.

## 2. Content Strategy

### 2.1 PDF Content Mapping
- **About Page**:
  - Company Info: `48 정규직`, `131+ 병원 레퍼런스`, `10년 노하우`.
  - Certifications: `특허 (홈페이지 제작 시스템)`, `ISO 9001/14001`, `기업부설연구소`.
  - Organization Chart: Visual representation of `마케팅부`, `웹제작부`, `브랜드전략부`.
- **Services Page**:
  - MOT (Moment of Truth) based branding journey.
  - Specific services: `개원 컨설팅`, `손해사정`, `오프라인 광고 (버스/택배)`.
- **Hero Section**:
  - Keywords: `#병원마케팅`, `#개원컨설팅`, `#브랜딩`, `#홈페이지제작`.

### 2.2 Tone of Voice
- Professional, Trustworthy, Innovative.
- Mix of high-end English keywords (Montserrat font) and clear Korean explanations (Pretendard font).

## 3. Implementation Steps
1. **Core UI Components**: Implement `TextReveal` and `MagneticButton`.
2. **Integration**: Apply components to existing sections.
3. **Cursor Logic**: Update `canvas-trail-effect.tsx` with interaction states.
4. **Copywriting**: Finalize text content based on `DESIGN.md`.

## 4. Verification Plan
- **Performance**: Monitor FPS during text reveal animations.
- **UX**: Check if magnetic effect feels natural across different screen sizes.
- **Responsiveness**: Ensure animations don't break on mobile.

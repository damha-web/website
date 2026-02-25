# Phase 2 Execution Plan (Damha Portfolio)

✅ **상태: 구현 완료 (2026-02-23)**

이 문서는 `IMPLEMENTATION_PLAN.md`의 Phase 2를 실제 개발 작업으로 실행하기 위한 상세 계획서입니다.

## 1. 목표와 범위

- 목표: 에이전시의 핵심 역량을 입증할 수 있는 직관적이고 시각적인 포트폴리오 탐색 시스템 및 상세 페이지(케이스 스터디)를 완성한다.
- 범위(고정):

1. **Portfolio Index (`/portfolio`)**: 카테고리 필터링이 가능한 동적 애니메이션 그리드 갤러리 구현.
2. **Portfolio Case Study (`/portfolio/[slug]`)**: 프로젝트별 개별 상세 페이지 스토리텔링 템플릿 구현.

## 2. 작업 분해 (WBS)

### Step 1 - Portfolio Index 페이지 구현

- **상단 Hero 영역**: 페이지 타이틀("Works" 또는 "Portfolio") 및 소개 문구 컴포넌트 추가.
- **카테고리 필터링 바**: `All`, `Branding`, `Marketing`, `Consulting`, `Website` 등 분류 기준 탭 버튼 구현.
- **Framer Motion 적용**: 필터링 클릭 시 썸네일 그리드가 자연스럽게 정렬되는 레이아웃 애니메이션 (`AnimatePresence`, `layout` prop 활용).
- **썸네일 카드 디자인**: 마우스 호버 시 프로젝트 카테고리, 제목, 스니펫 등이 드러나는 오버레이 호버 이펙트 추가.

### Step 2 - Portfolio 상세 페이지 (Case Study) 템플릿 구현

- **Dynamic Routing**: `src/app/portfolio/[slug]/page.tsx` 라우트 생성.
- **상세 Hero 영역**: 프로젝트 대표 이미지 혹은 비디오가 꽉 찬 배경으로 들어가며 패럴랙스(Parallax) 효과 부여.
- **Info 섹션**: Client, Period, Scope (참여 범위) 등 핵심 정보 테이블 노출.
- **Storytelling 섹션**: '배경 및 목표(Background & Goal) → 전략 및 실행(Strategy & Execution) → 결과(Outcome)' 구조의 레이아웃 배포.
- **Gallery**: 상세 컷들을 보여줄 수 있는 하단 이미지 갤러리 또는 슬라이드 적용.

### Step 3 - 더미 데이터 (Mock) 확장

- `src/lib/portfolio-preview.ts`를 확장하여, 인덱스 페이지뿐 아니라 상세 페이지에서도 사용할 수 있는 상세 정보 배열(가짜 데이터) 작성.
  - 예: `background`, `strategy`, `results`, `detailImages[]` 필드 추가.

### Step 4 - 반응형 점검 및 디테일 최적화

- 필터 탭이 모바일 화면을 넘어갈 경우 x축 스크롤(scroll-x) 등 적용.
- 상세페이지의 텍스트 대비(Contrast)가 배경 사진 위에서도 잘 보이도록 오버레이 처리.
- `/portfolio` 주소와 GNB 네비게이션 간의 엑티브 상태 동기화 처리(`Header.tsx`).

## 3. 리스크와 대응

1. 리스크: 모션(AnimatePresence) 적용 시 레이아웃 깨짐 현상.
   대응: Grid에 `layout="position"` 속성을 적절히 배치하고 빠져나가는(exit) 컴포넌트에 `absolute` 속성 가변 적용.

---

상세 구현 전략이 확정되었습니다! 이제 이 순서대로 개발을 진행합니다.

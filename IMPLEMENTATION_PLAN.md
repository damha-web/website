# 📋 Damha Website Renewal Implementation Plan

본 문서는 `PROJECT_BRIEF.md`를 바탕으로 한 담하 웹사이트 리뉴얼의 단계별 개발 로드맵입니다.

---

## 🚀 Phase 1: Main Page & Hero Experience (UI/UX 완성)

**목표:** 사이트 접속 시 가장 먼저 마주하는 홈 화면을 프리미엄급으로 구현.

- [x] **Hero Section 고도화:** `Framer Motion`을 활용하여 텍스트 및 배경 요소에 세련된 등장 애니메이션 적용.
- [x] **Products Section:** 브랜딩/마케팅/컨설팅 3대 서비스를 시각화한 카드 및 인터랙션 구현.
- [x] **Portfolio Preview:** 가로 스크롤 또는 Swiper.js를 활용한 최신 작업물 노출 영역 제작.
- [x] **Strength/Trust Section:** 10년 경력을 강조하는 지표(숫자 카운팅 애니메이션 등) 및 신뢰감 있는 섹션 배치.
- [x] **Floating Action Button (FAB):** 카카오톡/전화상담으로 연결되는 고정 버튼 구현.

## 📁 Phase 2: Dynamic Portfolio System (핵심 기능)

**목표:** 에이전시의 자산인 포트폴리오를 효과적으로 탐색하고 상세 정보를 제공.

- [ ] **Portfolio Index (`/portfolio`):**
  - 카테고리 필터링 기능 (Website, Marketing, Design 등).
  - 썸네일 호버 시 상세 정보가 나타나는 세련된 그리드 레이아웃.
- [ ] **Case Study Template (`/portfolio/[slug]`):**
  - 단순 이미지 나열이 아닌 'Client Info → 목표 → 과정 → 결과' 구조의 스토리텔링 컴포넌트화.
  - 프로젝트별 이미지 갤러리/슬라이더 구현.

## 🏢 Phase 3: Brand Identity & Services (신뢰 구축)

**목표:** 담하의 전문성과 프로세스를 심도 있게 설명.

- [ ] **About Page (`/about`):** 연혁, 팀 소개, 비전 등을 담은 정적인 페이지 구현.
- [ ] **Services Page (`/services`):** 서비스별 상세 프로세스(Step 1, 2, 3...) 및 정적 사이트 최적화(SSG)를 위한 컨텐츠 구성.

## 🛠️ Phase 4: Optimization & Interaction Detail (폴리싱)

**목표:** 웹사이트의 완성도를 결정짓는 디테일 작업.

- [ ] **SEO 최적화:** 각 페이지별 메타 태그, JSON-LD 스키마 데이터 적용.
- [ ] **반응형 디테일:** 모든 섹션에 대해 태블릿/모바일 가독성 재점검.
- [ ] **Micro-animations:** 스크롤 시 요소들이 자연스럽게 나타나는 `scroll-reveal` 효과 전역 적용.
- [ ] **Performance:** 이미지 최적화 (`next/image`) 및 WebP 변환 점검.

## 🚢 Phase 5: Final QA & Deployment

**목표:** 최종 검수 및 안정적인 런칭.

- [ ] **Vercel Deployment:** 배포 환경 설정 및 환경 변수 점검.
- [ ] **Cross-browser Testing:** Chrome, Safari, 모바일 브라우저 호환성 검사.
- [ ] **Final Bug Fix:** 사용자 피드백 반영 및 최종 수정.

---
**💡 다음 작업 추천:** 가장 가독성이 높고 효과가 큰 **Phase 1: Hero Section 고도화 및 Home 화면 섹션 구현**부터 시작하는 것을 추천드립니다.

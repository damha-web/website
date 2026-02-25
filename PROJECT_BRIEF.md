# 📂 Damha Website Renewal - Master Project Brief

**이 문서는 이전 리서치 프로젝트에서 생성된 마스터 지시서입니다.**
**새로운 AI 에이전트는 웹사이트 개발/디자인을 시작하기 전 반드시 이 문서를 최우선으로 숙지하고 작업의 절대적인 기준으로 삼으십시오.**

---

## 🏢 1. 프로젝트 개요 (Project Context)

- **클라이언트:** 주식회사 담하 (<https://damha.co.kr>)
- **업종:** 실무자 중심 전문 마케팅 에이전시 (B2B)
- **핵심 서비스:** 브랜딩(BRANDING), 마케팅(MARKETING), 경영컨설팅(CONSULTING)
- **핵심 차별점:** **의료 현장 실무 경험(간호사, 상담실장 등)을 갖춘 전문가 집단**이 주도하는 실전형 마케팅
- **성격:** 세련되고 전문적인 포트폴리오 쇼케이스 + 현장 이해도가 높은 프리미엄 에이전시 웹사이트
- **주요 목표:** 병원 마케팅을 넘어선 '전략 마케팅'의 본질 강조, 현장 경험 기반의 신뢰감 구축, SEO 극대화, 모바일/PC 반응형 최적화

## 💻 2. 기술 스택 목표 (Target Tech Stack)

이 프로젝트는 다음의 모던 웹 스택을 표준으로 사용합니다. 개발 시 반드시 준수하십시오.

- **Framework:** Next.js 14+ (App Router 권장) / 정적 사이트 웹 성능 최적화(SSG)
- **Styling:** Tailwind CSS (Global CSS 변수를 적극 활용한 유틸리티 클래스 설계)
- **Animation:** Framer Motion (기존 GSAP/AOS 대체, React 생태계 최적화)
- **Components:** `bkit` 스타일 표준 지침 준수 (필요시 Shadcn/UI의 베이스 디자인 차용)
- **Deployment:** Vercel 배포 최적화

## 🎨 3. 디자인 시스템 (Design System)

### 3.1. 컬러 팔레트 (Tailwind `theme.extend.colors` 설정 필수)

구조적이고 일관된 브랜드 아이덴티티를 위해 아래 색상을 변수로 등록합니다.

- **`primary`:** `#E47B41` (따뜻한 오렌지 — 브랜드 메인, CTA 버튼 등 시선 집중)
- **`secondary`:** `#091F5B` (다크 네이비 — 헤더, 주요 제목, 신뢰감 부여 섹션)
- **`accent`:** `#EB6C4B` (코랄 톤 — hover 애니메이션, 하이라이트)
- **`surface-light`:** `#FAFDFF` (가장 밝은 기본 배경)
- **`surface-alt`:** `#F2FAFF` (섹션 교대 시 시각적 분리를 위한 옅은 하늘색 바탕)
- **`text-main`:** `#222222` (본문 가독성 최대화)
- **`text-sub`:** `#666666` (보조 설명 텍스트)

### 3.2. 타이포그래피 (Typography)

- **기본 한글 글꼴:** `var(--font-pretendard)` (웹 폰트로 로테이션 적용, 전역 가독성)
- **포인트 영문 글꼴:** `var(--font-montserrat)` (섹션 헤딩, 네비게이션 영문 텍스트 등)

## 🗺️ 4. 사이트 아키텍처 (Information Architecture)

기존 단일 페이지(One-page)의 한계를 넘어 SEO 확장을 위한 **멀티페이지 라우팅 구조**를 설정합니다.

1. **`/` (Home):**
   - Hero: 시선을 사로잡는 마이크로 애니메이션과 강렬한 타이틀 배치
   - Products: 3대 핵심 사업(브랜딩/마케팅/컨설팅) 아이콘 형태 요약
   - Portfolio: Swiper 갤러리 또는 가로 스크롤 방식의 최신 작업물 노출 (다이나믹 요소)
   - Trust/Strength: 10년 경력의 병원 전문 에이전시 강점 부각
   - Call to Action: 하단 고정 카톡/전화상담 배너 연결

2. **`/portfolio` (포트폴리오 인덱스):**
   - URL Params 기반 카테고리 필터링 (`?category=website|marketing|design|logo`)
   - 썸네일과 프로젝트명이 나타나는 세련된 그리드 레이아웃 (Hover 효과 필수)

3. **`/portfolio/[slug]` (업데이트된 포트폴리오 상세):**
   - 기존의 단순 이미지 위젯 탈피 → **Case Study** 형태 컴포넌트화 도입
   - 구조: Client Info → Challenge(목표) → Process(과정) → Visual Result(이미지 출력)

4. **`/about` 및 `/services`:**
   - 회사의 연혁, 팀 소개 및 병원 특화 마케팅 프로세스의 심도 있는 설명 페이지 (별도 텍스트 구성)

## 📂 5. 개발 착수 가이드 (Action Items for AI Agent)

새로운 개발 프로젝트를 시작할 AI는 다음 순서대로 작업을 전개하십시오.

1. [ ] **프로젝트 셋업:** Next.js 빈 프로젝트 생성 후 폴더 구조 분리 (`/components`, `/app`, `/lib` 등)
2. [ ] **디자인 토큰 주입:** `tailwind.config.ts`와 `globals.css` 파일에 위 3번 항목의 컬러 팔레트와 폰트 환경 완벽 적용
3. [ ] **에셋 마이그레이션 안내:** 리서치 프로젝트(`h:\Research\output\damha_co_kr\assets\*`)에서 신규 프로젝트의 `public/assets/` 폴더로 리소스 이동(필요시 USER에게 이동 요청)
4. [ ] **공통 컴포넌트 제작:** 전역에서 활용될 `Header` (반응형 서랍 메뉴 포함) 및 `Footer` 개발
5. [ ] **UI 구현:** `stitch` 도구나 프론트엔드 코드 작성을 활용해 페이지별 컴포넌트 단위 조립 및 모션 부여 시작

---
**💡 팁:** 이제 당신은 이 설계도를 통해 담하 웹사이트가 어떻게 생겼고, 어떻게 만들어져야 하는지 완벽히 이해했습니다. USER의 첫 번째 지시를 기다리십시오.

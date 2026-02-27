# DAMHA Website Design & Configuration

## 1. Contact Information

- **Company Name:** 주식회사 담하 (DAMHA Co., Ltd.)
- **Representative:** 정승우
- **Business License:** 247-81-03001
- **Address:** 부산광역시 동래구 연안로59번길 7, 5층
- **Email:** [brand@damha.co.kr](mailto:brand@damha.co.kr)
- **Landline:** 051.757.0719
- **Mobile:** 010.2983.4744

## 2. External Links

- **KakaoTalk Chat:** [https://accounts.kakao.com/login/?continue=http%3A%2F%2Fpf.kakao.com%2F_Jxldks%2Fchat#login](https://accounts.kakao.com/login/?continue=http%3A%2F%2Fpf.kakao.com%2F_Jxldks%2Fchat#login)

## 3. Brand Assets

- **Logo:** `/assets/images/logo_allWhite.svg`
- **Certification Image:** `/assets/images/7331034dac.svg` (Height: 112px, Original Colors)

## 4. UI/UX & Architecture Guidelines (Benchmarking Insights)

ThinkCreative 벤치마킹 데이터(`08-renewal-insights.md`, `BENCHMARK_RECIPE.md`)를 바탕으로 도출한 `담하(Damha)` 프로젝트 적용 가이드라인입니다.

### A. 히어로 섹션 (Hero Banner)

- **Swiper.js 도입**: 메인 상단에 텍스트와 타이포그래피 슬로건이 겹치는 대화면 슬라이더 배치하여 크리에이티브하고 전문적인 첫인상 구축. (로고 및 브랜드 에셋 강조)

### B. 타이포그래피 (Dual Font System)

- **영문/국문 분리**: 영문 포인트(H1~H4 및 영문 헤더/버튼)는 `Montserrat` 등 현대적인 폰트 사용. 국문 본문 및 정보는 `Pretendard` 등 고가독성 폰트로 일관화 적용.

### C. 상세 뷰 레이아웃 (Portfolio/Case Study)

- **B2B 특화 분할 구조**: 현장 분석부터 결과 도출까지의 실무 중심 프로세스 안내. 좌측(또는 상단)에 `[분야, 날짜, 고객사]` 요약 스펙을 배치하고, 우측 본문 공간에 `[스토리텔링/현장 진단 및 전략]`을 전개하는 레이아웃 반영.

### D. 실무자 중심 전문성 강조 (Expertise)

- **Practitioner-Led Branding**: 마케팅 전문가뿐 아니라 실제 의료 현장 실무자(상담실장, 간호사 등)가 팀에 소속되어 있음을 시각적으로 강조. (Philosophy 및 Trust 섹션 활용)

### D. 네비게이션 및 UX (Header)

- **Sticky / Scrolling Header**: 상단 메뉴바 스크롤 시 상단 부착 (글래스모피즘 또는 다크 배경) 처리. 카카오채널톡(`2. External Links` 참고) 클릭 시 팝업 액션 혹은 화면 전환 연결.

### E. 검색 최적화(SEO) 아키텍처

- **다중 Sitemap.xml 분리**: Next.js (App Router) 기반 구축 시, 서비스 분류, 게시판, 카테고리별로 `sitemap.xml`을 분할하여 B2B 특성상 중요한 구글 검색 검색어 커버리지(SEO) 극대화.

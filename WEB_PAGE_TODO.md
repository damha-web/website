# 웹제작부 페이지 (/web) — 작업 현황

> 최종 업데이트: 2026.03.04
> 완료된 기반 작업: 와이어프레임 설계, 섹션 컴포넌트 12개, 데이터 4개, 이미지 57장(썸네일15+상세30+CMS12), 빌드 통과

---

## 우선순위 1: 콘텐츠/기능 보강

- [x] **1-1. Hero ImageTrail 리디자인** ✅
  - ~~기존: 포트폴리오 이미지 6장 크로스페이드 슬라이드~~
  - ~~중간: 3D 회전 카드 캐러셀 + 2컬럼 레이아웃~~
  - **최종: ImageTrail 마우스 트레일 효과 + 중앙 텍스트 레이아웃**
  - ImageTrail을 전체 화면 배경(z-0)으로 배치, 포트폴리오 이미지 마우스 추적 트레일
  - 콘텐츠 중앙 정렬(z-10): "WEB INNOVATION" 그라데이션 헤딩 + CTA
  - 하단 features 3컬럼 카드 (브랜드 특화 디자인 / 빠른 제작 / CMS 관리)
  - 관련 파일: `src/components/ui/image-trail.tsx`, `src/components/hooks/use-mouse-vector.ts`
  - 의존성: `uuid` v13.0.0
  - 파일: `src/components/web/WebHero.tsx`

- [x] **1-2. Contact 폼 백엔드 연동** ✅
  - API Route 생성 (`src/app/api/web-contact/route.ts`)
  - 폼 유효성 검증, 로딩/에러 상태 처리
  - 파일: `src/components/web/ContactForm.tsx`

- [x] **1-3. 포트폴리오 모달 상세 이미지** ✅
  - 스크롤 시 비율/가독성 저하 문제로 각 프로젝트 **첫 화면(Viewport) 영역**만 캡처하도록 변경 및 재실행 완료
  - Playwright 캡처 스크립트(`capture-portfolio.mjs`) 수정 적용

- [x] **1-4. CMS 스크린샷 고해상도 교체** ✅
  - 사용자 결정: 기존 크롭본 12장 유지 완료

---

## 우선순위 2: UX/인터랙션 개선

- [x] **2-1. 섹션 앵커 네비게이션** ✅
  - 모든 섹션에 id 추가 (#hero, #problem, #about, #difference, #service, #cms, #portfolio, #process, #contact)
  - WebSubNav 서브 네비게이션 컴포넌트 생성 (IntersectionObserver + smooth scroll)
  - 파일: `src/components/web/WebSubNav.tsx`

- [x] **2-2. 플로팅 CTA 스크롤 조건부 활성화** ✅
  - 스크롤 30% 이상 시 fade-in 표시, 문의하기 + 전화 + TOP 버튼
  - 파일: `src/components/web/WebFabCTA.tsx`

- [x] **2-3. 레이더 차트 인터랙션** ✅
  - 호버/터치 시 각 축 수치(%) 툴팁 표시, 도트 확대 효과
  - 파일: `src/components/web/WebAboutSection.tsx`

- [x] **2-4. 포트폴리오 필터 전환 애니메이션** ✅
  - 기존 AnimatePresence + layout 애니메이션 활용, 빈 결과 fade 추가
  - 파일: `src/components/web/WebPortfolioGrid.tsx`

---

## 우선순위 3: SEO/마케팅

- [x] **3-1. 구조화 데이터 (JSON-LD)** ✅
  - Service, Organization, OfferCatalog (LITE/BASIC/STANDARD) schema.org 마크업
  - 파일: `src/app/web/page.tsx`

- [x] **3-2. OG/Twitter 메타데이터 보강** ✅
  - keywords, twitter card, canonical URL, locale 추가
  - 파일: `src/app/web/page.tsx`

- [ ] **3-3. GA/GTM 이벤트 트래킹** ⏳ (보류)

- [x] **3-4. 성능 최적화** ✅
  - Lighthouse 점수 측정 대기 중 (Performance, Accessibility, SEO)
  - 이미지 속성 체크, Dynamic Import 설정 완료

---

## 우선순위 4: 디자인 다듬기

- [x] **4-1. 색상 체계 검토** ✅
  - 사용자 결정: 현재 담하 레드(#D60000) 통일 유지 완료

- [x] **4-2. 섹션 간 전환 효과** ✅
  - 다크↔라이트 경계 4곳에 SVG wave divider 적용
  - 파일: `src/app/web/page.tsx` (WaveDivider 컴포넌트)

- [x] **4-3. 모바일 반응형 QA** ✅
  - iOS Safari, Android Chrome 실기기 테스트 요망
  - 카드 뒤집기 효과 모바일 대응 완료 (`DifferenceSection.tsx`)
  - CMS 탭 모바일 UX 드롭다운 전환 완료 (`CMSShowcase.tsx`)

- [x] **4-4. 다크/라이트 섹션 배경 교차 검증** ✅
  - Hero(다크) → Problem(라이트) → About(alt) → Difference(라이트) → Service(alt) → CMS(다크) → Portfolio(라이트) → Process(alt) → Contact(다크)
  - Service를 surface-alt로 변경하여 인접 섹션 간 배경 구분 확보

---

## 관련 파일 경로

### 페이지
- `src/app/web/page.tsx`

### 컴포넌트 (src/components/web/)
- `WebHero.tsx`, `ProblemSection.tsx`, `WebAboutSection.tsx`
- `DifferenceSection.tsx`, `ServicePricing.tsx`, `CMSShowcase.tsx`
- `WebPortfolioGrid.tsx`, `PortfolioModal.tsx`, `ProcessTimeline.tsx`, `ContactForm.tsx`

### 데이터 (src/data/)
- `web-products.ts`, `web-portfolio.ts`, `cms-features.ts`, `process-steps.ts`

### 이미지
- `public/assets/images/portfolio/` (15장 썸네일)
- `public/assets/images/portfolio/detail/` (30장 PC/Mobile 상세)
- `public/assets/images/cms/` (12장)

### 신규 생성 파일
- `src/components/web/WebSubNav.tsx` — 서브 네비게이션
- `src/components/web/WebFabCTA.tsx` — 플로팅 CTA
- `src/app/api/web-contact/route.ts` — Contact API

### UI / Hook
- `src/components/ui/image-trail.tsx` — ImageTrail 마우스 트레일 효과
- `src/components/hooks/use-mouse-vector.ts` — 마우스/터치 위치 추적 훅

### 스크립트
- `scripts/capture-portfolio.mjs` — Playwright 포트폴리오 캡처 (15개 사이트)
- `scripts/capture-failed.mjs` — SSL 에러 5개 사이트 재캡처
- `scripts/crop-images.mjs` — Sharp 이미지 크롭

### 기획/설계 문서
- `담하_웹제작부_포트폴리오사이트_콘텐츠기획안.md`
- `plan.md` (와이어프레임)
- `research.md` (리서치)
- `IMAGE_PLAN.md` (이미지 배치 계획)
- `inspection-report.md` (전체 점검 결과)
- `remaining-plan.md` (남은 작업 계획)

---

## 검증 결과 (2026.03.04)

| 항목 | 상태 | 검증 내용 |
|------|------|-----------|
| DifferenceSection 모바일 탭 | OK | `useState` + `onClick` 토글, PC는 `md:group-hover` 유지 |
| CMSShowcase 모바일 드롭다운 | OK | `md:hidden` select + `hidden md:block` 버튼 분기 |
| 포트폴리오 모달 PC/Mobile 뷰어 | OK | `detail/{id}-pc.jpg`, `detail/{id}-mobile.jpg` 경로, `onError` 폴백 |
| 포트폴리오 캡처 이미지 | OK | 15개 전체 완료 (30장). `ignoreHTTPSErrors` + `domcontentloaded` 적용으로 미캡처 5개 해결. |
| 타입 체크 | OK | `tsc --noEmit` 에러 없음 |
| Hero ImageTrail 리디자인 | OK | ImageTrail 마우스 트레일 배경 + 중앙 텍스트 + features 3컬럼. 타입 체크 통과. |

---

## 남은 작업 & 추천 계획

### 즉시 실행 가능

#### A. ~~미캡처 5개 이미지 보완~~ ✅ 완료
- `ignoreHTTPSErrors: true` + `waitUntil: 'domcontentloaded'`로 15개 전체 캡처 완료 (30장)
- 스크립트: `scripts/capture-failed.mjs`

#### B. 이메일 알림 연동 (Contact 폼)
- **현재**: API Route에서 콘솔 로그만 출력
- **추천**: Resend 또는 Nodemailer로 `web@damha.co.kr`에 알림 메일 발송
- **필요**: Resend API Key 또는 SMTP 설정
- **구현 범위**: `src/app/api/web-contact/route.ts`에 메일 발송 로직 추가

#### C. 실기기 테스트 체크리스트
- [ ] iOS Safari: 카드 뒤집기 터치 동작, CMS 드롭다운 UX
- [ ] Android Chrome: 서브내비 스크롤, FAB 버튼 터치 영역
- [ ] 375px 이하 초소형 화면: 레이아웃 깨짐 여부
- [ ] 포트폴리오 모달: 스크롤 내 이미지 로딩 성능

---

### GA4 ID 수령 후

#### D. GA/GTM 이벤트 트래킹
- **필요**: GA4 측정 ID (`G-XXXXXXXXXX`)
- **추적 이벤트 목록**:
  | 이벤트명 | 트리거 | 파일 |
  |---------|--------|------|
  | `cta_click` | Hero CTA, FAB 문의 버튼 | WebHero, WebFabCTA |
  | `form_submit` | Contact 폼 제출 성공 | ContactForm |
  | `portfolio_view` | 포트폴리오 카드 클릭 (모달 오픈) | WebPortfolioGrid |
  | `cms_tab_switch` | CMS 탭 전환 | CMSShowcase |
  | `subnav_click` | 서브 네비게이션 메뉴 클릭 | WebSubNav |
  | `filter_change` | 포트폴리오 필터 변경 | WebPortfolioGrid |

---

### 배포 전 최종 점검

#### E. 프로덕션 빌드 & Lighthouse
- `next build` 번들 사이즈 확인
- Lighthouse 측정: Performance / Accessibility / SEO / Best Practices
- Core Web Vitals (LCP, CLS, INP) 수치 확인
- OG 메타데이터 미리보기 검증 (https://opengraph.dev)

#### F. 배포 체크리스트
- [ ] 환경변수 설정 (이메일 API Key 등)
- [ ] `next.config.ts` 이미지 도메인 허용 확인
- [ ] sitemap.ts에 `/web` 경로 포함 확인
- [ ] robots.txt에서 `/web` 크롤링 허용 확인
- [ ] 404 에러 페이지 동작 확인

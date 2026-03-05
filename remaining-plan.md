# 담하 프로젝트 — 남은 작업 계획

> 작성일: 2026.03.04
> 기반: `inspection-report.md` 전체 점검 결과

---

## Phase 1: 코드 정리 (즉시 실행 가능)

### 1-1. 미사용 파일 정리
- [ ] `src/components/ui/canvas-trail-effect.tsx` 삭제
- [ ] `src/components/ui/shaders-background.tsx` 삭제
- [ ] `scripts/sync-figma.mjs` 삭제 (더미 목업, 실사용 안 함)
- [ ] `scripts/data-process.py` 삭제 (더미 목업, 실사용 안 함)

### 1-2. WEB_PAGE_TODO.md 갱신
- [ ] Hero 섹션 기록을 3D 캐러셀 → ImageTrail로 업데이트
- [ ] 검증 결과 테이블 갱신
- [ ] 컴포넌트 목록에 `PortfolioModal.tsx` 추가
- [ ] 이미지 경로에 detail 폴더(30장) 추가

---

## Phase 2: Contact 폼 이메일 연동 (API Key 필요)

### 2-1. Resend 이메일 발송 구현
- **전제조건**: Resend API Key 발급
- **파일**: `src/app/api/web-contact/route.ts`
- **작업 내용**:
  - [ ] `resend` 패키지 설치
  - [ ] `.env.local`에 `RESEND_API_KEY` 설정
  - [ ] 이메일 발송 로직 구현 (발신: `onboarding@resend.dev` → 수신: `web@damha.co.kr`)
  - [ ] 이메일 HTML 템플릿 작성 (문의 내용 포맷팅)
  - [ ] 에러 핸들링 (발송 실패 시에도 접수 성공 응답)

### 2-2. 이메일 발송 테스트
- [ ] Resend 대시보드에서 발송 로그 확인
- [ ] 다양한 입력값으로 폼 테스트

---

## Phase 3: GA4/GTM 이벤트 트래킹 (GA4 ID 필요)

### 3-1. GA4 기본 설정
- **전제조건**: GA4 측정 ID (`G-XXXXXXXXXX`)
- **작업 내용**:
  - [ ] `.env.local`에 `NEXT_PUBLIC_GA_ID` 설정
  - [ ] `src/lib/gtag.ts` 유틸 생성 (pageview, event 함수)
  - [ ] `src/app/layout.tsx`에 GA 스크립트 삽입 (next/script)

### 3-2. 이벤트 트래킹 삽입
| 이벤트명 | 트리거 | 대상 파일 |
|---------|--------|-----------|
| `cta_click` | Hero CTA, FAB 문의 버튼 클릭 | `WebHero.tsx`, `WebFabCTA.tsx` |
| `form_submit` | Contact 폼 제출 성공 | `ContactForm.tsx` |
| `portfolio_view` | 포트폴리오 카드 클릭 (모달 오픈) | `WebPortfolioGrid.tsx` |
| `cms_tab_switch` | CMS 탭 전환 | `CMSShowcase.tsx` |
| `subnav_click` | 서브 네비게이션 메뉴 클릭 | `WebSubNav.tsx` |
| `filter_change` | 포트폴리오 필터 변경 | `WebPortfolioGrid.tsx` |
| `phone_click` | 전화번호 클릭 | `FabContact.tsx`, `WebFabCTA.tsx` |

---

## Phase 4: 실기기 테스트 & QA

### 4-1. 디바이스 테스트 체크리스트
- [ ] **iOS Safari** (iPhone 13+): 카드 뒤집기 터치, CMS 드롭다운, ImageTrail 터치 반응
- [ ] **Android Chrome** (Galaxy S21+): 서브내비 스크롤, FAB 터치 영역, 포트폴리오 모달
- [ ] **iPad Safari**: 레이아웃 중간 breakpoint (768px~1024px)
- [ ] **375px 이하 초소형 화면**: 텍스트 오버플로우, 카드 레이아웃 깨짐

### 4-2. 기능 테스트
- [ ] Contact 폼: 유효성 검증 + 제출 + 성공/에러 메시지
- [ ] 포트폴리오 모달: PC/Mobile 스크린샷 전환, 이미지 로딩
- [ ] 서브 네비게이션: IntersectionObserver active 상태 정확성
- [ ] 플로팅 CTA: 30% 스크롤 후 표시, 클릭 동작

### 4-3. 접근성 점검
- [ ] 키보드 네비게이션 (Tab, Enter, Escape)
- [ ] 스크린리더 호환성 (aria-label, alt 텍스트)
- [ ] 색상 대비 (WCAG 2.1 AA 기준)

---

## Phase 5: 프로덕션 빌드 & 배포 준비

### 5-1. 빌드 검증
- [ ] `next build` 정상 완료 확인
- [ ] 번들 사이즈 분석 (`@next/bundle-analyzer`)
- [ ] 불필요한 클라이언트 번들 식별

### 5-2. Lighthouse 측정
- [ ] Performance ≥ 90
- [ ] Accessibility ≥ 90
- [ ] SEO ≥ 95
- [ ] Best Practices ≥ 90
- [ ] Core Web Vitals: LCP < 2.5s, CLS < 0.1, INP < 200ms

### 5-3. 배포 체크리스트
- [ ] 환경변수 설정 (RESEND_API_KEY, NEXT_PUBLIC_GA_ID)
- [ ] `next.config.ts` 이미지 도메인 허용 확인
- [ ] sitemap에 `/web` 경로 포함 확인
- [ ] robots.txt에서 `/web` 크롤링 허용 확인
- [ ] OG 메타데이터 미리보기 검증
- [ ] 404 에러 페이지 동작 확인
- [ ] HTTPS 인증서 유효성

---

## 우선순위 요약

| 순위 | 작업 | 선행 조건 | 규모 |
|------|------|-----------|------|
| 1 | 미사용 파일 정리 + TODO 갱신 | 없음 | 소 |
| 2 | Contact 이메일 연동 | Resend API Key | 중 |
| 3 | GA4 트래킹 | GA4 측정 ID | 중 |
| 4 | 실기기 테스트 & QA | 디바이스 접근 | 대 |
| 5 | 프로덕션 빌드 & 배포 | Phase 1~4 완료 | 중 |

# 담하 프로젝트 전체 점검 결과

> 점검일: 2026.03.04
> 범위: 전체 페이지, 컴포넌트, 스크립트, API, 데이터 파일

---

## 1. 페이지 라우트 (6개)

| 경로 | 파일 | 상태 | 비고 |
|------|------|------|------|
| `/` | `src/app/page.tsx` | OK | Hero, Products, Philosophy, ShaderCallout, PortfolioPreview, TrustSection |
| `/about` | `src/app/about/page.tsx` | OK | 회사소개, 조직도, 통계 (51.4KB 대형 파일) |
| `/services` | `src/app/services/page.tsx` | OK | 5개 서비스 카드, Globe 3D |
| `/portfolio` | `src/app/portfolio/page.tsx` | OK | 4개 카테고리 필터 |
| `/portfolio/[slug]` | `src/app/portfolio/[slug]/page.tsx` | 주의 | `redirect("/portfolio")` — 상세 페이지 미구현, 리다이렉트 처리 |
| `/web` | `src/app/web/page.tsx` | OK | 10섹션 원페이지, 13개 dynamic import, JSON-LD |

---

## 2. 컴포넌트 현황 (33개)

### 홈 섹션 (8개) — 모두 정상
- `Hero.tsx`, `HeroTitle.tsx`, `HeroSearch.tsx`, `ServiceCards.tsx`
- `HeroBackground.tsx`, `Products.tsx`, `PhilosophySection.tsx`
- `PortfolioPreview.tsx`, `ShaderCallout.tsx`, `TrustSection.tsx`

### 웹제작부 (12개) — 모두 정상
- `WebHero.tsx`, `WebSubNav.tsx`, `WebFabCTA.tsx`, `ProblemSection.tsx`
- `WebAboutSection.tsx`, `DifferenceSection.tsx`, `ServicePricing.tsx`
- `CMSShowcase.tsx`, `WebPortfolioGrid.tsx`, `PortfolioModal.tsx`
- `ProcessTimeline.tsx`, `ContactForm.tsx`

### 레이아웃 (3개) — 모두 정상
- `Header.tsx`, `Footer.tsx`, `FabContact.tsx`

### UI (8개) — 2개 미사용
- `image-trail.tsx` — OK (WebHero에서 사용)
- `magnetic-wrapper.tsx` — OK
- `text-reveal.tsx` — OK
- `interactive-image-accordion.tsx` — OK
- `globe.tsx` — OK (Services에서 사용)
- `svg-masks.tsx` — OK (TrustSection에서 사용)
- **`canvas-trail-effect.tsx` — 미사용** (어디서도 import 안 됨)
- **`shaders-background.tsx` — 미사용** (어디서도 import 안 됨)

---

## 3. 미사용 파일 목록

| 파일 | 유형 | 설명 |
|------|------|------|
| `src/components/ui/canvas-trail-effect.tsx` | 컴포넌트 | CanvasTrailEffect — 과거 Hero 후보안, 현재 미사용 |
| `src/components/ui/shaders-background.tsx` | 컴포넌트 | SectionShaderBackground — 과거 배경 효과 후보안, 현재 미사용 |
| `scripts/sync-figma.mjs` | 스크립트 | Figma 연동 목업 — 더미 토큰, 실제 미사용 |
| `scripts/data-process.py` | 스크립트 | 데이터 처리 목업 — 실제 미사용 |

---

## 4. 미구현 기능

### 4-1. Contact 폼 이메일 발송 (TODO)
- **파일**: `src/app/api/web-contact/route.ts:36`
- **현재**: `console.log`로 대체
- **필요**: Resend API Key 또는 SMTP 설정
- **영향**: 사용자가 문의 폼 제출 시 실제 이메일 알림이 발송되지 않음

### 4-2. GA/GTM 이벤트 트래킹 (보류)
- **현재**: 트래킹 코드 없음
- **필요**: GA4 측정 ID (`G-XXXXXXXXXX`)
- **영향**: 사용자 행동 데이터 수집 불가

### 4-3. Portfolio 상세 페이지 (의도적 미구현)
- **파일**: `src/app/portfolio/[slug]/page.tsx`
- **현재**: `/portfolio`로 redirect
- **판단**: 모달 방식으로 대체한 의도적 설계로 보임

---

## 5. 스크립트 파일 (5개)

| 파일 | 상태 | 용도 |
|------|------|------|
| `scripts/capture-portfolio.mjs` | 작동 | Playwright 포트폴리오 캡처 (15개 사이트) |
| `scripts/capture-failed.mjs` | 작동 | SSL 에러 5개 사이트 재캡처 |
| `scripts/crop-images.mjs` | 작동 | Sharp 이미지 크롭 |
| `scripts/sync-figma.mjs` | 미사용 목업 | Figma API 목업 (더미 토큰, 실제 API 호출 코드 주석 처리) |
| `scripts/data-process.py` | 미사용 목업 | 데이터 처리 목업 (기본 파일 읽기만 구현) |

---

## 6. API 라우트 (1개)

| 경로 | 메서드 | 상태 | 비고 |
|------|--------|------|------|
| `/api/web-contact` | POST | 부분 구현 | 입력 검증 OK, 이메일 발송 미연동 (console.log 대체) |

---

## 7. 데이터 파일 (8개) — 모두 사용 중

| 파일 | 사용처 |
|------|--------|
| `company.ts` | Header, Footer, ShaderCallout, ContactForm 등 6곳 |
| `services.ts` | HeroSearch, ServiceCards, Products |
| `stats.ts` | About, TrustSection |
| `clients.ts` | About, PortfolioPreview |
| `web-portfolio.ts` | WebPortfolioGrid, WebHero |
| `web-products.ts` | ServicePricing |
| `cms-features.ts` | CMSShowcase |
| `process-steps.ts` | ProcessTimeline |

---

## 8. 환경변수/설정

- `.env` 파일 없음 (현재 환경변수 미사용)
- `next.config.ts` 정상
- `tsconfig.json` 정상
- `tsc --noEmit` 에러 0개

### 향후 필요한 환경변수
| 변수명 | 용도 | 필요 시점 |
|--------|------|-----------|
| `RESEND_API_KEY` | Contact 폼 이메일 발송 | 이메일 연동 시 |
| `NEXT_PUBLIC_GA_ID` | GA4 트래킹 | GA 설정 시 |

---

## 9. 코드 품질 요약

| 항목 | 결과 |
|------|------|
| TypeScript 타입 체크 (`tsc --noEmit`) | 통과 (에러 0) |
| `any` / `unknown` 사용 | 없음 |
| 깨진 import | 없음 |
| 불완전한 이벤트 핸들러 (빈 함수, console.log만) | 없음 |
| TODO/FIXME 주석 | 2개 (web-contact API, sync-figma) |
| 보안 취약점 (OWASP Top 10) | 발견 안 됨 |

---

## 10. WEB_PAGE_TODO.md 정합성 문제

현재 `WEB_PAGE_TODO.md`의 Hero 관련 기록(1-1항)이 **구버전(3D 캐러셀)**으로 되어 있음.
실제 구현은 **ImageTrail 마우스 트레일 효과**로 변경되었으므로 업데이트 필요.

변경 필요 내용:
- "3D 회전 카드 캐러셀 + 2컬럼 레이아웃" → "ImageTrail 마우스 트레일 + 중앙 텍스트 레이아웃"
- 검증 결과 테이블의 "Hero 3D 캐러셀 리디자인" 항목도 갱신 필요

---

## 11. 메인페이지 링크/인터랙션 검토 (2026.03.05)

> 클릭 가능해 보이지만 동작하지 않는 요소, 빈 링크, 접근성 문제 점검

### 발견된 문제 (4건)

#### 11-1. [높음] Footer 정책 페이지 링크 미연결

**파일**: `src/components/layout/Footer.tsx:59-60`

```tsx
<Link href="#" className="hover:text-white transition-colors">개인정보처리방침</Link>
<Link href="#" className="hover:text-white transition-colors">이용약관</Link>
```

- `href="#"`으로 설정되어 클릭해도 이동하지 않음
- 법률 필수 문서에 접근 불가

**해결**: 실제 정책 페이지 생성 후 href 연결 (`/privacy-policy`, `/terms`)

---

#### 11-2. [중상] Footer 인증서 이미지 — 클릭 가능해 보이지만 동작 없음

**파일**: `src/components/layout/Footer.tsx:21-26`

```tsx
<img
    src="/assets/images/7331034dac.svg"
    alt="인증 및 파트너"
    className="w-auto transition-opacity duration-500 hover:opacity-80 cursor-pointer"
/>
```

- `cursor-pointer` + `hover:opacity-80`이 있어 클릭 가능해 보이지만 onClick/Link 없음

**해결 (택 1)**:
- A) 인증 상세 페이지/모달로 연결
- B) `cursor-pointer` 제거 (클릭 불가 명시)

---

#### 11-3. [중상] 아코디언 카드 — 키보드 접근 불가

**파일**: `src/components/ui/interactive-image-accordion.tsx:34-43`

```tsx
<div
    className="... cursor-pointer ..."
    onMouseEnter={onMouseEnter}
    onClick={handleClick}
>
```

- `<div>`에 `onClick`만 있고 `tabIndex`, `role`, `onKeyDown` 없음
- 키보드 사용자가 Tab으로 포커스 불가, Enter/Space 활성화 불가
- 스크린 리더가 클릭 가능 요소로 인식 못함

**해결**: `role="button"`, `tabIndex={0}`, Enter/Space 키 핸들러 추가

---

#### 11-4. [낮음] 고객 관리(CS) 서비스 — 데이터 존재하나 UI에서 필터링

**파일**: `src/data/services.ts:15`

```ts
{ title: "고객 관리(CS)", href: "/services#consulting", ... }
```

**파일**: `src/components/home/ServiceCards.tsx:25`

```tsx
{HERO_SERVICE_CARDS.filter(card => card.title !== "고객 관리(CS)").map(...)
```

- 데이터에 href 정의되어 있지만 `.filter()`로 제거되어 렌더링되지 않음
- 의도적 숨김이라면 데이터에서도 제거하는 것이 깔끔함

---

### 이번 검토에서 수정 완료된 항목

| 항목 | 파일 | 수정 내용 |
|------|------|-----------|
| TrustSection 연결선 SVG 렌더링 오류 | `TrustSection.tsx:217` | viewBox 추가, 좌표 보정 |
| 아코디언 카드 클릭 시 링크 미연결 | `interactive-image-accordion.tsx:26-32` | 확장 카드 클릭 → `/services#` 이동 |
| PortfolioPreview href 매핑 누락 | `PortfolioPreview.tsx:11-26` | CATEGORY_HREF 매핑 추가 |

### 정상 확인된 항목

| 컴포넌트 | 항목 | 상태 |
|----------|------|------|
| HeroSearch | 검색 결과 링크 연결 | 정상 |
| HeroSearch | 태그 버튼 onClick | 정상 |
| ServiceCards | 4개 서비스 카드 Link | 정상 |
| Products | "자세히 보기" Link | 정상 |
| PhilosophySection | 카드 (클릭 불가 — 의도적) | 정상 |
| TrustSection | Stats 카드 (클릭 불가 — 의도적) | 정상 |
| ShaderCallout | CTA 버튼 Link | 정상 |

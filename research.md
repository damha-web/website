# 웹제작부 서브페이지 와이어프레임 리서치

## 1. 현재 사이트 구조

```
/ (Home)         → Hero, Products, Philosophy, ShaderCallout, PortfolioPreview, TrustSection
/about           → 조직도, 회사 이력
/services        → 브랜딩/마케팅/컨설팅/오프라인 서비스
/portfolio       → 프로젝트 목록 (카테고리 필터)
/portfolio/[slug] → Case Study 상세
```

## 2. 추가할 서브페이지

기획안의 10개 섹션을 담은 원페이지 스크롤 랜딩: `/web` (또는 `/web-production`)
포트폴리오 상세는 기존 `/portfolio/[slug]` 구조 재활용 가능

## 3. 재활용 가능한 자산

### 컴포넌트
- Header/Footer: 네비게이션에 "웹제작" 메뉴 항목 추가만 필요
- FabContact: 플로팅 문의 버튼 그대로 사용
- UI 컴포넌트: text-reveal, magnetic-wrapper 등 애니메이션 재활용
- portfolio-preview.ts: 포트폴리오 데이터 구조 참고

### 디자인 시스템
- 컬러: #D60000 (primary), #1F1F1F (secondary) 유지
- 기획안에서 언급한 딥퍼플(#3F3D9E)은 웹제작부 섹션 악센트로 선택적 사용 가능
- 폰트: Montserrat + Pretendard 유지
- Tailwind 토큰 시스템 유지

## 4. 신규 필요 항목

### 섹션 컴포넌트 (10개)
1. WebHero - 메인 비주얼 + CTA
2. ProblemSection - 3가지 Pain Point
3. WebAboutSection - 부서 소개 + 역량 차트
4. DifferenceSection - 4가지 차별점 카드
5. ServicePricing - LITE/BASIC/STANDARD 비교표
6. CMSShowcase - 12개 탭 인터랙티브
7. WebPortfolioGrid - 15개 프로젝트 필터링
8. ProcessTimeline - 8단계 프로세스
9. ContactForm - 빠른 상담 폼
10. (Footer는 기존 것 사용)

### 데이터 파일
- web-products.ts: 상품 라인업 데이터
- web-portfolio.ts: 웹제작부 포트폴리오 15개
- cms-features.ts: CMS 기능 12개
- process-steps.ts: 진행 프로세스 8단계

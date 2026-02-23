# Phase 1 Execution Plan (Damha)

이 문서는 `IMPLEMENTATION_PLAN.md`의 Phase 1을 실제 개발 작업으로 실행하기 위한 상세 계획서입니다.

## 1. 목표와 범위
- 목표: 홈(`/`) 첫 화면 경험을 프리미엄 수준으로 완성하여 신뢰감과 전환(문의/포트폴리오 진입)을 높인다.
- 범위(고정):
1. Hero Section 고도화 (Framer Motion)
2. Products Section (3대 서비스 카드)
3. Portfolio Preview (가로 스크롤 또는 Swiper)
4. Strength/Trust Section (지표 + 카운팅)
5. Floating Action Button (카카오/전화)

## 2. 선행 조건 (Pre-flight)
- 필수 선행 이슈:
1. 한글 인코딩 깨짐 복구 (`UTF-8`)  
   대상: `src/app/page.tsx`, `src/app/layout.tsx`, `src/components/layout/Footer.tsx`
2. 홈 페이지 섹션 컴포넌트 분리 구조 확정
   예시: `src/components/home/Hero.tsx`, `Products.tsx`, `PortfolioPreview.tsx`, `TrustSection.tsx`, `FabContact.tsx`
3. 콘텐츠/에셋 수급 완료 (아래 3번 체크리스트)

## 3. 준비물 체크리스트
- 카피/문구:
1. Hero 헤드라인, 서브카피, CTA 문구(최종본)
2. 서비스 3종(브랜딩/마케팅/컨설팅) 카드 제목 + 1줄 설명
3. Trust 섹션 핵심 문장(회사 강점/차별점)

- 데이터:
1. 포트폴리오 프리뷰 최소 6~8개 (썸네일, 제목, 카테고리, slug)
2. 지표 수치 3~4개 (예: 업력, 프로젝트 수, 재의뢰율 등) 및 근거

- 연락/전환 정보:
1. 전화번호(클릭투콜용)
2. 카카오 상담 URL
3. 문의 운영시간(선택)

- 디자인/브랜드:
1. CTA 우선순위(포트폴리오 보기 vs 상담 문의)
2. 아이콘 스타일(라인/필) 통일
3. 배경 비주얼(패턴/이미지/그라데이션) 확정

## 4. 구현 전략
- 공통 원칙:
1. App Router + Server/Client 컴포넌트 경계 명확화
2. 인터랙션이 필요한 섹션만 `"use client"` 적용
3. 모션은 과하지 않게, 시선 유도 중심으로 사용
4. 모바일 퍼스트 반응형 우선 적용

- 애니메이션 원칙:
1. Hero: 순차 등장(stagger), 0.4~0.7초 구간
2. Cards: hover에 elevation/translate/색상 강조
3. Trust 숫자: 뷰포트 진입 시 1회 카운트
4. `prefers-reduced-motion` 대응 필수

- 데이터 처리:
1. 포트폴리오 프리뷰는 임시 상수 파일(`src/lib/portfolio-preview.ts`)로 시작
2. 이후 Phase 2의 실제 데이터 구조로 쉽게 전환 가능하게 설계

## 5. 작업 분해 (WBS)
### Day 1 - 구조/기준선
1. 인코딩 복구(UTF-8) 및 깨진 카피 임시 복원
2. 홈 섹션 컴포넌트 분리 + 페이지 조립
3. 공통 섹션 래퍼/컨테이너 클래스 정리

### Day 2 - Hero/Products
1. Hero 모션 완성(배지, 타이틀, 본문, CTA)
2. Products 카드 3종 UI/인터랙션/링크 구현
3. 모바일 텍스트 스케일, 버튼 영역 터치 크기 점검

### Day 3 - Portfolio Preview
1. 방식 결정: CSS scroll-snap 또는 Swiper
2. 프리뷰 카드/슬라이드 구현
3. `/portfolio/[slug]` 링크 연결

### Day 4 - Trust/FAB
1. Trust 지표 카드 + 카운팅 애니메이션 구현
2. 신뢰 카피/보조 설명 구성
3. FAB(카카오/전화) 고정 버튼 구현 및 안전영역 대응

### Day 5 - QA/튜닝
1. 반응형 검수(모바일/태블릿/데스크탑)
2. 접근성 점검(키보드 포커스, aria-label, 대비)
3. 성능 점검(이미지 크기/LCP/불필요 모션)
4. Phase 1 완료 체크리스트 검증

## 6. 기술 작업 항목
- 파일 구조(권장):
1. `src/components/home/Hero.tsx`
2. `src/components/home/Products.tsx`
3. `src/components/home/PortfolioPreview.tsx`
4. `src/components/home/TrustSection.tsx`
5. `src/components/home/FabContact.tsx`
6. `src/lib/portfolio-preview.ts`

- 라이브러리:
1. 현재 설치됨: `framer-motion`, `lucide-react`
2. 옵션: `swiper` (선택 시 설치)

## 7. 리스크와 대응
1. 리스크: 한글 깨짐 재발
   대응: 저장 인코딩 UTF-8 고정, 편집기 설정 통일
2. 리스크: 포트폴리오 실제 데이터 미확정
   대응: 임시 mock 데이터로 UI 선개발 후 교체
3. 리스크: 모바일에서 FAB/헤더 겹침
   대응: 하단/상단 safe-area 반영 + z-index 규칙 문서화
4. 리스크: 과한 모션으로 가독성 저하
   대응: 모션 길이 상한, reduced-motion fallback 적용

## 8. 완료 기준 (Definition of Done)
1. 홈 5개 섹션 구현 완료
2. 주요 CTA 링크 정상 동작 (`/portfolio`, `/services`, `tel:`, 카카오 링크)
3. 360px 이상 주요 모바일 화면에서 레이아웃 깨짐 없음
4. 접근성 치명 이슈 없음(포커스/대체텍스트/대비)
5. 텍스트 인코딩 정상(한글 깨짐 없음)

## 9. 즉시 실행 순서 (오늘 시작용)
1. 인코딩 복구 + 카피 임시 확정
2. Home 섹션 파일 분리
3. Hero 모션 구현
4. Products 구현
5. Portfolio Preview 방식 결정

---

문서 버전: v1.0  
작성일: 2026-02-23

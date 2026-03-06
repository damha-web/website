# 메인 페이지 히어로 확장 + 소식 게시판 연동 계획 (v2)

> 작성일: 2026-03-05
> 참고 사이트: https://www.climatefinance.co.kr/
> 상태: **승인 대기**

---

## 1. 현황 분석

### 현재 히어로 영역 (`Hero.tsx`)
- **높이**: `min-h-screen` (100vh 전체)
- **배경**: `#1F1F1F` 다크 + HeroBackground 효과
- **레이아웃**: 2컬럼 그리드 (좌: HeroTitle + HeroSearch / 우: ServiceCards)
- **하단**: 스크롤 인디케이터 (absolute bottom)

### 현재 메인 페이지 섹션 순서
Hero → Products → PhilosophySection → PortfolioPreview → TrustSection → ShaderCallout

---

## 2. 참고 사이트 핵심 벤치마크

기후금융포털의 메인 페이지에서 차용할 요소:

| 요소 | 참고 사이트 구현 | 우리 적용 |
|------|-----------------|----------|
| 히어로+뉴스 일체감 | 동일 다크 배경으로 경계 없이 연결 | 동일 `#1F1F1F` 배경, 히어로 내부에 뉴스 영역 포함 |
| 실시간 시계 | 좌측 `13:45:00 (Seoul)` / 우측 `MAR 5th, 2026` | 뉴스 영역 상단에 동일 배치 |
| 카드 레이아웃 | **좌: 썸네일 / 우: 카테고리+제목+출처+날짜** (수평 카드) | 동일한 수평 카드 레이아웃 |
| 슬라이더 | 3개 카드 표시, 좌우 화살표로 넘김 | 3개 표시, 총 3~6개, 화살표 네비게이션 |
| 카테고리 라벨 | 카드 상단 볼드 텍스트 | 컬러 라벨로 시각적 구분 |

---

## 3. 변경 계획

### 3-1. 히어로 영역 확장 (일체형 통합)

히어로 섹션 내부에 뉴스 보드를 포함시켜 **하나의 연속된 영역**으로 구성.
`min-h-screen`은 유지하되, 뉴스 영역이 그 아래로 자연스럽게 이어짐.

```
┌─────────────────────────────────────────────────────────┐
│  ██████████████████████████████████████████████████████  │
│  ██          HERO 영역 (기존 유지)              ██████  │
│  ██  ┌──────────────┐    ┌──────────────┐       ██████  │
│  ██  │ HeroTitle    │    │ ServiceCards │       ██████  │
│  ██  │ HeroSearch   │    │              │       ██████  │
│  ██  └──────────────┘    └──────────────┘       ██████  │
│  ██████████████████████████████████████████████████████  │
│                                                         │
│  · 13:45:00 (Seoul)                    MAR 5th, 2026    │  ← 실시간 시계 바
│  ─────────────────────────────────────────────────────  │
│                                                         │
│  ┌─────────────────┐ ┌─────────────────┐ ┌───────────┐ │
│  │ ┌─────┐ 카테고리│ │ ┌─────┐ 카테고리│ │ ┌─────┐   │ │
│  │ │ IMG │ 제목    │ │ │ IMG │ 제목    │ │ │ IMG │   │ │
│  │ │     │ 텍스트  │ │ │     │ 텍스트  │ │ │     │   │ │
│  │ └─────┘ 날짜    │ │ └─────┘ 날짜    │ │ └─────┘   │ │
│  └─────────────────┘ └─────────────────┘ └───────────┘ │
│                                                         │
│  ◀  ▶                    ━━━━━━━━━━━━                   │  ← 네비게이션
└─────────────────────────────────────────────────────────┘
│  ← 동일 #1F1F1F 배경 (경계 없음) →
```

**핵심 변경사항:**
- `Hero.tsx`의 `min-h-screen` 유지, 뉴스 영역은 그 아래에 추가
- 스크롤 인디케이터 제거 또는 뉴스 영역 위로 이동
- 히어로와 뉴스 사이 자연스러운 구분선 (subtle divider `bg-white/10`)

### 3-2. 뉴스 카드 디자인 (수평 카드)

참고 사이트와 동일하게 **썸네일 좌측 + 콘텐츠 우측** 수평 레이아웃:

```
┌──────────────────────────────────────┐
│ ┌──────────┐  카테고리 라벨           │
│ │          │                         │
│ │  THUMB   │  기사/소식 제목 텍스트    │
│ │  (1:1    │  최대 2줄까지 표시...     │
│ │  또는    │                         │
│ │  4:3)    │  출처명     2026-03-05   │
│ │          │                         │
│ └──────────┘                         │
└──────────────────────────────────────┘
  bg-white/5 backdrop-blur-sm rounded-xl
  hover: bg-white/10 transition
```

**카드 스펙:**
| 항목 | 값 |
|------|-----|
| 카드 배경 | `bg-white/5 backdrop-blur-sm` |
| 호버 | `bg-white/10` + 미세한 scale(1.01) |
| 썸네일 | 좌측 고정폭 (160~200px), `aspect-[4/3]`, `rounded-lg` |
| 카테고리 | 볼드 텍스트, 카테고리별 컬러 (#D60000, #3B82F6, #10B981, #F59E0B) |
| 제목 | `line-clamp-2`, `text-white`, `font-medium` |
| 출처/날짜 | `text-white/50`, `text-sm` |
| 간격 | 카드 간 `gap-4~6` |

### 3-3. 실시간 시계 바

뉴스 영역 상단, 참고 사이트와 동일한 배치:

```
· 13:45:00 (Seoul)                                MAR 5th, 2026
```

- 좌측: 도트 + 시:분:초 + `(Seoul)` — 1초 간격 업데이트
- 우측: 영문 날짜 (`MMM DDth, YYYY`)
- 스타일: `text-white/60`, `text-sm`, `font-mono` (시계만)

### 3-4. 슬라이더 네비게이션

- **PC**: 3개 카드 동시 표시, 좌우 화살표 버튼
- **Tablet**: 2개 카드
- **Mobile**: 1개 카드 + 좌우 스와이프
- 하단 프로그레스 바 (현재 위치 표시)
- framer-motion `drag="x"` + `dragConstraints` 활용 (추가 라이브러리 불필요)

### 3-5. 뉴스 관리 어드민 페이지

정적 파일(`src/data/news.ts`) 기반이되, 어드민 페이지에서 작성/수정/삭제 가능하게 구현.

#### 라우트 구조
```
/admin/news              — 뉴스 목록 (테이블)
/admin/news/new          — 새 글 작성
/admin/news/[id]/edit    — 글 수정
```

#### 어드민 기능
| 기능 | 설명 |
|------|------|
| 목록 | 전체 뉴스 테이블 (제목, 카테고리, 날짜, 상태) |
| 작성 | 폼: 제목, 카테고리(select), 썸네일(이미지 업로드), 요약, 출처, 날짜, 링크 |
| 수정 | 기존 데이터 불러와 편집 |
| 삭제 | 확인 다이얼로그 후 삭제 |
| 정렬 | 날짜순 자동 정렬 |
| 발행 | `published: true/false` 토글 |

#### 데이터 저장 방식
- API Route (`/api/admin/news`)에서 `src/data/news.ts` 파일을 직접 읽기/쓰기
- 이미지는 `public/assets/images/news/` 에 저장
- 빌드 없이 dev 서버에서 바로 반영 (프로덕션은 재빌드 필요)

#### 이미지 자동 최적화

업로드 시 서버사이드에서 이미지를 자동 압축/변환하여 웹 성능을 보장.

| 항목 | 스펙 |
|------|------|
| 라이브러리 | `sharp` (Node.js 고성능 이미지 처리) |
| 출력 포맷 | **WebP** 변환 (원본 대비 30~50% 용량 절감) |
| 최대 해상도 | 가로 800px 리사이즈 (썸네일 용도에 충분) |
| 품질 설정 | WebP quality 80 (시각 품질 유지 + 용량 최적화) |
| 최대 업로드 | 원본 10MB 제한 (초과 시 에러 반환) |
| 파일명 | `{timestamp}-{slugified-title}.webp` 자동 생성 |
| 폴백 | WebP 미지원 환경 대비 next/image가 자동 포맷 협상 |

**처리 흐름:**
```
사용자 이미지 업로드 (JPG/PNG/WebP, 최대 10MB)
        │
        ▼
  /api/admin/upload (API Route)
        │
        ├─ 1. 파일 크기 검증 (10MB 초과 → 에러)
        ├─ 2. sharp로 리사이즈 (maxWidth: 800px, 비율 유지)
        ├─ 3. WebP 변환 (quality: 80)
        ├─ 4. 파일명 생성 ({timestamp}-{slug}.webp)
        ├─ 5. public/assets/images/news/ 에 저장
        └─ 6. 저장된 경로 반환 → 뉴스 데이터에 기록
```

**결과 예시:**
- 원본: `photo.jpg` (3MB, 4000x3000px)
- 최적화 후: `1709654400-company-news.webp` (~80KB, 800x600px)

#### 인증
- 간단한 비밀번호 기반 인증 (환경변수 `ADMIN_PASSWORD`)
- 미들웨어 또는 API Route에서 체크

---

## 4. 데이터 모델

```typescript
// src/data/news.ts

export interface NewsItem {
  id: string;
  title: string;
  category: '소식' | '보도자료' | '블로그' | '이벤트';
  thumbnail: string;         // /assets/images/news/xxx.jpg
  excerpt: string;           // 요약 1~2줄
  source: string;            // 출처명
  date: string;              // YYYY-MM-DD
  link: string;              // 클릭 시 이동할 URL
  published: boolean;        // 발행 여부
}

export const newsItems: NewsItem[] = [
  // 초기 샘플 3~6개
];
```

---

## 5. 파일 구조

```
신규 생성:
├── src/data/news.ts                       # 뉴스 데이터 + 타입
├── src/components/home/NewsBoard.tsx       # 뉴스 보드 (시계 + 카드 슬라이더)
├── src/components/home/NewsCard.tsx        # 수평 카드 컴포넌트
├── src/app/admin/layout.tsx               # 어드민 레이아웃 (인증 가드)
├── src/app/admin/news/page.tsx            # 뉴스 목록
├── src/app/admin/news/new/page.tsx        # 새 글 작성
├── src/app/admin/news/[id]/edit/page.tsx  # 글 수정
├── src/app/api/admin/news/route.ts        # CRUD API
├── src/app/api/admin/upload/route.ts      # 이미지 업로드 API

수정:
├── src/components/home/Hero.tsx           # 하단에 NewsBoard 포함
└── src/app/page.tsx                       # (Hero가 NewsBoard 포함하므로 변경 불필요할 수 있음)
```

---

## 6. 구현 단계

### Phase 1: 뉴스 보드 UI (핵심)
1. `src/data/news.ts` — 데이터 모델 + 샘플 데이터 4개
2. `NewsCard.tsx` — 수평 카드 (썸네일 좌 + 콘텐츠 우)
3. `NewsBoard.tsx` — 시계 바 + 3열 카드 슬라이더 + 네비게이션
4. `Hero.tsx` 수정 — 하단에 NewsBoard 통합, 스크롤 인디케이터 조정
5. 반응형 처리 (PC 3열 / Tablet 2열 / Mobile 1열)
6. 호버/스와이프 인터랙션

### Phase 2: 어드민 페이지
7. `sharp` 패키지 설치 (`npm install sharp`)
8. API Route — CRUD (`/api/admin/news`) + 이미지 업로드 + sharp 최적화 (`/api/admin/upload`)
9. 어드민 인증 (비밀번호 기반)
10. 뉴스 목록 페이지 (테이블)
11. 작성/수정 폼 페이지 (이미지 업로드 시 최적화 결과 미리보기)
12. 삭제 기능 + 발행 토글

### Phase 3: 마감
12. 타입 체크 (`tsc --noEmit`)
13. 전체 빌드 확인
14. 모바일 실기기 테스트

---

## 7. 기술 결정 요약

| 항목 | 결정 |
|------|------|
| 히어로 통합 방식 | 옵션 A — Hero 내부 통합 (일체감) |
| 실시간 시계 | 포함 (참고 사이트 동일 포맷) |
| 카드 레이아웃 | 수평형 (좌: 썸네일 / 우: 콘텐츠) |
| 슬라이더 | 3개 표시, 3~6개 데이터, framer-motion drag |
| 데이터 관리 | 정적 파일 + 어드민 페이지 CRUD |
| 인증 | 환경변수 비밀번호 기반 |
| 이미지 저장 | `public/assets/images/news/` |
| 이미지 최적화 | sharp — WebP 변환, 800px 리사이즈, quality 80 |
| 의존성 추가 | `sharp` (Next.js 내장 지원, 별도 설치 필요) |

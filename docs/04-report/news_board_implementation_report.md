# 메인 페이지 뉴스 게시판 구현 결과 보고서

> 작성일: 2026-03-05
> 참고 사이트: https://www.climatefinance.co.kr/
> 상태: **구현 완료**

---

## 1. 구현 요약

메인 페이지 히어로 하단에 참고 사이트(기후금융포털)와 동일한 스타일의 뉴스 게시판을 통합 구현.
어드민 페이지에서 뉴스 CRUD + 이미지 자동 최적화(sharp WebP 변환) 기능 포함.

---

## 2. 구현된 파일 목록

### 신규 생성 (11개)

| 파일 | 설명 |
|------|------|
| `src/data/news.ts` | 뉴스 데이터 모델 + 샘플 데이터 6개 |
| `src/components/home/NewsCard.tsx` | 수평 카드 (좌: 썸네일 / 우: 콘텐츠) |
| `src/components/home/NewsBoard.tsx` | 시계 바 + 3열 슬라이더 + 네비게이션 |
| `src/lib/admin-auth.ts` | 어드민 인증 유틸리티 |
| `src/app/api/admin/upload/route.ts` | 이미지 업로드 + sharp 최적화 API |
| `src/app/api/admin/news/route.ts` | 뉴스 CRUD API (GET/POST/PUT/DELETE) |
| `src/app/admin/layout.tsx` | 어드민 레이아웃 + 비밀번호 인증 |
| `src/app/admin/news/page.tsx` | 뉴스 목록 테이블 (발행 토글, 삭제) |
| `src/app/admin/news/new/page.tsx` | 새 글 작성 페이지 |
| `src/app/admin/news/[id]/edit/page.tsx` | 글 수정 페이지 |
| `src/app/admin/news/_components/NewsForm.tsx` | 공통 작성/수정 폼 (이미지 업로드 포함) |

### 수정 (1개)

| 파일 | 변경 내용 |
|------|----------|
| `src/components/home/Hero.tsx` | 구조 변경 — NewsBoard를 히어로 섹션 내부 하단에 통합, 스크롤 인디케이터 제거 |

### 디렉토리 생성

| 경로 | 설명 |
|------|------|
| `public/assets/images/news/` | 뉴스 썸네일 이미지 저장 디렉토리 |

### 의존성 추가

| 패키지 | 버전 | 용도 |
|--------|------|------|
| `sharp` | latest | 이미지 리사이즈 + WebP 변환 |

---

## 3. 기능 상세

### 3-1. 뉴스 보드 (프론트엔드)

**레이아웃:**
- 히어로와 동일한 `#1F1F1F` 배경으로 일체감 있는 연결
- 히어로-뉴스 사이 `bg-white/10` 그라데이션 구분선

**실시간 시계:**
- 좌측: `· 13:45:00 (Seoul)` — 1초 간격 업데이트, `font-mono`
- 우측: `MAR 5th, 2026` — 영문 날짜 (서수 포함)
- SSR hydration 안전: 초기값 `--:--:--`로 렌더, useEffect에서 업데이트

**카드 디자인 (수평형):**
- 좌측: 140px 고정폭 썸네일 (`aspect-[4/3]`, `rounded-lg`)
- 우측: 카테고리 라벨 (컬러별) + 제목 (`line-clamp-2`) + 출처/날짜
- 배경: `bg-white/5 backdrop-blur-sm`, 호버 시 `bg-white/10`
- 카테고리 컬러: 소식(#D60000), 보도자료(#3B82F6), 블로그(#10B981), 이벤트(#F59E0B)

**슬라이더:**
- PC: 3열 / Tablet: 2열 / Mobile: 1열 (resize 이벤트 반응)
- AnimatePresence + framer-motion 페이지 전환 애니메이션
- 좌우 화살표 버튼 (원형, `border-white/15`)
- 하단 프로그레스 바 (현재 페이지/전체 비율)

### 3-2. 어드민 페이지 (`/admin/news`)

**인증:**
- 비밀번호 기반 (`ADMIN_PASSWORD` 환경변수, 기본값: `damha2026!`)
- 로그인 UI: 중앙 카드 + 잠금 아이콘
- `x-admin-token` 헤더로 API 인증

**뉴스 목록:**
- 테이블: 상태(발행/미발행 토글), 카테고리, 제목, 날짜, 관리(수정/삭제)
- 삭제: confirm 다이얼로그 후 실행

**작성/수정 폼:**
- 제목, 카테고리(select), 날짜(date picker)
- 썸네일 업로드 (미리보기 + 최적화 결과 표시)
- 요약(textarea), 출처, 링크
- 발행 토글 스위치

### 3-3. 이미지 자동 최적화

**처리 파이프라인:**
```
업로드 → 파일 크기 검증(10MB) → sharp 리사이즈(800px) → WebP 변환(q80) → 저장
```

**스펙:**
| 항목 | 값 |
|------|-----|
| 허용 포맷 | JPG, PNG, WebP, AVIF |
| 최대 업로드 | 10MB |
| 출력 포맷 | WebP (quality 80) |
| 최대 해상도 | 800px (가로, 비율 유지) |
| 파일명 규칙 | `{timestamp}-{slugified-title}.webp` |
| 저장 위치 | `public/assets/images/news/` |

**업로드 응답 예시:**
```json
{
  "path": "/assets/images/news/1709654400-company-news.webp",
  "original": { "size": 3145728, "width": 4000, "height": 3000, "format": "jpeg" },
  "optimized": { "size": 81920, "width": 800, "format": "webp" },
  "savings": "97%"
}
```

### 3-4. 데이터 관리 방식

- `src/data/news.ts` 파일을 직접 읽기/쓰기 (정적 파일 기반)
- API Route에서 정규식으로 배열 파싱 → JSON 수정 → 파일 재작성
- 날짜순 자동 정렬 (최신 우선)
- dev 서버에서 즉시 반영 (프로덕션은 재빌드 필요)

---

## 4. 타입 안전성

- `tsc --noEmit` 통과 (소스 코드 타입 에러 없음)
- `.next/dev/types/validator.ts` 경고는 새 라우트 추가 후 dev 서버 재시작 시 자동 해결
- `any`/`unknown` 타입 미사용

---

## 5. 남은 작업 / 후속 과제

| 항목 | 우선순위 | 상태 |
|------|---------|------|
| 샘플 썸네일 이미지 6장 준비 | 높음 | 미완 (현재 placeholder 경로) |
| `.env.local`에 `ADMIN_PASSWORD` 설정 | 높음 | 사용자 설정 필요 |
| 프로덕션 빌드 테스트 | 중간 | 미완 |
| 모바일 실기기 테스트 (슬라이더 스와이프) | 중간 | 미완 |
| `/news` 전체 목록 페이지 | 낮음 | 추후 |
| 외부 CMS/블로그 API 자동 연동 | 낮음 | 추후 |

---

## 6. 접근 경로

| 페이지 | URL |
|--------|-----|
| 메인 (뉴스 보드 포함) | `/` |
| 어드민 로그인 | `/admin/news` |
| 새 글 작성 | `/admin/news/new` |
| 글 수정 | `/admin/news/{id}/edit` |
| 이미지 업로드 API | `POST /api/admin/upload` |
| 뉴스 CRUD API | `GET/POST/PUT/DELETE /api/admin/news` |

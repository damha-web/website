# 뉴스 보드 개선 계획 (v3)

> 작성일: 2026-03-05
> 상태: **승인 대기**

---

## 변경 요청 4건

### 1. 자동 슬라이딩

**현재**: 좌우 화살표 수동 클릭으로만 페이지 전환
**변경**: 참고 사이트처럼 일정 간격으로 자동 슬라이딩 + 수동 조작 시 타이머 리셋

| 항목 | 값 |
|------|-----|
| 자동 전환 간격 | 5초 (참고 사이트 기준) |
| 수동 조작 시 | 타이머 리셋 (다시 5초 후 자동) |
| 호버 시 | 일시 정지 |
| 방향 | 순방향 순환 (마지막→첫번째) |

**수정 파일**: `NewsBoard.tsx`

---

### 2. 인증 개선 — 로그인 후 세션 유지

**현재**: `AdminContext.token`에 비밀번호 저장 → 모든 API 호출마다 `x-admin-token` 헤더 전송
**문제 분석**: 현재 구조에서 이미 로그인 1회 후 세션 내 모든 작업이 인증 없이 작동함. 다만 **페이지 새로고침 시 재로그인** 필요.

**변경**: `sessionStorage`에 토큰 저장하여 새로고침해도 세션 유지

**수정 파일**: `admin/layout.tsx`

---

### 3. 요약(excerpt) 필드 제거

**현재**: 데이터 모델에 `excerpt` 필드 존재, 작성 폼에 요약 textarea 존재
**문제**: 메인 뉴스 카드에 요약이 노출되지 않음 → 불필요한 입력

**변경**:
- `NewsItem` 인터페이스에서 `excerpt` 필드 제거
- `NewsForm`에서 요약 textarea 제거
- 기존 데이터의 `excerpt` 값 제거
- API에서 `excerpt` 관련 처리 제거

**수정 파일**: `news.ts`, `NewsForm.tsx`, `news/route.ts`

---

### 4. 메인 노출 선택 기능

**현재**: `published: true`인 모든 뉴스가 메인에 노출
**변경**: 별도 `featured: boolean` 필드 추가 → 목록에서 메인 노출 글을 체크박스로 선택

| 항목 | 설명 |
|------|------|
| 데이터 필드 | `featured: boolean` 추가 |
| 목록 UI | 각 행에 별/핀 아이콘 토글 버튼 |
| 메인 노출 로직 | `published && featured` 인 글만 NewsBoard에 표시 |
| 기본값 | 새 글 작성 시 `featured: false` |
| 제한 | 최대 6개까지 (슬라이더 3~6개 계획 유지) |

**수정 파일**: `news.ts`, `NewsBoard.tsx`, `admin/news/page.tsx`, `news/route.ts`

---

## 수정 파일 요약

| 파일 | 변경 내용 |
|------|----------|
| `src/data/news.ts` | `excerpt` 제거, `featured` 추가, 기존 데이터 수정 |
| `src/components/home/NewsBoard.tsx` | 자동 슬라이딩 (5초 간격 + 호버 정지) |
| `src/components/home/NewsBoard.tsx` | `featured` 필터 적용 |
| `src/app/admin/layout.tsx` | `sessionStorage` 토큰 저장 |
| `src/app/admin/news/page.tsx` | 메인 노출(featured) 토글 버튼 추가 |
| `src/app/admin/news/_components/NewsForm.tsx` | 요약 textarea 제거 |
| `src/app/api/admin/news/route.ts` | `excerpt` 제거, `featured` 지원 |

---

## 구현 순서

1. `news.ts` 데이터 모델 수정 (`excerpt` 제거, `featured` 추가)
2. `NewsBoard.tsx` 자동 슬라이딩 + featured 필터
3. `admin/layout.tsx` sessionStorage 인증
4. `NewsForm.tsx` 요약 필드 제거
5. `admin/news/page.tsx` featured 토글 버튼
6. `news/route.ts` API 수정
7. 타입체크 + 빌드

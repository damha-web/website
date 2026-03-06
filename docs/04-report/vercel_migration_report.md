# Vercel 배포 마이그레이션 결과 보고서

> 작성일: 2026-03-06
> 상태: **로컬 구현 완료** (Vercel 배포 대기)

---

## 구현 요약

파일시스템 기반 뉴스 CRUD/이미지 업로드를 Upstash Redis + Vercel Blob으로 전환 완료.
타입체크 + 프로덕션 빌드 통과.

---

## 변경 내역

### 1. 신규 파일

| 파일 | 역할 |
|------|------|
| `src/lib/redis.ts` | Upstash Redis 싱글턴 인스턴스 |
| `src/app/api/news/route.ts` | 공개 뉴스 조회 API (featured 필터, 60초 ISR 캐시) |
| `src/app/api/admin/seed/route.ts` | 데이터 시딩 API (기존 9개 뉴스 데이터, 1회용) |
| `vercel.json` | 서울 리전(icn1) 설정 |

### 2. 수정 파일

| 파일 | 변경 내용 |
|------|----------|
| `src/app/api/admin/news/route.ts` | `fs` + `eval()` → `@upstash/redis` (`redis.get/set`) |
| `src/app/api/admin/upload/route.ts` | `fs.writeFile` → `@vercel/blob` (`put()`) |
| `src/components/home/NewsBoard.tsx` | 정적 `import { newsItems }` → `fetch("/api/news")` |
| `src/data/news.ts` | `newsItems` 배열 삭제, 타입 + `categoryColors`만 유지 |

### 3. 삭제 파일

| 파일 | 사유 |
|------|------|
| `public/assets/images/pc001007479_original.jpg` | 7.5MB, 코드 참조 없음 |

---

## 빌드 결과

- `tsc --noEmit`: 타입 에러 없음
- `next build`: 성공 (16개 라우트, 1.9초 컴파일)
- Redis 환경변수 미설정 경고 → Vercel 배포 시 Marketplace 연동으로 자동 해결

---

## Vercel 배포 시 남은 작업

```
Step 1: Vercel 프로젝트 생성 (GitHub 연동)
Step 2: Vercel Marketplace → Upstash Redis 스토어 생성 (서울 리전)
Step 3: Vercel Storage → Blob 스토어 생성
Step 4: 환경변수 확인 (UPSTASH_*, BLOB_*, ADMIN_PASSWORD)
Step 5: 배포 (vercel deploy --prod)
Step 6: 시딩 API 호출 (POST /api/admin/seed)
Step 7: 카페24 도메인 DNS 변경 (A: 76.76.21.21, CNAME: cname.vercel-dns.com)
Step 8: 배포 후 검증 체크리스트 수행
```

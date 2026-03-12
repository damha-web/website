# 신규 도메인 구입 및 Vercel 연결 계획서

> 작성일: 2026-03-12
> 배경: 카페24 리셀러 서비스 제약(*.damha.co.kr 와일드카드 CNAME 삭제 불가)으로 기존 도메인 직접 연결 포기
> 목표: 신규 도메인 구입 → Vercel 연결 → 기존 damha.co.kr에서 301 리다이렉트

---

## 1. 신규 도메인 선정

### 추천 후보

| 도메인 | 연비용(예상) | 특징 | 추천도 |
|--------|------------|------|--------|
| `damha.com` | $20/년 (Vercel), 약 2~3만원(가비아) | 글로벌 표준, 신뢰도 높음 | ★★★★★ |
| `damha.kr` | 약 1~2만원/년 (가비아 등) | 국내 인식도 높음, 저렴 | ★★★★☆ |
| `damha.co` | $28/년 | 모던, 스타트업 감성 | ★★★☆☆ |

**권장: `damha.com`** — 병원 마케팅 에이전시 특성상 글로벌 신뢰도가 높고, 향후 해외 진출 가능성도 열려 있음

### 구입처 옵션

| 구입처 | 장점 | 단점 |
|--------|------|------|
| **Vercel** (권장) | 구입 즉시 자동 DNS 연결, 별도 네임서버 설정 불필요 | 달러 결제 |
| 가비아 | 원화 결제, 한국어 지원 | 네임서버를 Vercel로 변경하는 단계 필요 |
| Cloudflare | 원가(ICANN 수수료만) 판매, 강력한 DNS | 달러 결제, 영문 인터페이스 |

---

## 2. 전체 아키텍처

```
[사용자 접속]

① www.damha.co.kr 접속
   → Cafe24 서버 (기존 .htaccess)
   → 301 Redirect → https://damha.com

② damha.co.kr 접속
   → Cafe24 서버 (기존 .htaccess)
   → 301 Redirect → https://damha.com

③ damha.com 접속
   → Vercel (신규 도메인, SSL 자동)
   → Next.js 앱 서비스
```

---

## 3. 단계별 작업 계획

### Phase 1 — 신규 도메인 구입 (5분)

**Vercel에서 구입하는 경우** (권장):
1. Vercel 대시보드 → Domains → Buy
2. `damha.com` 검색 후 구입
3. 구입 완료 시 **자동으로 해당 Vercel 프로젝트에 연결 가능**

**가비아에서 구입하는 경우**:
1. gabia.com에서 `damha.com` 구입
2. 가비아 네임서버를 Vercel NS로 변경 (Phase 2에서 진행)

---

### Phase 2 — 신규 도메인 Vercel 연결 (10분)

**Vercel에서 구입한 경우**:
- Settings → Domains → 구입한 도메인 자동 연결됨
- SSL 자동 발급 (수분 내)

**가비아에서 구입한 경우**:
1. Vercel → Settings → Domains → `damha.com` 추가
2. Vercel이 제공하는 네임서버 4개 확인
3. 가비아 → 도메인 관리 → 네임서버 변경 → Vercel NS 입력
4. 전파 대기 (최대 48시간, 보통 1~2시간)
5. Vercel에서 Valid Configuration 확인

---

### Phase 3 — 카페24 .htaccess 301 리다이렉트 수정 (10분)

기존 `.htaccess`의 리다이렉트 규칙을 수정합니다.

**현재** (`www.damha.co.kr` → `www.damha.co.kr`):
```apache
RewriteCond %{HTTP_HOST} ^damha\.co\.kr$ [NC]
RewriteRule ^(.*)$ https://www.damha.co.kr/$1 [L,R=301]
```

**변경 후** (모든 접속 → `damha.com`):
```apache
RewriteEngine On
# damha.co.kr / www.damha.co.kr → damha.com (301 영구 이동)
RewriteCond %{HTTP_HOST} ^(www\.)?damha\.co\.kr$ [NC]
RewriteRule ^(.*)$ https://damha.com/$1 [L,R=301]
```

작업 방법: 카페24 웹FTP → `/www/.htaccess` 수정

---

### Phase 4 — 코드 내 도메인 URL 업데이트 (5분)

신규 도메인 확정 후 아래 3개 파일 수정:

| 파일 | 현재 값 | 변경 값 |
|------|--------|---------|
| `src/app/layout.tsx:13` | `"https://website-r1cs.vercel.app"` | `"https://damha.com"` |
| `src/app/sitemap.ts:3` | `"https://damha.co.kr"` | `"https://damha.com"` |
| `src/app/web/page.tsx:49` | `"https://damha.co.kr"` | `"https://damha.com"` |

> **이메일 주소는 변경 불필요** — `web@damha.co.kr`, `brand@damha.co.kr`은 카페24 메일 서버가 계속 운영하므로 그대로 유지

---

### Phase 5 — 배포 및 검증 (5분)

1. 코드 변경 후 git push → Vercel 자동 배포
2. 검증 항목:

```bash
# 리다이렉트 확인
curl -sI https://damha.co.kr | grep -i location
curl -sI https://www.damha.co.kr | grep -i location

# 신규 도메인 직접 접속 확인
curl -sI https://damha.com | grep -i "HTTP\|server"

# sitemap URL 확인
curl -s https://damha.com/sitemap.xml | head -5
```

---

## 4. SEO 영향 및 대응

### 301 리다이렉트 SEO 효과
- Google은 301 리다이렉트를 통해 기존 도메인의 링크 권위(Link Equity) **90~99% 이전** 처리
- 기존 `damha.co.kr` 검색 노출은 수주~수개월 내 `damha.com`으로 자동 전환

### 권장 추가 조치
- Google Search Console에 신규 도메인 등록 (도메인 이전 도구 활용)
- `damha.co.kr`의 Search Console에서 "주소 변경" 신청

---

## 5. 전체 타임라인

| 단계 | 작업 | 소요 시간 |
|------|------|----------|
| Phase 1 | 도메인 구입 | 5분 |
| Phase 2 | Vercel 연결 | 10분 (+ NS 전파 대기 최대 2시간) |
| Phase 3 | .htaccess 수정 | 10분 |
| Phase 4 | 코드 업데이트 | 5분 |
| Phase 5 | 배포 및 검증 | 5분 |
| **합계** | | **35분 + 대기** |

---

## 6. 결정 필요 사항

검토 후 아래 항목을 결정해주세요:

- [ ] **도메인 선택**: `damha.com` / `damha.kr` / 기타
- [ ] **구입처**: Vercel / 가비아 / 기타
- [ ] **진행 시점**: 즉시 / 추후

결정되면 Phase 1부터 순서대로 진행하겠습니다.

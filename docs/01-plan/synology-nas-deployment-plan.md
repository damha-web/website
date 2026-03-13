# 담하 웹사이트 — 시놀로지 NAS 배포 계획서 (리스크 분리 전략)

> 작성일: 2026-03-13
> 대상 NAS: Synology DS1821+ (AMD Ryzen V1500B, DSM 7.x)
> NAS 로컬 접속: `coolk@192.168.0.252` (SSH 키 인증, `scp -O` 레거시 모드)
> 전략: **기존 Vercel 프로덕션 완전 무중단 유지 + NAS 병행 검증 후 최종 전환**
> **실행 중 발견 사항:**
> - 포트 3000은 기존 `node_rank-nextjs` 컨테이너가 사용 중 → **포트 3001** 사용
> - NAS에 git 미설치 → SCP(tar.gz) 방식으로 코드 업로드
> - Docker 소켓 권한: `sudo chown root:docker /var/run/docker.sock` 필요 (NAS 재시작 시 재설정 필요할 수 있음)

---

## 핵심 원칙

```
DNS를 건드리지 않는 한 기존 Vercel 배포는 절대 영향받지 않는다.
최종 전환은 DNS 변경 5분으로 끝난다.
```

---

## 전체 흐름

```
[Phase 1]  nas-deploy 브랜치 생성 + 코드 수정
               ↓
[Phase 2]  NAS 원타임 환경 설정
               ↓
[Phase 3]  NAS 초기 배포 → 내부 검증 (http://192.168.0.252:3001)
               ↓
[Phase 4]  nas.damha.kr 서브도메인 추가 → SSL + 리버스 프록시
           → 외부 검증 (https://nas.damha.kr)
           ※ 이 시점까지 www.damha.kr = Vercel 그대로
               ↓
[Phase 5]  전체 기능 완전 검증 통과
               ↓
[Phase 6]  nas-deploy → main 머지 + www.damha.kr DNS 전환 (5분)
               ↓
[Phase 7]  안정 운영 1~2주 → Vercel 아카이브 + nas.damha.kr 레코드 삭제
```

---

## 브랜치 전략

| 브랜치 | 용도 | 배포 대상 |
|--------|------|----------|
| `main` | 기존 프로덕션 코드 — **손대지 않음** | Vercel → www.damha.kr |
| `nas-deploy` | NAS 전용 코드 변경 포함 | NAS → nas.damha.kr (검증용) |

**검증 완료 후**: `nas-deploy` → `main` 머지 1회 → DNS 전환

---

## 아키텍처 (최종 전환 완료 후)

```
외부 사용자
    │ HTTPS (443)
    ▼
공유기 (포트포워딩 80, 443 → 192.168.0.252)
    │
    ▼
DSM nginx (시놀로지 내장)
    ├─ Host: www.damha.kr  → [리버스 프록시] → localhost:3001
    ├─ Host: damha.kr      → [리버스 프록시] → localhost:3001
    └─ 기타 요청           → [Web Station] → pricelist 등 기존 유지
    │
    ▼
Docker 컨테이너 (damha-web, 포트 3000)
    │  Next.js 16 앱
    ├─ 환경변수: /volume1/docker/damha/.env.local
    └─ 이미지 볼륨: /volume1/docker/damha/uploads/ ←→ /app/public/uploads/
    │
    ├── Upstash Redis (외부 서비스 — 변경 없음)
    └── 뉴스 이미지: NAS 로컬 파일시스템 (Vercel Blob 대체)
```

---

## 이전 502 재발 방지 설계

기존 pricelist Docker 실패 원인: 리버스 프록시가 죽은 컨테이너 포트(8080)를 가리킴.

**이번 대응책:**
1. **컨테이너 먼저, 프록시 나중** — `curl localhost:3001` 200 응답 확인 후에만 리버스 프록시 설정
2. **`--restart always`** — NAS 재시작 시 컨테이너 자동 복구
3. **Dockerfile HEALTHCHECK** — 앱 비정상 시 컨테이너 자동 재시작
4. **포트 분리** — 기존 Web Station(80/443), damha(Docker 3000) — 충돌 없음

---

## Phase 1 — nas-deploy 브랜치 생성 + 코드 수정

### 변경 대상 파일 (3개 수정 + 3개 신규)

**왜 NAS 빌드인가:**
Mac은 ARM64(Apple Silicon), NAS는 AMD64(AMD Ryzen). Mac에서 빌드하면 `sharp` 바이너리 아키텍처 불일치 → NAS에서 실행 불가. NAS에서 직접 `docker build`해야 올바른 AMD64 바이너리가 설치됨.

---

### 1-1. `next.config.ts` — standalone 출력 추가 (1줄)

```ts
const nextConfig: NextConfig = {
  output: 'standalone',   // ← 추가
  images: { ... },
  compiler: { ... },
  experimental: { ... },
  reactStrictMode: true,
  poweredByHeader: false,
};
```

---

### 1-2. `src/app/api/admin/upload/route.ts` — @vercel/blob → 파일시스템

```ts
// 제거:
import { put } from "@vercel/blob";

// 추가:
import fs from "fs/promises";
import path from "path";

// 변경 전 (57~60줄):
const blob = await put(`news/${filename}`, optimized, {
  access: "public",
  contentType: "image/webp",
});
return NextResponse.json({ path: blob.url, ... });

// 변경 후:
const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads", "news");
await fs.mkdir(UPLOAD_DIR, { recursive: true });
await fs.writeFile(path.join(UPLOAD_DIR, filename), optimized);
return NextResponse.json({ path: `/uploads/news/${filename}`, ... });
```

---

### 1-3. `package.json` — @vercel/blob 제거

```bash
npm uninstall @vercel/blob
```

---

### 1-4. 신규: `Dockerfile`

```dockerfile
# ─── Stage 1: 의존성 ────────────────────────────────────
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# ─── Stage 2: 빌드 ──────────────────────────────────────
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# ─── Stage 3: 실행 이미지 ────────────────────────────────
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN addgroup --system --gid 1001 nodejs \
 && adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

RUN mkdir -p /app/public/uploads/news \
 && chown -R nextjs:nodejs /app/public/uploads

HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD wget -qO- http://localhost:3001 > /dev/null 2>&1

USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]
```

---

### 1-5. 신규: `.dockerignore`

```
node_modules
.next
.env*.local
.git
docs
scripts
synology-nas-deployment-notes.md
*.md
Dockerfile
.dockerignore
```

---

### 1-6. 신규: `deploy-nas.sh` (개발 Mac에서 실행)

```bash
#!/bin/bash
# 사용법: ./deploy-nas.sh
set -e

NAS_USER="coolk"
NAS_HOST="192.168.0.252"

echo "▶ NAS 재배포 시작..."
ssh "${NAS_USER}@${NAS_HOST}" "bash /volume1/docker/damha/deploy.sh"
echo "✓ 완료"
```

---

### 1-7. 브랜치 작업 명령

```bash
# 개발 Mac에서:
git checkout -b nas-deploy
# (코드 수정 작업)
git add -p    # 변경사항 확인 후 스테이징
git commit -m "feat: NAS Docker 배포 설정 (standalone, 파일시스템 업로드, Dockerfile)"
git push origin nas-deploy
```

---

## Phase 2 — NAS 원타임 환경 설정

> SSH 접속: `ssh coolk@192.168.0.252`
> 최초 1회만 수행.

### 2-1. Container Manager(Docker) 확인

```bash
docker --version
# 없으면: DSM → 패키지 센터 → "Container Manager" 설치
```

### 2-2. 디렉토리 구조 생성

```bash
sudo mkdir -p /volume1/docker/damha/uploads/news
sudo chown -R coolk:users /volume1/docker/damha
```

최종 구조:
```
/volume1/docker/damha/
├── repo/         ← git clone (nas-deploy 브랜치)
├── uploads/      ← 뉴스 이미지 (배포해도 유지됨)
│   └── news/
├── .env.local    ← 환경변수 (git 외부 관리)
└── deploy.sh     ← NAS 측 재배포 스크립트
```

### 2-3. GitHub Deploy Key 설정

```bash
# NAS에서 SSH 키 생성
ssh-keygen -t ed25519 -C "damha-nas-deploy" -f ~/.ssh/damha_deploy -N ""
cat ~/.ssh/damha_deploy.pub   # 공개키 복사

cat >> ~/.ssh/config << 'EOF'
Host github.com
  IdentityFile ~/.ssh/damha_deploy
  StrictHostKeyChecking no
EOF
```

**GitHub 설정 (사용자 직접):**
`github.com/damha-web/website` → Settings → Deploy keys → Add deploy key
→ 공개키 붙여넣기 (Read-only 체크)

```bash
# 연결 확인
ssh -T git@github.com
```

### 2-4. nas-deploy 브랜치 클론

```bash
cd /volume1/docker/damha
git clone -b nas-deploy git@github.com:damha-web/website.git repo
```

### 2-5. 환경변수 파일 생성

현재 Vercel 환경변수 → NAS 이전. `BLOB_READ_WRITE_TOKEN` 제외.

```bash
cat > /volume1/docker/damha/.env.local << 'ENVEOF'
KV_REST_API_URL=실제값입력
KV_REST_API_TOKEN=실제값입력
ADMIN_PASSWORD=실제값입력
KAKAOWORK_WEBHOOK_URL=실제값입력
ENVEOF

chmod 600 /volume1/docker/damha/.env.local
```

> 값은 Vercel 대시보드 → Settings → Environment Variables에서 확인.

### 2-6. NAS 측 deploy.sh 생성

```bash
cat > /volume1/docker/damha/deploy.sh << 'DEPLOYEOF'
#!/bin/bash
set -e

APP_DIR="/volume1/docker/damha"
REPO_DIR="$APP_DIR/repo"
IMAGE="damha-web:latest"
CONTAINER="damha-web"

echo "[1/4] 코드 업데이트 (nas-deploy 브랜치)..."
cd "$REPO_DIR"
git pull origin nas-deploy

echo "[2/4] Docker 이미지 빌드 중... (약 5~8분)"
docker build -t "$IMAGE" .

echo "[3/4] 컨테이너 교체..."
docker stop "$CONTAINER" 2>/dev/null && docker rm "$CONTAINER" 2>/dev/null || true

docker run -d \
  --name "$CONTAINER" \
  --restart always \
  -p 3000:3000 \
  --env-file "$APP_DIR/.env.local" \
  -v "$APP_DIR/uploads:/app/public/uploads" \
  "$IMAGE"

echo "[4/4] 응답 확인..."
sleep 8
curl -sf http://localhost:3001 > /dev/null \
  && echo "✓ 서버 정상 응답" \
  || echo "⚠ 응답 없음 — docker logs $CONTAINER 확인 필요"

docker ps | grep "$CONTAINER"
DEPLOYEOF

chmod +x /volume1/docker/damha/deploy.sh
```

### 2-7. node:20-alpine 이미지 사전 다운로드

```bash
docker pull node:20-alpine
```

---

## Phase 3 — NAS 초기 배포 + 내부 검증

```bash
# NAS SSH에서:
bash /volume1/docker/damha/deploy.sh
```

**내부 검증 (사무실 내 브라우저):**

```
http://192.168.0.252:3001          ← 홈 페이지
http://192.168.0.252:3001/about
http://192.168.0.252:3001/web
http://192.168.0.252:3001/admin/news
```

```bash
# 컨테이너 상태 확인
docker ps
docker logs damha-web --tail 30
curl -I http://localhost:3001      # HTTP/1.1 200 OK
```

> **중요**: 이 단계에서 리버스 프록시 설정 금지. 컨테이너 정상 확인 후 다음 Phase 진행.

---

## Phase 4 — nas.damha.kr 서브도메인으로 외부 검증

### 4-1. NAS 공인 IP 확인

```bash
# NAS SSH에서:
curl -s https://ifconfig.me
```

> **유동 IP인 경우**: Synology DDNS 설정 후 `xxx.synology.me`로 우선 진행.
> **고정 IP인 경우**: 바로 A 레코드 추가.

### 4-2. 카페24 DNS — nas.damha.kr 서브도메인 추가

| 레코드 | 호스트 | 값 | 비고 |
|--------|--------|-----|------|
| A | `nas` | NAS 공인 IP | 신규 추가 |
| A | `www` | 76.76.21.21 (Vercel) | **변경 없음** |

> `www.damha.kr`은 이 단계에서 절대 변경하지 않음.

### 4-3. DSM GUI — SSL 인증서 발급 (사용자 직접)

1. DSM → **제어판** → **보안** → **인증서** → **추가**
2. Let's Encrypt → 도메인: `nas.damha.kr`
3. 발급 후 해당 인증서를 `nas.damha.kr`에 적용

### 4-4. DSM GUI — 리버스 프록시 설정 (사용자 직접)

> **컨테이너가 정상 동작 중일 때만 설정 (Phase 3 완료 후).**

DSM → 제어판 → 로그인 포털 → 고급 → 리버스 프록시 → 생성

| 항목 | 값 |
|------|----|
| 소스 프로토콜 | HTTPS |
| 소스 호스트명 | `nas.damha.kr` |
| 소스 포트 | 443 |
| 대상 프로토콜 | HTTP |
| 대상 호스트명 | `localhost` |
| 대상 포트 | **3001** |

### 4-5. 외부 검증

```bash
# DNS 전파 확인 (10분~1시간):
dig nas.damha.kr +short     # NAS 공인 IP 반환되면 완료

# 사이트 확인:
curl -I https://nas.damha.kr
```

**브라우저 검증 체크리스트:**

```
https://nas.damha.kr              ← 홈, 애니메이션, 클라이언트 클라우드
https://nas.damha.kr/about
https://nas.damha.kr/services
https://nas.damha.kr/portfolio
https://nas.damha.kr/web          ← 웹제작부 페이지 전체
https://nas.damha.kr/admin/news   ← 어드민 로그인
```

**기능 검증 체크리스트:**

- [ ] 뉴스 슬라이더 로딩 (Redis 연결)
- [ ] 어드민 로그인 (`ADMIN_PASSWORD` 환경변수)
- [ ] 뉴스 생성 + 이미지 업로드 → `/uploads/news/` 저장 확인
- [ ] 카카오워크 웹훅 수신 확인 (`/web` 문의 폼 제출)
- [ ] 모바일 반응형 확인
- [ ] 이미지 최적화 (`next/image`) 작동 확인

---

## Phase 5 — 검증 통과 기준

아래 항목이 모두 통과되어야 Phase 6 진행 가능:

| 항목 | 기준 |
|------|------|
| 전체 페이지 렌더링 | 6개 주요 페이지 정상 |
| API 응답 | 뉴스 API, 어드민 CRUD 정상 |
| 이미지 업로드 | NAS 파일시스템에 저장 확인 |
| 카카오워크 알림 | 실제 수신 확인 |
| 모바일 반응형 | iOS Safari, Android Chrome |
| 성능 | Lighthouse 점수 기존 대비 유사 |
| 재배포 테스트 | `./deploy-nas.sh` 1회 실행 후 정상 |

---

## Phase 6 — 프로덕션 전환 (검증 완료 후)

### 6-1. nas-deploy → main 머지

```bash
# 개발 Mac에서:
git checkout main
git merge nas-deploy
git push origin main
```

### 6-2. www.damha.kr / damha.kr 리버스 프록시 규칙 추가

DSM → 리버스 프록시 → 생성 (2개 추가)

**규칙 1 — www.damha.kr**

| 항목 | 값 |
|------|----|
| 소스 프로토콜 | HTTPS |
| 소스 호스트명 | `www.damha.kr` |
| 소스 포트 | 443 |
| 대상 포트 | **3001** |

**규칙 2 — damha.kr (apex)**

| 소스 호스트명 | `damha.kr` |
|---|---|
| 대상 포트 | **3001** |

### 6-3. SSL 인증서 — www.damha.kr 발급

DSM → 인증서 → 추가 → Let's Encrypt → `www.damha.kr`, `damha.kr`

### 6-4. DNS 전환 (카페24)

NAS 공인 IP 재확인 후 변경:

| 레코드 | 현재 | 변경 |
|--------|------|------|
| `damha.kr` A | `76.76.21.21` (Vercel) | NAS 공인 IP |
| `www.damha.kr` A | Vercel 값 | NAS 공인 IP |

### 6-5. 전환 후 즉시 확인

```bash
# DNS 전파 확인:
dig www.damha.kr +short

# 프로덕션 사이트 확인:
curl -I https://www.damha.kr    # HTTP/2 200
```

---

## Phase 7 — 마무리

> 안정 운영 **1~2주** 후 진행.

- [ ] Vercel 대시보드 → 프로젝트 → Settings → **Archive Project**
- [ ] Vercel Blob 파일 정리 (뉴스 이미지 재업로드 완료 후)
- [ ] `nas.damha.kr` DNS A 레코드 삭제 (카페24)
- [ ] DSM 리버스 프록시에서 `nas.damha.kr` 규칙 삭제
- [ ] `nas.damha.kr` SSL 인증서 삭제

---

## 정기 재배포 절차

```bash
# 개발 Mac에서 코드 수정 후:
git push origin main   # (전환 후에는 main 브랜치)

# NAS 재배포 (약 5~8분):
./deploy-nas.sh
```

> 재배포 중 약 **30~60초 다운타임** 발생. 업무 시간 외 권장.

---

## 운영 관리 명령어

```bash
ssh coolk@192.168.0.252

# 상태 확인
docker ps
docker stats damha-web

# 로그 확인
docker logs damha-web -f --tail 50

# 재시작 (코드 변경 없이)
docker restart damha-web

# 업로드 용량
du -sh /volume1/docker/damha/uploads/

# 오래된 이미지 정리
docker image prune -f
```

---

## 포트포워딩 확인

pricelist 프로젝트가 이미 외부 접근 가능했다면 이미 설정된 상태. 없으면 추가.

| 외부 포트 | 내부 IP | 내부 포트 |
|---------|--------|---------|
| 80 | 192.168.0.252 | 80 |
| 443 | 192.168.0.252 | 443 |

> NAS IP는 공유기에서 DHCP 예약으로 고정 권장.

---

## 리스크 관리

| 리스크 | 대응 |
|--------|------|
| NAS 빌드 실패 | `docker logs` 확인. Vercel은 DNS 전까지 안전 |
| 502 재발 | 컨테이너 실행 확인 후 프록시 설정 순서 준수 |
| 공인 IP 변경 | Synology DDNS → CNAME 방식 전환 |
| NAS 정전 | `--restart always` 자동 복구. UPS 권장 |
| 배포 실패 시 롤백 | DNS를 Vercel IP로 되돌리면 즉시 복구 |

---

## 전체 체크리스트 요약

### Phase 1 — 코드 (개발 Mac) ✅ 완료 (2026-03-13)
- [x] `git checkout -b nas-deploy`
- [x] `next.config.ts` — `output: 'standalone'` 추가
- [x] `upload/route.ts` — `@vercel/blob` → 파일시스템 교체
- [x] `npm uninstall @vercel/blob`
- [x] `Dockerfile` 생성 (3-stage: deps → builder → runner)
- [x] `.dockerignore` 생성
- [x] `deploy-nas.sh` 생성 + `chmod +x`
- [x] `git push origin nas-deploy`

### Phase 2 — NAS 설정 (SSH) ✅ 완료 (2026-03-13)
- [x] Container Manager 확인 (Docker 24.0.2)
- [x] 디렉토리 생성 (`/volume1/docker/damha/`)
- [x] SSH 키 인증 설정 (`~/.ssh/id_ed25519`)
- [x] Docker 소켓 권한 수정 (`chown root:docker`)
- [x] GitHub Deploy Key 설정 (read-only)
- [x] `git clone -b nas-deploy` 완료
- [x] `.env.local` 작성 (KAKAOWORK_WEBHOOK_URL만 초기 설정)
- [x] `deploy.sh` 작성 (git pull → docker build → container 교체)
- [x] `docker pull node:20-alpine`
- [x] Git Server 패키지 설치 (SCP → git pull 방식으로 전환)

### Phase 3 — 내부 검증 ✅ 완료 (2026-03-13)
- [x] `bash deploy.sh` 실행 성공 (빌드 ~2분)
- [x] `http://192.168.0.252:3001` 접속 확인
- [x] 포트 3001 사용 확정 (3000은 기존 `node_rank-nextjs` 점유)

### Phase 4 — 외부 검증 (nas.damha.kr) ✅ 완료 (2026-03-13)
- [x] NAS 공인 IP 확인: `106.246.205.74`
- [x] 카페24 DNS `nas` A 레코드 추가 (www 변경 없음)
- [x] 공유기 포트포워딩 80/443 → NAS 확인
- [x] DSM 리버스 프록시: `nas.damha.kr:443 → localhost:3001`
- [x] Let's Encrypt `nas.damha.kr` SSL 인증서 발급
- [x] `https://nas.damha.kr` HTTPS 200 정상 응답 확인

### Phase 5 — 전체 기능 검증 ✅ 완료 (2026-03-13)
- [x] `.env.local` 환경변수 추가 (KV_REST_API_URL, KV_REST_API_TOKEN, ADMIN_PASSWORD)
- [x] Redis(Upstash) 연동 확인 — 뉴스 API 9개 데이터 정상 반환
- [x] 전체 페이지 렌더링: `/`, `/about`, `/services`, `/portfolio`, `/web` 모두 200
- [x] 어드민 `/admin/news` 접속 정상
- [x] 이미지 업로드 동적 서빙 라우트 추가 (`src/app/uploads/news/[...path]/route.ts`)
  - Next.js standalone 모드는 런타임 추가 파일을 정적 서빙 불가 → API 라우트로 해결
  - 볼륨 마운트 권한 문제 해결 (`chmod 777 uploads/`)
- [x] 뉴스 이미지 업로드 + 썸네일 표시 정상 확인

**발견 및 해결한 이슈:**
1. **EACCES 권한 오류**: 호스트 uploads 디렉토리가 컨테이너 nextjs(uid 1001) 쓰기 불가 → `chmod 777` 적용
2. **이미지 404**: standalone 모드에서 런타임 추가 파일은 Next.js 정적 서빙 불가 → `[...path]` catch-all API 라우트로 파일 서빙 구현

### Phase 6 — 전환 (진행 예정)
- [ ] `nas-deploy → main` 머지
- [ ] DSM 리버스 프록시: `www.damha.kr → localhost:3001`, `damha.kr → localhost:3001` 추가
- [ ] Let's Encrypt `www.damha.kr` SSL 인증서 발급
- [ ] 카페24 DNS: `www` A 레코드 → NAS 공인 IP 변경
- [ ] 카페24 `.htaccess` 리다이렉트 제거 (더 이상 카페24 서버 경유 안 함)
- [ ] `https://www.damha.kr` 정상 동작 확인

### Phase 7 — 마무리
- [ ] 1~2주 안정 운영 확인
- [ ] Vercel 아카이브
- [ ] `nas.damha.kr` 레코드 및 프록시 삭제

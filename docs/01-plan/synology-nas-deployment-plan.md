# 담하 웹사이트 — 시놀로지 NAS 배포 계획서

> 작성일: 2026-03-13
> 대상 NAS: Synology DS1821+ (AMD Ryzen V1500B, DSM 7.x)
> NAS 로컬 접속: `coolk@192.168.0.252`
> 목표: Vercel 상업 정책 우회 + 자체 서버 완전 통제

---

## 1. 기존 배포 기록 분석 (synology-nas-deployment-notes.md 기반)

### 확인된 사실

| 항목 | 내용 |
|------|------|
| NAS 로컬 IP | `192.168.0.252` |
| SSH 사용자 | `coolk` |
| SCP 방식 | `scp -O` (레거시 모드 필수 — Synology SFTP 프로토콜 호환 문제) |
| Web Station | `/volume1/web/` 에서 정적 파일 서빙 중 (pricelist 프로젝트) |
| 포트 포워딩 | 80/443 → NAS 이미 설정된 것으로 추정 (pricelist 외부 접근 가능) |
| 이전 Docker 시도 | 컨테이너 `pricelist-web` 포트 8080 → **502 Bad Gateway** → 제거됨 |

### 이전 502 실패 원인 분석

**원인**: 리버스 프록시가 `192.168.0.252:8080`을 가리키는 상태에서 컨테이너(pricelist-web)가 중단되어 있었음.
**결과**: 모든 요청이 502로 실패 → Docker 포기, Web Station 정적 방식으로 전환.

### damha 프로젝트가 Web Station 정적 방식을 사용할 수 없는 이유

```
pricelist : Vite 정적 SPA → dist/ 업로드 → Web Station 서빙 ✅ 가능
damha     : Next.js 16 + API Routes (5개) + ISR + sharp 이미지 처리
            → 서버 런타임(Node.js) 필수 → 정적 파일 방식 불가 ❌
```

**API Routes 목록** (모두 서버 런타임 필요):
- `GET /api/news` — Redis 조회 + ISR 60초 캐시
- `GET/POST/PUT/DELETE /api/admin/news` — 뉴스 CRUD
- `POST /api/admin/upload` — 이미지 업로드 + sharp 최적화
- `POST /api/admin/seed` — Redis 시딩
- `POST /api/web-contact` — 카카오워크 웹훅 전송

→ **Docker(Container Manager) + 리버스 프록시 구성이 유일한 방법**

---

## 2. 아키텍처 설계

### 최종 구성도

```
외부 사용자
    │ HTTPS (443)
    ▼
공유기 (포트포워딩 80, 443 → 192.168.0.252)
    │
    ▼
DSM nginx (시놀로지 내장)
    ├─ Host: www.damha.kr  → [리버스 프록시] → localhost:3000
    ├─ Host: damha.kr      → [리버스 프록시] → localhost:3000
    └─ 기타 요청           → [Web Station] → /volume1/web/ (pricelist 등 기존 유지)
    │
    ▼
Docker 컨테이너 (damha-web, 포트 3000)
    │  Next.js 16 앱
    ├─ 환경변수: /volume1/docker/damha/.env.local
    └─ 이미지 볼륨: /volume1/docker/damha/uploads/ ←→ /app/public/uploads/
    │
    ├── Upstash Redis (외부, 기존 유지 — 변경 없음)
    └── 뉴스 이미지: NAS 로컬 파일시스템 (Vercel Blob 대체)
```

### 이전 502 재발 방지 전략

1. **컨테이너 먼저, 리버스 프록시 나중**: 컨테이너가 실제로 `curl localhost:3000` 응답할 때까지 리버스 프록시 규칙 추가 안 함
2. **`--restart always`**: NAS 재시작 시 자동으로 컨테이너 재실행
3. **헬스체크 포함**: Dockerfile에 HEALTHCHECK 추가 → 컨테이너 비정상 시 자동 재시작
4. **포트 분리**: 기존 pricelist(Web Station 80/443), damha(Docker 3000) — 포트 충돌 없음

---

## 3. 코드 변경 사항 (프로젝트 수정)

> **3개 파일 수정 + 3개 신규 파일 추가**

### 3-1. `next.config.ts` — standalone 출력 모드 추가 (1줄)

Docker 배포에 최적화된 Next.js standalone 모드. 최소 파일셋으로 실행 가능.

```ts
// 변경 전
const nextConfig: NextConfig = {
  images: { ... },
  ...
};

// 변경 후
const nextConfig: NextConfig = {
  output: 'standalone',   // ← 이 줄 추가
  images: { ... },
  ...
};
```

---

### 3-2. `src/app/api/admin/upload/route.ts` — @vercel/blob → 파일시스템

```ts
// 제거할 줄:
import { put } from "@vercel/blob";

// 추가할 줄:
import fs from "fs/promises";
import path from "path";

// 변경 전 (57~60번 줄):
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

### 3-3. `package.json` — @vercel/blob 제거

```bash
npm uninstall @vercel/blob
```

---

### 3-4. 신규: `Dockerfile` (프로젝트 루트)

> **핵심 결정**: NAS에서 직접 Docker 이미지 빌드.
> 이유: Mac(ARM64)에서 빌드 시 `sharp` 바이너리가 linux/amd64(NAS)와 호환 안 됨.
> DS1821+ AMD Ryzen V1500B는 빌드 성능 충분 (예상 빌드 시간: 약 4~7분).

```dockerfile
# ─── Stage 1: 의존성 설치 ───────────────────────────────
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
# 빌드 시 환경변수 불필요 (런타임에만 사용됨)
RUN npm run build

# ─── Stage 3: 실행 이미지 (최소 크기) ────────────────────
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# 비루트 사용자 생성 (보안)
RUN addgroup --system --gid 1001 nodejs \
 && adduser --system --uid 1001 nextjs

# standalone 빌드 결과물 복사
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# 업로드 디렉토리 생성 (볼륨 마운트 포인트)
RUN mkdir -p /app/public/uploads/news \
 && chown -R nextjs:nodejs /app/public/uploads

# 헬스체크 (비정상 감지 시 자동 재시작)
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD wget -qO- http://localhost:3000/api/health 2>/dev/null || \
      wget -qO- http://localhost:3000 > /dev/null 2>&1

USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]
```

---

### 3-5. 신규: `.dockerignore` (프로젝트 루트)

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

### 3-6. 신규: `deploy-nas.sh` (프로젝트 루트 — 개발 맥에서 실행)

개발 Mac에서 SSH로 NAS에 명령을 전달해 재배포를 트리거하는 스크립트.

```bash
#!/bin/bash
# 담하 웹사이트 NAS 배포 스크립트 (Mac에서 실행)
# 사용법: ./deploy-nas.sh
set -e

NAS_USER="coolk"
NAS_HOST="192.168.0.252"
DEPLOY_SCRIPT="/volume1/docker/damha/deploy.sh"

echo "▶ NAS 배포 시작..."
ssh "${NAS_USER}@${NAS_HOST}" "bash ${DEPLOY_SCRIPT}"
echo "✓ 배포 완료"
```

---

## 4. NAS 원타임 초기 설정

> SSH 접속: `ssh coolk@192.168.0.252`
> 아래 작업은 최초 1회만 수행. 이후 재배포 시 불필요.

### Phase 1 — Container Manager 확인 (5분)

```bash
# SSH 접속 후
docker --version
# Docker version 20.x 이상이면 OK
# 없으면: DSM → 패키지 센터 → "Container Manager" 설치 후 재시도
```

---

### Phase 2 — 디렉토리 구조 생성 (2분)

```bash
sudo mkdir -p /volume1/docker/damha/uploads/news
sudo chown -R coolk:users /volume1/docker/damha
chmod 755 /volume1/docker/damha
```

최종 디렉토리 구조:
```
/volume1/docker/damha/
├── repo/           ← git clone 위치 (코드)
├── uploads/        ← 뉴스 이미지 영구 저장 (배포해도 삭제 안 됨)
│   └── news/
├── .env.local      ← 환경변수 (절대 git에 포함 금지)
└── deploy.sh       ← NAS 측 재배포 스크립트
```

---

### Phase 3 — GitHub 접근 설정 (10분)

NAS에서 Private GitHub 레포를 클론하기 위한 SSH Deploy Key 설정.

```bash
# NAS에서 SSH 키 생성
ssh-keygen -t ed25519 -C "damha-nas-deploy" -f ~/.ssh/damha_deploy -N ""
cat ~/.ssh/damha_deploy.pub
# 출력된 공개키를 복사

# SSH 설정 추가
cat >> ~/.ssh/config << 'EOF'
Host github.com
  IdentityFile ~/.ssh/damha_deploy
  StrictHostKeyChecking no
EOF
```

**GitHub 설정 (사용자 직접):**
1. `github.com/damha-web/website` → Settings → Deploy keys → Add deploy key
2. 위에서 복사한 공개키 붙여넣기 (Title: "Synology DS1821+", Read-only: ✓)
3. Add key 클릭

```bash
# 연결 확인
ssh -T git@github.com
# "Hi damha-web! You've successfully authenticated..." 메시지 확인
```

---

### Phase 4 — 코드 클론 (5분)

```bash
cd /volume1/docker/damha
git clone git@github.com:damha-web/website.git repo
ls repo/   # 파일 목록 확인
```

---

### Phase 5 — 환경변수 파일 생성 (5분)

현재 Vercel 환경변수를 NAS로 이전. `BLOB_READ_WRITE_TOKEN`은 삭제.

```bash
cat > /volume1/docker/damha/.env.local << 'ENVEOF'
KV_REST_API_URL=여기에_실제값_입력
KV_REST_API_TOKEN=여기에_실제값_입력
ADMIN_PASSWORD=여기에_실제값_입력
KAKAOWORK_WEBHOOK_URL=여기에_실제값_입력
ENVEOF

chmod 600 /volume1/docker/damha/.env.local
```

> 실제 값은 현재 Vercel 대시보드 → Settings → Environment Variables에서 확인.

---

### Phase 6 — NAS 측 배포 스크립트 작성 (3분)

```bash
cat > /volume1/docker/damha/deploy.sh << 'DEPLOYEOF'
#!/bin/bash
set -e

APP_DIR="/volume1/docker/damha"
REPO_DIR="$APP_DIR/repo"
IMAGE="damha-web:latest"
CONTAINER="damha-web"

echo "[1/4] 코드 업데이트..."
cd "$REPO_DIR"
git pull origin main

echo "[2/4] Docker 이미지 빌드 중... (약 4~7분 소요)"
docker build -t "$IMAGE" .

echo "[3/4] 기존 컨테이너 교체..."
docker stop "$CONTAINER" 2>/dev/null && docker rm "$CONTAINER" 2>/dev/null || true

docker run -d \
  --name "$CONTAINER" \
  --restart always \
  -p 3000:3000 \
  --env-file "$APP_DIR/.env.local" \
  -v "$APP_DIR/uploads:/app/public/uploads" \
  "$IMAGE"

echo "[4/4] 상태 확인..."
sleep 5
docker ps | grep "$CONTAINER"
curl -sf http://localhost:3000 > /dev/null && echo "✓ 서버 응답 정상" || echo "⚠ 서버 응답 없음 — docker logs damha-web 확인"

echo "배포 완료"
DEPLOYEOF

chmod +x /volume1/docker/damha/deploy.sh
```

---

### Phase 7 — node:20-alpine 이미지 사전 다운로드 (5분)

빌드 시 자동으로 받지만, 미리 받아두면 첫 빌드가 빠름.

```bash
docker pull node:20-alpine
```

---

## 5. 초기 배포 (최초 1회)

```bash
# NAS SSH에서:
bash /volume1/docker/damha/deploy.sh

# 완료 후 확인:
docker ps                          # STATUS: Up X seconds (healthy)
docker logs damha-web --tail 30   # 오류 없는지 확인
curl -I http://localhost:3000      # HTTP/1.1 200 OK 확인
```

> **리버스 프록시는 이 단계 완료 후에만 설정.** 컨테이너가 정상 응답하기 전에 설정하면 이전과 같은 502 발생.

---

## 6. DSM GUI 설정 (사용자 직접 — 약 15분)

> SSH로 처리할 수 없는 DSM 전용 GUI 작업.

### 6-1. SSL 인증서 발급

1. DSM → **제어판** → **보안** → **인증서** 탭
2. **추가** 클릭 → **Let's Encrypt에서 인증서 발급** 선택
3. 도메인 이름: `www.damha.kr`
4. 주체 대체 이름(SAN): `damha.kr` (선택, 같이 발급 권장)
5. **확인** 클릭 → 자동 발급 (약 1분)
6. 발급 후 **구성** 클릭 → `www.damha.kr` 인증서를 **기본**으로 설정

> Let's Encrypt 인증서는 90일 유효, DSM이 자동 갱신.
> 단, NAS가 80번 포트로 외부에서 접근 가능해야 발급 됨 (포트포워딩 확인 필요).

---

### 6-2. 리버스 프록시 설정

> **반드시 5번(초기 배포)이 완료된 후 진행.**

1. DSM → **제어판** → **로그인 포털** → **고급** 탭 → **리버스 프록시**
2. **생성** 클릭 후 아래 값 입력:

**규칙 1 — www.damha.kr**

| 항목 | 값 |
|------|----|
| 설명 | damha 메인사이트 |
| 소스 프로토콜 | HTTPS |
| 소스 호스트명 | `www.damha.kr` |
| 소스 포트 | 443 |
| HSTS 활성화 | 체크 |
| 대상 프로토콜 | HTTP |
| 대상 호스트명 | `localhost` |
| 대상 포트 | **3000** |

**규칙 2 — damha.kr (apex)**

| 항목 | 값 |
|------|----|
| 소스 프로토콜 | HTTPS |
| 소스 호스트명 | `damha.kr` |
| 소스 포트 | 443 |
| 대상 프로토콜 | HTTP |
| 대상 호스트명 | `localhost` |
| 대상 포트 | **3000** |

3. 저장 후 — **NAS 내부에서 먼저 테스트 금지** (DNS가 아직 Vercel을 가리킴)

---

## 7. 도메인 DNS 전환

> **이 단계는 NAS 설정이 완전히 완료되고 검증된 후 수행.**
> 현재 www.damha.kr은 Vercel(76.76.21.21)을 가리키는 상태.

### 사전 확인 (전환 전)

```bash
# NAS 공인 IP 확인 (NAS SSH에서):
curl -s https://ifconfig.me
# 또는 공유기 관리 페이지에서 WAN IP 확인
```

> **공인 IP가 유동이면**: Synology DDNS 또는 별도 DDNS 서비스 설정 후 CNAME으로 연결.
> **공인 IP가 고정이면**: A 레코드로 직접 연결.

### DNS 변경 (카페24 도메인 관리)

| 레코드 | 현재 값 | 변경 값 |
|--------|--------|--------|
| `damha.kr` A | `76.76.21.21` (Vercel) | NAS 공인 IP |
| `www.damha.kr` A 또는 CNAME | Vercel 값 | NAS 공인 IP |
| `damha.co.kr` .htaccess | → www.damha.kr (현행 유지) | 변경 없음 |

### 전환 후 검증

```bash
# DNS 전파 확인 (약 10분~1시간 소요):
dig www.damha.kr +short         # NAS 공인 IP가 반환되면 전파 완료

# 사이트 접속 확인:
curl -I https://www.damha.kr    # HTTP/2 200
```

---

## 8. 기존 Vercel Blob 이미지 처리

현재 Redis에 저장된 뉴스 9건의 `imageUrl`이 Vercel Blob CDN 주소를 가리킴.

```
현재: https://blob.vercel-storage.com/news/1234567890-news-xxx.webp
전환: /uploads/news/1234567890-news-xxx.webp (NAS 로컬)
```

**처리 방법 (NAS 전환 완료 후):**

1. **어드민 페이지** `https://www.damha.kr/admin/news` 접속
2. 각 뉴스의 이미지를 새로 업로드 (9건 × 1분 = 약 10분)
3. 또는 아래 스크립트로 일괄 마이그레이션:

```bash
# NAS SSH에서 — Vercel Blob URL을 로컬로 다운로드
mkdir -p /volume1/docker/damha/uploads/news

# Redis에서 뉴스 데이터 확인 후 imageUrl 목록 추출하여 wget으로 일괄 다운로드
# (어드민 재업로드가 더 간단하면 그 방법 사용 권장)
```

---

## 9. 정기 재배포 절차

코드 수정 후 재배포하는 방법. **개발 Mac에서 실행.**

```bash
# 1. 코드 수정 후 git push
git push origin main

# 2. NAS 재배포 (약 5~10분 소요)
./deploy-nas.sh

# 또는 직접:
ssh coolk@192.168.0.252 "bash /volume1/docker/damha/deploy.sh"
```

> 재배포 중 약 **30~60초 다운타임** 발생.
> 업무 시간 외 배포 권장 (트래픽이 적은 새벽 등).

---

## 10. 운영 관리 명령어

```bash
# SSH 접속
ssh coolk@192.168.0.252

# 컨테이너 상태 확인
docker ps
docker stats damha-web

# 로그 실시간 확인
docker logs damha-web -f --tail 50

# 앱 재시작 (코드 변경 없이)
docker restart damha-web

# 업로드 이미지 용량 확인
du -sh /volume1/docker/damha/uploads/

# 오래된 Docker 이미지 정리 (디스크 절약)
docker image prune -f
```

---

## 11. 포트포워딩 확인 및 설정

> pricelist 프로젝트가 이미 외부 접근 가능했다면 포트포워딩이 이미 설정되어 있을 가능성이 높음.
> 아래에서 확인 후, 없으면 추가.

**공유기에서 확인/추가할 규칙:**

| 외부 포트 | 내부 IP | 내부 포트 | 프로토콜 |
|---------|--------|---------|--------|
| 80 | 192.168.0.252 | 80 | TCP |
| 443 | 192.168.0.252 | 443 | TCP |

> 포트 3000은 외부에 직접 노출하지 않음 (DSM 리버스 프록시가 443→3000 전달).
> NAS IP(192.168.0.252)를 공유기에서 DHCP 예약 또는 고정 IP로 설정 권장.

---

## 12. 리스크 및 대응책

| 리스크 | 가능성 | 대응책 |
|--------|--------|--------|
| NAS 정전/재시작 | 중간 | `--restart always` → 자동 복구. UPS 설치 권장 |
| 인터넷 회선 불안정 | 낮음 | 기업 회선 사용 권장. 모바일 데이터 백업 고려 |
| 공인 IP 변경 (유동) | 낮음 | Synology DDNS → CNAME 방식으로 해결 |
| Docker 빌드 실패 | 낮음 | `docker logs` 확인. Vercel은 DNS 변경 전까지 유지 |
| 이미지 볼륨 데이터 손실 | 매우 낮음 | NAS 내 볼륨(`/volume1/docker/damha/uploads`) → Hyper Backup 포함 |
| 리버스 프록시 502 재발 | 낮음 | 컨테이너 실행 확인 후 프록시 설정. `--restart always`로 재발 방지 |
| Let's Encrypt 갱신 실패 | 낮음 | 포트 80 외부 개방 유지. DSM이 자동 갱신 처리 |

---

## 13. 전체 작업 체크리스트

### 코드 수정 (개발 Mac)

- [ ] `next.config.ts` — `output: 'standalone'` 추가
- [ ] `src/app/api/admin/upload/route.ts` — `@vercel/blob` → 파일시스템 교체
- [ ] `npm uninstall @vercel/blob`
- [ ] `Dockerfile` 생성 (프로젝트 루트)
- [ ] `.dockerignore` 생성
- [ ] `deploy-nas.sh` 생성
- [ ] `git push origin main`

### NAS 원타임 설정 (SSH)

- [ ] Phase 1: Container Manager(Docker) 설치 확인
- [ ] Phase 2: 디렉토리 구조 생성 (`/volume1/docker/damha/`)
- [ ] Phase 3: GitHub Deploy Key 생성 및 등록
- [ ] Phase 4: `git clone` 완료
- [ ] Phase 5: `.env.local` 작성 (환경변수 이전)
- [ ] Phase 6: `deploy.sh` 작성
- [ ] Phase 7: `docker pull node:20-alpine`

### 초기 배포

- [ ] `bash /volume1/docker/damha/deploy.sh` 실행
- [ ] `docker ps` — 컨테이너 실행 중 확인
- [ ] `curl http://localhost:3000` — 200 응답 확인

### DSM GUI (사용자 직접)

- [ ] Let's Encrypt SSL 인증서 발급 (`www.damha.kr`, `damha.kr`)
- [ ] 리버스 프록시 규칙 2개 추가 (3000번 포트)
- [ ] 포트포워딩 80/443 확인 및 추가

### DNS 전환 (최종)

- [ ] NAS 공인 IP 확인
- [ ] 카페24 DNS A 레코드 변경 (`www.damha.kr`, `damha.kr`)
- [ ] DNS 전파 완료 후 `https://www.damha.kr` 접속 확인
- [ ] Vercel 프로젝트 아카이브 (즉시 삭제 말고 1~2주 대기 후)

### 마무리

- [ ] 뉴스 이미지 재업로드 (어드민 페이지에서 9건)
- [ ] `deploy-nas.sh` 실행 권한: `chmod +x deploy-nas.sh`
- [ ] 전체 페이지 수동 점검 (홈, about, services, portfolio, /web, /admin)

---

## 14. 예상 총 작업 시간

| 구분 | 소요 시간 |
|------|---------|
| 코드 수정 + git push | 약 1시간 |
| NAS 원타임 설정 (Phase 1~7) | 약 1시간 |
| 초기 Docker 빌드 + 배포 | 약 10~15분 |
| DSM GUI (SSL + 프록시) | 약 20분 |
| DNS 전환 + 전파 대기 | 약 30분~1시간 |
| 이미지 재업로드 + 검증 | 약 30분 |
| **합계** | **약 3.5~4시간** |

---

## 15. 전환 후 Vercel 처리

DNS 전환 완료 + 1~2주 안정 운영 확인 후:

1. Vercel 대시보드 → 프로젝트 → Settings → **Archive Project** (즉시 삭제 금지)
2. Upstash Redis 는 독립 서비스이므로 Vercel 해지 후에도 계속 사용
3. Vercel Blob 저장된 이미지는 뉴스 재업로드 후 불필요 — Blob 스토리지 파일 정리

---

> 승인 후 진행 시, 코드 수정부터 순서대로 진행하겠습니다.
> NAS SSH 접속은 `coolk@192.168.0.252` (기존 scp 접속과 동일한 계정) 사용.

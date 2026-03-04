# 웹제작부 페이지 — 이미지 배치 계획

## 현재 상태

- 포트폴리오 디렉토리(`public/assets/images/portfolio/`)가 존재하지 않음
- CMS 스크린샷 디렉토리(`public/assets/images/cms/`)가 존재하지 않음
- PDF 소개서 페이지 이미지 37장이 `docs/pdf_pages/page_01~37.png`에 존재
- 기존 이미지 85개 (해시명 JPG 54개, 서비스 이미지, 로고 등)

---

## 1. 포트폴리오 썸네일 (15개)

### 디렉토리
```
public/assets/images/portfolio/
```

### 소싱 방법: PDF 소개서 포트폴리오 페이지에서 크롭

PDF 소개서의 포트폴리오 페이지(p.22~36)에 각 프로젝트의 PC+Mobile 디바이스 목업이 포함되어 있음.
이를 크롭하여 개별 썸네일로 활용.

### 파일 매핑표

| # | 파일명 | PDF 소스 | 병원명 | 권장 크기 |
|---|--------|----------|--------|----------|
| 1 | `dadaejeong.jpg` | page_22.png 좌측 목업 크롭 | 다대정내과 | 800x500 |
| 2 | `wooyoungha.jpg` | page_23.png 좌측 목업 크롭 | 우영하척정형외과 | 800x500 |
| 3 | `dangdang-ss.jpg` | page_24.png 좌측 목업 크롭 | 당당한의원 대구수성 | 800x500 |
| 4 | `pingent.jpg` | page_25.png 좌측 목업 크롭 | 핑이비인후과 | 800x500 |
| 5 | `solid-derma.jpg` | page_26.png 좌측 목업 크롭 | 솔리드피부과 | 800x500 |
| 6 | `gowoonbim.jpg` | page_27.png 좌측 목업 크롭 | 고운빔의원 | 800x500 |
| 7 | `hadanwomen.jpg` | page_28.png 좌측 목업 크롭 | 권현영산부인과 | 800x500 |
| 8 | `ssgmedi.jpg` | page_29.png 좌측 목업 크롭 | 신세계한방병원 | 800x500 |
| 9 | `kybos.jpg` | page_30.png 좌측 목업 크롭 | 김영복정형외과 | 800x500 |
| 10 | `dangdang-cw.jpg` | page_31.png 좌측 목업 크롭 | 창원당당한방병원 | 800x500 |
| 11 | `pureunskin.jpg` | page_32.png 좌측 목업 크롭 | 해운대푸른바다 피부과 | 800x500 |
| 12 | `minamhospital.jpg` | page_33.png 좌측 목업 크롭 | 부산미남병원 | 800x500 |
| 13 | `qhosp.jpg` | page_34.png 좌측 목업 크롭 | 큐병원 | 800x500 |
| 14 | `geo-in.jpg` | page_35.png 좌측 목업 크롭 | 거인병원 | 800x500 |
| 15 | `dangdang-ys.jpg` | page_36.png 좌측 목업 크롭 | 연산당당한방병원 | 800x500 |

### 크롭 가이드
- **영역**: 각 PDF 페이지 좌측의 PC 모니터 + 모바일 디바이스 목업 영역
- **비율**: 16:10 (800x500px)
- **포맷**: WebP 변환 권장 (80% quality), fallback으로 JPG
- **배경**: 투명 또는 밝은 그레이(#F5F5F5)로 통일

### 대안 소싱
PDF 크롭 품질이 낮을 경우:
1. 각 병원 URL에 직접 접속하여 풀스크린 캡처 (Puppeteer/Playwright)
2. 캡처한 이미지를 디바이스 목업 프레임에 합성
3. 800x500으로 리사이즈 + WebP 변환

---

## 2. CMS 스크린샷 (12개)

### 디렉토리
```
public/assets/images/cms/
```

### 소싱 방법: PDF 소개서 CMS 페이지에서 크롭

PDF 소개서 p.9~20에 CMS 관리 화면 스크린샷이 포함되어 있음.

### 파일 매핑표

| # | 파일명 | PDF 소스 | 기능명 | 크롭 영역 |
|---|--------|----------|--------|----------|
| 1 | `site-settings.png` | page_09.png | 사이트 설정 | 중앙 관리자 화면 영역 |
| 2 | `basic-info.png` | page_09.png | 기본 정보 설정 | 하단 기본정보 화면 |
| 3 | `schedule.png` | page_10.png | 진료일정 관리 | 중앙 진료일정 화면 |
| 4 | `doctors.png` | page_11.png | 의료진 관리 | 의료진 관리 화면 |
| 5 | `popup.png` | page_12.png | 팝업 관리 | 팝업 관리 화면 |
| 6 | `quick-menu.png` | page_13.png | 퀵메뉴 관리 | 퀵메뉴 화면 |
| 7 | `main-slide.png` | page_14.png | 메인 슬라이드 | 슬라이드 관리 화면 |
| 8 | `tour.png` | page_15.png | 둘러보기 | 둘러보기 관리 화면 |
| 9 | `equipment.png` | page_16.png | 장비 관리 | 장비 관리 화면 |
| 10 | `consultation.png` | page_17.png | 상담 관리 | 상담 관리 화면 |
| 11 | `board.png` | page_18.png | 게시판 관리 | 게시판 관리 화면 |
| 12 | `monthly-schedule.png` | page_19.png | 월별 진료일정 | 캘린더 화면 |

### 크롭 가이드
- **영역**: 각 페이지의 중앙 CMS 관리자 UI 스크린샷 부분 (좌측 사이드바 + 메인 콘텐츠)
- **비율**: 4:3 (1200x900px 또는 800x600px)
- **포맷**: PNG (스크린샷이므로 선명도 유지 중요)
- **처리**: 개인정보/민감 데이터가 보이면 블러 처리

### 대안 소싱
- 실제 CMS 스테이징 환경에서 직접 캡처 (데모 데이터 적용 상태)
- 디자인팀에서 고해상도 목업 제작

---

## 3. Hero 섹션 배경 이미지

### 현재 상태
WebHero.tsx에 CSS 그라디언트 배경만 적용. 디바이스 목업 슬라이드 배경 없음.

### 권장 소싱 (선택사항)
| 파일명 | 용도 | 권장 크기 |
|--------|------|----------|
| `web-hero-bg.jpg` | 메인 배경 (포트폴리오 콜라주) | 1920x1080 |
| `web-hero-mockup.png` | 디바이스 목업 (투명배경) | 1200x800 |

**소싱 방법**:
- 포트폴리오 썸네일 4~5개를 디바이스 목업 프레임에 합성
- 사선 배치 또는 floating 레이아웃으로 콜라주 구성
- 반투명 오버레이로 메인 카피 가독성 확보

---

## 4. 이미지 최적화 파이프라인

### 처리 순서

```
1. 원본 수집 (PDF 크롭 또는 직접 캡처)
2. 크기 조정 (권장 사이즈로 리사이즈)
3. 포맷 변환 (WebP: 포트폴리오, PNG: CMS)
4. 품질 설정 (WebP 80%, PNG lossless)
5. 파일 배치 (public/assets/images/ 하위)
```

### 자동화 스크립트 (sharp 활용)

```bash
# 포트폴리오 이미지 WebP 변환
npx sharp-cli --input portfolio/*.jpg --output portfolio/ --format webp --quality 80

# CMS 스크린샷 최적화
npx sharp-cli --input cms/*.png --output cms/ --format png --compressionLevel 9
```

### Next.js Image 컴포넌트 활용
- 모든 이미지를 `next/image`로 렌더링 (자동 WebP/AVIF 변환)
- `sizes` 속성으로 반응형 이미지 제공
- `priority` 속성으로 Above-the-fold 이미지 우선 로딩

---

## 5. 실행 체크리스트

### Phase A: 포트폴리오 썸네일 (우선순위 1)
- [ ] `public/assets/images/portfolio/` 디렉토리 생성
- [ ] PDF page_22~36에서 PC+Mobile 목업 영역 크롭 (15장)
- [ ] 800x500px로 리사이즈
- [ ] WebP 변환 (80% quality)
- [ ] `WebPortfolioGrid.tsx`에서 `next/image` 적용
- [ ] 포트폴리오 모달에서 풀사이즈 이미지 표시

### Phase B: CMS 스크린샷 (우선순위 2)
- [ ] `public/assets/images/cms/` 디렉토리 생성
- [ ] PDF page_09~20에서 CMS UI 영역 크롭 (12장)
- [ ] 1200x900px으로 리사이즈
- [ ] PNG 최적화 (압축 레벨 9)
- [ ] `CMSShowcase.tsx`에서 placeholder → 실제 이미지 교체

### Phase C: Hero 배경 (우선순위 3)
- [ ] 포트폴리오 콜라주 목업 이미지 제작
- [ ] `WebHero.tsx`에 배경 이미지 추가
- [ ] 모바일용 축소 버전 준비

### Phase D: 모달 상세 이미지 (우선순위 4)
- [ ] 포트폴리오 상세 모달용 풀페이지 스크롤 캡처 (PC/Mobile)
- [ ] 각 프로젝트별 2장 (PC 1장, Mobile 1장)
- [ ] 총 30장 준비

---

## 6. 코드 수정 필요사항

이미지 배치 후 아래 컴포넌트 업데이트 필요:

### WebPortfolioGrid.tsx
```tsx
// placeholder → next/image
import Image from "next/image";

// 카드 썸네일 영역
<Image
    src={item.thumbnail}
    alt={item.name}
    fill
    className="object-cover"
    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
/>
```

### CMSShowcase.tsx
```tsx
// placeholder → next/image
import Image from "next/image";

// CMS 스크린샷 패널
<Image
    src={`/assets/images/cms/${activeFeature.id}.png`}
    alt={activeFeature.title}
    fill
    className="object-contain"
    sizes="(max-width: 1024px) 100vw, 50vw"
/>
```

---

## 7. 파일 구조 최종 형태

```
public/assets/images/
├── portfolio/                    ← 신규 (15개)
│   ├── dadaejeong.jpg           (page_22 크롭)
│   ├── wooyoungha.jpg           (page_23 크롭)
│   ├── dangdang-ss.jpg          (page_24 크롭)
│   ├── pingent.jpg              (page_25 크롭)
│   ├── solid-derma.jpg          (page_26 크롭)
│   ├── gowoonbim.jpg            (page_27 크롭)
│   ├── hadanwomen.jpg           (page_28 크롭)
│   ├── ssgmedi.jpg              (page_29 크롭)
│   ├── kybos.jpg                (page_30 크롭)
│   ├── dangdang-cw.jpg          (page_31 크롭)
│   ├── pureunskin.jpg           (page_32 크롭)
│   ├── minamhospital.jpg        (page_33 크롭)
│   ├── qhosp.jpg                (page_34 크롭)
│   ├── geo-in.jpg               (page_35 크롭)
│   └── dangdang-ys.jpg          (page_36 크롭)
│
├── cms/                          ← 신규 (12개)
│   ├── site-settings.png        (page_09 크롭)
│   ├── basic-info.png           (page_09 크롭)
│   ├── schedule.png             (page_10 크롭)
│   ├── doctors.png              (page_11 크롭)
│   ├── popup.png                (page_12 크롭)
│   ├── quick-menu.png           (page_13 크롭)
│   ├── main-slide.png           (page_14 크롭)
│   ├── tour.png                 (page_15 크롭)
│   ├── equipment.png            (page_16 크롭)
│   ├── consultation.png         (page_17 크롭)
│   ├── board.png                (page_18 크롭)
│   └── monthly-schedule.png     (page_19 크롭)
│
└── (기존 이미지들 유지)
```

**총 필요 이미지: 27장 (포트폴리오 15 + CMS 12) + Hero 배경 2장 (선택)**

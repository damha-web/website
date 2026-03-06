# 클라이언트 아이콘 클라우드 (텍스트 ➔ 이미지) 전환 계획안

## 1. 개요
* **목적**: 현재 텍스트 및 기본 아이콘(Lucide) 기반으로 작동하는 3D 클라우드를, 실제 고객사의 고유 **로고 이미지 파일** 기반 클라우드로 전면 교체하여 브랜드 신뢰도 및 시각적 완성도를 극대화합니다.
* **로고 에셋 경로**: `/public/assets/images/client` 내 19개의 로고 파일 (예: `자산 2.png` ~ `자산 20.png`)
* **수정 대상**:
  - `src/data/clients.ts` (데이터 구조 및 매핑)
  - `src/components/ui/client-icon-cloud.tsx` (텍스트 대신 로고 이미지 렌더링하도록 컴포넌트 수정)

---

## 2. 작업 상세 계획

### 2.1 데이터 소스 구조 개편 (`src/data/clients.ts`)
기존에 단순 텍스트 배열이었던 `FEATURED_CLIENTS` 대신, 이름과 이미지 경로를 모두 갖춘 객체(Object) 배열 형태의 새로운 데이터 모음(`CLIENT_LOGOS`)을 생성합니다.

*현재 텍스트 목록은 46개지만 제공해 주신 로고 이미지 파일은 19장이 확인(`자산 2.png` ~ `자산 20.png`)되었습니다.*
*따라서 이미지가 존재하는 고객사를 선별하여 19장의 로고 데이터를 연결하는 매핑 작업을 수행합니다.*

**데이터 구조 예시:**
```typescript
export interface ClientLogo {
    id: number;
    name: string;
    imagePath: string; // 예: '/assets/images/client/자산 2.png'
}

export const CLIENT_LOGOS: ClientLogo[] = [
    { id: 2, name: "고객사1", imagePath: "/assets/images/client/자산 2.png" },
    { id: 3, name: "고객사2", imagePath: "/assets/images/client/자산 3.png" },
    // ... 총 19장
];
```

### 2.2 3D 클라우드 렌더링 방식 수정 (`client-icon-cloud.tsx`)
텍스트 노드(`<a ...><span>이름</span></a>`)를 반환하던 코드에서, Next.js의 내장 `<Image />` 또는 표준 HTML `<img>` 태그를 반환하도록 컴포넌트를 완전히 갈아끼웁니다.

**디자인 및 렌더링 주요 포인트:**
1. **Glassmorphism 제거 및 배경 투명화**:
   - 텍스트 캡슐에 입혔던 회색 반투명 테두리, 배경값(`blur`) 등을 모두 제거하고 로고 이미지만 허공에 깔끔하게 떠다니게 연출합니다.
2. **hover 인터랙션 (Grayscale ➔ Color)** (선택 옵션):
   - 평소에는 클라우드가 회전할 때 로고를 흑백(`grayscale`) 또는 살짝 불투명하게 처리하고, 사용자가 마우스를 로고 위에 올렸을 때 원래 색상과 또렷한 해상도로 스케일이 커지도록(`scale`) 효과를 줄 수 있습니다. (더욱 세련된 느낌 구사 가능)
3. **이미지 크기 제어**:
   - 로고 원본 파일들의 가로/세로 비율이 제각각일 수 있으므로 `max-width`, `max-height` (예: `w-32 h-auto` 등) CSS를 주어 로고들 크기의 밸런스를 맞춥니다.
4. **접근성(a11y) 보완**:
   - 이미지 렌더링 시 `alt` 속성에 해당 병원의 이름을 삽입하여 웹 표준 및 시각장애인 접근성, 그리고 SEO 점수를 높입니다.

### 2.3 프론트 컴포넌트 호출부 적용 (`PortfolioPreview.tsx`)
우측에 삽입되어 있던 기존 `<ClientIconCloud clients={FEATURED_CLIENTS} />` 구문을, 새로 교체한 `<ClientIconCloud logos={CLIENT_LOGOS} />` 속성(Props)으로 변경하여 호출합니다.

---

## 3. 검토 요청 사항
* 로고가 19장이 확인되었는데, 이 19장만 클라우드에 노출시켜도 괜찮을지 (혹은 로고가 없는 다른 병원은 텍스트로 보완하여 띄울지)
* 평소엔 로고들을 흑백 반투명으로 두었다가 Hover시 원래 색상과 또렷한 컬러로 나타나게 하는 **디자인 옵션**을 적용하는 것에 대한 승인

위 2가지 부분 확인해 주시고 **"진행해줘"** 라고 말씀해주시면, 제공해주신 19개 이미지를 경로에 매핑하여 즉각적인 로고 3D 모션 전환 작업을 시작하겠습니다!

# 클라이언트 아이콘 클라우드 (텍스트 ➔ 이미지) 전환 완료 보고서

> **작성일**: 2026-03-06
> **관련 문서**: `docs/01-plan/features/home-client-icon-cloud-image-refactor-plan.md`
> **수정 대상 파일**: 
> - `src/data/clients.ts`
> - `src/components/ui/client-icon-cloud.tsx`
> - `src/components/home/PortfolioPreview.tsx`

---

## 1. 개요 및 목적
기존의 단순 텍스트(`span`)와 기본 아이콘(Lucide) 조합으로 이루어졌던 3D 파트너스 클라우드를 **실제 병원 및 고객사가 제공한 원본 로고 이미지(`png`) 기반**으로 전면 전환 교체하였습니다.
이를 통해 브랜드 신뢰도 및 시각적인 완성도를 한층 더 높였습니다.

---

## 2. 세부 변경 사항

### 2.1 데이터 소스 구조 개편 (`src/data/clients.ts`)
기존 46개의 텍스트 배열 뒤편에, 로컬 `public` 폴더 안에 확인된 **19장의 고객사 원본 로고 데이터 객체**를 새롭게 맵핑하여 생성하였습니다.
* **추가 타입 선언**: `ClientLogo` (id, name, imagePath 포함)
* **신규 데이터 구축**: `CLIENT_LOGOS` (자산 2.png ~ 자산 20.png 연속 매핑)

### 2.2 클라우드 컴포넌트 렌더링 엔진 교체 (`src/components/ui/client-icon-cloud.tsx`)
텍스트를 뿌려주던 템플릿 코드에서, 넘겨받은 19개의 각 이미지 경로(`logo.imagePath`)를 통해 표준 HTML `<img>` 태그를 렌더링하는 컴포넌트로 구조를 완전히 엎고 교체했습니다.
* **디자인 최적화**: 허공에 진정한 로고만 떠다니도록 기존 텍스트용 CSS(반투명 바탕, 외곽선 글래스모피즘 등)를 모두 제거하여 시각적 여백 확보.

### 2.3 프론트 노출 파일 연결 (`src/components/home/PortfolioPreview.tsx`)
* 홈페이지의 **성공의 증명 (Our Partners & Works)** 섹션에 호출되던 기존 텍스트 더미(`FEATURED_CLIENTS`)를 해지하고, 새로 만든 로고 이미지 번들(`CLIENT_LOGOS`) 객체를 명시적으로 임포트하여 연결 완료.

---

## 3. 트러블슈팅: 로고 사이즈 제어 (TagCanvas 엔진 호환성)
**이슈 사항**: 
최초 적용 시 로고 이미지 크기가 변경되지 않고, 캔버스 엔진의 특성에 의해 화면 전체를 과도하게 차지하며 겹치는 렌더링 버그 발생.

**해결 방법**: 
1. 단순 Inline CSS를 통한 크기 제어(`width: 60px`)를 엔진이 무시함을 파악하고 삭제.
2. 3D 캔버스 엔진(`cloudProps`)의 전역 옵션 중 강제 2배 확대 설정 해제 (`imageScale: 2 ➔ 1`).
3. `<img>` 태그 코드 자체에 로고 엔진이 읽어들일 수 있는 하드 속성값 **`width={90}`**, **`height={45}`** 명시적 부여.

**결과**: 
현재 브라우저 및 모든 해상도에서 이미지 겹침(오버레이) 없이 **작고 앙증맞은 최적 비율 공간**을 유지하며 깔끔하게 3D로 회전하는 클라이언트 로고 뷰 구축 완료!

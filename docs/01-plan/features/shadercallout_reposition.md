# ShaderCallout 섹션 위치 변경 계획

## 1. 목적 및 개요
현재 홈 페이지(`src/app/page.tsx`)의 중간(`PhilosophySection`과 `PortfolioPreview` 사이)에 위치해 있는 **특정 그리드 배경 및 마스크 효과를 포함한 섹션(`ShaderCallout`)**을 페이지의 가장 하단(푸터 바로 위 위)으로 이동시키는 작업입니다.

이를 통해 페이지 전반의 흐름을 재정비하고, 문의/상담 유도 섹션으로 활용되는 부분을 페이지를 끝까지 읽은 사용자에게 노출시켜 전환율을 최적화(Call to Action)합니다.

## 2. 변경 대상
- **대상 파일:** `src/app/page.tsx`

## 3. 작업 내용 (레이아웃 순서 변경)

### 기존 순서
1. `Hero` (메인 히어로 영역)
2. `Products` (기능/서비스 영역)
3. `PhilosophySection` (철학 영역)
4. **`ShaderCallout` (변경 대상 섹션 - 현재 4번째)**
5. `PortfolioPreview` (포트폴리오 미리보기)
6. `TrustSection` (신뢰/리뷰 영역)

### 변경될 순서
1. `Hero`
2. `Products`
3. `PhilosophySection`
4. `PortfolioPreview`
5. `TrustSection`
6. **`ShaderCallout` (새로운 위치 - 푸터 직전 가장 하단)**

*(참고: 글로벌 푸터(Footer)는 프로젝트 구조상 `src/app/layout.tsx`의 하단에 위치하므로, `page.tsx`의 마지막 컴포넌트로 두면 자동으로 푸터 바로 위에 위치하게 됩니다.)*

---
> **다음 단계:** 위 위치 변경 계획을 확인하시고 승인(`진행해` 등)해 주시면, 바로 `src/app/page.tsx` 파일을 수정해 페이지 하단으로 배치를 변경하겠습니다!

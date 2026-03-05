# PhilosophySection 리디자인 리서치

## 현재 구현 (PhilosophySection.tsx)
- 구조: 좌 35% sticky 이미지 + 우 65% 스크롤 콘텐츠
- 배경: `damha_mesh_decor.png` (background-attachment: fixed, opacity 0.3)
- 이미지: `code.jpg` — 둥근 카드 + 플로팅 인용구
- 콘텐츠: 3개 항목 카드 형태 (space-y-[60vh])로 세로 스크롤
- 애니메이션: framer-motion useScroll + parallax + TextReveal
- 문제점: 스크롤 영역이 매우 길고(60vh 간격), 카드 형태가 참고 디자인과 다름

## 참고 사이트 (beautifulmom.net) 분석
- 레이아웃: 좌측 이미지(50%) + 우측 아코디언 리스트(50%)
- 좌측: 배경 이미지가 섹션 높이만큼 꽉 참 (cover)
  - 이미지 위에 반투명 오버레이 + 텍스트 ("아름다운엄마는 다릅니다")
- 우측: 6개 항목, 각각 번호(01~06) + 제목(볼드 강조) + 설명(호버 시 slideDown)
  - 호버 시 jQuery slideDown/slideUp 250ms
  - 항목 사이 구분선
  - 첫 번째 항목은 기본 열림 상태
- 전체 높이: 뷰포트 한 화면 정도, 스크롤 불필요한 컴팩트 레이아웃

## 담하 콘텐츠 (PHILOSOPHY_CONTENT — 3개)
1. id: 1 — "경험의 차이" / "실무자의 시선으로 현장을 해석합니다"
2. id: 2 — "전략의 본질" / "단순한 홍보가 아닌 경영을 마케팅합니다"
3. id: 3 — "신뢰의 증거" / "성과로 입증하는 담하의 파트너십"

## 사용 가능한 이미지
- `/assets/images/code.jpg` (현재 사용 중 — 코드/개발 느낌)
- `/assets/images/damha_mesh_decor.png` (현재 배경)
- `/assets/images/damha_parallax_img.png`, `damha_parallax_2.png`
- 기타 다수 이미지 (해시 파일명)

## 의존성
- framer-motion (기존 사용 중)
- TextReveal 컴포넌트 (기존 사용 중)
- customFadeInUp (기존 animation-variants)

# 아이콘 및 시각 요소(이모지 등) 검토 및 개선 계획서

## 1. 개요
현재 사이트 전체 페이지(About, Services, Portfolio, Web 등)를 심도 있게 검토한 결과, 전반적으로 `lucide-react`를 활용하여 깔끔하게 구성되어 있습니다. 
하지만 일부 섹션에서 **내용과 타이틀의 의미를 100% 직관적으로 전달하기에 다소 아쉬운 (또는 중복되는) 아이콘**들이 발견되었습니다.
이를 개선하여 각 내용과 타이틀에 완벽하게 어울리는 모양으로 변경하기 위한 추천 리스트를 정리했습니다.

---

## 2. 페이지별 검토 내역 및 추천 디자인 리스트

### 2.1. About 페이지 (`src/app/about/page.tsx`)
**[개선 필요 항목]**
1. **핵심 가치 - '현장 중심 사고'**
   - 현재: `Users` (일반적인 사용자 느낌)
   - **추천**: `BriefcaseMedical` 또는 `Stethoscope` (의료 현장에서의 경험과 실무를 직관적으로 표현)
2. **MOT 기반 고객 여정 - '진료 및 상담'**
   - 현재: `Users` 
   - **추천**: `MessageSquareHeart` 또는 `Stethoscope` (단순한 사람을 넘어 환자와 상담/진료하는 긍정적 경험 강조)
3. **MOT 기반 고객 여정 - '리뷰 및 추천'**
   - 현재: `CheckCircle2` (단순 체크 느낌)
   - **추천**: `ThumbsUp`, `Star`, 또는 `MessageCircle` (실제 고객 만족이나 후기를 더 잘 나타냄)
4. **공인된 전문성(Certifications)**
   - 현재: 4개의 인증에 `Award`, `ShieldCheck`, `ShieldCheck`, `FlaskConical` 사용 (ShieldCheck 중복)
   - **추천**: 두 번째 `ShieldCheck`를 `Medal` 또는 `FileBadge`로 변경하여 각 인증 항목의 고유성을 살림.

### 2.2. Services 페이지 (`src/app/services/page.tsx`)
**[개선 필요 항목]**
1. **Consulting 서비스 상세 - '고객 관리(CS) 및 조직 문화'**
   - 현재: `UserCheck` (사용자 인증 느낌)
   - **추천**: `HeartHandshake` 또는 `SmilePlus` (고객 만족과 따뜻한 병원 문화를 더 직관적으로 표현)
2. **Why Damha (왜 담하일까요?) 섹션**
   - 현재: 각 4개의 강점 항목 타이틀 옆에 획일적으로 `CheckCircle2` 사용
   - **추천**: 단순 체크 아이콘 대신, 각 번호 항목의 핵심을 찌르는 의미 있는 아이콘으로 개별 부여
     - 01 실무자 출신의 리얼 솔루션 ➔ `Stethoscope` 또는 `BriefcaseMedical`
     - 02 본질 중심의 통합 전략 ➔ `Combine` 또는 `Puzzle`
     - 03 데이터와 현장의 결합 ➔ `BarChart4` 또는 `LineChart`
     - 04 선택 받는 장기 파트너십 ➔ `Handshake`

### 2.3. 웹제작부 페이지 (`src/app/web/page.tsx` 하위 컴포넌트)
**[개선 필요 항목]**
1. **ProblemSection (외면받는 3가지 이유)**
   - 02 환자 기대와 서비스 간 격차
     - 현재: `Users` 
     - **추천**: `Unlink`, `Frown`, 또는 `ThumbsDown` (기대에 미치지 못하는 '단절'과 '격차'의 문제점 부각)
   - 03 운영의 불편함
     - 현재: `Settings` (단순 설정 느낌)
     - **추천**: `Wrench`, `Settings2`, 또는 `FileWarning` (유지보수가 까다롭고 손이 많이 가는 '불편함' 강조)
2. **DifferenceSection (담하가 다른 4가지 이유)**
   - 검토: `Lightbulb`, `Shield`, `Puzzle`, `Rocket`
   - 평가: 내용과 매우 훌륭하게 매치되며 굳이 바꿀 필요 없음 (유지 권장)

### 2.4. 홈 페이지 / Portfolio 페이지
- **전반적 평가**: `ArrowRight`, `TrendingUp` 등의 아이콘이 방향성과 성장성을 잘 나타내고 있어 우수함.
- **소소한 추천**: 홈 화면의 `Products.tsx` 에서 사용된 `ArrowRight` (자세히 보기)를 `ArrowUpRight`로 변경하면 조금 더 트렌디하고 동적인(성장하는) 느낌을 가미할 수 있습니다.

---

## 3. 진행 제안

위 정리된 내용을 바탕으로 코드를 수정할 준비가 되었습니다.
사용자님께서 위 추천 리스트를 검토해 보시고, **"제안한 대로 변경을 진행해 줘"** 혹은 **"특정 부분은 다른 모양으로 해 줘"** 라고 피드백을 주시면, 해당 페이지들의 아이콘 컴포넌트를 즉각 교체 및 적용하겠습니다.

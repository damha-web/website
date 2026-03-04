# 서브 에이전트 적용 계획서 (Sub-Agent Implementation Plan)

> **목적:** `subagent-strategy.md` 문서를 기반으로, 토큰 사용량을 최소화하면서도 동일한 능동형 오케스트레이션(Autonomous Orchestration) 효과를 내기 위한 대체 및 단계적 도입 전략입니다. 프로젝트의 최적화 규칙(`GEMINI.md`)을 철저히 준수합니다.

## 📌 주요 전략: 외부 MCP 최소화 & 내장 도구 극대화
- 무겁고 설정이 복잡한 외부 MCP(Sequential Thinking, UI Dev, Context7) 서버 구동을 지양.
- 메인 에이전트의 자체 내장 도구(Browser 제어, Knowledge 관리, 코드 생성 능력)와 "PDCA 사고 방식"을 명시적으로 적용하는 프로세스로 이를 대체합니다.

---

### 🚀 Phase 1: 자체 워크플로우 정립 (즉시 도입)
**내장 기능과 행동 원칙 변경만으로 효과 달성**
- **PDCA 사이클 내재화**: `SequentialThinking` MCP 대체
  - 설계, 복잡한 로직, 버그 픽스 수행 시 암묵적인 코딩을 피하고, [계획 ➔ 실행 ➔ 검증 ➔ 개선] 절차를 먼저 작성 후 개발.
- **브라우저 QA 프로세스**: 내장 `Browser Subagent` 가동
  - 프론트엔드 작업 완료 시 즉시 브라우저 에이전트를 호출하여 **WebP 녹화 분석 및 렌더링 확인**을 필수 수행.
- **컨텍스트 엔지니어링**: 내장 `Knowledge Subagent` 활용
  - 대화 시작 전후로 KI(Knowledge Item)를 생성 및 참조하여 중복 분석 제거.

### 🛠 Phase 2: 로컬 스크립트 기반 확장 (Figma & Data)
**무거운 서버 통신 대신, 경량화된 스크립트로 도구화**
- **Figma 연동 (`scripts/sync-figma.js`)**: 
  - `TalkToFigma` 서버 대신, 단발성 스크립트를 작성하여 디자인 토큰(Color, Typography) 등을 추출하고 `tailwind.config.ts` 및 전역 CSS 변수에 주입.
- **데이터 검증 프로세스 (`scripts/data-process.py` 등)**:
  - `notebook_mcp` 대체. 복잡한 비즈니스 로직이나 반복 작업은 로컬 Python/Node 스크립트화 하여 메인 에이전트가 `run_command`로 호출 후 결과값만 확인.

### 🧩 Phase 3: 필수 외부 연동 에이전트 선별 도입 (필요시)
**명확한 ROI(투자 대비 효율)가 확보될 때만 추가**
- 완전 자동화가 절실한 영역(예: PR 생성 및 형상 관리 고도화)에서만 `github` MCP 서버 등의 설정을 `~/.gemini/antigravity/mcp_config.json` 에 선별적으로 추가.
- 그 이전까지는 터미널을 통한 `git` 명령어 권한 위임으로 대체 가능.

---

## 📝 다음 단계 액션 아이템
1. Phase 1 규칙을 프로젝트 글로벌 가이드라인(`GEMINI.md` 또는 `PROJECT.md`)에 공식 컨벤션으로 추가.
2. 진행 예정인 개발 작업 사이클부터 PDCA + 브라우저 QA 즉각 적용.
3. (선택) 곧바로 Phase 2의 스크립트 작성에 돌입.

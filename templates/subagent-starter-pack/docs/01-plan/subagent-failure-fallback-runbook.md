# Subagent Failure & Fallback Runbook v1

목적: 실패 상황에서 재시도/폴백/중단 경로를 표준화한다.

## 1. 공통 정책

- 재시도: 동일 조건 기준 최대 2회
- 백오프: 1차 실패 후 즉시 원인 기록, 2차 시 입력 축소 후 재시도
- 실패 판정: 동일 에러 반복, 검증 불가, 권한/보안 충돌 발생

## 2. 에이전트별 폴백

- `stitch+bkit` 실패:
  - 폴백: 수동 컴포넌트 구현 + DESIGN.md 준수 체크
- `SequentialThinking` 실패:
  - 폴백: 문제를 2~3단계로 단순 분해 후 보수적으로 실행
- `browser_subagent` 실패:
  - 폴백: 정적 코드 분석 + 스크린샷 기반 대체 검증
- `context7` 실패:
  - 폴백: 프로젝트 내부 문서/버전 고정 정보 우선 사용, 최신성 불확실성 명시
- 외부 연동(`github`, `TalkToFigma`, `notebook_mcp`) 실패:
  - 폴백: 로컬 산출물 정리 후 수동 실행 안내 초안 생성

## 3. 중단 및 승인 요청 조건

아래 중 하나라도 해당하면 자동 진행을 중단하고 승인 대기한다.

- 권한 상승이 필요한 작업
- 보안 민감정보 처리 가능성
- 파괴적 변경(삭제/리셋 등) 필요
- 정확성 임계치 미달(검증 실패 상태)

## 4. 사고 기록 템플릿

```text
[INCIDENT]
step:
agent:
error:
retry_count:
fallback_used:
status: blocked | recovered
```

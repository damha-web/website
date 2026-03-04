# Subagent Agent Contract Spec v1

목적: 에이전트 간 핸드오프 시 누락을 줄이고 토큰 사용량을 통제한다.

## 1. 입력 계약 (Input Contract)

모든 서브 에이전트 호출은 아래 5개 필드를 필수로 포함한다.

1. `goal`: 이번 호출에서 달성할 단일 목표
2. `constraints`: 기술/디자인/권한 제약
3. `inputs`: 참조 파일, 데이터, 선행 결정사항
4. `success_criteria`: 완료 판정 조건
5. `prohibited`: 금지 작업(예: destructive command, 범위 외 수정)

## 2. 출력 계약 (Output Contract)

모든 서브 에이전트 응답은 아래 형식으로 보고한다.

1. `summary`: 수행 내용 3줄 이내
2. `changed_files`: 수정 파일 목록
3. `verification`: 실행한 검증과 결과
4. `risks`: 남은 리스크/가정
5. `next_action`: 다음 추천 액션 1개

## 3. 핸드오프 템플릿

```text
[HANDOFF]
goal:
constraints:
inputs:
success_criteria:
prohibited:
```

```text
[RESULT]
summary:
changed_files:
verification:
risks:
next_action:
```

## 4. 권장 핸드오프 체인

- 전략 -> 구현: `SequentialThinking -> stitch+bkit`
- 최신성 검증 -> 구현: `context7 -> domain agent`
- 구현 -> 검증: `stitch+bkit -> browser_subagent`
- 구현/검증 -> 외부 연동: `domain agent -> github/TalkToFigma`

## 5. 토큰 관리 규칙

- 입력 `inputs`는 필요한 파일만 제한적으로 포함
- 긴 기록은 전문 대신 요약(결정사항/미해결 항목)만 전달
- 동일 컨텍스트 재사용 시 중복 설명 생략, 변경점만 추가

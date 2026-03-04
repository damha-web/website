# Subagent Routing Matrix v1

목적: 동일 유형 요청에 대해 일관된 라우팅 결정을 보장한다.

## 1. 작업 분류 체계

- `ui_build`: UI 컴포넌트/페이지 설계 및 구현
- `complex_reasoning`: 구조 설계, 전략 수립, 원인 분석
- `browser_validation`: 실제 브라우저 검증
- `knowledge_refresh`: 최신 문서/레퍼런스 확인
- `external_ops`: GitHub/Figma/데이터 연동

## 2. 우선순위 규칙

1. 안전/권한 제약
2. 요구 산출물 타입(코드, 설계, 검증 아티팩트)
3. 비용/지연 최소화

## 3. 매핑 표

| 요청 신호 | 1차 에이전트 | 2차 에이전트 | 필수 산출물 |
|---|---|---|---|
| "컴포넌트 구현", "레이아웃", "Tailwind" | `stitch+bkit` | `browser_subagent` | 변경 파일 + UI 검증 |
| "아키텍처", "전략", "원인 분석" | `SequentialThinking` | 필요 시 `context7` | 설계안 + 결정 근거 |
| "클릭/타이핑 검증", "실사용 플로우 점검" | `browser_subagent` | 필요 시 `SequentialThinking` | 비디오/스크린샷 + 결과 |
| "최신 공식 문서", "버전 차이 확인" | `context7` | 해당 도메인 에이전트 | 출처 요약 + 반영 항목 |
| "PR/브랜치/리뷰", "Figma 매핑", "계산 검증" | `github`/`TalkToFigma`/`notebook_mcp` | 필요 시 `SequentialThinking` | 실행 로그 + 결과물 |

## 4. 충돌 해결 예시

- UI 구현 요청이지만 "최신 API 적용"이 명시된 경우:
  - `context7` 선행 후 `stitch+bkit` 실행
- 전략 + 구현이 동시에 요청된 경우:
  - `SequentialThinking`으로 작업 분해 후 2개 이하 에이전트 순차 실행

## 5. 운영 제한

- 초기 라우팅에서 동시 활성화는 최대 2개
- 재시도는 에이전트별 최대 2회
- 2회 실패 시 폴백 또는 사용자 승인 대기

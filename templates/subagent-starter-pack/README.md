# Subagent Starter Pack

다른 프로젝트에 서브 에이전트 운영 전략을 빠르게 이식하기 위한 템플릿 묶음이다.

## 포함 파일

- `subagent-strategy.md`
- `docs/01-plan/subagent-routing-matrix.md`
- `docs/01-plan/subagent-agent-contract-spec.md`
- `docs/01-plan/subagent-failure-fallback-runbook.md`
- `docs/01-plan/subagent-quality-gate-checklist.md`
- `AGENTS.snippet.md`

## 적용 방법 (새 프로젝트 루트에서 실행)

```bash
mkdir -p docs/01-plan
cp /ABS/PATH/TO/subagent-starter-pack/subagent-strategy.md .
cp /ABS/PATH/TO/subagent-starter-pack/docs/01-plan/subagent-*.md docs/01-plan/
```

`/ABS/PATH/TO/subagent-starter-pack`는 이 저장소 기준으로 아래 경로다.

`/Users/coolk/Claudecode/damha/templates/subagent-starter-pack`

## 적용 후 필수 수정

1. `subagent-strategy.md`:
- 프로젝트 디자인/도메인 제약으로 교체
- 사용하지 않는 에이전트/툴 제거

2. `docs/01-plan/subagent-routing-matrix.md`:
- 도메인 키워드와 요청 신호를 프로젝트 용어로 교체

3. `AGENTS.md`:
- `AGENTS.snippet.md` 내용을 추가해서 우선 참조 규칙 고정

## 최소 검증 절차

1. 복합 요청 1건 실행
2. 라우팅 매트릭스 기준으로 에이전트 선택 확인
3. 계약 템플릿(입력/출력) 누락 여부 확인
4. Quality Gate 체크리스트 완료 확인

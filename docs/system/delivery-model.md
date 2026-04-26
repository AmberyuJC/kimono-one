# Delivery Model

Kimono One follows a fixed long-running task loop:

1. `planner`: writes or updates the plan.
2. `implementer`: ships the scoped change.
3. `evaluator`: verifies independently with tests and smoke checks.
4. `reviewer`: looks for bugs, regressions, and missing tests.

Operational expectations:

- Medium and large tasks belong in `docs/plans/active`.
- Acceptance criteria are locked before implementation.
- A task is not done until evaluator evidence exists.
- Rewrite work follows `docs/system/rewrite-workflow.md`.
- Completed rewrite slices are archived in `docs/traces/rewrite-ledger.md`.

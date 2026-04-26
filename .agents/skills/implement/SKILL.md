---
name: implement
description: Execute an approved plan using test-driven development. Red-green-refactor loop, one vertical slice at a time. Use when starting implementation of any approved plan.
---

# implement

Execute an approved plan with TDD discipline. One acceptance criterion at a time, vertical not horizontal.

## Before starting

1. Read the active plan in `docs/plans/active/`. It is the execution contract.
2. Identify which acceptance criteria need tests. Each testable criterion becomes one red-green cycle.
3. Read only the files relevant to the first criterion. Do not scan the whole codebase.

## For each acceptance criterion

### RED

4. Write one failing test that describes the expected behavior through a public interface.
5. Run `pnpm test`. Confirm the test fails for the right reason (not a syntax error or import issue).

### GREEN

6. Write the smallest implementation that makes the test pass. No speculative features.
7. Run `pnpm test`. All tests must pass.

### REFACTOR

8. Look for duplication or unclear naming in the code you just touched. Refactor only what tests cover.
9. Run `pnpm test && pnpm lint && pnpm typecheck`. Everything must stay green.

Repeat steps 4-9 for the next criterion. Never write multiple failing tests at once.

## After all criteria

10. Run `pnpm check:harness` to verify boundary rules and harness integrity.
11. Summarize exactly what changed, what tests were added, and what remains unverified.

## Rules

- Stay inside the plan's stated scope. Do not silently widen the task.
- Respect all boundary rules: `app/` must not import `src/db/`, `src/domains/` must not import React/Hono.
- Mock only at system boundaries (external APIs, database). Never mock your own code.
- Tests verify behavior, not implementation. A test should survive internal refactoring.

## Reference

- [ref/tdd-loop.md](ref/tdd-loop.md) — vertical slice path and TDD philosophy
- [ref/test-patterns.md](ref/test-patterns.md) — project-specific test patterns to reuse

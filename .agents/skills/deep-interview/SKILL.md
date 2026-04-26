---
name: deep-interview
description: Clarify goals, constraints, and acceptance criteria before any medium or large task. Explores the codebase first, asks humans only what code cannot answer. Use when a request is underspecified or when starting a non-trivial task.
---

# deep-interview

Use this skill when a request is underspecified or before any medium/large task starts.

## Process

1. **State the goal** in one sentence. If you cannot state it clearly, the request needs more context.

2. **Search the codebase before asking the human.** For every question you are about to ask, first check whether the answer already exists in the code, docs, contracts, or tests. See [ref/codebase-sources.md](ref/codebase-sources.md) for the file list. If you find the answer, state it as a fact and move on.

3. **Ask one question at a time.** Do not batch questions. Wait for the answer before asking the next one. For each question, provide your recommended answer based on what you found in the codebase.

4. **Identify what is explicitly out of scope.** Name the things this task will NOT do.

5. **Lock the acceptance criteria.** Each criterion must be verifiable by a specific command or test:
   - Service behavior → vitest assertion
   - API contract → Hono `app.request()` test
   - UI behavior → Playwright locator check
   - Boundary rule → `pnpm check:harness`

6. **Refuse to start implementation** until the task boundary is stable and the plan passes `scripts/check-plan-format.ts` structure requirements (Why, Non-goals, Scope, Acceptance Criteria, Verification, Rollback).

## Reference

- [ref/codebase-sources.md](ref/codebase-sources.md) — files to check before asking a human

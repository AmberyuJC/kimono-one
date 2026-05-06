# Plan: Harness Continuity

## Why

The existing harness has strong rules, CI checks, and architecture documentation, but it does not yet give Claude Code a complete restartable workflow. A fresh session can miss project memory, lack active state, or fail verification because dependencies are not initialized.

## Non-goals

- No product feature changes.
- No database schema or runtime migration.
- No changes to UI, API behavior, booking flow, or fixture data.
- No attempt to benchmark agent performance in this slice.

## Scope

- Add a Claude Code project memory entrypoint.
- Add Claude Code project agents that mirror the documented planner, implementer, evaluator, and reviewer loop.
- Add minimal session state files for progress, feature status, and handoff.
- Add a bootstrap command for fresh workspaces.
- Extend harness self-checks so these artifacts are required.

## Acceptance Criteria

- [x] Claude Code can start from a root `CLAUDE.md` and find the repo startup workflow.
- [x] Planner, implementer, evaluator, and reviewer are available under `.claude/agents`.
- [x] Long-running work has a restartable state path in `docs/state`.
- [x] A fresh workspace has a single initialization command before verification.
- [x] `pnpm check:harness` requires the new harness artifacts.
- [x] Existing architecture boundary and validation rules remain intact.

## Verification

- `./init.sh`
- `pnpm check:harness`
- `pnpm lint`
- `pnpm typecheck`
- `pnpm test`
- `pnpm test:e2e`
- Additional task-specific checks:
  - `pnpm check:agent-context`
  - `pnpm exec prettier --check CLAUDE.md AGENTS.md .claude/settings.json .claude/agents/planner.md .claude/agents/implementer.md .claude/agents/evaluator.md .claude/agents/reviewer.md docs/state/progress.md docs/state/session-handoff.md docs/state/feature-list.json docs/plans/active/2026-05-05-harness-continuity.md package.json scripts/check-agent-context.ts`

Evidence:

- `./init.sh` passed after installing dependencies and running `pnpm check:harness`.
- `pnpm check:harness` passed: 36 harness files verified, 3 plan files verified, 29 TypeScript files scanned for boundaries, 26 production source files scanned for `console.*`.
- `pnpm lint` passed.
- `pnpm typecheck` passed.
- `pnpm test` passed: 3 test files, 8 tests.
- `pnpm test:e2e` passed: desktop and mobile booking smoke tests.
- Targeted Prettier check passed for files changed in this slice.
- `pnpm db:reset` was not run because this slice does not change database schema, seed data, or repository mapping.

## Rollback

Remove `CLAUDE.md`, `.claude/agents/*`, `docs/state/*`, `init.sh`, `scripts/bootstrap.sh`, and the added harness file requirements. Revert `AGENTS.md`, `package.json`, and `scripts/check-agent-context.ts` to their previous harness artifact set.

## Decision Log

- Use root `CLAUDE.md` as a Claude Code-specific routing layer instead of duplicating all durable system rules.
- Keep durable session state in `docs/state` so it can be versioned and checked by the harness.
- Keep bootstrap as a shell script because it must work before TypeScript dependencies are installed.
- Bootstrap checks for `node_modules/.bin/tsx`, not only `node_modules`, because a failed install can leave a partial dependency directory.

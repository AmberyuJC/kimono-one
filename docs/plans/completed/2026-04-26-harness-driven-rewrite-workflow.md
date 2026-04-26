# Plan: Harness-Driven Rewrite Workflow

## Why

Kimono One needs a repo-first workflow for gradually rewriting
`~/hefumiyabi-website` without turning Obsidian notes or legacy code into the
execution source of truth.

## Legacy Evidence

- Source plan cited `~/hefumiyabi-website` as the old repo to migrate from.
- No old-repo files were inspected for this workflow-only change.
- External references in the source plan: Anthropic long-running app harness
  pattern and OpenAI harness engineering repo model.

## Target Behavior

The repo documents the rewrite loop, initial migration map, and trace ledger
format. `pnpm check:harness` verifies that the required workflow docs and plan
template structure exist.

## Non-goals

- No product behavior changes.
- No schema changes.
- No page or API route changes.
- No automation beyond the existing harness checks and weekly review summary.

## Scope

- `docs/system/`
- `docs/plans/template.md`
- `docs/plans/completed/`
- `docs/traces/`
- `scripts/check-agent-context.ts`
- `scripts/check-plan-format.ts`
- `scripts/weekly-review.ts`
- `eslint.config.mjs`
- `.github/agents/*.agent.md`

## Acceptance Criteria

- [x] The fixed planner, implementer, evaluator, reviewer rewrite loop is documented.
- [x] Obsidian is documented as an external thinking workspace, not canonical execution state.
- [x] The migration map names `~/hefumiyabi-website`, the first guest booking loop backlog theme, initial slices, and deferred areas.
- [x] The plan template requires legacy evidence and target behavior.
- [x] Trace ledger rules and a Markdown ledger file exist in repo docs.
- [x] `pnpm check:harness` guards the new required docs and strengthened plan structure.

## Verification

- `pnpm check:harness`
  - Red check failed as expected after strengthening harness scripts because the
    new required docs did not exist yet.
  - Green check passed after adding required docs and plan headings.
- `pnpm lint`
  - Initial run exposed `.claude/` worktrees inside ESLint's source surface.
  - Passed after ignoring transient `.claude/` worktrees.
- `pnpm typecheck`
  - Passed.
- `pnpm review:weekly`
  - Passed and reported 0 active plans, 2 completed plans, and 1 trace ledger
    entry.

## Rollback

Revert the new workflow docs, trace ledger, plan template headings, and harness
script changes. Existing product behavior remains unaffected.

## Decision Log

- Normalized the source plan's requested backlog wording to the repo glossary
  term `guest` / `游客`.
- Kept the ledger as Markdown and deferred richer automation.
- Ignored transient `.claude/` worktrees in ESLint so repo lint checks the
  working tree source, not agent scratch copies.

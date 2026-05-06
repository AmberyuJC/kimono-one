# Kimono One Claude Code Memory

This file is the Claude Code project entrypoint. Treat `AGENTS.md` as the repo-wide routing layer and `docs/system/` as the durable system of record.

Core project import:

@AGENTS.md

## Startup Workflow

Before changing code:

1. Read `AGENTS.md`.
2. Read `docs/system/README.md`, then the listed system docs relevant to the task.
3. Check `docs/state/progress.md` and `docs/state/session-handoff.md` for active work, blockers, and the restart path.
4. For medium or large tasks, create or update a plan in `docs/plans/active` before implementation.
5. Run `./init.sh` when the workspace may be fresh or dependencies may be missing.

## Working Rules

- Use `pnpm` for every package and script command.
- Keep `app/` and `src/api/http/` away from direct `src/db/` imports.
- Keep `src/domains/` framework-agnostic: no React, React Router, Hono, or request/response objects.
- Keep `src/db/` independent from UI, API adapters, and domain services.
- Do not add `console.*` to production code under `app/` or `src/`.
- Do not silently widen a scoped plan. Update the plan first if scope changes.

## Claude Agents

Project Claude Code subagents live in `.claude/agents/`:

- `planner`: turns vague work into a bounded plan.
- `implementer`: executes the accepted plan inside scope.
- `evaluator`: proves acceptance criteria with checks and smoke evidence.
- `reviewer`: reviews for bugs, regressions, and missing tests.

Use the planner -> implementer -> evaluator -> reviewer loop for long-running work.

## End Of Session

Before ending substantial work:

1. Update `docs/state/progress.md`.
2. Update `docs/state/session-handoff.md` with next steps and known risks.
3. Record verification commands and results in the active plan.
4. Leave the repository restartable with a clear command path.

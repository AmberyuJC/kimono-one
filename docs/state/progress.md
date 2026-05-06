# Progress

This file records restartable session state for long-running agent work. Keep it short and update it when a task spans sessions or agents.

## Current Task

- No active long-running task.
- `2026-05-06-plans-open-design-redesign`: Completed and moved to `docs/plans/completed/`.
- `2026-05-06-open-design-uiux-harness`: Completed and moved to `docs/plans/completed/`.
- `2026-05-05-harness-continuity`: Completed and moved to `docs/plans/completed/`.

## Last Known State

- Harness audit found strong instructions, verification, and CI coverage.
- Main gaps are Claude Code memory entrypoint, session state, and fresh-workspace bootstrap.
- Added `CLAUDE.md`, `.claude/agents/*`, `docs/state/*`, `init.sh`, and `scripts/bootstrap.sh`.
- Extended `pnpm check:harness` to require the new harness artifacts.
- Agreed that Open Design should be used as an external design lab and review input, while Kimono One remains bound by its own design tokens, CSS patterns, Playwright checks, and harness rules.
- Added an active plan for the Open Design UI/UX harness spike with `/plans` as the first validation page.
- Added `docs/system/uiux-harness.md`, `scripts/check-uiux-harness.ts`, and `pnpm check:uiux-harness`.
- Extended `pnpm check:harness` so active UI/UX/Open Design plans must include brief, direction, desktop/mobile evidence, token alignment, accessibility/layout checks, and verification command.
- Shipped the Open Design UI/UX harness changes in PR #8.
- Added the next active plan for `/plans` Open Design redesign.
- Added Open Design evidence under `docs/design/open-design/plans/`.
- Updated `/plans` to show clearer package comparison hierarchy for name, price, duration, recommended scene, inclusions, and detail intent.
- Added desktop/mobile E2E coverage for `/plans` comparison hierarchy while preserving the existing booking smoke path.
- Moved accepted active plans to `docs/plans/completed/`.

## Verification Notes

- `./init.sh` passed after installing dependencies and running `pnpm check:harness`.
- `pnpm lint` passed.
- `pnpm typecheck` passed.
- `pnpm test` passed.
- `pnpm test:e2e` passed after installing Playwright Chromium.
- Targeted Prettier check passed for files changed in this slice.
- `pnpm check:plans` passed for the Open Design UI/UX harness plan.
- `pnpm check:harness` passed after adding the Open Design UI/UX harness plan and state updates.
- `pnpm check:uiux-harness` passed after adding the UI/UX harness gate.
- `pnpm lint` passed.
- `pnpm typecheck` passed.
- `pnpm test` passed: 3 test files, 8 tests.
- `pnpm check:plans` passed after adding the `/plans` redesign plan.
- `pnpm check:uiux-harness` passed after adding the `/plans` redesign plan.
- `pnpm lint` passed after implementing the `/plans` redesign.
- `pnpm typecheck` passed after implementing the `/plans` redesign.
- `pnpm test` passed after implementing the `/plans` redesign: 3 test files, 8 tests.
- `pnpm check:uiux-harness` passed after implementing the `/plans` redesign.
- `pnpm check:harness` passed after implementing the `/plans` redesign.
- `pnpm test:e2e` passed after implementing the `/plans` redesign: 4 tests across desktop and mobile.
- Targeted Prettier check passed for files changed in the `/plans` redesign slice.

## Open Risks

- `pnpm db:reset` was not run because this slice does not change database schema, seed data, or repository mapping.
- Open Design integration risk is scope creep: generated prototypes must be translated into Kimono One tokens and component patterns before product implementation.
- The `/plans` redesign intentionally used route-level presentation copy derived from existing `scene` values instead of changing domain contracts or fixture data.
- Future feature parity work still needs separate plans for plan detail, cart, booking, merchant inventory, guest identity, or admin workflows.

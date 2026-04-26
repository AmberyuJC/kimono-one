# Plan: <short title>

## Why

Describe the problem being solved and why it matters now.

## Legacy Evidence

- Old-repo files, routes, screenshots, recordings, or API examples inspected:
- If the plan is not legacy rewrite work, say `N/A` and explain why.

## Target Behavior

Describe the new-repo behavior that must exist after implementation. Use current
domain language and architecture, not legacy implementation names.

## Non-goals

- Explicitly list what this plan will not do.

## Scope

- Files or subsystems expected to change.
- Data or schema boundaries.
- Runtime and verification boundaries.

## Acceptance Criteria

- [ ] The user-visible or system-visible outcome is clear.
- [ ] Required checks and tests are named.
- [ ] Boundary rules remain intact.

## Verification

- `pnpm lint`
- `pnpm typecheck`
- `pnpm test`
- `pnpm check:harness`
- Additional task-specific checks:

## Rollback

Explain how to revert or disable the change if validation fails.

## Decision Log

- Record meaningful tradeoffs or defaults chosen during planning.

# Plan: <short title>

## Why

Describe the problem being solved and why it matters now.

## Non-goals

- Explicitly list what this plan will not do.

## Scope

- Files or subsystems expected to change.
- Data or schema boundaries.
- Runtime and verification boundaries.

## UI/UX Harness

For UI or visual changes, fill these fields. For non-UI changes, write `N/A`.

- Open Design brief:
- Design direction:
- Desktop evidence:
- Mobile evidence:
- Token alignment:
- Accessibility and layout:
- Verification command:

## Acceptance Criteria

- [ ] The user-visible or system-visible outcome is clear.
- [ ] Required checks and tests are named.
- [ ] Boundary rules remain intact.

## Verification

- `pnpm lint`
- `pnpm typecheck`
- `pnpm test`
- Additional task-specific checks:

## Rollback

Explain how to revert or disable the change if validation fails.

## Decision Log

- Record meaningful tradeoffs or defaults chosen during planning.

# Rewrite Workflow

Kimono One rewrites legacy behavior through repo-first capability slices. The
repo is the execution source of truth; external notes are inputs only.

External thinking workspace:

- Recommended vault: `~/Obsidian/Kimono-One`.
- Obsidian may hold brainstorms, product judgment, meeting notes, migration
  observations, and weekly review drafts.
- Stable decisions move into `docs/system/` or an executable plan in
  `docs/plans/active/` before implementation.

Fixed cycle:

1. Discover old behavior.
   Inspect `~/hefumiyabi-website`, screenshots, routes, copy, fixture data, and
   user-visible flows. Treat the old repo as product evidence, not code to copy
   blindly.
2. Write the migration contract.
   Create or update a plan in `docs/plans/active/` with legacy evidence, target
   behavior, acceptance criteria, verification, rollback path, and decision log.
3. Implement one capability slice.
   Build the smallest vertical slice that satisfies the contract using the
   current React Router, Hono, domain service, repository, and Drizzle boundaries.
4. Evaluate independently.
   The evaluator runs the narrowest checks that prove or falsify acceptance
   criteria, including API checks and Playwright smoke coverage when relevant.
5. Review.
   The reviewer looks for correctness bugs, boundary violations, regressions,
   missing tests, and legacy behavior that was misread.
6. Archive evidence.
   Move completed plans to `docs/plans/completed/` and update
   `docs/traces/rewrite-ledger.md`.

Roles remain fixed:

- `planner`: owns the migration contract and legacy evidence.
- `implementer`: changes code inside the accepted scope.
- `evaluator`: verifies behavior independently and records evidence.
- `reviewer`: checks bugs, regressions, missing tests, and architecture risk.

Rules:

- Medium and large rewrite work must have a plan before implementation.
- Slices are capability-first, not page-by-page or schema-first.
- Durable decisions belong in `docs/system/`.
- Temporary observations may remain in Obsidian, but they are not canonical for
  agents or CI.
- `pnpm check:harness` remains the mechanical guard for plan structure,
  required agent context, architecture boundaries, and production console usage.

# Kimono One AGENTS

Read these files before changing anything substantial:

1. [README.md](/Users/jinchenyu/kimono-one/README.md)
2. [docs/system/README.md](/Users/jinchenyu/kimono-one/docs/system/README.md)
3. [docs/system/architecture.md](/Users/jinchenyu/kimono-one/docs/system/architecture.md)
4. [docs/plans/template.md](/Users/jinchenyu/kimono-one/docs/plans/template.md)

Hard rules:

- `app/` and `src/api/http/` must not import `src/db/` directly.
- `src/domains/` must not import React, React Router, or Hono.
- `src/db/` must not import UI or domain services.
- `app/` and `src/` must not ship `console.*`.
- Use `pnpm` for all package and script commands.

Validation commands:

- `pnpm lint`
- `pnpm typecheck`
- `pnpm test`
- `pnpm test:e2e`
- `pnpm check:harness`
- `pnpm db:reset`

Delivery notes:

- Medium and large tasks belong in `docs/plans/active` before implementation.
- Keep comments, commit messages, and PR descriptions in Chinese when possible.
- Treat this file as a directory, not a handbook. Put durable detail in `docs/system/`.

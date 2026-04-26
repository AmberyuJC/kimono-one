# Kimono One Harness Lab

Kimono One is being rebuilt as an `agent-first` repository. This repo does not begin with a feature dump. It begins with instructions, checks, contracts, CI, and repeatable database setup so that human contributors and coding agents can work inside the same control plane.

## Current focus

The repository has completed the harness bootstrap and now includes the first
fixture-backed vertical slice: `catalog -> plan detail -> cart -> booking draft`.

- `React Router Framework` is the UI and SSR shell.
- `Hono` is the HTTP adapter for API contracts and stays thin.
- `Drizzle` is the default database layer.
- `Vitest` and `Playwright` are the verification rails.
- GitHub-native instructions and custom agents are first-class artifacts from day one.

## Repository layout

```text
app/                  React Router UI shell
src/api/http/         Hono adapter for API contracts
src/db/               Drizzle schema, client, seed helpers
src/domains/          Domain contracts and service boundaries
src/shared/           Shared types and utilities
docs/system/          System of record for architecture and delivery rules
docs/plans/           Plan template plus active/completed plans
.github/              Copilot instructions, custom agents, Actions
.agents/skills/       Reusable repo-local skills
scripts/              Checks, database scripts, weekly review utilities
data/fixtures/        Stable seed fixtures
```

## Commands

```bash
pnpm dev
pnpm build
pnpm lint
pnpm typecheck
pnpm test
pnpm test:e2e
pnpm check:harness
pnpm db:reset
```

## Local development

1. Install dependencies:

```bash
pnpm install
```

2. Copy the environment file:

```bash
cp .env.example .env.local
```

3. Start a local Postgres instance.

`pnpm db:start` uses `docker` or `podman` if one is installed. If neither is available, point `DATABASE_URL` at an existing local Postgres instance.

4. Run migrations and seed:

```bash
pnpm db:reset
```

5. Start the app:

```bash
pnpm dev
```

## Rules that matter

- Medium and large tasks should begin with a plan in `docs/plans/active`.
- `app/` and `src/api/http/` must not import `src/db/` directly.
- `src/domains/` must not import React, React Router, or Hono.
- `src/db/` must not import UI or domain services.
- Production code under `app/` and `src/` must not use `console.*`.

## Implemented vertical slice

- `/plans`
- `/plans/:slug`
- `/cart`
- `/booking/new`
- `/booking/:draftId`
- `GET /api/plans`
- `GET /api/plans/:slug`
- `POST /api/booking-drafts`
- `GET /api/booking-drafts/:id`

Local UI and E2E use the stable fixture runtime when no local Postgres runtime is
available. CI still verifies migrations, seed data, and Drizzle repository
mapping against Postgres.

## Next milestones

1. Use `docs/system/rewrite-workflow.md` for the next legacy rewrite slice.
2. Add visual smoke screenshot artifacts for `/plans`, `/cart`, and booking confirmation.
3. Decide whether V1 should introduce Drizzle-backed runtime selection or guest identity next.

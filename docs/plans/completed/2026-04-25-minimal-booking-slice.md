# Plan: Minimal Booking Slice

## Why

The harness needed one real product path so agents can validate UI, API, domain
services, fixture data, and Playwright in the same loop. A repo with only checks
proves the control plane exists, but not that the control plane can guide
product delivery.

## Legacy Evidence

- N/A. This slice established the first new-repo fixture-backed booking path; it
  did not inspect or migrate behavior from `~/hefumiyabi-website`.

## Target Behavior

The new repo exposes a fixture-backed guest booking loop from catalog browsing
through booking draft confirmation, with Hono API coverage and Playwright smoke
coverage on desktop and mobile.

## Non-goals

- No login.
- No payment.
- No merchant dashboard.
- No production inventory lock.
- No Supabase runtime dependency for local E2E.

## Scope

- Add fixture-backed catalog APIs.
- Add booking draft APIs.
- Add product pages for plans, detail, cart, booking form, and confirmation.
- Add Drizzle repositories for CI/Postgres verification.
- Extend tests to cover API, service behavior, and desktop/mobile E2E.

## Acceptance Criteria

- [x] `GET /api/plans` returns fixture-backed plan cards.
- [x] `GET /api/plans/:slug` returns detail and available stores.
- [x] `POST /api/booking-drafts` creates a guest draft.
- [x] A guest can browse plans, add a plan to cart, and create a draft.
- [x] Desktop and mobile Playwright smoke tests cover the full path.
- [x] Hono routes remain thin and do not import database code.

## Verification

- `pnpm lint`
- `pnpm typecheck`
- `pnpm test`
- `pnpm check:harness`
- `pnpm build`
- `pnpm test:e2e`

`pnpm db:reset` and `pnpm db:test` require Docker, Podman, or a reachable
Postgres instance. They are wired for GitHub Actions Postgres service.

## Rollback

Revert the route additions, `src/runtime/fixture.ts`, Hono endpoint changes,
repository additions, and the E2E test. The harness bootstrap remains usable
without the product slice.

## Decision Log

- Kept Hono as a thin adapter and injected services through a fixture runtime.
- Kept React Router pages away from direct database access.
- Added Drizzle repositories for CI/Postgres mapping while allowing local E2E to
  run without Docker or local Postgres.

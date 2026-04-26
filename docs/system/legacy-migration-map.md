# Legacy Migration Map

Legacy source:

- Path: `~/hefumiyabi-website`.
- Role: product reference and evidence source.
- Rule: inspect behavior, language, data shape, and flow intent; do not copy code
  blindly into Kimono One.

First backlog theme:

- Guest booking loop (`游客预约闭环`).

Initial capability slices:

| Order | Slice | Target outcome | Default verification |
| --- | --- | --- | --- |
| 1 | Catalog and search | Guests can browse plans and narrow choices. | `pnpm test`, `pnpm test:e2e` |
| 2 | Plan detail | Guests can inspect plan details and available stores. | `pnpm test`, API checks, `pnpm test:e2e` |
| 3 | Cart | Guests can keep selected plan-store pairs before booking. | `pnpm test`, `pnpm test:e2e` |
| 4 | Booking draft contact | Guests can enter visit and contact details. | `pnpm test`, API checks, `pnpm test:e2e` |
| 5 | Booking confirmation | Guests can see a confirmed draft summary. | `pnpm test`, API checks, `pnpm test:e2e` |
| 6 | Drizzle-backed runtime selection | UI/API can select real repositories instead of fixture services. | `pnpm test`, `pnpm typecheck`, `pnpm db:reset` |

Deferred unless a later plan explicitly pulls them in:

- merchant dashboard
- admin console
- payment
- login
- AI try-on
- live inventory locking

Evidence expectations:

- Plans name old-repo files, routes, screenshots, recordings, or API examples.
- Target behavior is described in current repo domain language.
- Each completed slice updates `docs/traces/rewrite-ledger.md`.
- Unknown legacy behavior is recorded as unresolved risk, not guessed.

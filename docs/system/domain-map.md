# Domain Map

V0 domains:

- `catalog`: plans, plan details, store availability
- `cart`: guest-side draft cart state
- `booking`: guest booking draft creation and retrieval
- `identity`: guest contact information only

Out of scope for V0:

- login
- payment
- merchant dashboard
- admin console
- AI try-on
- live inventory locking

Rewrite priority:

- First backlog theme: guest booking loop (`游客预约闭环`).
- Work proceeds by capability slice, not page-by-page migration.
- See `docs/system/legacy-migration-map.md` for the initial migration map.

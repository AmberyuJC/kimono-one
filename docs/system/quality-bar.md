# Quality Bar

Hard gates:

- `pnpm lint`
- `pnpm typecheck`
- `pnpm test`
- `pnpm check:harness`
- `pnpm test:e2e`

Merge blockers:

- direct DB imports from UI or route handlers
- service files importing React, React Router, or Hono
- production `console.*`
- plan files that fail the template contract
- missing instructions or missing custom agents

Known intentional gaps:

- The V0 business pages and booking draft flow use fixture-backed services by default.
- Drizzle-backed repositories are verified separately, but the app runtime does not yet select them for normal UI/API requests.
- No payment, login, merchant dashboard, inventory locking, or admin workflow is in scope for V0.

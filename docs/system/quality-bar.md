# Quality Bar

Hard gates:

- `pnpm lint`
- `pnpm typecheck`
- `pnpm test`
- `pnpm check:harness`
- `pnpm test:e2e`
- `pnpm check:uiux-harness` for active UI/UX or Open Design plans

Merge blockers:

- direct DB imports from UI or route handlers
- service files importing React, React Router, or Hono
- production `console.*`
- plan files that fail the template contract
- active UI/UX or Open Design plans that omit brief, direction, desktop/mobile evidence, token alignment, accessibility/layout checks, or verification command
- missing instructions or missing custom agents

Known intentional gaps:

- The V0 business pages and booking draft flow use fixture-backed services by default.
- Drizzle-backed repositories are verified separately, but the app runtime does not yet select them for normal UI/API requests.
- No payment, login, merchant dashboard, inventory locking, or admin workflow is in scope for V0.

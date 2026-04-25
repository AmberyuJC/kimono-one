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

- Hono is scaffolded but not yet mounted in the runtime.
- No business pages or booking flow are implemented in Milestone 0.

# Architecture

Kimono One uses a harness-first architecture.

```text
React Router UI shell
  -> Hono HTTP adapter
    -> domain contracts and services
      -> repositories
        -> Drizzle + Postgres
```

Boundary rules:

- `app/` renders UI and must not import `src/db/*`.
- `src/api/http/*` is a transport adapter and must not query the database directly.
- `src/domains/*` contains contracts, service logic, and repository interfaces only.
- `src/db/*` owns schema, client wiring, seed flow, and query implementations.

Current status:

- The React Router UI shell is active and serves the V0 booking slice.
- The Hono adapter is mounted through the React Router `api/*` route and local server helpers.
- The current runtime uses stable fixture-backed services for UI, API, and E2E flows.
- Drizzle schema, migrations, seed data, and repository mappings exist for Postgres verification.
- V1 still needs a runtime decision for switching the app from fixture services to Drizzle-backed services.

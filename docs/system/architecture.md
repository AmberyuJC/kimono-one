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

- The UI shell is active.
- The Hono adapter skeleton exists but is not mounted into the runtime yet.
- The database schema and seed pipeline are scaffolded for Milestone 1.

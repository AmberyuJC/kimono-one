---
applyTo: "src/api/**/*.ts,src/api/**/*.tsx"
---

API code is a thin adapter layer.

- Validate input before delegating to a service.
- Map service results to HTTP responses in one place.
- Do not access `src/db/*` directly from route handlers.
- Keep business rules out of Hono handlers.

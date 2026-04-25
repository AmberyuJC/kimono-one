---
applyTo: "src/domains/**/*.ts,src/domains/**/*.tsx"
---

Domain files define contracts, pure logic, service interfaces, and repository interfaces.

- Do not import React, React Router, Hono, or request/response objects here.
- Keep Zod contracts separate from transport code.
- Prefer explicit result unions over business exceptions.
- Keep service functions small and testable.

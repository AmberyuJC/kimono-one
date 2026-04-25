# API Verification

## Hono test pattern

Use `createHttpApp().request()` in vitest. No external server needed.

```typescript
import { createHttpApp } from "./app";

const app = createHttpApp();

// GET request
const res = await app.request("/api/plans");
expect(res.status).toBe(200);
const data = await res.json();

// POST request
const res = await app.request("/api/booking-drafts", {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify({ /* CreateBookingDraftInput */ }),
});
expect(res.status).toBe(201);
```

## Status code conventions

| Code | Meaning | When |
|------|---------|------|
| 200 | Success | GET requests returning data |
| 201 | Created | POST requests that create a resource |
| 400 | Bad request | Malformed input (missing fields, wrong types) |
| 404 | Not found | Resource does not exist |
| 422 | Unprocessable | Valid format but business rule violation |

## Response validation

Validate response shapes against Zod schemas from `src/domains/*/contract.ts`:

```typescript
import { planCardSchema } from "../../domains/catalog/contract";

const data = await res.json();
const parsed = planCardSchema.array().safeParse(data);
expect(parsed.success).toBe(true);
```

## Error response shape

```json
{
  "code": "PLAN_STORE_NOT_BOOKABLE",
  "message": "The selected plan is not bookable at this store."
}
```

Errors always include `code` (machine-readable) and `message` (human-readable).

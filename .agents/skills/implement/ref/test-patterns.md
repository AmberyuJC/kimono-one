# Test Patterns in This Repo

Reuse these exact patterns. Do not invent new testing infrastructure.

## Service test (unit)

Location: `src/domains/{domain}/service.test.ts`

```typescript
import { describe, expect, it } from "vitest";
import type { BookingDraft } from "./contract";
import { createBookingService, type BookingRepository } from "./service";

function createRepository(overrides: Partial<BookingRepository> = {}) {
  const defaults = {
    createDraft: async () => ({ /* fixture data */ }),
    findDraftById: async () => ({ /* fixture data */ }),
    isPlanStoreBookable: async () => true,
  };
  return { ...defaults, ...overrides } satisfies BookingRepository;
}

// Test behavior, not implementation:
it("normalizes guest contact before creating a draft", async () => {
  const service = createBookingService(createRepository());
  const result = await service.createDraft({ /* input */ });
  expect(result.ok).toBe(true);
});

// Override specific methods to test edge cases:
it("rejects unavailable plan-store combinations", async () => {
  const service = createBookingService(
    createRepository({ isPlanStoreBookable: async () => false }),
  );
  const result = await service.createDraft({ /* input */ });
  expect(result).toEqual({ ok: false, error: { code: "PLAN_STORE_NOT_BOOKABLE", /* ... */ } });
});
```

Key: Use `satisfies` to catch missing methods. Use `Partial<Repository>` for targeted overrides.

## API test (integration)

Location: `src/api/http/app.test.ts`

```typescript
import { createHttpApp } from "./app";

it("lists fixture-backed plans", async () => {
  const response = await createHttpApp().request("/api/plans");
  const payload = (await response.json()) as Array<{ slug: string }>;
  expect(response.status).toBe(200);
  expect(payload.map((p) => p.slug)).toContain("kimono-first-experience");
});

it("creates and reads a booking draft", async () => {
  const app = createHttpApp();
  const response = await app.request("/api/booking-drafts", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ /* CreateBookingDraftInput */ }),
  });
  expect(response.status).toBe(201);
});
```

Key: `createHttpApp()` returns a Hono instance with fixture-backed services. No external dependencies.

## E2E test (Playwright)

Location: `tests/e2e/*.spec.ts`

```typescript
import { expect, test } from "@playwright/test";

test("guest can create a booking draft from the catalog", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "选择当天要体验的和服套餐" })).toBeVisible();
  await page.getByRole("link", { name: /和服初体验/ }).click();
  await page.getByRole("button", { name: "加入购物车" }).click();
  // ... continue the user journey
});
```

Key: Use `getByRole` and `getByText` with Chinese labels. Tests run against desktop Chrome and mobile Pixel 7.

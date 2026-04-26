# E2E Recipes (Playwright)

## Running tests

```bash
# Run all e2e tests (auto-starts dev server at 127.0.0.1:4173)
pnpm test:e2e

# Run a single test by name
pnpm exec playwright test -g "guest can create a booking draft"

# Run with debug UI (step through in browser)
pnpm exec playwright test --debug

# Run only desktop or mobile
pnpm exec playwright test --project=desktop
pnpm exec playwright test --project=mobile
```

## Viewports

| Project | Device | Resolution |
|---------|--------|------------|
| desktop | Desktop Chrome | 1280x720 |
| mobile | Pixel 7 | 412x915 |

Both projects run on every `pnpm test:e2e` invocation.

## Locator patterns

Use accessible locators. Match the Chinese UI labels exactly.

```typescript
// Headings
page.getByRole("heading", { name: "选择当天要体验的和服套餐" })

// Links (regex for partial match)
page.getByRole("link", { name: /和服初体验·轻装上阵/ })

// Buttons
page.getByRole("button", { name: "加入购物车" })

// Text content
page.getByText("浅草本店")
```

## Screenshot baselines

For new pages or significant visual changes:

```typescript
await page.goto("/plans");
await expect(page).toHaveScreenshot("plans-catalog.png");
```

Screenshots are stored in `tests/e2e/*.spec.ts-snapshots/`. Update baselines with:

```bash
pnpm exec playwright test --update-snapshots
```

## Artifacts on failure

- Screenshots: `test-results/` (automatic on failure, configured in playwright.config.ts)
- Trace files: `test-results/` (for step-by-step replay)

## Dev server

Playwright auto-starts the dev server via `webServer` config:

```
command: pnpm dev --host 127.0.0.1 --port 4173
url: http://127.0.0.1:4173
```

No manual server start needed. If the port is occupied, tests will fail — kill the conflicting process first.

---
name: verify
description: Prove that a change is correct with tests, smoke checks, and direct evidence. Provides concrete commands and patterns for each verification type. Use after implementation to validate acceptance criteria.
---

# verify

Prove changes with evidence, not explanation. Every acceptance criterion gets a concrete check.

## Process

1. **Map each acceptance criterion to a check.** If a criterion cannot be mapped to a specific command or test, report it as a blocker — unverifiable criteria cannot be shipped.

2. **Run the narrowest automated check set first**, then widen:
   - Unit tests: `pnpm test`
   - Boundary rules: `pnpm check:harness`
   - Build: `pnpm build`
   - E2E tests: `pnpm test:e2e`

3. **For API changes**, verify with Hono tests or direct requests. See [ref/api-verification.md](ref/api-verification.md) for patterns and expected status codes.

4. **For UI changes**, run Playwright on both viewports:
   - Desktop Chrome (1280px)
   - Mobile Pixel 7
   - Add screenshot baselines for new pages: `await expect(page).toHaveScreenshot('name.png')`
   - See [ref/e2e-recipes.md](ref/e2e-recipes.md) for commands.

5. **For domain logic changes**, confirm service-level tests cover the stated business rules. Check that the test uses the `createRepository(overrides)` pattern and tests behavior through the service interface.

6. **Treat failed checks as blockers.** Do not ship with known test failures. Fix or escalate.

7. **Record evidence** in the plan's Verification section: command output, test names, screenshot paths. Evidence must be reproducible by running the listed commands.

## Reference

- [ref/e2e-recipes.md](ref/e2e-recipes.md) — Playwright commands, viewports, debugging
- [ref/api-verification.md](ref/api-verification.md) — Hono test patterns, status codes

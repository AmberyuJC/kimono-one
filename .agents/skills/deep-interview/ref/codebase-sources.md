# Codebase Sources

Check these files before asking the human. If the answer exists here, state it as a fact.

## Architecture & rules

- `docs/system/architecture.md` — layer boundaries, runtime modes
- `docs/system/domain-map.md` — domain ownership (catalog, cart, booking, identity)
- `docs/system/delivery-model.md` — 4-role loop (planner, implementer, evaluator, reviewer)
- `docs/system/quality-bar.md` — hard gates, merge blockers
- `AGENTS.md` — hard rules, validation commands

## Active work

- `docs/plans/active/*.md` — current plans with scope and acceptance criteria
- `docs/plans/completed/*.md` — past decisions and precedents

## Domain contracts

- `src/domains/catalog/contract.ts` — PlanCard, PlanDetail, StoreSummary, CatalogSearchInput
- `src/domains/booking/contract.ts` — BookingDraft, CreateBookingDraftInput
- `src/domains/identity/contract.ts` — GuestContact
- `src/domains/cart/contract.ts` — CartState, CartLine

## Existing tests

- `src/domains/booking/service.test.ts` — service test pattern with repository factory
- `src/api/http/app.test.ts` — API test pattern with Hono app.request()
- `tests/e2e/minimal-booking.spec.ts` — e2e test pattern with Playwright
- `src/shared/__tests__/result.test.ts` — Result type tests

## Boundary enforcement

- `scripts/check-boundaries.ts` — import rule validation
- `scripts/check-no-console.ts` — no console.* in production code
- `scripts/check-plan-format.ts` — plan template validation

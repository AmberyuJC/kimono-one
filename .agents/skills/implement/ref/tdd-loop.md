# TDD Loop: Vertical Slices

## Philosophy

Tests verify behavior through public interfaces, not implementation details. Code can change entirely; tests should not break unless behavior changes.

## Vertical slice path

For a new feature that touches multiple layers, build one thin path end-to-end before widening:

```
contract (Zod schema)
  → service test (vitest)
    → service implementation
      → repository interface (TypeScript type)
        → repository test (vitest, against fixture or PGLite)
          → repository implementation (Drizzle)
            → HTTP test (Hono app.request)
              → HTTP handler (Hono route)
                → route component (React Router loader/action)
```

You do NOT always need all layers. A domain logic change may only touch contract → service test → service. A UI-only change may only touch route component + e2e test. Match the slice to the scope.

## Anti-pattern: horizontal slicing

```
WRONG: Write all tests first → write all implementations
RIGHT: test1→impl1 → test2→impl2 → test3→impl3
```

Writing all tests first produces tests that verify imagined behavior, not actual behavior. Each test should respond to what you learned from the previous cycle.

## Mocking rules

- **Mock at system boundaries only**: external APIs, database, time, filesystem.
- **Never mock your own code.** If `bookingService` calls `identityService`, do not mock `identityService`. Test the real composition.
- **Use the repository pattern** as the seam between domain logic and database. The service takes a repository interface; tests provide a fake implementation.
- **Prefer `satisfies` over `as`** when creating test doubles to catch missing methods at compile time.

## When to stop

Each red-green cycle should take minutes, not hours. If you are stuck in RED for more than one attempt, the test is probably too big. Split it into a smaller behavior.

Refactoring happens only at GREEN. Never refactor while tests are failing.

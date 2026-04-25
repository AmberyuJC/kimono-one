# Architecture Vocabulary

Use these terms when evaluating plans. Consistent language prevents ambiguity.

## Module

A directory under `src/domains/` with a `contract.ts` (interface) and `service.ts` (implementation). Also applies to `src/repositories/` (data access modules) and `src/api/http/` (transport module).

## Depth

How much behavior sits behind a small interface. A **deep module** has a simple contract hiding significant logic (good). A **shallow module** has an interface nearly as complex as its implementation (avoid).

In this repo:
- **Deep**: `bookingService.createDraft(input)` — simple call, hides validation + normalization + repository interaction
- **Shallow**: A pass-through function that just calls another function with the same arguments

## Seam

Where one layer's interface meets another. In this repo:
- **Zod schemas** = seam between HTTP adapter and domain services
- **Repository interfaces** (TypeScript types) = seam between domain services and database layer
- **`readApiJson()` helper** = seam between React Router loaders and the HTTP API

## Layer depth in plans

| Layers touched | Assessment |
|----------------|------------|
| 1 layer | Fine — focused change |
| 2 layers | Normal — e.g., service + repository |
| 3 layers | Review carefully — is this one feature or two? |
| 4 layers (app → http → domain → db) | Should almost certainly be split into separate vertical slices |

## Deletion test

Imagine deleting the module. If complexity **vanishes**, the module was a pass-through (shallow, unnecessary). If complexity **reappears across N callers**, the module was earning its keep (deep, valuable).

Use this test when a plan proposes adding a new module. Ask: "If we deleted this, where would the complexity go?"

## Boundary rules (hard-enforced)

- `app/` and `src/api/http/` must NOT import `src/db/`
- `src/domains/` must NOT import React, React Router, or Hono
- `src/db/` must NOT import UI or domain services
- Validated by `scripts/check-boundaries.ts`

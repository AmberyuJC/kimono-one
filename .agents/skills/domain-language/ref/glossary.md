# Domain Glossary

One canonical name per concept. Forbidden synonyms must not appear in code, types, or UI text.

## Catalog domain

| Code name | Chinese label | Definition | Forbidden synonyms |
|-----------|--------------|------------|-------------------|
| `Plan` | 套餐 | A kimono rental package with price, duration, and scene | package, product, item, listing |
| `PlanCard` | — | Summary view of a plan for catalog listings | — |
| `PlanDetail` | — | Full plan info including available stores | — |
| `StoreSummary` | — | Store info as shown on a plan detail page | — |
| `Store` | 门店 | A physical kimono rental location | shop, location, branch, outlet |
| `scene` | 场景 | Plan category: value, first-time, yukata, seasonal | category, type, theme, tag |
| `slug` | — | URL-safe identifier for plans and stores | — |
| `durationHours` | 时长 | How many hours the rental lasts | duration, hours, time |
| `heroImageUrl` | — | Main promotional image for a plan | image, photo, thumbnail |

## Cart domain

| Code name | Chinese label | Definition | Forbidden synonyms |
|-----------|--------------|------------|-------------------|
| `CartState` | 购物车 | Client-side cart containing selected plan-store pairs | basket, bag |
| `CartLine` | — | One item in the cart (plan + store + quantity + price) | cartItem, lineItem |
| `unitPrice` | 单价 | Price per person/unit for a plan at a specific store | price, cost |
| `quantity` | 数量 | Number of persons/units for this line | count, amount |

## Booking domain

| Code name | Chinese label | Definition | Forbidden synonyms |
|-----------|--------------|------------|-------------------|
| `BookingDraft` | 预约草稿 | An unconfirmed reservation request from a guest | reservation, appointment, order |
| `visitDate` | 到店日期 | The date the guest will visit the store (YYYY-MM-DD) | date, appointmentDate, bookingDate |
| `notes` | 备注 | Optional guest notes for the booking | comments, remarks, specialRequests |
| `draftId` | — | Unique identifier for a booking draft | bookingId (until confirmed) |

## Identity domain

| Code name | Chinese label | Definition | Forbidden synonyms |
|-----------|--------------|------------|-------------------|
| `GuestContact` | 游客联系方式 | Name, email, and phone for an unregistered guest | customer, client, user, contact |
| `guest` | 游客 | A person renting a kimono (may or may not have an account) | customer, client, user, visitor |

## Cross-domain terms

| Code name | Chinese label | Definition | Note |
|-----------|--------------|------------|------|
| `storeId` | — | FK reference to a Store | Used in cart, booking, catalog |
| `planId` | — | FK reference to a Plan (套餐) | Used in cart, booking |

## Disambiguation

| Term | In code (`src/`) | In docs (`docs/plans/`) |
|------|------------------|------------------------|
| plan | 套餐 — a kimono rental package (`Plan` type) | 计划文档 — a delivery plan file |
| store | 门店 — a physical rental location | N/A |

When writing or reading code, "plan" always means 套餐. When writing or reading docs/plans/, "plan" always means 计划文档. Never mix the two contexts.

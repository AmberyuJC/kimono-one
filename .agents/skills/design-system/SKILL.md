---
name: design-system
description: Guard the visual identity of the Kimono One UI. Every CSS or UI component change must stay within documented design tokens and component patterns. Use before touching any .css or UI-rendering .tsx file.
---

# design-system

Prevent UI style drift. Agents must follow documented tokens and patterns when touching the UI.

## Before any UI change

1. Read [ref/tokens.md](ref/tokens.md) (colors, typography, spacing, radii, shadows).
2. Read [ref/components.md](ref/components.md) (shells, cards, grids, responsive breakpoints).
3. If the active plan does NOT include "UI change" or "UI" in its scope, **reject any modification** to `app/app.css` or visual JSX in route components.

## When making UI changes

4. **No new colors, fonts, or spacing values** unless the plan explicitly approves them. Use only values documented in tokens.md.
5. **New CSS classes** must follow the existing semantic naming convention: lowercase, hyphenated, descriptive (e.g. `plan-card`, `flow-shell`, `cart-summary`). No BEM double-underscores, no Tailwind utility classes in JSX.
6. **Reuse existing component patterns** before creating new ones. Check components.md for shells, cards, grids, and art patterns that may already cover your need.
7. **All styling goes in `app/app.css`**. Do not add inline styles, CSS modules, or styled-components.

## After UI changes

8. Run `pnpm test:e2e` to verify no visual regressions on both desktop and mobile viewports.
9. If the change is significant (new page, new component pattern), add a Playwright screenshot baseline: `await expect(page).toHaveScreenshot('descriptive-name.png')`.

## Reference

- [ref/tokens.md](ref/tokens.md) — design tokens extracted from app/app.css
- [ref/components.md](ref/components.md) — component patterns and layout conventions

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

## Hard rules — break these and the design stops being Kimono One

**Color**
- Primary CTA = `--shu-500` (#d45b47). Hover `--shu-600`. Never indigo, never purple, never green-as-CTA.
- Sakura is decorative coral, not the primary — use for kamon stroke, eyebrow text, gradient buttons, link hover.
- Page bg = `--background` (#fff) for homepage, `--wabi-50` for immersive, `--gray-50` for forms. Forbidden: `--gray-100` (too cold) or large pink panels.

**Type**
- Three families, three voices: `--font-sans` (Chinese body + UI), `--font-serif` (Chinese titles), `--font-mincho` (Japanese decoration only).
- Never load CJK from Google Fonts. System stack only.
- Sizes are fixed pixels — `var(--fs-base)`, `var(--fs-lg)`, etc. Forbid `text-sm`, `text-lg`, `text-xl`.
- Weights: 400/500/600 only. No 300, no 700.

**Spacing**
- 4px grid. Allowed: 4·8·12·16·24·32·40·48·64·80·96. Forbid `gap-5/7/9`, `p-5/7`.

**Radii**
- Buttons + inputs `--radius-lg` (12px). Cards `--radius-xl` (16px). Hero blocks `--radius-2xl` (24px). Pills `--radius-full` (9999px). Forbid `rounded-md (8)`, `rounded-sm (4)`.

**Animation**
- Easing `--ease-out-quart`. Durations 200/300/500/700ms. Forbid 100/150ms and 1000ms+.
- Card hover: `translateY(-8px) + shadow-xl`. Button hover: `scale(1.05)`, press: `scale(0.95)`.

**Forbidden tropes**
- Indigo or purple gradients
- Left-border-accent cards
- Hand-drawn SVG illustrations (kamon is the only custom SVG)
- Emoji as bullets or section markers
- `→` arrows in CTA labels

## After UI changes

8. Run `pnpm test:e2e` to verify no visual regressions on both desktop and mobile viewports.
9. If the change is significant (new page, new component pattern), add a Playwright screenshot baseline: `await expect(page).toHaveScreenshot('descriptive-name.png')`.

## Reference

- [ref/tokens.md](ref/tokens.md) — complete design token reference (colors, type, spacing, radii, shadows, easing)
- [ref/components.md](ref/components.md) — component patterns, layout conventions, and hard rules

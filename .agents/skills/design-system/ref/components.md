# Component Patterns

Reuse these patterns. Do not create new layout or card patterns when an existing one fits.

## Shell pattern

Page-level container. Centered, max-width constrained, consistent padding.

- Classes: `.home-shell`, `.shop-shell`, `.detail-shell`, `.flow-shell`
- Shared rules: `margin: 0 auto; max-width: 1280px; padding: var(--space-8) var(--space-6) var(--space-24)`
- Mobile (≤620px): `padding-inline: var(--space-4)`

When creating a new page, pick the most semantically appropriate shell. If none fits, create a new one following the `{context}-shell` naming convention with the same shared rules.

## Card pattern

Content container with border, radius, background, shadow, and overflow hidden.

- Classes: `.plan-card`, `.panel`, `.status-card`, `.cart-panel`, `.booking-form`, `.confirmation-panel`, `.empty-state`
- Shared rules: `border: 1px solid var(--border); border-radius: var(--radius-xl); background: var(--card); box-shadow: var(--shadow-sm); overflow: hidden`
- Inner padding: `var(--space-6)` (via `.plan-card-body`, `.panel`, etc.)
- Hover (plan-card): `transform: translateY(-8px); box-shadow: var(--shadow-xl)` with 300ms transition

## Art pattern

Visual hero/banner area with shu background and gradient overlay.

- Classes: `.plan-art`, `.detail-art`
- Background: gradient overlay + repeating diagonal stripes + `var(--primary)` base
- Plan art: `min-height: 180px` | Detail art: `min-height: 560px` (320px on tablet)
- Scene badge inside: `border-radius: var(--radius-full); font-size: var(--fs-xs); font-weight: var(--fw-semibold); text-transform: uppercase`

## Grid patterns

### Plan grid
- Class: `.plan-grid`
- Desktop: `grid-template-columns: repeat(4, minmax(0, 1fr)); gap: var(--space-6)`
- Tablet/mobile (≤980px): single column

### Detail/flow layout (sidebar)
- Classes: `.detail-layout`, `.flow-layout`
- Desktop: `grid-template-columns: minmax(0, 1fr) 420px; gap: var(--space-8)`
- Tablet/mobile (≤980px): single column

### Content grid (3-column)
- Class: `.content-grid`
- Desktop (≥900px): `grid-template-columns: repeat(3, minmax(0, 1fr))`
- Below 900px: single column

### Facts grid
- Classes: `.plan-facts`, `.detail-facts`, `.confirmation-panel dl`
- Plan facts: 2 columns | Detail/confirmation: single column with `dt`/`dd` pairs

## Navigation pattern

- Classes: `.top-nav`, `.breadcrumb`
- Shared: `display: flex; flex-wrap: wrap; gap: var(--space-3); align-items: center`
- Color: `var(--wabi-600)`, weight: `var(--fw-semibold)`, size: `var(--fs-sm)`
- Links: `border-bottom: 1px solid currentColor`

## Form pattern

- Labels: `display: grid; gap: var(--space-2); color: var(--wabi-700); font-size: var(--fs-sm); font-weight: var(--fw-semibold)`
- Inputs: `border: 1px solid var(--gray-300); border-radius: var(--radius-lg); background: var(--card); padding: var(--space-3)`
- Form error: `.form-error` — `color: var(--destructive); font-weight: var(--fw-semibold)`

## Button pattern

- Primary: `background: var(--primary); color: var(--primary-foreground); border-radius: var(--radius-lg); min-height: 44px`
- Hover: `background: var(--accent); transform: scale(1.05); box-shadow: var(--shadow-shu)`
- Active: `transform: scale(0.95)`
- Secondary (line-actions): `background: var(--wabi-100); color: var(--wabi-700)`

## Eyebrow pattern

Section pre-title in English UPPERCASE with wide tracking and sakura color.

- Class: `.eyebrow`
- Rules: `color: var(--sakura-500); font-size: var(--fs-xs); font-weight: var(--fw-medium); text-transform: uppercase; letter-spacing: 0.25em`
- Decorative variant: preceded by a gradient line `background: linear-gradient(to right, var(--sakura-400), transparent)`

## Typography utilities

- `.mincho` — Japanese decorative text (vertical or horizontal)
- `.body-sm` — `font-size: var(--fs-sm); color: var(--gray-600)`
- `.body-xs` — `font-size: var(--fs-xs); color: var(--gray-500)`
- `.text-sakura-gradient` — gradient text in sakura colors

## Responsive breakpoints

| Breakpoint | Behavior |
|------------|----------|
| ≥900px | 2-column hero, 3-column content grid |
| ≤980px | Single column layouts, h1 shrinks to `var(--fs-3xl)`, detail-art to 320px |
| ≤620px | Reduced inline padding, stacked toolbar/cart items, single-column forms |

## Hard rules

- **No new colors, fonts, or spacing values** without plan approval
- **Sizes are fixed pixels** — `text-[16px]` not `text-sm`. Tailwind named sizes forbidden
- **Weights 400/500/600 only** — no `font-bold` (700) or `font-light` (300)
- **4px spacing grid** — forbidden: `gap-5`, `gap-7`, `gap-9`, `p-5`, `p-7`
- **Radii** — 12px buttons, 16px cards, 24px hero, 9999px pills. Forbidden: 4px, 8px
- **No left-border-accent cards**
- **No BEM double-underscores**, no Tailwind utility classes in JSX
- **All styling goes in `app/app.css`** — no inline styles, CSS modules, or styled-components
- **Icons: Lucide only**, stroke (never filled except Heart when active)

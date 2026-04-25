# Component Patterns

Reuse these patterns. Do not create new layout or card patterns when an existing one fits.

## Shell pattern

Page-level container. Centered, max-width constrained, consistent padding.

- Classes: `.home-shell`, `.shop-shell`, `.detail-shell`, `.flow-shell`
- Shared rules: `margin: 0 auto; max-width: 1180px; padding: 28px 18px 72px`
- Mobile (≤620px): `padding-inline: 14px`

When creating a new page, pick the most semantically appropriate shell. If none fits, create a new one following the `{context}-shell` naming convention with the same shared rules.

## Card pattern

Content container with border, radius, background, and shadow.

- Classes: `.plan-card`, `.panel`, `.status-card`, `.cart-panel`, `.booking-form`, `.confirmation-panel`, `.empty-state`
- Shared rules: `border: 1px solid rgba(36, 25, 22, 0.12); border-radius: 8px; background: rgba(255, 250, 241, 0.88); box-shadow: 0 18px 48px rgba(49, 34, 28, 0.08)`
- Inner padding: `22px` (via `.plan-card-body`, `.panel`, etc.)

## Art pattern

Visual hero/banner area with teal background and gradient overlay.

- Classes: `.plan-art`, `.detail-art`
- Background: gradient overlay + repeating diagonal stripes + `#1c494b` base
- Plan art: `min-height: 180px` | Detail art: `min-height: 560px` (320px on tablet)
- Scene badge inside: `border-radius: 999px; background: rgba(18, 30, 31, 0.56); font-size: 0.78rem; font-weight: 800; text-transform: uppercase`

## Grid patterns

### Plan grid
- Class: `.plan-grid`
- Desktop: `grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 16px`
- Tablet/mobile (≤980px): single column

### Detail/flow layout (sidebar)
- Classes: `.detail-layout`, `.flow-layout`
- Desktop: `grid-template-columns: minmax(0, 1fr) 420px; gap: 30px`
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
- Shared: `display: flex; flex-wrap: wrap; gap: 10px; align-items: center`
- Color: `#614d42`, weight: 700, size: 0.95rem
- Links: `border-bottom: 1px solid currentColor`

## Form pattern

- Labels: `display: grid; gap: 8px; color: #4a3932; font-size: 0.92rem; font-weight: 700`
- Inputs: `border: 1px solid rgba(36, 25, 22, 0.18); border-radius: 6px; background: #fffaf1; padding: 11px 12px`
- Form error: `.form-error` — `color: #9d3e33; font-weight: 700`

## Responsive breakpoints

| Breakpoint | Behavior |
|------------|----------|
| ≥900px | 2-column hero, 3-column content grid |
| ≤980px | Single column layouts, h1 shrinks to 2.35rem, detail-art to 320px |
| ≤620px | Reduced inline padding, stacked toolbar/cart items, single-column forms |

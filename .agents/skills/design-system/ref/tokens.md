# Design Tokens

All values extracted from `app/app.css`. Do not introduce values outside this list without plan approval.

## Colors

### Primary palette

| Token | Value | Usage |
|-------|-------|-------|
| Primary | `#1c494b` | Buttons, art backgrounds, scene-value, selected-plan border |
| Surface | `#fffaf1` | Input backgrounds, card backgrounds, button text |
| Background | `#f7f1e8` | Page background (`:root`) |
| Background gradient | `#fbf6ed` → `#efe3d4` → `#f7f1e8` | Body gradient |

### Text

| Token | Value | Usage |
|-------|-------|-------|
| Text primary | `#241916` | Body text, headings, `dd` elements |
| Text secondary | `#614d42` | Navigation, breadcrumb, paragraphs, `.lede`, cart line details |
| Text muted | `#766257` | `dt` elements (fact labels) |
| Label | `#4a3932` | Form labels |
| Accent | `#9d3e33` | Eyebrow text, scene-seasonal, form errors |

### Scene colors

| Scene | Value |
|-------|-------|
| value | `#1c494b` |
| first-time | `#7b5f3e` |
| yukata | `#2f5f8d` |
| seasonal | `#9d3e33` |

### Other

| Token | Value | Usage |
|-------|-------|-------|
| Secondary surface | `#f0e4d5` | Cart line action buttons |
| Selected bg | `#f2e7d8` | Selected plan card background |
| Error stack bg | `#241916` | Error stack trace background |
| Art overlay badge | `rgba(18, 30, 31, 0.56)` | Scene badge on art |

## Borders

- Light: `1px solid rgba(36, 25, 22, 0.12)` — cards, plan-grid items, cart line dividers
- Medium: `1px solid rgba(36, 25, 22, 0.14)` — shop-hero bottom border
- Strong: `1px solid rgba(36, 25, 22, 0.18)` — input/select/textarea borders
- Subtle: `1px solid rgba(36, 25, 22, 0.1)` — confirmation panel dividers

## Typography

- Sans: `"Hiragino Sans", "Yu Gothic", "Noto Sans JP", system-ui, sans-serif`
- Mono: `"SFMono-Regular", ui-monospace, monospace`
- Base weight: 400 | Bold: 700 | Extra bold: 800
- Eyebrow: 0.78rem, 800 weight, uppercase
- Body: 1.05rem (paragraphs), 0.92rem (labels), 0.95rem (nav)
- H1: 3.25rem desktop → 2.35rem tablet
- H2 card: 1.2rem | H2 panel: 1.15rem

## Spacing

- Shell padding: `28px 18px 72px` (mobile inline: `14px`)
- Panel/card padding: `22px`
- Grid gap: `16px` (plan-grid), `30px` (detail/flow layout), `12px` (facts), `14px` (forms)
- Navigation gap: `10px`

## Radii

- Buttons/inputs: `6px`
- Cards/panels: `8px`
- Badges: `999px`

## Shadows

- Card shadow: `0 18px 48px rgba(49, 34, 28, 0.08)`

## Touch targets

- Minimum button height: `44px`
- Cart action button height: `36px`

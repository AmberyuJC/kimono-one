# Design Tokens

All values defined in `app/app.css` as CSS custom properties. Do not introduce values outside this list without plan approval.

## Colors

### 朱色 Shu — 主品牌色 (Torii Vermilion)

| Token | Value | Usage |
|-------|-------|-------|
| `--shu-50` | `#fff7f5` | Lightest tint, badge backgrounds |
| `--shu-100` | `#ffede9` | Light tint |
| `--shu-200` | `#ffd5cc` | Soft accent |
| `--shu-300` | `#f7a99a` | Medium tint |
| `--shu-400` | `#e8806e` | Warm accent |
| `--shu-500` | `#d45b47` | **Primary CTA**, focus rings, search button |
| `--shu-600` | `#b8412e` | **Hover state**, accent |
| `--shu-700` | `#962e1d` | Deep accent |
| `--shu-800` | `#6e2014` | Dark brand |
| `--shu-900` | `#4a120a` | Deepest brand |

### 樱色 Sakura — 温暖珊瑚 (Warm coral, decorative)

| Token | Value | Usage |
|-------|-------|-------|
| `--sakura-50` | `#fff8f6` | Subtle background |
| `--sakura-100` | `#ffefeb` | Trust icon bg, social icon bg |
| `--sakura-200` | `#ffddd6` | Borders on sakura cards |
| `--sakura-300` | `#f2b0a5` | Divider gradients |
| `--sakura-400` | `#e3948a` | Eyebrow gradient lines, gradient start |
| `--sakura-500` | `#d87b70` | Eyebrow text, link hover, kamon stroke |
| `--sakura-600` | `#c0635a` | Trust icons, active links, seasonal scene |
| `--sakura-700` | `#9e4d45` | Deep coral |
| `--sakura-800` | `#7a3832` | Dark coral |
| `--sakura-900` | `#522520` | Deepest coral |

### 侘寂色系 Wabi-Sabi — 日式 Zen 中性色

| Token | Value | Name | Usage |
|-------|-------|------|-------|
| `--wabi-50` | `#fdfbf7` | 宣纸米白 | Immersive page bg |
| `--wabi-100` | `#f5f0e8` | 绢白 | Card bg, selected plan bg |
| `--wabi-200` | `#e8e2dc` | 枯草 | Dividers, secondary button hover |
| `--wabi-300` | `#d4ccc2` | 灰梅 | Borders |
| `--wabi-400` | `#b8a89a` | 墨淡 | Decorative text |
| `--wabi-500` | `#8b7355` | 路考茶 | dt labels, secondary icons, first-time scene |
| `--wabi-600` | `#5c5854` | 鼠灰 | Secondary body text, nav |
| `--wabi-700` | `#3d3a38` | 墨鼠 | Labels, body text |
| `--wabi-800` | `#2d2a26` | 漆黑 | Headings |
| `--wabi-900` | `#1a1816` | 玄黑 | Error stack bg |

### 中性灰 Gray (Airbnb gray)

| Token | Value | Usage |
|-------|-------|-------|
| `--gray-50` | `#f9fafb` | Form page bg |
| `--gray-100` | `#f3f4f6` | Muted bg |
| `--gray-200` | `#e5e7eb` | Default border |
| `--gray-300` | `#d1d5db` | Input border |
| `--gray-400` | `#9ca3af` | Placeholder |
| `--gray-500` | `#6b7280` | Muted text |
| `--gray-600` | `#4b5563` | Secondary text |
| `--gray-700` | `#374151` | Body text |
| `--gray-800` | `#1f2937` | Foreground default |
| `--gray-900` | `#111827` | Headings (h3/h4) |

### Semantic colors

| Token | Value | Usage |
|-------|-------|-------|
| `--primary` | `var(--shu-500)` | Primary CTA |
| `--accent` | `var(--shu-600)` | Hover accent |
| `--background` | `#ffffff` | Page background |
| `--foreground` | `var(--gray-800)` | Default text |
| `--card` | `#ffffff` | Card bg |
| `--border` | `var(--gray-200)` | Default border |
| `--destructive` | `#ef4444` | Error, form-error |
| `--success` | `#10b981` | Success status |
| `--warning` | `#f59e0b` | Warning status |
| `--info` | `#3b82f6` | Info, yukata scene |

## Typography

### Font stacks (three-layer system)

| Family | Stack | Usage |
|--------|-------|-------|
| `--font-sans` | PingFang SC, Hiragino Sans GB, system-ui | Chinese body + UI |
| `--font-serif` | Noto Serif CJK SC, Songti SC, Georgia | Chinese titles |
| `--font-mincho` | Noto Serif JP, Hiragino Mincho ProN | Japanese decoration |
| `--font-mono` | SF Mono, Monaco, Consolas | Code blocks |

### Font sizes (fixed pixels — never use Tailwind named sizes)

| Token | Value | Usage |
|-------|-------|-------|
| `--fs-xs` | `12px` | Aux text, eyebrow, dt labels |
| `--fs-sm` | `14px` | Labels, nav, secondary |
| `--fs-15` | `15px` | Card subtitles |
| `--fs-base` | `16px` | Body text |
| `--fs-lg` | `18px` | Emphasis, panel h2 |
| `--fs-xl` | `22px` | Sub-headings |
| `--fs-2xl` | `26px` | Section titles, status values |
| `--fs-3xl` | `32px` | Page titles (mobile h1) |
| `--fs-hero` | `42px` | Hero headline |

### Font weights (400/500/600 only — never 700+)

| Token | Value |
|-------|-------|
| `--fw-normal` | `400` |
| `--fw-medium` | `500` |
| `--fw-semibold` | `600` |

## Spacing (4px grid)

Allowed values only. **Forbidden:** `gap-5/7/9`, `p-5/7`, or any value not on the 4px grid.

| Token | Value |
|-------|-------|
| `--space-1` | `4px` (0.25rem) |
| `--space-2` | `8px` (0.5rem) |
| `--space-3` | `12px` (0.75rem) |
| `--space-4` | `16px` (1rem) |
| `--space-6` | `24px` (1.5rem) |
| `--space-8` | `32px` (2rem) |
| `--space-10` | `40px` (2.5rem) |
| `--space-12` | `48px` (3rem) |
| `--space-16` | `64px` (4rem) |
| `--space-20` | `80px` (5rem) |
| `--space-24` | `96px` (6rem) |

## Radii

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-lg` | `12px` | Buttons, inputs |
| `--radius-xl` | `16px` | Cards, panels |
| `--radius-2xl` | `24px` | Hero, booking blocks |
| `--radius-full` | `9999px` | Badges, pills, avatars |

**Forbidden:** `rounded-md (8px)`, `rounded-sm (4px)`.

## Shadows

| Token | Usage |
|-------|-------|
| `--shadow-xs` | Subtle depth |
| `--shadow-sm` | Card resting state |
| `--shadow-md` | Elevated elements |
| `--shadow-lg` | Dropdowns, popovers |
| `--shadow-xl` | Card hover state |
| `--shadow-2xl` | Modals |
| `--shadow-shu` | Brand-tinted (shu) shadow |
| `--shadow-shu-lg` | Large brand shadow |
| `--shadow-sakura` | Brand-tinted (sakura) shadow |
| `--shadow-sakura-lg` | Large sakura shadow |

## Easing

- Primary: `--ease-out-quart` — `cubic-bezier(0.25, 1, 0.5, 1)` for cinematic moments
- Default: `ease` for simple transitions
- Durations: `200ms` (buttons), `300ms` (cards), `500ms` (page-level), `700ms` (image hover scale)
- **Forbidden:** 100/150ms (too snappy), 1000ms+ (sluggish)

## Touch targets

- Minimum button height: `44px`
- Cart action button height: `36px`

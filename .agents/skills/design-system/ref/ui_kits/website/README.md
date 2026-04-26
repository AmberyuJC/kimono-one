# Kimono One — Website UI Kit

High-fidelity recreation of the Kimono One marketing/booking website.

## Components

- **Header.jsx** — Sticky nav: kamon logo + wordmark, search bar, login/cart, navigation menu
- **Hero.jsx** — Full-bleed hero with cherry-blossom petals, glass search panel, trust bar
- **SearchPanel.jsx** — Glass panel with destination + date + scene/crowd tag rows
- **PlanCard.jsx** — Product card with image, badges, store, title, price
- **PlanGrid.jsx** — Section wrapper with eyebrow header + responsive 4-col grid
- **TrustBar.jsx** — 5 sakura icon-block features
- **Footer.jsx** — Brand block + 3 link columns + social icons
- **Kamon.jsx** — CSS-drawn 家紋 logo
- **Eyebrow.jsx** — Decorative eyebrow line + uppercase label
- **Badge.jsx** + **Button.jsx** — Tonal/solid badge & button variants

## Source mapping

| File | Source |
|---|---|
| Header | `src/components/layout/Header.tsx` |
| Hero, SearchPanel, TrustBar | `src/components/home/HeroSection.tsx`, `HeroSearchPanel.tsx` |
| PlanCard | `src/components/PlanCard/index.tsx` (referenced in design-system.md) |
| Footer | `src/components/layout/Footer.tsx` |

## Notes

- **Imagery** — Codebase uses Cloudfront-hosted images at runtime; we use Unsplash placeholders that match the warm, kimono/Kyoto aesthetic. Swap in real CDN URLs when wiring up.
- **Functionality is cosmetic** — destination/date dropdowns and tag filters update local state but don't navigate.
- **Icons** — Lucide via CDN (matches codebase's `lucide-react`).

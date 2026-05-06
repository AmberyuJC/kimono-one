# /plans Open Design Brief

## Prompt

Design 2-3 desktop and mobile `/plans` package browsing directions for Kimono One, a kimono booking product. Prioritize guest-facing Japanese editorial luxury, clear package comparison, browsing confidence, price/duration readability, and booking intent.

## Constraints

- Use Open Design only as an external design lab and review input.
- Do not copy generated runtime, CSS, Tailwind utilities, fonts, arbitrary colors, or layout code into Kimono One.
- Translate the selected direction into the local tokens and component patterns in `app/app.css`.
- Keep product scope limited to `/plans`; do not change API contracts, fixture data, cart, booking, or plan detail behavior.

## Candidate Directions

1. Japanese editorial luxury
   - Quiet hero, restrained navigation, editorial copy, and dense package cards.
   - Best fit for the current guest-facing catalog because it improves browsing confidence without becoming a marketing page.
2. Ryokan concierge comparison
   - More service-led hierarchy with stronger guided copy and fewer visible packages.
   - Useful later for booking flow guidance, but too narrow for the current catalog scan task.
3. Modern booking utility
   - Dashboard-like filtering and comparison controls.
   - Better suited to future admin or merchant workflows than the visitor catalog.

## Selected Direction

Japanese editorial luxury was selected. The implementation keeps the existing `.shop-shell`, `.shop-hero`, `.plan-grid`, `.plan-card`, `.plan-art`, `.eyebrow`, and primary button patterns, then adds package-comparison hierarchy for summary, price, duration, recommended scene, inclusions, and booking intent.

## Token Translation

- Brand action: `--primary`, `--accent`, `--primary-foreground`, `--shadow-shu`.
- Text hierarchy: `--font-serif`, `--font-sans`, `--fs-hero`, `--fs-15`, `--fs-sm`, `--fs-xs`, and weights 400/500/600.
- Surfaces and dividers: `--card`, `--border`, `--wabi-100`, `--wabi-500`, `--wabi-600`, `--wabi-700`, `--wabi-800`.
- Spacing and shape: existing `--space-*`, `--radius-lg`, `--radius-xl`, and `--radius-full`.

## Evidence

- Desktop implementation screenshot: `selected-desktop.png`
- Mobile implementation screenshot: `selected-mobile.png`
- Verification: `pnpm test:e2e`, `pnpm check:uiux-harness`, `pnpm check:harness`, `pnpm lint`, `pnpm typecheck`, `pnpm test`

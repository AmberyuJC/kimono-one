# UI/UX Harness

Open Design is an external design lab for Kimono One. It can generate prototypes, visual directions, critique inputs, and screenshots, but it is not a product runtime dependency.

Kimono One implementation still follows the local design system in `.agents/skills/design-system/ref/`, the architecture boundaries in `docs/system/architecture.md`, and the verification gates in `docs/system/quality-bar.md`.

## Required UI Plan Fields

Every active UI/UX plan must include a `## UI/UX Harness` section with these fields:

- Open Design brief: the prompt or concise brief used to generate or critique the prototype.
- Design direction: the selected direction or design system, such as Japanese editorial luxury for guest pages or SaaS booking utility for dashboards.
- Desktop evidence: screenshot, artifact path, or explicit pending evidence for a desktop viewport.
- Mobile evidence: screenshot, artifact path, or explicit pending evidence for a mobile viewport.
- Token alignment: how the prototype will be translated into Kimono One colors, typography, spacing, radii, shadows, and component patterns.
- Accessibility and layout: checks for touch targets, readable hierarchy, no overlap, and responsive behavior.
- Verification command: the exact command that proves the UI slice, usually `pnpm test:e2e` plus screenshot assertions for meaningful visual changes.

## Usage Boundary

- Use Open Design before implementation to explore alternatives, not after implementation to justify drift.
- Do not copy generated CSS, Tailwind utilities, inline styles, fonts, or color values into Kimono One.
- Translate chosen ideas into `app/app.css` using existing tokens and semantic class names.
- Add Playwright screenshot evidence for new page structures or substantial visual changes.
- Keep Open Design artifacts outside product runtime code unless a future plan explicitly approves a durable artifact location.

## First Spike

The first Open Design spike is `/plans`, because the page is already part of the current booking slice and can be verified on desktop and mobile without changing domain behavior.

# Plan: Plans Open Design Redesign

## Why

`/plans` 是 Kimono One 当前游客端路径的第一个真实浏览页面，也是后续 feature parity 的入口。现在页面需要用 Open Design 做一次受控的 UI/UX spike：先探索 2-3 个视觉方向，再把选中的信息架构和视觉层级翻译进 Kimono One 的本地设计系统。

这个切片验证两件事：Open Design 能否提升 UI/UX 决策质量，以及新的 UI/UX harness 能否让 agentic coding 在视觉改动上完成闭环验证。

## Non-goals

- 不修改 catalog、cart、booking、identity 的 domain contract。
- 不新增数据库 schema、fixture 字段、API endpoint 或 runtime dependency。
- 不把 Open Design 生成的 CSS、Tailwind、字体、颜色或运行时文件复制进产品代码。
- 不重做 `/plans/:slug`、`/cart`、`/booking/new` 或后台页面。
- 不追平 `hefumiyabi-website` 的全部套餐和后台能力。

## Scope

- Open Design artifacts:
  - 将 `/plans` 的 Open Design brief、候选方向、截图或导出说明记录在 `docs/design/open-design/plans/`。
- Product UI:
  - `app/routes/plans.tsx`
  - `app/app.css`
- Verification:
  - `tests/e2e/minimal-booking.spec.ts` 或新增 `/plans` 视觉 smoke。
  - 必要时添加 Playwright screenshot baseline。
- State:
  - 更新 `docs/state/progress.md` 和 `docs/state/session-handoff.md`。

## UI/UX Harness

- Open Design brief: Design 2-3 desktop and mobile `/plans` package browsing directions for Kimono One, a kimono booking product. Prioritize guest-facing Japanese editorial luxury, clear package comparison, browsing confidence, price/duration readability, and booking intent.
- Design direction: Start with Japanese editorial luxury for the guest page; avoid generic SaaS landing-page composition, purple/indigo gradients, oversized marketing hero cards, and decorative elements that reduce package scanability.
- Desktop evidence: Save the selected desktop prototype screenshot, artifact note, or exported preview reference under `docs/design/open-design/plans/`.
- Mobile evidence: Save the selected mobile prototype screenshot, artifact note, or exported preview reference under `docs/design/open-design/plans/`.
- Token alignment: Translate the chosen direction into Kimono One tokens from `app/app.css` and `.agents/skills/design-system/ref/tokens.md`; reuse `.shop-shell`, `.plan-grid`, `.plan-card`, `.plan-art`, `.eyebrow`, and button patterns where possible.
- Accessibility and layout: Verify readable card hierarchy, no overlapping text, minimum 44px primary touch targets, mobile package comparison readability, and responsive behavior across desktop/mobile Playwright viewports.
- Verification command: `pnpm test:e2e`; also run `pnpm check:uiux-harness`, `pnpm check:harness`, `pnpm lint`, `pnpm typecheck`, and `pnpm test`.

## Acceptance Criteria

- [x] `docs/design/open-design/plans/` contains the Open Design brief and selected desktop/mobile evidence or artifact notes.
- [x] `/plans` presents package browsing with clearer hierarchy for plan name, price, duration, scene, inclusions, and booking action.
- [x] The implemented CSS uses existing Kimono One tokens and semantic class names in `app/app.css`.
- [x] No generated Open Design runtime, arbitrary colors, new fonts, Tailwind utility classes, inline styles, or copied CSS are introduced.
- [x] Desktop and mobile Playwright coverage verifies `/plans` remains usable and the existing booking smoke path still works.
- [x] Boundary rules remain intact.

## Verification

- `pnpm check:uiux-harness`
- `pnpm check:harness`
- `pnpm lint`
- `pnpm typecheck`
- `pnpm test`
- `pnpm test:e2e`
- Additional task-specific checks:
  - Playwright screenshot evidence for `/plans` desktop and mobile if the visual structure changes substantially.

Evidence:

- `docs/design/open-design/plans/brief.md` records the brief, candidate directions, selected direction, and token translation notes.
- `docs/design/open-design/plans/selected-desktop.png` captures the selected desktop implementation.
- `docs/design/open-design/plans/selected-mobile.png` captures the selected mobile implementation.
- `pnpm lint` passed.
- `pnpm typecheck` passed.
- `pnpm test` passed: 3 test files, 8 tests.
- `pnpm check:uiux-harness` passed.
- `pnpm check:harness` passed: agent context, plans, UI/UX harness, boundaries, and no-console checks.
- `pnpm test:e2e` passed: 4 tests across desktop and mobile, covering `/plans` comparison hierarchy and the booking smoke path.
- Targeted Prettier check passed for files changed in this slice.

## Rollback

Revert the `/plans` route changes, related `app/app.css` selectors, Playwright screenshot or smoke-test additions, and `docs/design/open-design/plans/` artifacts. No database or API rollback is needed because this slice does not change runtime contracts.

## Decision Log

- Start with `/plans` because it is the smallest guest-facing page that can prove the Open Design UI/UX rail without touching domain behavior.
- Keep Open Design artifacts as docs evidence first; only translated Kimono One tokens and component patterns may enter product code.
- Guest-facing visual direction defaults to Japanese editorial luxury; dashboard/admin directions remain out of scope for this slice.
- Implemented inclusions as route-level presentation copy derived from existing `scene` values to avoid domain contract, fixture, API, or database changes.

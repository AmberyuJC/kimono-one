# Plan: Open Design UI/UX Harness

## Why

Kimono One 的下一阶段目标是先建立可靠的 agentic coding 闭环，再稳步追平 `hefumiyabi-website` 的功能面。当前主要瓶颈不是缺少功能，而是开发速度慢、闭环验证弱、UI/UX 质量不稳定。

Open Design 可以作为外部设计实验室，用来生成游客端和后台界面的可视化方向、原型和评审输入。但 Kimono One 的落地实现仍必须遵守本仓库的设计系统、架构边界、测试和 harness 规则。

## Non-goals

- 不把 Open Design 的运行时、daemon、web app 或 `.od` 数据直接并入 Kimono One。
- 不直接复制 Open Design 生成的 HTML/CSS 到产品代码。
- 不在本切片重做全站 UI。
- 不改变数据库 schema、API contract、booking runtime 或 fixture 数据。
- 不追平 `hefumiyabi-website` 的全部功能。

## Scope

- 建立 Open Design 在 Kimono One 中的使用约定：作为原型生成、视觉探索和评审输入，而不是产品运行时依赖。
- 定义 UI/UX harness rail：每个 UI feature plan 必须记录 brief、design direction、截图证据、token 对齐说明和验证命令。
- 选择第一个验证切片：`/plans` 套餐浏览页的 desktop 和 mobile 原型探索。
- 产出可复用的 feature parity UI/UX 交付格式，用于后续游客端、预约流、商家后台和管理后台。
- 保持 `app/`、`src/api/http/`、`src/domains/`、`src/db/` 的现有边界规则不变。

## UI/UX Harness

- Open Design brief: Generate 2-3 `/plans` package browsing prototypes for a kimono booking product, with guest-facing Japanese editorial luxury as the primary direction and clear desktop/mobile variants.
- Design direction: Guest pages start from Japanese editorial luxury; future dashboard/admin pages should use SaaS booking utility.
- Desktop evidence: Pending for the next UI implementation slice; expected artifact is a desktop `/plans` screenshot or saved Open Design prototype.
- Mobile evidence: Pending for the next UI implementation slice; expected artifact is a mobile `/plans` screenshot or saved Open Design prototype.
- Token alignment: Translate any selected prototype into Kimono One tokens from `app/app.css` and `.agents/skills/design-system/ref/tokens.md`; do not copy generated colors, fonts, spacing, radii, or shadows.
- Accessibility and layout: Verify readable hierarchy, 44px touch targets where applicable, no overlapping text, responsive plan browsing, and no decorative UI that hides package comparison.
- Verification command: `pnpm test:e2e`; substantial visual changes must also include Playwright screenshot evidence.

## Acceptance Criteria

- [x] 文档明确 Open Design 只作为外部设计实验室，不作为 Kimono One 产品运行时依赖。
- [x] UI feature plan 模板或约定包含 Open Design brief、设计方向、截图证据、设计系统 token 对齐、可访问性/布局检查和验证命令。
- [x] `/plans` 被锁定为第一个 UI/UX harness spike 页面，并包含 desktop 与 mobile 的验收口径。
- [x] 后续 feature parity 条目可以引用同一套 UI/UX rail 推进。
- [x] 不修改 UI 代码、API 行为、数据库 schema 或 fixture 数据，除非后续计划单独批准。
- [x] Boundary rules remain intact.

## Verification

- `pnpm check:plans`
- `pnpm check:harness`
- Additional task-specific checks:
  - `pnpm check:uiux-harness`
  - 后续进入 UI 实现切片时必须运行 `pnpm test:e2e`。
  - 若新增或重做页面视觉结构，必须补充 Playwright screenshot baseline 或等价截图证据。

Evidence:

- `pnpm check:uiux-harness` passed: active Open Design/UI plans require a `## UI/UX Harness` section with brief, design direction, desktop/mobile evidence, token alignment, accessibility/layout checks, and verification command.
- `pnpm check:harness` passed after adding the UI/UX harness gate.
- `pnpm lint` passed.
- `pnpm typecheck` passed.
- `pnpm test` passed: 3 test files, 8 tests.
- No `app/`, `src/api/http/`, `src/domains/`, `src/db/`, fixture, or runtime files were changed in this slice.

## Rollback

删除本计划和相关 state 更新即可回到 Open Design 接入前的 harness 状态。因为本切片不改产品代码、数据库或运行时依赖，回滚不需要数据迁移。

## Decision Log

- Open Design 用作设计实验室和评审输入，不作为产品依赖。
- 游客端优先探索日式纸感 / editorial luxury 方向；后台后续优先现代 SaaS booking utility 方向。
- 第一个 spike 选择 `/plans`，因为它最接近当前 `catalog -> plan detail -> cart -> booking draft` 垂直切片，且 UI/UX 成果容易通过截图和 E2E 验证。

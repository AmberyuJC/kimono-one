# Commit & PR Conventions

## Commit message format

```
<中文摘要，50字以内>

<中文正文，解释为什么做这个变更，不要重复代码 diff 已经说明的内容>
```

示例：
```
添加套餐详情页面的门店选择功能

游客需要在详情页选择具体门店才能加入购物车。
使用 availableStores 数据渲染选择列表。
```

## PR description

Follow the plan's section headings:
- **变更内容** — what changed (user impact + technical impact)
- **验证方式** — which commands were run and their results
- **残余风险** — anything not covered by automated checks

## Scope verification

Before committing, check that changed files match the plan scope:

```bash
git diff --name-only
```

If files outside the plan's scope are modified, either update the plan or revert the unplanned changes.

## Pre-ship checklist

```bash
pnpm lint && pnpm typecheck && pnpm test && pnpm check:harness && pnpm build
```

For UI changes, also run:
```bash
pnpm test:e2e
```

All commands must pass with zero errors and zero warnings.

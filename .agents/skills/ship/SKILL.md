---
name: ship
description: Commit changes, push branch, and create a PR with clean evidence, clear scope, and no hidden drift.
---

# ship

Commit, push, and open a PR in one flow.

## Steps

1. **Verify** — run `pnpm typecheck && pnpm test && pnpm check:harness`. Stop if anything fails.
2. **Branch** — if on `main`, create a descriptive feature branch (e.g. `design-system-v2`, `feat/booking-flow`) and switch to it. Never commit directly to `main`.
3. **Stage & commit** — stage relevant files (never `.env` or credentials), write a concise Chinese commit message summarizing the "why". End with `Co-Authored-By:` line.
4. **Push** — push the feature branch to origin with `-u`. Ask the user to run the push if hooks block it.
5. **Create PR** — use `gh pr create` targeting `main`. PR title in Chinese, under 70 characters. Body format:

```
## Summary
<1-3 bullet points in Chinese>

## 验证
- [ ] TypeCheck 通过
- [ ] 单元测试通过
- [ ] Harness checks 通过
- [ ] (如有 UI 变更) 视觉验证
```

6. **Report** — return the PR URL to the user.

## Rules

- Commit and PR text in Chinese when possible.
- Never force-push without explicit user approval.
- Never skip hooks (`--no-verify`).
- If verification fails, fix the issue first — do not ship broken code.

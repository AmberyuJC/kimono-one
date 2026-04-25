---
name: domain-language
description: Enforce consistent domain terminology across code, tests, UI, and documentation. Prevents naming drift and synonym proliferation. Use when introducing new types, fields, or entity names, or when reviewing code and plans.
---

# domain-language

Keep the codebase's vocabulary consistent. Every entity, field, and concept has one canonical name.

## When introducing new names

1. **Check the glossary first.** Read [ref/glossary.md](ref/glossary.md) before creating any new type, field, or variable name.
2. **Use the canonical name** if the concept already exists. Do not introduce synonyms.
3. **Propose new terms** if the concept is genuinely new. Include:
   - English code name (camelCase for fields, PascalCase for types)
   - Chinese UI label
   - One-sentence definition
   - Which domain owns it (catalog, cart, booking, identity, or cross-domain)

## When reviewing code or plans

4. **Scan for terminology drift.** Flag any name that contradicts the glossary.
5. **Flag ambiguity.** If a term could belong to two domains, it needs explicit ownership. The most common ambiguity: "plan" means 套餐 (rental plan) in code but 计划文档 (planning document) in `docs/plans/`.
6. **Check Chinese labels.** UI text in route components should use the Chinese labels from the glossary. Do not translate ad-hoc.

## When the glossary needs updating

7. Update `ref/glossary.md` inline when a new term is resolved during a deep-interview or plan-review session. Do not batch updates.

## Reference

- [ref/glossary.md](ref/glossary.md) — canonical terms, Chinese labels, forbidden synonyms

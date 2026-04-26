---
name: plan-review
description: Challenge a plan for missing boundaries, hidden migrations, thin tests, delivery risk, and architecture violations. Use before implementation starts.
---

# plan-review

Use this skill before implementation begins. A plan that cannot be evaluated mechanically must be rejected.

## Structure check

1. Verify the plan has all required sections: `Why`, `Non-goals`, `Scope`, `Acceptance Criteria`, `Verification`, `Rollback`.
2. Each acceptance criterion must be verifiable by a specific command or test. Criteria like "works correctly" are insufficient.

## Scope check

3. Look for hidden schema changes, missing auth boundaries, and unowned follow-up work.
4. Check that the plan does not silently widen scope beyond what was agreed in deep-interview.
5. If UI changes are in scope, verify the plan acknowledges the design-system skill.

## Architecture check

6. Apply the architecture vocabulary from [ref/architecture-vocabulary.md](ref/architecture-vocabulary.md):
   - Does the plan respect module boundaries and layer rules?
   - Does a change that touches 4 layers (app → http → domain → db) need to be split?
   - Are new seams placed at the right layer boundaries?

## Terminology check

7. Scan the plan for terms that conflict with the domain glossary (`.agents/skills/domain-language/ref/glossary.md`). Flag any synonym usage.

## Verdict

8. Approve, request changes, or reject. Rejection requires a specific reason and a suggested fix.

## Reference

- [ref/architecture-vocabulary.md](ref/architecture-vocabulary.md) — module, depth, seam, deletion test

# Trace Ledger

The trace ledger is the repo-local archive for completed rewrite evidence.

Current ledger:

- `docs/traces/rewrite-ledger.md`

Each completed rewrite slice records:

- plan path
- old behavior inspected
- tests added or updated
- screenshots, recordings, or API checks when relevant
- evaluator result
- reviewer result
- unresolved risk

Rules:

- The ledger lives in repo docs, not Obsidian.
- Add entries when a rewrite slice completes, after evaluator and reviewer
  evidence exists.
- A manual Markdown ledger is enough for now. Automate only if manual entries
  become repetitive.
- `pnpm check:harness` verifies that the ledger file exists. Reviewer discipline
  enforces entry completeness until automation is justified.

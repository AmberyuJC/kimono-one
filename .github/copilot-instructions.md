# Kimono One Harness Lab

This repository is a harness-first rebuild of Kimono One.

- Read `AGENTS.md`, `docs/system/README.md`, and `docs/system/architecture.md` before making structural changes.
- Use `pnpm` for every package and script command.
- Run `pnpm check:harness` before considering a task done.
- Keep Hono handlers thin: parse input, validate, call a domain service, map output.
- Do not import `src/db/*` from `app/*` or `src/api/http/*`.
- Do not import React, React Router, or Hono from `src/domains/*`.
- Do not import UI or domain services from `src/db/*`.
- Do not add `console.*` to production code under `app/` or `src/`.
- For medium and large tasks, add or update a plan in `docs/plans/active`.
- Prefer Chinese for code comments, commit messages, and PR descriptions.

---
applyTo: "app/**/*.ts,app/**/*.tsx,app/**/*.css"
---

The React Router `app/` directory is the UI shell.

- Keep route modules presentation-focused.
- Do not import `src/db/*` from UI code.
- Avoid burying domain logic in route components.
- Default to system fonts and lightweight styles unless the repository already standardizes something else.

import { fail, fileExists, readText } from "./lib/files";

const requiredFiles = [
  "AGENTS.md",
  "CLAUDE.md",
  ".claude/settings.json",
  ".claude/hooks/block-dangerous-git.sh",
  ".claude/agents/planner.md",
  ".claude/agents/implementer.md",
  ".claude/agents/evaluator.md",
  ".claude/agents/reviewer.md",
  ".github/copilot-instructions.md",
  ".github/instructions/api.instructions.md",
  ".github/instructions/app.instructions.md",
  ".github/instructions/docs.instructions.md",
  ".github/instructions/domains.instructions.md",
  ".github/agents/planner.agent.md",
  ".github/agents/implementer.agent.md",
  ".github/agents/evaluator.agent.md",
  ".github/agents/reviewer.agent.md",
  ".agents/skills/deep-interview/SKILL.md",
  ".agents/skills/plan-review/SKILL.md",
  ".agents/skills/implement/SKILL.md",
  ".agents/skills/verify/SKILL.md",
  ".agents/skills/ship/SKILL.md",
  ".agents/skills/weekly-review/SKILL.md",
  ".agents/skills/design-system/SKILL.md",
  ".agents/skills/domain-language/SKILL.md",
  "docs/system/README.md",
  "docs/system/architecture.md",
  "docs/system/domain-map.md",
  "docs/system/delivery-model.md",
  "docs/system/quality-bar.md",
  "docs/plans/template.md",
  "docs/state/progress.md",
  "docs/state/session-handoff.md",
  "docs/state/feature-list.json",
  "init.sh",
  "scripts/bootstrap.sh",
];

const missing = requiredFiles.filter((file) => !fileExists(file));
if (missing.length > 0) {
  fail([
    "Missing required harness files:",
    ...missing.map((file) => `- ${file}`),
  ]);
}

const emptyFiles = requiredFiles.filter(
  (file) => readText(file).trim().length === 0,
);
if (emptyFiles.length > 0) {
  fail([
    "Harness files must not be empty:",
    ...emptyFiles.map((file) => `- ${file}`),
  ]);
}

console.log(
  `Agent context check passed (${requiredFiles.length} files verified).`,
);

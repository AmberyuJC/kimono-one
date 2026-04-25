import {
  collectFiles,
  fail,
  readMarkdownHeadings,
  readText,
  toProjectRelative,
} from "./lib/files";

const requiredHeadings = [
  "# Plan:",
  "## Why",
  "## Non-goals",
  "## Scope",
  "## Acceptance Criteria",
  "## Verification",
  "## Rollback",
  "## Decision Log",
];

function validatePlan(relativePath: string) {
  const headings = readMarkdownHeadings(readText(relativePath));
  const missingHeadings = requiredHeadings.filter((heading) =>
    heading === "# Plan:"
      ? !headings.some((line) => line.startsWith("# Plan:"))
      : !headings.includes(heading),
  );

  if (missingHeadings.length > 0) {
    return `${relativePath} is missing headings: ${missingHeadings.join(", ")}`;
  }

  return null;
}

const planFiles = collectFiles("docs/plans", new Set([".md"]))
  .map(toProjectRelative)
  .filter((file) => !file.endsWith(".gitkeep"));

const violations = planFiles
  .map((file) => validatePlan(file))
  .filter((value): value is string => value !== null);

if (violations.length > 0) {
  fail([
    "Plan format check failed:",
    ...violations.map((message) => `- ${message}`),
  ]);
}

console.log(
  `Plan format check passed (${planFiles.length} markdown file(s) verified).`,
);

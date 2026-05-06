import {
  collectFiles,
  fail,
  fileExists,
  readMarkdownHeadings,
  readText,
  toProjectRelative,
} from "./lib/files";

const uiuxSystemDoc = "docs/system/uiux-harness.md";

const requiredSystemPhrases = [
  "Open Design is an external design lab",
  "Open Design brief",
  "Design direction",
  "Desktop evidence",
  "Mobile evidence",
  "Token alignment",
  "Accessibility and layout",
  "Verification command",
];

const requiredPlanPhrases = [
  "Open Design brief",
  "Design direction",
  "Desktop evidence",
  "Mobile evidence",
  "Token alignment",
  "Accessibility and layout",
  "Verification command",
];

function isUiuxPlan(markdown: string) {
  return /\b(UI\/UX|Open Design|visual|screenshot|prototype)\b/i.test(markdown);
}

const violations: string[] = [];

if (!fileExists(uiuxSystemDoc)) {
  violations.push(`${uiuxSystemDoc} is missing.`);
} else {
  const systemDoc = readText(uiuxSystemDoc);
  for (const phrase of requiredSystemPhrases) {
    if (!systemDoc.includes(phrase)) {
      violations.push(`${uiuxSystemDoc} is missing "${phrase}".`);
    }
  }
}

const template = readText("docs/plans/template.md");
if (!readMarkdownHeadings(template).includes("## UI/UX Harness")) {
  violations.push("docs/plans/template.md is missing ## UI/UX Harness.");
}

const activePlans = collectFiles("docs/plans/active", new Set([".md"]))
  .map(toProjectRelative)
  .filter((file) => !file.endsWith(".gitkeep"));

for (const plan of activePlans) {
  const markdown = readText(plan);
  if (!isUiuxPlan(markdown)) {
    continue;
  }

  const headings = readMarkdownHeadings(markdown);
  if (!headings.includes("## UI/UX Harness")) {
    violations.push(`${plan} is missing ## UI/UX Harness.`);
  }

  for (const phrase of requiredPlanPhrases) {
    if (!markdown.includes(phrase)) {
      violations.push(`${plan} is missing "${phrase}".`);
    }
  }
}

if (violations.length > 0) {
  fail([
    "UI/UX harness check failed:",
    ...violations.map((item) => `- ${item}`),
  ]);
}

console.log(
  `UI/UX harness check passed (${activePlans.length} active plan file(s) scanned).`,
);

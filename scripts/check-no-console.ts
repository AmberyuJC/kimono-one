import { collectFiles, fail, readText, toProjectRelative } from "./lib/files";

const sourceFiles = [
  ...collectFiles("app", new Set([".ts", ".tsx"])),
  ...collectFiles("src", new Set([".ts", ".tsx"])),
];
const filesToScan = sourceFiles.filter(
  (file) => !/\.test\.(ts|tsx)$/.test(file),
);

const violations: string[] = [];

for (const file of filesToScan) {
  const source = readText(toProjectRelative(file));
  const lines = source.split("\n");
  lines.forEach((line, index) => {
    if (/\bconsole\.[a-zA-Z]+\s*\(/.test(line)) {
      violations.push(`${toProjectRelative(file)}:${index + 1}`);
    }
  });
}

if (violations.length > 0) {
  fail([
    "Console usage is forbidden in app/ and src/ production code:",
    ...violations.map((item) => `- ${item}`),
  ]);
}

console.log(
  `No console usage detected in ${filesToScan.length} source file(s).`,
);

import path from "node:path";
import {
  collectFiles,
  fail,
  readText,
  resolveProjectImport,
  toProjectRelative,
} from "./lib/files";

const importPattern =
  /(?:import|export)\s+(?:[^"'\n]*?\s+from\s+)?["']([^"']+)["']/g;
const dynamicImportPattern = /import\(\s*["']([^"']+)["']\s*\)/g;

function extractImports(source: string) {
  const imports: string[] = [];

  for (const pattern of [importPattern, dynamicImportPattern]) {
    for (const match of source.matchAll(pattern)) {
      imports.push(match[1]);
    }
  }

  return imports;
}

function normalizeResolvedPath(resolvedPath: string | null) {
  if (!resolvedPath) {
    return null;
  }

  const absolute =
    resolvedPath.endsWith(".ts") || resolvedPath.endsWith(".tsx")
      ? resolvedPath
      : `${resolvedPath}.ts`;

  return absolute.split(path.sep).join("/");
}

const files = [
  ...collectFiles("app", new Set([".ts", ".tsx"])),
  ...collectFiles("src", new Set([".ts", ".tsx"])),
];

const violations: string[] = [];

for (const file of files) {
  const relativeFile = toProjectRelative(file);
  const source = readText(relativeFile);
  const imports = extractImports(source);

  for (const specifier of imports) {
    const resolved = normalizeResolvedPath(
      resolveProjectImport(file, specifier),
    );

    if (
      (relativeFile.startsWith("app/") ||
        relativeFile.startsWith("src/api/http/")) &&
      ((resolved && resolved.includes("/src/db/")) ||
        specifier.startsWith("@/db/"))
    ) {
      violations.push(
        `${relativeFile} must not import database code directly (${specifier}).`,
      );
    }

    if (
      relativeFile.startsWith("src/domains/") &&
      /^(react|react-dom|react-router|hono|@hono\/)/.test(specifier)
    ) {
      violations.push(
        `${relativeFile} must stay framework-agnostic (${specifier}).`,
      );
    }

    if (
      relativeFile.startsWith("src/db/") &&
      resolved &&
      (resolved.includes("/app/") ||
        resolved.includes("/src/api/") ||
        resolved.includes("/src/domains/"))
    ) {
      violations.push(
        `${relativeFile} must not import UI, API, or domain code (${specifier}).`,
      );
    }
  }
}

if (violations.length > 0) {
  fail([
    "Boundary check failed:",
    ...violations.map((message) => `- ${message}`),
  ]);
}

console.log(
  `Boundary check passed (${files.length} TypeScript file(s) scanned).`,
);

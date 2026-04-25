import fs from "node:fs";
import path from "node:path";

export const projectRoot = process.cwd();

export function fileExists(relativePath: string) {
  return fs.existsSync(path.join(projectRoot, relativePath));
}

export function readText(relativePath: string) {
  return fs.readFileSync(path.join(projectRoot, relativePath), "utf8");
}

export function toProjectRelative(absolutePath: string) {
  return path.relative(projectRoot, absolutePath).split(path.sep).join("/");
}

export function collectFiles(rootDirectory: string, extensions: Set<string>) {
  const absoluteRoot = path.join(projectRoot, rootDirectory);
  if (!fs.existsSync(absoluteRoot)) {
    return [];
  }

  const collected: string[] = [];

  function walk(currentDirectory: string) {
    const entries = fs.readdirSync(currentDirectory, { withFileTypes: true });
    for (const entry of entries) {
      const absolutePath = path.join(currentDirectory, entry.name);
      if (entry.isDirectory()) {
        walk(absolutePath);
        continue;
      }

      if (extensions.has(path.extname(entry.name))) {
        collected.push(absolutePath);
      }
    }
  }

  walk(absoluteRoot);
  return collected;
}

export function resolveProjectImport(fromFile: string, specifier: string) {
  if (specifier.startsWith("@/")) {
    return path.join(projectRoot, "src", specifier.slice(2));
  }

  if (specifier.startsWith("~/")) {
    return path.join(projectRoot, "app", specifier.slice(2));
  }

  if (specifier.startsWith(".")) {
    return path.resolve(path.dirname(fromFile), specifier);
  }

  return null;
}

export function readMarkdownHeadings(markdown: string) {
  return markdown
    .split("\n")
    .filter((line) => line.startsWith("#"))
    .map((line) => line.trim());
}

export function fail(messages: string[]): never {
  throw new Error(messages.join("\n"));
}

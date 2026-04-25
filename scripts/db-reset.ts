import { execFileSync } from "node:child_process";

const pnpmCommand = process.platform === "win32" ? "pnpm.cmd" : "pnpm";

execFileSync(pnpmCommand, ["db:migrate"], { stdio: "inherit" });
execFileSync(pnpmCommand, ["db:seed"], { stdio: "inherit" });

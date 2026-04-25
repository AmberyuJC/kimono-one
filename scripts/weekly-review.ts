import fs from "node:fs";
import path from "node:path";

const activePlansDirectory = path.join(
  process.cwd(),
  "docs",
  "plans",
  "active",
);
const completedPlansDirectory = path.join(
  process.cwd(),
  "docs",
  "plans",
  "completed",
);
const traceLedgerPath = path.join(
  process.cwd(),
  "logs",
  "traces",
  "trace-ledger.jsonl",
);

const activePlans = fs.existsSync(activePlansDirectory)
  ? fs.readdirSync(activePlansDirectory).filter((file) => file.endsWith(".md"))
  : [];
const completedPlans = fs.existsSync(completedPlansDirectory)
  ? fs
      .readdirSync(completedPlansDirectory)
      .filter((file) => file.endsWith(".md"))
  : [];

const traceEntries = fs.existsSync(traceLedgerPath)
  ? fs.readFileSync(traceLedgerPath, "utf8").split("\n").filter(Boolean).length
  : 0;

console.log(`# Kimono One 周度复盘`);
console.log();
console.log(`- 活跃计划数: ${activePlans.length}`);
console.log(`- 已完成计划数: ${completedPlans.length}`);
console.log(`- Trace ledger 条目数: ${traceEntries}`);
console.log(`- 当前重点: 让最小业务闭环继续保持可验证、可复盘、可扩展。`);
console.log();
console.log(`## 建议`);
console.log();
console.log(`1. 下一个中型任务进入 docs/plans/active 后再开工。`);
console.log(`2. 为 Playwright smoke 增加截图 artifact，方便 evaluator 复盘。`);
console.log(`3. 开始记录 trace ledger，区分计划、实现、验证和 review 结果。`);

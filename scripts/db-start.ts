import "dotenv/config";
import { spawnSync } from "node:child_process";

const runtime = ["docker", "podman"].find((command) => {
  const result = spawnSync(command, ["--version"], { stdio: "ignore" });
  return result.status === 0;
});

if (!runtime) {
  throw new Error(
    "db:start requires docker or podman. Install one of them or point DATABASE_URL at an existing local Postgres instance.",
  );
}

const connectionUrl = new URL(
  process.env.DATABASE_URL ??
    "postgres://postgres:postgres@127.0.0.1:5432/kimono_one",
);
const containerName = process.env.DB_CONTAINER_NAME ?? "kimono-one-postgres";
const dbPassword = process.env.DB_PASSWORD ?? "postgres";
const port = process.env.DB_PORT ?? "5432";
const dbName = connectionUrl.pathname.replace("/", "") || "kimono_one";

const inspect = spawnSync(runtime, ["inspect", containerName], {
  stdio: "ignore",
});
if (inspect.status === 0) {
  spawnSync(runtime, ["start", containerName], { stdio: "inherit" });
  console.log(`Started existing Postgres container: ${containerName}`);
  process.exit(0);
}

const runArgs = [
  "run",
  "--name",
  containerName,
  "-e",
  `POSTGRES_PASSWORD=${dbPassword}`,
  "-e",
  `POSTGRES_DB=${dbName}`,
  "-p",
  `${port}:5432`,
  "-d",
  "postgres:16-alpine",
];

const result = spawnSync(runtime, runArgs, { stdio: "inherit" });
if (result.status !== 0) {
  throw new Error(`Failed to start local Postgres with ${runtime}.`);
}

console.log(`Started Postgres container ${containerName} on port ${port}.`);

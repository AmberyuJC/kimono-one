import "dotenv/config";

import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error(
    "DATABASE_URL is required to initialize the database client.",
  );
}

const globalForDatabase = globalThis as typeof globalThis & {
  __kimonoOnePool?: Pool;
};

const pool =
  globalForDatabase.__kimonoOnePool ??
  new Pool({
    connectionString,
  });

if (process.env.NODE_ENV !== "production") {
  globalForDatabase.__kimonoOnePool = pool;
}

export const db = drizzle({ client: pool });

import "dotenv/config";

import { count } from "drizzle-orm";

import fixture from "../data/fixtures/v0.bootstrap.json";
import { db } from "../src/db/client.server";
import { planStores, plans, stores } from "../src/db/schema";
import { createDrizzleCatalogRepository } from "../src/repositories/catalog.repository";

const [storeCount] = await db.select({ value: count() }).from(stores);
const [planCount] = await db.select({ value: count() }).from(plans);
const [planStoreCount] = await db.select({ value: count() }).from(planStores);

if (storeCount.value !== fixture.stores.length) {
  throw new Error(
    `Expected ${fixture.stores.length} stores but found ${storeCount.value}.`,
  );
}

if (planCount.value !== fixture.plans.length) {
  throw new Error(
    `Expected ${fixture.plans.length} plans but found ${planCount.value}.`,
  );
}

if (planStoreCount.value !== fixture.planStores.length) {
  throw new Error(
    `Expected ${fixture.planStores.length} plan-store rows but found ${planStoreCount.value}.`,
  );
}

const catalogRepository = createDrizzleCatalogRepository(db);
const detail = await catalogRepository.findPlanBySlug(
  "kimono-first-experience",
);

if (!detail) {
  throw new Error("Expected kimono-first-experience plan detail to exist.");
}

if (detail.availableStores.length !== 2) {
  throw new Error(
    `Expected kimono-first-experience to have 2 stores but found ${detail.availableStores.length}.`,
  );
}

console.log("Database smoke test passed.");

import "dotenv/config";

import fixture from "../data/fixtures/v0.bootstrap.json";
import { db } from "../src/db/client.server";
import { bookingDrafts, planStores, plans, stores } from "../src/db/schema";

await db.delete(bookingDrafts);
await db.delete(planStores);
await db.delete(plans);
await db.delete(stores);

await db.insert(stores).values(fixture.stores);
await db.insert(plans).values(fixture.plans);
await db.insert(planStores).values(fixture.planStores);

console.log(
  `Seeded ${fixture.stores.length} stores, ${fixture.plans.length} plans, and ${fixture.planStores.length} plan-store rows.`,
);

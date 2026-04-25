import { and, eq } from "drizzle-orm";
import type { db } from "@/db/client.server";
import { planStores, plans, stores } from "@/db/schema";
import type { StoreSummary } from "@/domains/catalog/contract";
import type { CatalogRepository } from "@/domains/catalog/service";

type Database = typeof db;

function toStoreSummary(
  row: {
    city: string;
    id: string;
    name: string;
    onlinePrice: number | null;
    slug: string;
  },
  fallbackPrice: number,
): StoreSummary {
  return {
    city: row.city,
    id: row.id,
    name: row.name,
    onlinePrice: row.onlinePrice ?? fallbackPrice,
    slug: row.slug,
  };
}

export function createDrizzleCatalogRepository(
  database: Database,
): CatalogRepository {
  return {
    async findPlanBySlug(slug) {
      const [plan] = await database
        .select()
        .from(plans)
        .where(and(eq(plans.slug, slug), eq(plans.isActive, true)))
        .limit(1);

      if (!plan) {
        return null;
      }

      const rows = await database
        .select({
          city: stores.city,
          id: stores.id,
          name: stores.name,
          onlinePrice: planStores.onlinePrice,
          slug: stores.slug,
        })
        .from(planStores)
        .innerJoin(stores, eq(planStores.storeId, stores.id))
        .where(
          and(eq(planStores.planId, plan.id), eq(planStores.isActive, true)),
        );

      return {
        availableStores: rows.map((row) => toStoreSummary(row, plan.price)),
        description: plan.description,
        durationHours: plan.durationHours,
        heroImageUrl: plan.heroImageUrl,
        id: plan.id,
        name: plan.name,
        price: plan.price,
        scene: plan.scene,
        slug: plan.slug,
      };
    },
    async listPlans(input) {
      const activePlans = await database
        .select()
        .from(plans)
        .where(eq(plans.isActive, true));

      let storePlanIds: Set<string> | null = null;

      if (input.storeSlug) {
        const rows = await database
          .select({ planId: planStores.planId })
          .from(planStores)
          .innerJoin(stores, eq(planStores.storeId, stores.id))
          .where(
            and(
              eq(stores.slug, input.storeSlug),
              eq(planStores.isActive, true),
            ),
          );

        storePlanIds = new Set(rows.map((row) => row.planId));
      }

      return activePlans
        .filter((plan) => {
          if (input.scene && plan.scene !== input.scene) {
            return false;
          }

          if (input.minPrice !== undefined && plan.price < input.minPrice) {
            return false;
          }

          if (input.maxPrice !== undefined && plan.price > input.maxPrice) {
            return false;
          }

          if (storePlanIds && !storePlanIds.has(plan.id)) {
            return false;
          }

          return true;
        })
        .map((plan) => ({
          durationHours: plan.durationHours,
          heroImageUrl: plan.heroImageUrl,
          id: plan.id,
          name: plan.name,
          price: plan.price,
          scene: plan.scene,
          slug: plan.slug,
        }));
    },
  };
}

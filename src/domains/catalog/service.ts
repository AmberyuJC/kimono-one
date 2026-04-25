import { err, ok, type Result } from "@/shared/result";

import type { CatalogSearchInput, PlanCard, PlanDetail } from "./contract";

type CatalogError = { code: "PLAN_NOT_FOUND"; message: string };

export interface CatalogRepository {
  findPlanBySlug(slug: string): Promise<PlanDetail | null>;
  listPlans(input: CatalogSearchInput): Promise<PlanCard[]>;
}

export function createCatalogService(repository: CatalogRepository) {
  return {
    async getPlanBySlug(
      slug: string,
    ): Promise<Result<PlanDetail, CatalogError>> {
      const plan = await repository.findPlanBySlug(slug);
      if (!plan) {
        return err({
          code: "PLAN_NOT_FOUND",
          message: `Plan ${slug} was not found.`,
        });
      }

      return ok(plan);
    },
    async listPlans(
      input: CatalogSearchInput,
    ): Promise<Result<PlanCard[], never>> {
      return ok(await repository.listPlans(input));
    },
  };
}

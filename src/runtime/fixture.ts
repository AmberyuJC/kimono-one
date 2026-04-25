import fixture from "../../data/fixtures/v0.bootstrap.json";
import type { BookingRepository } from "@/domains/booking/service";
import type {
  CatalogSearchInput,
  PlanCard,
  PlanDetail,
  StoreSummary,
} from "@/domains/catalog/contract";
import type { CatalogRepository } from "@/domains/catalog/service";
import { createBookingService } from "@/domains/booking/service";
import { createCatalogService } from "@/domains/catalog/service";
import type { CreateBookingDraftInput } from "@/domains/booking/contract";

type FixtureBookingDraft = CreateBookingDraftInput & {
  id: string;
  planName: string;
  status: "draft";
  storeName: string;
};

const bookingDrafts = new Map<string, FixtureBookingDraft>();

function planPrice(planId: string, storeId: string) {
  const planStore = fixture.planStores.find(
    (item) =>
      item.planId === planId && item.storeId === storeId && item.isActive,
  );

  return planStore?.onlinePrice ?? null;
}

function storeSummaryForPlan(planId: string): StoreSummary[] {
  return fixture.planStores
    .filter((item) => item.planId === planId && item.isActive)
    .map((item) => {
      const store = fixture.stores.find(
        (candidate) => candidate.id === item.storeId,
      );
      if (!store) {
        return null;
      }

      return {
        city: store.city,
        id: store.id,
        name: store.name,
        onlinePrice: item.onlinePrice ?? 0,
        slug: store.slug,
      };
    })
    .filter((store): store is StoreSummary => Boolean(store));
}

function toPlanCard(plan: (typeof fixture.plans)[number]): PlanCard {
  return {
    durationHours: plan.durationHours,
    heroImageUrl: plan.heroImageUrl,
    id: plan.id,
    name: plan.name,
    price: plan.price,
    scene: plan.scene,
    slug: plan.slug,
  };
}

function matchesSearch(
  plan: (typeof fixture.plans)[number],
  input: CatalogSearchInput,
) {
  if (!plan.isActive) {
    return false;
  }

  if (input.scene && plan.scene !== input.scene) {
    return false;
  }

  if (input.minPrice !== undefined && plan.price < input.minPrice) {
    return false;
  }

  if (input.maxPrice !== undefined && plan.price > input.maxPrice) {
    return false;
  }

  if (input.storeSlug) {
    return fixture.planStores.some((planStore) => {
      const store = fixture.stores.find(
        (candidate) => candidate.id === planStore.storeId,
      );
      return (
        planStore.planId === plan.id &&
        planStore.isActive &&
        store?.slug === input.storeSlug
      );
    });
  }

  return true;
}

export function createFixtureCatalogRepository(): CatalogRepository {
  return {
    async findPlanBySlug(slug) {
      const plan = fixture.plans.find(
        (candidate) => candidate.slug === slug && candidate.isActive,
      );

      if (!plan) {
        return null;
      }

      return {
        ...toPlanCard(plan),
        availableStores: storeSummaryForPlan(plan.id),
        description: plan.description,
      } satisfies PlanDetail;
    },
    async listPlans(input) {
      return fixture.plans
        .filter((plan) => matchesSearch(plan, input))
        .map(toPlanCard);
    },
  };
}

export function createFixtureBookingRepository(): BookingRepository {
  return {
    async createDraft(input) {
      const plan = fixture.plans.find(
        (candidate) => candidate.id === input.planId,
      );
      const store = fixture.stores.find(
        (candidate) => candidate.id === input.storeId,
      );

      const draft: FixtureBookingDraft = {
        ...input,
        id: `draft_${crypto.randomUUID()}`,
        planName: plan?.name ?? input.planId,
        status: "draft",
        storeName: store?.name ?? input.storeId,
      };

      bookingDrafts.set(draft.id, draft);
      return draft;
    },
    async findDraftById(id) {
      return bookingDrafts.get(id) ?? null;
    },
    async isPlanStoreBookable(planId, storeId) {
      return planPrice(planId, storeId) !== null;
    },
  };
}

let services: ReturnType<typeof createFixtureServices> | null = null;

export function createFixtureServices() {
  const catalogRepository = createFixtureCatalogRepository();
  const bookingRepository = createFixtureBookingRepository();

  return {
    booking: createBookingService(bookingRepository),
    catalog: createCatalogService(catalogRepository),
  };
}

export function getFixtureServices() {
  services ??= createFixtureServices();
  return services;
}

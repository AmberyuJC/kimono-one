import { Hono, type Context } from "hono";
import {
  bookingDraftSchema,
  createBookingDraftInputSchema,
} from "@/domains/booking/contract";
import type { createBookingService } from "@/domains/booking/service";
import {
  catalogSearchInputSchema,
  planCardSchema,
  planDetailSchema,
} from "@/domains/catalog/contract";
import type { createCatalogService } from "@/domains/catalog/service";
import { getFixtureServices } from "@/runtime/fixture";

type AppServices = {
  booking: ReturnType<typeof createBookingService>;
  catalog: ReturnType<typeof createCatalogService>;
};

function requestId() {
  return crypto.randomUUID();
}

function errorResponse(
  code: string,
  message: string,
  status: 400 | 404 | 422 | 500,
) {
  return {
    body: {
      code,
      message,
      requestId: requestId(),
    },
    status,
  };
}

export function createHttpApp(services: AppServices = getFixtureServices()) {
  const app = new Hono();

  const health = (context: Context) =>
    context.json({
      service: "kimono-one-harness-lab",
      status: "ok",
    });

  app.get("/health", health);
  app.get("/api/health", health);

  app.get("/api/plans", async (context) => {
    const rawInput = {
      maxPrice: context.req.query("maxPrice")
        ? Number(context.req.query("maxPrice"))
        : undefined,
      minPrice: context.req.query("minPrice")
        ? Number(context.req.query("minPrice"))
        : undefined,
      scene: context.req.query("scene") || undefined,
      storeSlug: context.req.query("storeSlug") || undefined,
    };
    const parsed = catalogSearchInputSchema.safeParse(rawInput);

    if (!parsed.success) {
      const failure = errorResponse(
        "INVALID_CATALOG_SEARCH",
        "Catalog search parameters are invalid.",
        422,
      );
      return context.json(failure.body, failure.status);
    }

    const result = await services.catalog.listPlans(parsed.data);
    if (!result.ok) {
      const failure = errorResponse(
        "CATALOG_SEARCH_FAILED",
        "Catalog search failed.",
        500,
      );
      return context.json(failure.body, failure.status);
    }

    return context.json(planCardSchema.array().parse(result.value));
  });

  app.get("/api/plans/:slug", async (context) => {
    const result = await services.catalog.getPlanBySlug(
      context.req.param("slug"),
    );

    if (!result.ok) {
      const failure = errorResponse(
        result.error.code,
        result.error.message,
        404,
      );
      return context.json(failure.body, failure.status);
    }

    return context.json(planDetailSchema.parse(result.value));
  });

  app.post("/api/booking-drafts", async (context) => {
    const parsed = createBookingDraftInputSchema.safeParse(
      await context.req.json().catch(() => null),
    );

    if (!parsed.success) {
      const failure = errorResponse(
        "INVALID_BOOKING_DRAFT",
        "Booking draft payload is invalid.",
        422,
      );
      return context.json(failure.body, failure.status);
    }

    const result = await services.booking.createDraft(parsed.data);

    if (!result.ok) {
      const failure = errorResponse(
        result.error.code,
        result.error.message,
        result.error.code === "INVALID_VISIT_DATE" ? 422 : 400,
      );
      return context.json(failure.body, failure.status);
    }

    return context.json(bookingDraftSchema.parse(result.value), 201);
  });

  app.get("/api/booking-drafts/:id", async (context) => {
    const result = await services.booking.getDraftById(context.req.param("id"));

    if (!result.ok) {
      const failure = errorResponse(
        result.error.code,
        result.error.message,
        404,
      );
      return context.json(failure.body, failure.status);
    }

    return context.json(bookingDraftSchema.parse(result.value));
  });

  return app;
}

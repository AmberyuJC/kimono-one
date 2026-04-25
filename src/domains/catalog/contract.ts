import { z } from "zod";

export const storeSummarySchema = z.object({
  city: z.string(),
  id: z.string(),
  name: z.string(),
  onlinePrice: z.number().int().nonnegative(),
  slug: z.string(),
});

export const planCardSchema = z.object({
  durationHours: z.number().int().positive(),
  heroImageUrl: z.string().url().nullable(),
  id: z.string(),
  name: z.string(),
  price: z.number().int().nonnegative(),
  scene: z.string(),
  slug: z.string(),
});

export const planDetailSchema = planCardSchema.extend({
  availableStores: z.array(storeSummarySchema),
  description: z.string(),
});

export const catalogSearchInputSchema = z.object({
  maxPrice: z.number().int().nonnegative().optional(),
  minPrice: z.number().int().nonnegative().optional(),
  scene: z.string().optional(),
  storeSlug: z.string().optional(),
});

export type CatalogSearchInput = z.infer<typeof catalogSearchInputSchema>;
export type PlanCard = z.infer<typeof planCardSchema>;
export type PlanDetail = z.infer<typeof planDetailSchema>;
export type StoreSummary = z.infer<typeof storeSummarySchema>;

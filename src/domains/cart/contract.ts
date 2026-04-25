import { z } from "zod";

export const cartLineSchema = z.object({
  planId: z.string(),
  planName: z.string(),
  planSlug: z.string(),
  quantity: z.number().int().positive(),
  storeId: z.string(),
  storeName: z.string(),
  unitPrice: z.number().int().nonnegative(),
});

export const cartStateSchema = z.object({
  lines: z.array(cartLineSchema),
});

export type CartLine = z.infer<typeof cartLineSchema>;
export type CartState = z.infer<typeof cartStateSchema>;

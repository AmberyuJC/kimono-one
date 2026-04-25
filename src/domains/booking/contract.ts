import { z } from "zod";

import { guestContactSchema } from "../identity/contract";

export const bookingDraftStatusSchema = z.enum(["draft"]);

export const createBookingDraftInputSchema = z.object({
  guestContact: guestContactSchema,
  notes: z.string().trim().max(500).optional(),
  planId: z.string(),
  storeId: z.string(),
  visitDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});

export const bookingDraftSchema = createBookingDraftInputSchema.extend({
  id: z.string(),
  planName: z.string(),
  status: bookingDraftStatusSchema,
  storeName: z.string(),
});

export type BookingDraft = z.infer<typeof bookingDraftSchema>;
export type CreateBookingDraftInput = z.infer<
  typeof createBookingDraftInputSchema
>;

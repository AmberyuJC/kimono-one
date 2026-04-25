import { z } from "zod";

export const guestContactSchema = z.object({
  email: z.string().email(),
  name: z.string().trim().min(1).max(80),
  phone: z.string().trim().min(6).max(32),
});

export type GuestContact = z.infer<typeof guestContactSchema>;

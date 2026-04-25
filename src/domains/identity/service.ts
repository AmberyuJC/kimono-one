import type { GuestContact } from "./contract";

export function normalizeGuestContact(input: GuestContact): GuestContact {
  return {
    email: input.email.trim().toLowerCase(),
    name: input.name.trim(),
    phone: input.phone.trim(),
  };
}

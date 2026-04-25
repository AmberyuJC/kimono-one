import { err, ok, type Result } from "@/shared/result";

import { normalizeGuestContact } from "../identity/service";
import type { BookingDraft, CreateBookingDraftInput } from "./contract";

type BookingError =
  | { code: "BOOKING_DRAFT_NOT_FOUND"; message: string }
  | { code: "INVALID_VISIT_DATE"; message: string }
  | { code: "PLAN_STORE_NOT_BOOKABLE"; message: string };

export interface BookingRepository {
  createDraft(input: CreateBookingDraftInput): Promise<BookingDraft>;
  findDraftById(id: string): Promise<BookingDraft | null>;
  isPlanStoreBookable(planId: string, storeId: string): Promise<boolean>;
}

function isPastDate(visitDate: string) {
  const today = new Date();
  const floor = new Date(
    Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()),
  );
  const candidate = new Date(`${visitDate}T00:00:00.000Z`);
  return candidate < floor;
}

export function createBookingService(repository: BookingRepository) {
  return {
    async createDraft(
      input: CreateBookingDraftInput,
    ): Promise<Result<BookingDraft, BookingError>> {
      if (isPastDate(input.visitDate)) {
        return err({
          code: "INVALID_VISIT_DATE",
          message: "visitDate must not be in the past.",
        });
      }

      if (
        !(await repository.isPlanStoreBookable(input.planId, input.storeId))
      ) {
        return err({
          code: "PLAN_STORE_NOT_BOOKABLE",
          message: "The selected plan is not bookable at this store.",
        });
      }

      return ok(
        await repository.createDraft({
          ...input,
          guestContact: normalizeGuestContact(input.guestContact),
        }),
      );
    },
    async getDraftById(
      id: string,
    ): Promise<Result<BookingDraft, BookingError>> {
      const draft = await repository.findDraftById(id);
      if (!draft) {
        return err({
          code: "BOOKING_DRAFT_NOT_FOUND",
          message: `Booking draft ${id} was not found.`,
        });
      }

      return ok(draft);
    },
  };
}

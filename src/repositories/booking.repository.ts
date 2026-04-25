import { and, eq } from "drizzle-orm";
import type { db } from "@/db/client.server";
import { bookingDrafts, planStores, plans, stores } from "@/db/schema";
import type {
  BookingDraft,
  CreateBookingDraftInput,
} from "@/domains/booking/contract";
import type { BookingRepository } from "@/domains/booking/service";

type Database = typeof db;

function toBookingDraft(row: {
  draft: typeof bookingDrafts.$inferSelect;
  plan: typeof plans.$inferSelect;
  store: typeof stores.$inferSelect;
}): BookingDraft {
  return {
    guestContact: {
      email: row.draft.guestEmail,
      name: row.draft.guestName,
      phone: row.draft.guestPhone,
    },
    id: row.draft.id,
    notes: row.draft.notes ?? undefined,
    planId: row.draft.planId,
    planName: row.plan.name,
    status: "draft",
    storeId: row.draft.storeId,
    storeName: row.store.name,
    visitDate: row.draft.visitDate,
  };
}

async function findDraft(database: Database, id: string) {
  const [row] = await database
    .select({
      draft: bookingDrafts,
      plan: plans,
      store: stores,
    })
    .from(bookingDrafts)
    .innerJoin(plans, eq(bookingDrafts.planId, plans.id))
    .innerJoin(stores, eq(bookingDrafts.storeId, stores.id))
    .where(eq(bookingDrafts.id, id))
    .limit(1);

  return row ? toBookingDraft(row) : null;
}

export function createDrizzleBookingRepository(
  database: Database,
): BookingRepository {
  return {
    async createDraft(input: CreateBookingDraftInput) {
      const id = `draft_${crypto.randomUUID()}`;

      await database.insert(bookingDrafts).values({
        guestEmail: input.guestContact.email,
        guestName: input.guestContact.name,
        guestPhone: input.guestContact.phone,
        id,
        notes: input.notes ?? null,
        planId: input.planId,
        storeId: input.storeId,
        visitDate: input.visitDate,
      });

      const draft = await findDraft(database, id);

      if (!draft) {
        throw new Error(
          `Booking draft ${id} could not be loaded after insert.`,
        );
      }

      return draft;
    },
    async findDraftById(id) {
      return findDraft(database, id);
    },
    async isPlanStoreBookable(planId, storeId) {
      const [row] = await database
        .select({ id: planStores.id })
        .from(planStores)
        .where(
          and(
            eq(planStores.planId, planId),
            eq(planStores.storeId, storeId),
            eq(planStores.isActive, true),
          ),
        )
        .limit(1);

      return Boolean(row);
    },
  };
}

import { describe, expect, it } from "vitest";
import type { BookingDraft } from "./contract";
import { createBookingService, type BookingRepository } from "./service";

function createRepository(overrides: Partial<BookingRepository> = {}) {
  const draft: BookingDraft = {
    guestContact: {
      email: "guest@example.com",
      name: "Guest",
      phone: "08012345678",
    },
    id: "draft_test",
    planId: "plan_test",
    planName: "Test Plan",
    status: "draft",
    storeId: "store_test",
    storeName: "Test Store",
    visitDate: "2099-01-02",
  };

  return {
    createDraft: async () => draft,
    findDraftById: async () => draft,
    isPlanStoreBookable: async () => true,
    ...overrides,
  } satisfies BookingRepository;
}

describe("booking service", () => {
  it("normalizes guest contact before creating a draft", async () => {
    const service = createBookingService(createRepository());
    const result = await service.createDraft({
      guestContact: {
        email: " Guest@Example.com ",
        name: " Guest ",
        phone: " 08012345678 ",
      },
      planId: "plan_test",
      storeId: "store_test",
      visitDate: "2099-01-02",
    });

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value.guestContact.email).toBe("guest@example.com");
    }
  });

  it("rejects unavailable plan-store combinations", async () => {
    const service = createBookingService(
      createRepository({
        isPlanStoreBookable: async () => false,
      }),
    );
    const result = await service.createDraft({
      guestContact: {
        email: "guest@example.com",
        name: "Guest",
        phone: "08012345678",
      },
      planId: "missing_plan",
      storeId: "missing_store",
      visitDate: "2099-01-02",
    });

    expect(result).toEqual({
      error: {
        code: "PLAN_STORE_NOT_BOOKABLE",
        message: "The selected plan is not bookable at this store.",
      },
      ok: false,
    });
  });
});

import { describe, expect, it } from "vitest";

import { createHttpApp } from "./app";

describe("http app", () => {
  it("responds to the health endpoint", async () => {
    const response = await createHttpApp().request("/health");
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({
      service: "kimono-one-harness-lab",
      status: "ok",
    });
  });

  it("lists fixture-backed plans", async () => {
    const response = await createHttpApp().request("/api/plans");
    const payload = (await response.json()) as Array<{ slug: string }>;

    expect(response.status).toBe(200);
    expect(payload.map((plan) => plan.slug)).toContain(
      "kimono-first-experience",
    );
  });

  it("returns plan detail with available stores", async () => {
    const response = await createHttpApp().request(
      "/api/plans/kimono-first-experience",
    );
    const payload = (await response.json()) as {
      availableStores: Array<{ id: string }>;
      slug: string;
    };

    expect(response.status).toBe(200);
    expect(payload.slug).toBe("kimono-first-experience");
    expect(payload.availableStores).toHaveLength(2);
  });

  it("creates and reads a booking draft", async () => {
    const app = createHttpApp();
    const response = await app.request("/api/booking-drafts", {
      body: JSON.stringify({
        guestContact: {
          email: "Guest@Example.com",
          name: " Guest Tester ",
          phone: " 08012345678 ",
        },
        notes: "Fixture smoke test",
        planId: "plan_kimono_first_experience",
        storeId: "store_asakusa_main",
        visitDate: "2099-01-02",
      }),
      headers: {
        "content-type": "application/json",
      },
      method: "POST",
    });

    expect(response.status).toBe(201);

    const created = (await response.json()) as {
      guestContact: { email: string; name: string; phone: string };
      id: string;
      planName: string;
      storeName: string;
    };

    expect(created.guestContact).toEqual({
      email: "guest@example.com",
      name: "Guest Tester",
      phone: "08012345678",
    });
    expect(created.planName).toBe("和服初体验·轻装上阵");
    expect(created.storeName).toBe("浅草本店");

    const readResponse = await app.request(`/api/booking-drafts/${created.id}`);
    expect(readResponse.status).toBe(200);
  });
});

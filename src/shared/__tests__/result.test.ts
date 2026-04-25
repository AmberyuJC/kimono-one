import { describe, expect, it } from "vitest";

import { err, ok } from "../result";

describe("result helpers", () => {
  it("creates success results", () => {
    expect(ok("done")).toEqual({ ok: true, value: "done" });
  });

  it("creates error results", () => {
    expect(err({ code: "FAILED", message: "nope" })).toEqual({
      error: { code: "FAILED", message: "nope" },
      ok: false,
    });
  });
});

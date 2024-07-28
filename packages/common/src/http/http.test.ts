import { describe, it, vi } from "vitest";

globalThis.fetch = vi.fn((v) => v);

describe("http.request", () => {
  it("should return json through helper", async () => {});
});

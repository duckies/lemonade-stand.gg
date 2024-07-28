import { describe, expect, it, vi } from "vitest";
import { createSingletonPromise } from "./promise";

describe("createSingletonPromise", () => {
  it("should resolve to the same promise", async () => {
    const state = {
      count: 0,
      fn: async () => {
        state.count++;
      },
    };

    const spy = vi.spyOn(state, "fn");
    const singleton = createSingletonPromise(state.fn);

    expect(state.count).toBe(0);
    expect(spy).toHaveBeenCalledTimes(0);
    await singleton();
    expect(state.count).toBe(1);
    expect(spy).toHaveBeenCalledTimes(1);

    await singleton();
    expect(state.count).toBe(1);
    expect(spy).toHaveBeenCalledTimes(1);

    await singleton();
    expect(state.count).toBe(1);
    expect(spy).toHaveBeenCalledTimes(1);
  });
});

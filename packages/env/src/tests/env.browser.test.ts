import { string } from "valibot";
import { describe, expect, test } from "vitest";
import { defineEnv } from "../env";

describe("env (browser)", () => {
  test("should ignore server env", () => {
    const env = defineEnv({
      client: {
        FOO: string(),
      },
      server: {
        BAR: string(),
      },
      env: {
        FOO: "foo",
        BAR: undefined,
      },
    });

    expect(env.FOO).toBe("foo");
    expect(() => env.BAR).toThrow("❌ Attempted access");
  });
});

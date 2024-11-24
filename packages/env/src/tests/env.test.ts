import * as v from "valibot";
import { describe, expect, test } from "vitest";
import { defineEnv } from "../env";
import { booleanString } from "../utils";

describe("env (node)", () => {
  test("allows environment variable retrieval", () => {
    process.env = {
      FOO: "foo",
      BAR: "bar",
    };

    const env = defineEnv({
      server: {
        FOO: v.string(),
      },
      client: {
        BAR: v.string(),
      },
      env: {
        FOO: "foo",
        BAR: "bar",
      },
    });

    expect(env.FOO).toBe("foo");
    expect(env.BAR).toBe("bar");
  });

  test("rejects duplicate keys", () => {
    process.env = {
      FOO: "foo",
    };

    const env = defineEnv({
      client: {
        FOO: v.string(),
      },
      server: {
        // @ts-expect-error
        FOO: v.string(),
      },
      env: {
        FOO: process.env.FOO,
      },
    });
  });

  test("should parse valibot primitives", () => {
    const env = defineEnv({
      client: {
        a: v.string(),
        b: booleanString,
      },
      server: {
        c: v.number(),
        d: v.undefined(),
      },
      env: {
        a: "a",
        b: "false",
        c: 1,
        d: undefined,
      },
    });
  });
});

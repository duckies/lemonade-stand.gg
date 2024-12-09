import * as v from "valibot";

export const isSlug = v.custom<string>((input) =>
  typeof input === "string" ? /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(input) : false,
);

export * from "valibot";

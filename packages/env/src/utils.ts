import * as v from "valibot";

export const booleanString = v.pipe(
  v.picklist(["true", "false"]),
  v.transform((v) => v === "true"),
  v.boolean(),
);

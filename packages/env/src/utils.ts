import * as v from "valibot";

export const booleanString = v.pipe(
  v.picklist(["true", "false"]),
  v.transform((v) => Boolean(v)),
  v.boolean(),
);

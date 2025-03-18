import { defineEnv } from "@lemonade-stand/env";
import * as v from "valibot";

export const env = defineEnv({
  client: {
    NODE_ENV: v.optional(v.picklist(["development", "production", "test"]), "development"),
  },
  server: {
    DATABASE_URL: v.string(),
    DATABASE_VERBOSE: v.optional(v.boolean(), process.env.NODE_ENV === "development"),
  },
  env: process.env,
})

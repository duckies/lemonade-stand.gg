import { defineEnv } from "@lemonade-stand/env";
import * as v from "valibot";

export const env = defineEnv({
  server: {
    NODE_ENV: v.optional(v.picklist(["development", "production", "test"]), "development"),
    DATABASE_URL: v.string(),
    PUBLIC_URL: v.optional(v.string(), "http://localhost:3000"),
    BASE_URL: v.optional(v.string(), "http://localhost:4000"),
    AUTH_SECRET: v.string(),
    DISCORD_CLIENT_ID: v.string(),
    DISCORD_SECRET_KEY: v.string(),
    DISCORD_REDIRECT_URI: v.string(),
  },
  env: import.meta.env,
});

import type { Config } from "drizzle-kit";
import { env } from "./src/env";

export default {
  dialect: "postgresql",
  schema: "./src/schema.ts",
  out: "./drizzle",
  casing: "snake_case",
  strict: true,
  verbose: env.DATABASE_VERBOSE,
  dbCredentials: {
    url: env.DATABASE_URL,
  },
} satisfies Config;

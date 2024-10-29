import { loadEnvConfig } from "@next/env";
import type { Config } from "drizzle-kit";

loadEnvConfig(process.cwd());

export default {
  dialect: "postgresql",
  schema: "./src/server/database/schema.ts",
  casing: "snake_case",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
} satisfies Config;

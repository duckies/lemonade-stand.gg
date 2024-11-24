import type { Config } from "drizzle-kit";

export default {
  dialect: "postgresql",
  schema: "./src/database/schema.ts",
  casing: "snake_case",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
} satisfies Config;

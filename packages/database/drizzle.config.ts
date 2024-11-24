import type { Config } from "drizzle-kit";

export default {
  dialect: "postgresql",
  schema: "./src/schema.ts",
  casing: "snake_case",
  strict: true,
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
} satisfies Config;

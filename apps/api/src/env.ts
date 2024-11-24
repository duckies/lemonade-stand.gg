import * as v from "valibot";

const envSchema = v.object({
  DATABASE_URL: v.string(),
  DISCORD_CLIENT_ID: v.string(),
  DISCORD_SECRET_KEY: v.string(),
});

v.parse(envSchema, {
  DATABASE_URL: process.env.DATABASE_URL,
  DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID,
  DISCORD_SECRET_KEY: process.env.DISCORD_SECRET_KEY,
});

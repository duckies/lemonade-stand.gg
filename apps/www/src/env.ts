import * as v from "valibot";

const envSchema = v.object({
  NODE_ENV: v.optional(v.picklist(["development", "production", "test"]), "development"),
  AUTH_SECRET: v.pipe(v.string(), v.minLength(32)),
  DISCORD_CLIENT_ID: v.string(),
  DISCORD_SECRET_KEY: v.string(),
  DISCORD_REDIRECT_URI: v.string(),
  DISCORD_BOT_TOKEN: v.string(),
  DATABASE_URL: v.string(),
});

export const env = v.parse(envSchema, {
  NODE_ENV: process.env.NODE_ENV,
  AUTH_SECRET: process.env.AUTH_SECRET,
  DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID,
  DISCORD_SECRET_KEY: process.env.DISCORD_SECRET_KEY,
  DISCORD_REDIRECT_URI: process.env.DISCORD_REDIRECT_URI,
  DISCORD_BOT_TOKEN: process.env.DISCORD_BOT_TOKEN,
  DATABASE_URL: process.env.DATABASE_URL,
});

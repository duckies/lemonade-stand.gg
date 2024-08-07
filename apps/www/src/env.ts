import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production"]),
  AUTH_SECRET: z.string().min(32),
  DISCORD_CLIENT_ID: z.string(),
  DISCORD_SECRET_KEY: z.string(),
  DISCORD_REDIRECT_URI: z.string(),
  DISCORD_BOT_TOKEN: z.string(),
  DATABASE_URL: z.string(),
});

export const env = envSchema.parse({
  NODE_ENV: process.env.NODE_ENV,
  AUTH_SECRET: process.env.AUTH_SECRET,
  DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID,
  DISCORD_SECRET_KEY: process.env.DISCORD_SECRET_KEY,
  DISCORD_REDIRECT_URI: process.env.DISCORD_REDIRECT_URI,
  DISCORD_BOT_TOKEN: process.env.DISCORD_BOT_TOKEN,
  DATABASE_URL: process.env.DATABASE_URL,
});

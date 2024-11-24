import { env } from "bun";
import { OAuth2Client } from "oslo/oauth2";

const discordClient = new OAuth2Client(
  env.DISCORD_CLIENT_ID,
  "https://discord.com/oauth2/authorize",
  "https://discord.com/api/oauth2/token",
  {
    redirectURI: env.DISCORD_REDIRECT_URI,
  },
);

export const oauth2 = {
  discord: discordClient,
};

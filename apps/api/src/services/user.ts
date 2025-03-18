import { type User, accounts, db, users } from "@lemonade-stand/database";
import { eq } from "drizzle-orm";
import type { OAuthCredentials } from "schemas/oauth";
import { getAvatarURL } from "services/discord";
import type { Discord } from "types/discord";

export async function createUser(discord: Discord.User, credentials: OAuthCredentials) {
  return db.transaction(async (tx) => {
    const user = await tx
      .insert(users)
      .values({
        name: discord.global_name ?? discord.username,
        avatar: getAvatarURL(discord),
      })
      .returning()
      .then((r) => r.at(0)!);

    const account = await tx
      .insert(accounts)
      .values({
        userId: user.id,
        providerId: "discord",
        providerUserId: discord.id,
        accessToken: credentials.access_token,
        refreshToken: credentials.refresh_token,
        accessTokenExpiresAt: credentials.expires_in,
        profile: discord,
        scope: credentials.scope,
      })
      .returning()
      .then((r) => r.at(0)!);

    return { user, account };
  });
}

export async function updateUser(userId: string, data: Partial<User>) {
  return db
    .update(users)
    .set(data)
    .where(eq(users.id, userId))
    .returning()
    .then((r) => r.at(0)!);
}

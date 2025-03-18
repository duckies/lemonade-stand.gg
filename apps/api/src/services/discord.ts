import ky from "ky";
import type { Discord } from "types/discord";

/**
 * Discord [Snowflake](https://discord.com/developers/docs/reference#snowflakes).
 */
export type Snowflake = string;

export type User = {
  id: Snowflake;
  username: string;
  discriminator: string;
  global_name?: string;
  avatar?: string;
  banner?: string;
};

export const discordAPI = ky.create({
  prefixUrl: "https://discord.com/api/v10",
});

export const getMe = (accessToken: string) =>
  discordAPI
    .get("users/@me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .json<User>();

export const getAvatarURL = (user: Discord.User) => {
  if (user.avatar) {
    const ext = user.avatar.startsWith("a_") ? "gif" : "webp";
    return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${ext}`;
  }

  const defaultAvatarIndex =
    user.discriminator === "0"
      ? (BigInt(user.id) >> 22n) % 6n
      : Number.parseInt(user.discriminator) % 5;

  return `https://cdn.discordapp.com/embed/avatars/${defaultAvatarIndex}.png`;
};

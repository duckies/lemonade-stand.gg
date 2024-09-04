"use server";

import { randomBytes } from "node:crypto";
import { HTTP } from "@lemonade-stand/http";
import { z } from "zod";
import { DiscordConfig } from "~/config/discord";
import { env } from "~/env";

export type Snowflake = string;

export interface UserDTO {
  id: Snowflake;
  username: string;
  discriminator: string;
  global_name?: string;
  avatar?: string;
}

const api = new HTTP({
  baseURL: "https://discord.com/api/v10/",
  headers: {
    authorization: `Bot ${env.DISCORD_BOT_TOKEN}`,
  },
});

export async function getAuthorizationURL() {
  const url = new URL("https://discord.com/oauth2/authorize");

  url.search = new URLSearchParams({
    response_type: "code",
    scope: "identify guilds",
    client_id: env.DISCORD_CLIENT_ID,
    redirect_uri: env.DISCORD_REDIRECT_URI,
    prompt: "none",
    state: randomBytes(10).toString("hex"),
  }).toString();

  return url;
}

export async function getMe(token: string) {
  const user = await api.get("/users/@me", {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  let avatar: string;
  if (user.avatar) {
    avatar = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${user.avatar.startsWith("a_") ? "gif" : "webp"}`;
  } else {
    const index =
      user.discriminator === "0"
        ? (BigInt(user.id) >> 22n) % 6n
        : Number.parseInt(user.discriminator) % 5;
    avatar = `https://cdn.discordapp.com/embed/avatars/${index}.png`;
  }

  return {
    id: user.id,
    username: user.username,
    global_name: user.global_name,
    avatar: avatar,
  };
}

export interface Thread {
  id: Snowflake;
  name: string;
}

export async function getActiveChannelThreads(channelId: Snowflake) {
  return await api.get<{ threads: Thread[] }>(
    `https://discord.com/api/channels/${channelId}/threads/active`,
  );
}

export interface GuildMember {
  avatar?: string;
  jointed_at: string;
  nick?: string;
  pending: boolean;
  roles: Snowflake[];
  user: {
    id: Snowflake;
    username: string;
    avatar?: string;
    global_name?: string;
  };
}

const CreateThreadDTO = z.object({
  name: z.string().min(1).max(100),
});

export interface Thread {
  id: Snowflake;
  type: number;
  last_message_id: Snowflake | null;
  guild_id: Snowflake;
  parent_id: Snowflake;
  owner_id: Snowflake;
  thread_metadata: {
    archived: boolean;
    archive_timestamp: string;
    auto_archive_duration: number;
    locked: boolean;
    create_timestamp: string;
    invitable: boolean;
  };
  message_count: number;
  member_count: number;
  total_message_sent: number;
  member: {
    id: Snowflake;
    user_id: Snowflake;
    join_timestamp: string;
  };
}

export async function createThread(channelId: Snowflake, body: z.infer<typeof CreateThreadDTO>) {
  const thread = await api.post<Thread>(`/channels/${channelId}/threads`, {
    json: {
      ...body,
      type: 12, // Private Thread
    },
  });

  await addThreadMember(thread.id, "190548783472312321");

  return thread;
}

export async function addThreadMember(threadId: Snowflake, userId: Snowflake) {
  return await api.put(`/v10/channels/${threadId}/thread-members/${userId}`);
}

export async function getGuildMembers() {
  return await api.get<GuildMember[]>(`/guilds/${DiscordConfig.guild.id}/members`, {
    params: { limit: 1000 },
  });
}

export async function getChannelMessage(channelId: Snowflake, messageId: Snowflake) {
  return await api.get(`/channels/${channelId}/messages/${messageId}`);
}

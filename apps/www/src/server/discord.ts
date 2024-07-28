"use server";

import { randomBytes } from "node:crypto";
import { env } from "~/env";
import { z } from "zod";
import { http } from "@repo/http";

export type Snowflake = string;

export interface UserDTO {
  id: Snowflake;
  username: string;
  discriminator: string;
  global_name?: string;
  avatar?: string;
}

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
  const response = await fetch("https://discord.com/api/users/@me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = (await response.json()) as UserDTO;

  if (!response.ok) {
    throw new Error("Discord API Error", { cause: data });
  }

  let avatar: string;
  if (data.avatar) {
    avatar = `https://cdn.discordapp.com/avatars/${data.id}/${data.avatar}.${data.avatar.startsWith("a_") ? "gif" : "webp"}`;
  } else {
    const index = data.discriminator === "0" ? (BigInt(data.id) >> 22n) % 6n : Number.parseInt(data.discriminator) % 5;
    avatar = `https://cdn.discordapp.com/embed/avatars/${index}.png`;
  }

  return {
    id: data.id,
    username: data.username,
    global_name: data.global_name,
    avatar: avatar,
  };
}

export interface Thread {
  id: Snowflake;
  name: string;
}

export async function getActiveChannelThreads(channelId: Snowflake) {
  const response = await fetch(`https://discord.com/api/channels/${channelId}/threads/active`, {
    headers: {
      Authorization: `Bot ${env.DISCORD_BOT_TOKEN}`,
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error("Discord API Error", { cause: data });
  }

  return (data as { threads: Thread[] }).threads;
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

export async function getGuildMembers() {
  const response = await fetch("https://discord.com/api/v10/guilds/1093608281395707905/members?limit=1000", {
    headers: {
      Authorization: `Bot ${env.DISCORD_BOT_TOKEN}`,
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error("Discord API Error", { cause: data });
  }

  return data as GuildMember[];
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
  const thread = await http<Thread>(`https://discord.com/api/v10/channels/${channelId}/threads`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bot ${env.DISCORD_BOT_TOKEN}`,
    },
    body: {
      ...body,
      type: 12, // Private Thread
    },
  });

  await addThreadMember(thread.id, "190548783472312321");

  return thread;
}

export async function addThreadMember(threadId: Snowflake, userId: Snowflake) {
  return await http(`https://discord.com/api/v10/channels/${threadId}/thread-members/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bot ${env.DISCORD_BOT_TOKEN}`,
    },
  });
}

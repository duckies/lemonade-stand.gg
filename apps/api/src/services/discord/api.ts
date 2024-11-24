import { HTTPException } from "hono/http-exception";
import type { StatusCode } from "hono/utils/http-status";

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

export async function getMe(accessToken: string) {
  return request<User>("/users/@me", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

async function request<T = unknown>(path: string, init: RequestInit) {
  const response = await fetch(`https://discord.com/api${path}`, {
    ...init,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new HTTPException(response.status as StatusCode, { cause: data });
  }

  return data as T;
}

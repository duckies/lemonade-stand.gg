"use server";

import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";
import { env } from "~/env";
import { getCookieStore } from "~/lib/cookies";
import { getAuthorizationURL } from "./discord";

export type Snowflake = string;

export interface User {
  id: bigint;
  name: string;
  avatar: string;
}

export interface Session {
  user?: User;
}

export const getSession = cache(async () => {
  return getIronSession<Session>(await cookies(), {
    password: env.AUTH_SECRET,
    cookieName: "session",
    cookieOptions: {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    },
  });
});

export async function signIn() {
  const cookies = await getCookieStore();
  const url = await getAuthorizationURL();
  const state = url.searchParams.get("state");

  if (state) {
    cookies.set("state", state);
  }

  redirect(url.toString());
}

export async function signOut() {
  (await getCookieStore()).delete("session", "state");
}

export interface Credentials {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  scope: string;
}

export async function exchangeCode(code: string) {
  const response = await fetch("https://discord.com/api/oauth2/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${btoa(`${env.DISCORD_CLIENT_ID}:${env.DISCORD_SECRET_KEY}`)}`,
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code: code,
      redirect_uri: env.DISCORD_REDIRECT_URI,
    }),
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error("Discord OAuth2 Error", { cause: data });
  }

  return data as Credentials;
}

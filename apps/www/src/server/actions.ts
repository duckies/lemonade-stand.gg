"use server";

import { client } from "~/server/hc";

export const signIn = async () => {
  await client.auth.login.discord.$get();
};

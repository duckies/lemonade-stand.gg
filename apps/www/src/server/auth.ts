import { cookies } from "next/headers";
import { cache } from "react";
import { client } from "~/server/hc";

export const getSession = cache(async () => {
  const cookieStore = await cookies();

  if (!cookieStore.has("session")) {
    return { user: null };
  }

  const user = (await client.user.me.$get()).json();

  return { user };
});

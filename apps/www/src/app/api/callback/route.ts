import { and, eq } from "drizzle-orm";
import { isRedirectError } from "next/dist/client/components/redirect";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { NextRequest } from "next/server";
import { db } from "server/database";
import { accounts, users } from "server/database/schema";
import { exchangeCode, getSession } from "~/server/auth";
import { getMe } from "~/server/discord";
import { genSnowflake } from "~/utils/snowflake";

export async function GET(req: NextRequest) {
  const cookieStore = await cookies();

  const code = req.nextUrl.searchParams.get("code");
  const state = req.nextUrl.searchParams.get("state");
  const storedState = cookieStore.get("state")?.value;

  cookieStore.delete("state");

  if (!code || state !== storedState) {
    cookieStore.delete("session");
    redirect("/?error=BAD_REQUEST");
  }

  try {
    const credentials = await exchangeCode(code);
    const profile = await getMe(credentials.access_token);
    const session = await getSession();

    const user = await db
      .select({
        id: users.id,
        nickname: users.nickname,
        discord: {
          id: accounts.providerId,
        },
      })
      .from(users)
      .innerJoin(accounts, and(eq(accounts.userId, users.id), eq(accounts.providerType, "discord")))
      .then((rows) => rows[0] ?? null);

    if (!user) {
      await db.transaction(async (tx) => {
        const uid = genSnowflake();

        await tx.insert(accounts).values({
          id: genSnowflake(),
          providerId: profile.id,
          providerType: "discord",
          userId: uid,
          refreshToken: credentials.refresh_token,
          accessToken: credentials.access_token,
          accessTokenExpiresAt: new Date(Date.now() + credentials.expires_in * 1000),
        });
        await tx.insert(users).values({
          id: uid,
        });

        session.user = {
          id: uid,
          name: profile.username,
          avatar: profile.avatar,
        };
      });
    } else {
      // If there is an account, update the credentials.
      await db
        .update(accounts)
        .set({
          refreshToken: credentials.refresh_token,
          accessToken: credentials.access_token,
          accessTokenExpiresAt: new Date(Date.now() + credentials.expires_in * 1000),
        })
        .where(eq(accounts.providerId, profile.id));

      session.user = {
        id: user.id,
        name: profile.username,
        avatar: profile.avatar,
      };
    }

    await session.save();

    console.log(session);

    redirect("/");
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    console.error(error);

    cookieStore.delete("session");
    cookieStore.delete("state");

    redirect("/?reason=callback_error");
  }
}

import { vValidator } from "@hono/valibot-validator";
import { env } from "bun";
import { config } from "config";
import { db } from "database";
import { accounts, users } from "database/schema";
import { and, eq } from "drizzle-orm";
import { Hono } from "hono";
import { deleteCookie, getCookie, setCookie } from "hono/cookie";
import { sign } from "hono/jwt";
import { oauth2 } from "lib/oauth2";
import { genSnowflake } from "lib/snowflake";
import { generateState } from "oslo/oauth2";
import { getMe } from "services/discord/api";
import * as v from "valibot";

const auth = new Hono();

auth
  .get("/discord", async (c) => {
    const state = generateState();

    const url = await oauth2.discord.createAuthorizationURL({
      state,
      scopes: ["identify"],
    });

    setCookie(c, "auth.state", state, { ...config.cookie.defaults });

    return c.redirect(url);
  })

  .get(
    "/discord/callback",
    vValidator(
      "query",
      v.object({
        code: v.string(),
        state: v.string(),
      }),
      (result, c) => {
        if (!result.success) {
          // Don't override default error handling.
          return c.json(result, 400);
        }

        const state = getCookie(c, "auth.state");

        if (result.output.state !== state) {
          return c.json({ message: "Bad Request" }, 400);
        }

        deleteCookie(c, "auth.state");
      },
    ),
    async (c) => {
      const { code } = c.req.valid("query");

      const response = await oauth2.discord.validateAuthorizationCode(code, {
        credentials: env.DISCORD_SECRET_KEY,
        authenticateWith: "request_body",
      });

      const profile = await getMe(response.access_token);

      // Look for an existing account.
      const account = await db
        .select({
          id: accounts.id,
          user: {
            id: users.id,
            nickname: users.nickname,
          },
        })
        .from(accounts)
        .where(and(eq(accounts.providerType, "discord"), eq(accounts.providerId, profile.id)))
        .innerJoin(users, eq(accounts.userId, users.id))
        .then((rows) => rows[0] ?? null);

      const user = account?.user ?? { id: genSnowflake() };
      // If we don't have an account, register a new user.
      if (!account) {
        await db.transaction(async (tx) => {
          await tx
            .insert(users)
            .values({
              id: user.id,
              nickname: profile.global_name,
            })
            .returning({
              id: users.id,
              nickname: users.nickname,
            })
            .then((rows) => rows[0]!);

          await tx.insert(accounts).values({
            providerId: profile.id,
            providerType: "discord",
            userId: user.id,
            refreshToken: response.refresh_token,
            accessToken: response.access_token,
            accessTokenExpiresAt: response.expires_in
              ? new Date(Date.now() + response.expires_in * 1000)
              : null,
          });
        });
      } else {
        // Otherwise, update the account.
        await db
          .update(accounts)
          .set({
            accessToken: response.access_token,
            accessTokenExpiresAt: response.expires_in
              ? new Date(Date.now() + response.expires_in * 1000)
              : null,
            refreshToken: response.refresh_token,
          })
          .where(eq(accounts.id, account.id));
      }

      // Create the session JWT.
      const token = await sign(
        { user: { ...(account?.user ?? user), avatar: profile.avatar } },
        env.AUTH_SECRET,
        "HS256",
      );

      setCookie(c, "auth.session", token, { ...config.cookie.defaults });

      return c.redirect("/");
    },
  );

export default auth;

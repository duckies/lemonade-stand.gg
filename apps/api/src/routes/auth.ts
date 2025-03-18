import { env } from "env";
import { Hono } from "hono";
import { deleteCookie, getCookie, setCookie } from "hono/cookie";
import { HTTPException } from "hono/http-exception";
import ky from "ky";
import { generateSessionToken } from "lib/crypto";
import { OAuthCallbackSchema, OAuthCredentialsSchema } from "schemas/oauth";
import { getAccountByProviderID, updateAccount } from "services/account";
import { createSession } from "services/auth";
import { getAvatarURL, getMe } from "services/discord";
import { createUser, updateUser } from "services/user";
import { generateState } from "utils/crypto";
import { validator } from "utils/validator";
import * as v from "valibot";

const auth = new Hono()
  .get(
    "/login/discord",
    validator(
      "query",
      v.object({
        redirect: v.optional(v.pipe(v.string(), v.nonEmpty(), v.startsWith(env.PUBLIC_URL))),
      }),
    ),
    async (c) => {
      const state = generateState();
      const { redirect } = c.req.valid("query");

      if (redirect) {
        setCookie(c, "discord.redirect", redirect);
      } else {
        deleteCookie(c, "discord.redirect");
      }
      setCookie(c, "discord.state", state);

      const url = new URL("https://discord.com/oauth2/authorize");
      const params = new URLSearchParams({
        response_type: "code",
        client_id: env.DISCORD_CLIENT_ID,
        scope: ["identify", "guilds", "guilds.join", "guilds.members.read"].join(" "),
        redirect_uri: `${env.BASE_URL}/auth/callback/discord`,
        state: state,
        prompt: "none",
      });

      url.search = params.toString();

      return c.redirect(url);
    },
  )
  .get("/callback/discord", validator("query", OAuthCallbackSchema), async (c) => {
    const { code, state } = c.req.valid("query");
    const cookieState = getCookie(c, "discord.state");

    if (!cookieState || cookieState !== state) {
      throw new HTTPException(401);
    }

    const response = await ky
      .post("https://discord.com/api/v10/oauth2/token", {
        headers: {
          authorization: `Basic ${btoa(`${env.DISCORD_CLIENT_ID}:${env.DISCORD_SECRET_KEY}`)}`,
          "content-type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          grant_type: "authorization_code",
          code: code,
          redirect_uri: `${env.BASE_URL}/auth/callback/discord`,
        }),
      })
      .json();

    const credentials = v.safeParse(OAuthCredentialsSchema, response);

    if (!credentials.success) {
      throw new HTTPException(502, {
        message: "Discord returned an unexpected response",
        cause: credentials.issues,
      });
    }

    const profile = await getMe(credentials.output.access_token);

    const existingAccount = await getAccountByProviderID("discord", profile.id);

    if (!existingAccount) {
      const { user, account } = await createUser(profile, credentials.output);

      const token = generateSessionToken();
      const session = await createSession(token, user.id);
      setCookie(c, "session", token, { expires: session.expiresAt });

      return c.json({ user, account, credentials: credentials.output }, 200);
    }

    const [account, user] = await Promise.all([
      updateAccount(existingAccount, {
        accessToken: credentials.output.access_token,
        refreshToken: credentials.output.refresh_token,
        accessTokenExpiresAt: credentials.output.expires_in,
        scope: credentials.output.scope,
        profile: profile,
      }),
      updateUser(existingAccount.userId, {
        name: profile.username,
        avatar: getAvatarURL(profile),
      }),
    ]);

    const token = generateSessionToken();
    const session = await createSession(token, account.userId);
    setCookie(c, "session", token, { expires: session.expiresAt });

    const redirect = getCookie(c, "discord.redirect");

    if (redirect) {
      deleteCookie(c, "discord.redirect");
      return c.redirect(redirect);
    }

    return c.redirect(env.PUBLIC_URL);
  });

export default auth;

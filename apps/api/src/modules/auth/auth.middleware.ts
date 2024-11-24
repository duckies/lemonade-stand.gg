import { getCookie } from "hono/cookie";
import { createMiddleware } from "hono/factory";
import { HTTPException } from "hono/http-exception";
import { Jwt } from "hono/utils/jwt";

export const withAuth = createMiddleware<{
  Variables: {
    session: { user: { id: string; nickname?: string; avatar?: string } };
  };
}>(async (c, next) => {
  const credentials = c.req.raw.headers.get("Authorization");

  let token: string | undefined;
  if (credentials) {
    token = credentials.split(/\s+/)[1];
  } else {
    token = getCookie(c, "auth.session");
  }

  if (!token) {
    throw new HTTPException(401, { message: "Unauthorized" });
  }

  try {
    const payload = await Jwt.verify(token, process.env.AUTH_SECRET);

    c.set("session", payload as any);
  } catch (e) {
    console.error(e);
    throw new HTTPException(401, { message: "Unauthorized", cause: e });
  }

  await next();
});

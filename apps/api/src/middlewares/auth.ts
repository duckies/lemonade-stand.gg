import type { Session, User } from "@lemonade-stand/database";
import { getCookie } from "hono/cookie";
import { createMiddleware } from "hono/factory";
import { HTTPException } from "hono/http-exception";
import { validateSessionToken } from "services/auth";

type Env = {
  Variables: {
    user: User;
    session: Session;
  };
};

export const withAuth = createMiddleware<Env>(async (c, next) => {
  const token = getCookie(c, "session") || c.req.header("Authorization")?.split(" ")[1];

  console.log("Cookies", getCookie(c), "Request", c.req.raw);

  if (!token) {
    throw new HTTPException(401);
  }

  const { session, user } = await validateSessionToken(token);

  if (!session) {
    throw new HTTPException(401);
  }

  c.set("user", user);
  c.set("session", session);

  await next();
});

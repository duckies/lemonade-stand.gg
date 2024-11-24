import { Hono } from "hono";
import { withAuth } from "modules/auth/auth.middleware";

const api = new Hono();

api.get("/@me", withAuth, async (c) => {
  const payload = c.get("session");

  return c.json(payload, 200);
});

export default api;

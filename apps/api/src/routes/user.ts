import { Hono } from "hono";
import { withAuth } from "middlewares/auth";

const router = new Hono().get("/me", withAuth, async (c) => {
  const user = c.get("user");

  return c.json({ user }, 200);
});

export default router;

import { createMiddleware, createSafeActionClient } from "next-safe-action";
import { valibotAdapter } from "next-safe-action/adapters/valibot"; import { type User, getSession } from "~/server/auth";
;

export const actionClient = createSafeActionClient({
  validationAdapter: valibotAdapter(),
})

export const withSession = createMiddleware().define(async ({ next }) => {
  const session = await getSession();

  if (!session.user) {
    throw new Error("Unauthorized");
  }

  return next({ ctx: { session, user: session.user as User } });
})
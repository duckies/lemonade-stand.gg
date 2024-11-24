import { env } from "bun";

export const config = {
  cookie: {
    defaults: {
      path: "/",
      secure: env.NODE_ENV === "production",
      httpOnly: true,
      maxAge: 60 * 10,
      sameSite: "lax",
    },
  },
} as const;

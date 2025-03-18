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

export const AuthConfig = {
  session: {
    maxAge: 1000 * 60 * 60 * 24 * 30,
    refreshThreshold: 1000 * 60 * 60 * 24 * 15,
  },
} as const;

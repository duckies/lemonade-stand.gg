import { env } from "env";
import { Hono } from "hono";
import { contextStorage } from "hono/context-storage";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";
import { HTTPError } from "ky";

import { HTTPException } from "hono/http-exception";
import auth from "./routes/auth";
import user from "./routes/user";

const app = new Hono();

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:4000"],
    credentials: true,
  }),
);
app.use(logger());
app.use(contextStorage());
app.use(prettyJSON());

const routes = app.route("/auth", auth).route("/user", user);

app.onError(async (err, c) => {
  if (err instanceof HTTPError) {
    if (env.NODE_ENV === "development") {
      if (err.response.headers.get("content-type")?.includes("application/json")) {
        const body = await err.response.clone().json();
        console.error("Gateway Error", {
          status: err.response.status,
          error: err.response.statusText,
          data: body,
        });
      }
    }

    return c.json(
      {
        error: "Bad Gateway",
        resource: {
          url: err.response.url,
          status: err.response.status,
          statusText: err.response.statusText,
        },
      },
      502,
    );
  }

  if (err instanceof HTTPException) {
    return c.json({ message: err.message }, err.status);
  }

  console.error(err);

  return c.json({ error: "Internal Server Error", message: "Unexpected error" }, 500);
});

export type AppType = typeof routes;

export default {
  port: Number.parseInt(process.env.PORT!) || 4000,
  fetch: app.fetch,
};

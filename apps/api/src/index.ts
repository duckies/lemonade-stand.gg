import { Hono } from "hono";
import { prettyJSON } from "hono/pretty-json";
import auth from "modules/auth/auth.routes";
import users from "modules/users/users.routes";

// Validate environment variables.
import "./env";

const app = new Hono();

app.get("/", (c) => c.text("Lemonade Stand API"));

app.use("*", prettyJSON());

app.route("/auth", auth);
app.route("/users", users);

export default {
  port: Number.parseInt(process.env.PORT!) || 8080,
  fetch: app.fetch,
};

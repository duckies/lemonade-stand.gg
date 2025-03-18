import type { AppType } from "@lemonade-stand/api/rpc";
import { hc } from "hono/client";
import { env } from "../env";

export const rpc = hc<AppType>(env.API_BASE_URL);

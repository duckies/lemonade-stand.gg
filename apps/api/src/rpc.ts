import { type ClientRequestOptions, hc } from "hono/client";
import type { AppType } from "./index";
export type { AppType, ClientRequestOptions };

const client = hc<AppType>("");
export type Client = typeof client;

export const rpc = (...args: Parameters<typeof hc>): Client => hc<AppType>(...args);

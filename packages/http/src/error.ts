import type { HTTPContext } from "./types";

export class HTTPError extends Error {
  public override name = "HTTPError";

  constructor(ctx: HTTPContext) {
    const method = (ctx.request as Request)?.method || ctx.options.method || "GET";
    const statusMessage = ctx.response ? `${ctx.response.status} ${ctx.response.statusText}` : "<no response>";

    super(`[${method}]: ${JSON.stringify((ctx.request as Request)?.url || ctx.request.toString())} ${statusMessage}`, {
      cause: ctx.error || ctx.response?.data,
    });

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, HTTPError);
    }
  }
}

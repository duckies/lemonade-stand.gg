import type { HTTPContext, HTTPInit, HTTPInput, HTTPResponse } from "./types";

export class HTTPError<T = any> extends Error {
  public input: HTTPInput;
  public init: HTTPInit;
  public response?: HTTPResponse<T>;

  constructor(ctx: HTTPContext<T>) {
    const errorMessage = ctx.error?.message || ctx.error?.toString() || "";
    const method = (ctx.input as Request)?.method || ctx.init?.method || "GET";
    const url = (ctx.input as Request)?.url || String(ctx.input) || "/";
    const requestStr = `[${method}] ${JSON.stringify(url)}`;

    const statusStr = ctx.response ? `${ctx.response.status} ${ctx.response.statusText}` : "<no response>";

    const message = `${requestStr}: ${statusStr}${errorMessage ? ` ${errorMessage}` : ""}`;

    super(message, { cause: ctx.error });

    this.input = ctx.input;
    this.response = ctx.response;
    this.init = ctx.init;
  }
}

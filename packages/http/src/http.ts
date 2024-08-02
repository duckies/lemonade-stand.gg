import { nullBodyResponses } from "./constants";
import { HTTPError } from "./error";
import type { HTTPContext, HTTPFetch, HTTPFetchRaw, HTTPInit, HTTPInput } from "./types";
import { detectResponseType } from "./utils";

export interface HTTP {
  get: HTTPFetch;
  post: HTTPFetch;
  put: HTTPFetch;
  patch: HTTPFetch;
  delete: HTTPFetch;
}

export class HTTP {
  protected defaults: HTTPInit;

  constructor(defaults: HTTPInit = {}) {
    this.defaults = defaults;

    for (const key of ["get", "post", "put", "patch", "delete"] as const) {
      const method: HTTPFetch = async (input, init) => {
        const req = await this.request(input, { ...init, method: key });
        return req.data as any;
      };

      this[key] = method;
    }
  }

  private createRequestContext(input: HTTPInput, init?: HTTPInit) {
    const ctx: HTTPContext = {
      request: input,
      options: {
        ...init,
        headers: new Headers(this.defaults.headers),
      },
    };

    if (init?.method) {
      ctx.options.method = init.method.toUpperCase();
    }

    if (init?.headers) {
      for (const [key, value] of new Headers(init.headers)) {
        ctx.options.headers.set(key, value);
      }
    }

    if (typeof ctx.request === "string") {
      let baseURL = ctx.options.baseURL || this.defaults.baseURL;

      if (baseURL && !ctx.request.startsWith("http")) {
        if (baseURL.endsWith("/")) {
          baseURL = baseURL.slice(0, -1);
        }

        ctx.request = new URL(`${baseURL}${ctx.request.startsWith("/") ? ctx.request : `/${ctx.request}`}`);
      }

      if (ctx.options.params) {
        ctx.request = ctx.request instanceof URL ? ctx.request : new URL(ctx.request);

        for (const [key, value] of Object.entries(ctx.options.params)) {
          if (Array.isArray(value)) {
            for (const item of value) {
              ctx.request.searchParams.append(key, item);
            }
          } else {
            ctx.request.searchParams.set(key, value);
          }
        }
      }
    }

    if (ctx.options.json) {
      const json = typeof ctx.options.json !== "string" ? JSON.stringify(ctx.options.json) : ctx.options.json;

      ctx.options.body = json;

      if (!ctx.options.headers.has("content-type")) {
        ctx.options.headers.set("content-type", "application/json");
      }

      if (!ctx.options.headers.has("accept")) {
        ctx.options.headers.set("accept", "application/json");
      }
    }

    return ctx;
  }

  public request: HTTPFetchRaw = async (input: HTTPInput, init?: HTTPInit) => {
    const ctx = this.createRequestContext(input, init);

    try {
      ctx.response = await fetch(ctx.request, ctx.options);
    } catch (error) {
      ctx.error = error as Error;
      throw new HTTPError(ctx);
    }

    // Detect and parse the body type.
    if (ctx.response.body && !nullBodyResponses.has(ctx.response.status) && ctx.options.method !== "HEAD") {
      const responseType = ctx.options.responseType || detectResponseType(ctx.response.headers.get("content-type"));

      if (responseType === "stream") {
        ctx.response.data = ctx.response.body;
      } else {
        ctx.response.data = await ctx.response[responseType]();
      }
    }

    if (!ctx.response.ok) {
      throw new HTTPError(ctx);
    }

    return ctx.response;
  };
}

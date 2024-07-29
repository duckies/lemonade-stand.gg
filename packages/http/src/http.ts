import { HTTPError } from "./error";
import type { HTTPContext, HTTPInit, HTTPInput, InstanceOptions, MappedResponseType, ResponseType } from "./types";
import { getMergedInit, getResponseType, isJSONSerializable } from "./utils";

/**
 * Inspired by {@link https://github.com/unjs/ofetch | ofetch}.
 */
export function createHTTP(options?: InstanceOptions) {
  const request = async (input: HTTPInput, init: HTTPInit = {}) => {
    const context: HTTPContext = {
      input,
      init: options?.defaults ? getMergedInit(options.defaults, init) : init,
    };

    if (typeof context.input === "string") {
      const baseURL = options?.defaults?.baseURL || context.init.baseURL;
      const query = options?.defaults?.query || context.init.query;

      if (baseURL) {
        context.input = new URL(context.input, baseURL);
      }

      if (query) {
        context.input = context.input instanceof URL ? context.input : new URL(context.input);

        for (const [key, value] of Object.entries(query)) {
          context.input.searchParams.set(key, value);
        }
      }
    }

    // Uppercase the method name.
    context.init.method = context.init.method?.toUpperCase();

    // Automatically serialize request bodies.
    if (context.init.body && isJSONSerializable(context.init.body)) {
      context.init.body = typeof context.init.body === "string" ? context.init.body : JSON.stringify(context.init.body);

      // Set `Content-Type` and `Accept` headers to application/json by default
      // when we have a JSON serializable request body.
      context.init.headers = new Headers(context.init.headers);

      if (!context.init.headers.has("content-type")) {
        context.init.headers.set("content-type", "application/json");
      }

      if (!context.init.headers.has("accept")) {
        context.init.headers.set("accept", "application/json");
      }
    }

    try {
      context.response = await fetch(context.input, context.init as RequestInit);
    } catch (error) {
      context.error = error as Error;
    }

    if (context.error || !context.response?.ok) {
      const error = new HTTPError(context);

      if (Error.captureStackTrace) {
        // I don't think I'm using this right.
        Error.captureStackTrace(error, fetch);
      }

      throw error;
    }

    if (context.response.body) {
      const responseType =
        context.init.responseType || getResponseType(context.response.headers.get("content-type")) || "json";

      if (responseType === "stream") {
        context.response._data = context.response.body;
      } else {
        context.response._data = await context.response[responseType]();
      }
    }

    return context.response;
  };

  async function http<T = any, R extends ResponseType = "json">(
    input: HTTPInput,
    init?: HTTPInit<R>,
  ): Promise<MappedResponseType<R, T>> {
    const response = await request(input, init);
    return response._data;
  }

  return http;
}

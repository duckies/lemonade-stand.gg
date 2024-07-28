import { HTTPError } from "./error";
import { getMergedInit, isJSONSerializable } from "./utils";
import type { HTTPContext, HTTPInput, HTTPInit, MappedResponseType, ResponseType } from "./types";

/**
 * Undici `HeadersInit` which isn't in `@types/node` yet.
 */
export type HeadersInit = string[][] | Record<string, string | ReadonlyArray<string>> | Headers;

export interface InstanceOptions {
  defaults?: HTTPInit;
}

/**
 * Inspired by {@link https://github.com/unjs/ofetch | ofetch}.
 */
export function createHTTPInstance(options?: InstanceOptions) {
  const request = async (input: HTTPInput, init: HTTPInit = {}) => {
    const context: HTTPContext = {
      input,
      init: options?.defaults ? getMergedInit(options.defaults, init) : init,
    };

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
      const contentType = context.response.headers.get("content-type")?.split(";").shift();

      if (!contentType || contentType.includes("application/json")) {
        context.response._data = await context.response.json();
      } else if (contentType.startsWith("text/")) {
        context.response._data = await context.response.text();
      } else {
        context.response._data = await context.response.blob();
      }
    }

    return context.response;
  };

  async function http<T = any, R extends ResponseType = "json">(
    input: HTTPInput,
    init?: HTTPInit,
  ): Promise<MappedResponseType<R, T>> {
    const response = await request(input, init);
    return response._data;
  }

  return http;
}

export const http = createHTTPInstance();

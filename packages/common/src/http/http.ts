import { HTTPError } from "./http-error";
import type { Options } from "./options";

export type Input = string | URL | Request;

export type DecoratedResponsePromise = Promise<Response> &
  Pick<Response, "arrayBuffer" | "blob" | "formData" | "text"> & {
    json<T = unknown>(): Promise<T>;
  };

export function http(input: Input, init?: Options) {
  const headers = new Headers(init?.headers);

  const _fetch = async () => {
    // Wait for headers to be set.
    await Promise.resolve();

    const options: Options = { ...init, headers };

    if (options.json) {
      options.body = JSON.stringify(options.json);
      headers.set("Content-Type", "application/json");
    }

    const request = new Request(input, options);
    const response = await fetch(request);

    if (!response.ok) {
      throw new HTTPError(response, request, options);
    }

    return response;
  };

  const promise = _fetch() as DecoratedResponsePromise;

  promise.json = async <T = unknown>() => {
    headers.set("Accept", "application/json");
    const response = await promise;
    return response.json() as T;
  };

  return promise;
}

/**
 * Performs a HTTP `GET` request.
 */
export function get(input: Input, init?: Omit<Options, "method" | "json" | "body">) {
  return http(input, { ...init, method: "get" });
}

/**
 * Performs a HTTP `POST` request.
 */
export function post(input: Input, init?: Omit<Options, "method">) {
  return http(input, { ...init, method: "post" });
}

/**
 * Performs a HTTP `PUT` request.
 */
export function put(input: Input, init?: Omit<Options, "method">) {
  return http(input, { ...init, method: "put" });
}

/**
 * Performs a HTTP `PATCH` request.
 */
export function patch(input: Input, init?: Omit<Options, "method">) {
  return http(input, { ...init, method: "patch" });
}

/**
 * Performs a HTTP `DELETE` request.
 */
export function destroy(input: Input, init?: Omit<Options, "method">) {
  return http(input, { ...init, method: "delete" });
}

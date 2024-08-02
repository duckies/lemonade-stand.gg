import type { ReadableStream } from "node:stream/web";

export interface HTTPOptions<R extends ResponseType = ResponseType> {
  baseURL?: string;
  params?: Record<string, any>;
  json?: unknown;
  responseType?: R;
}

export interface HTTPResponse<T> extends Response {
  data?: T;
}

export type HTTPInput = string | URL | Request;

export type HTTPInit<R extends ResponseType = ResponseType> = RequestInit & HTTPOptions<R>;

export interface HTTPContext<T = any, R extends ResponseType = ResponseType> {
  request: HTTPInput;
  response?: HTTPResponse<T>;
  options: Omit<HTTPInit<R>, "headers"> & { headers: Headers };
  error?: Error;
}

export interface ResponseMap {
  arrayBuffer: ArrayBuffer;
  blob: Blob;
  formData: FormData;
  stream: ReadableStream<Uint8Array>;
  text: string;
}

export type ResponseType = keyof ResponseMap | "json";

export type ObjectEntries<T> = T extends ArrayLike<infer U>
  ? Array<[string, U]>
  : Array<{ [K in keyof T]: [K, T[K]] }[keyof T]>;

export type MappedResponseType<R extends ResponseType, JsonType = any> = R extends keyof ResponseMap
  ? ResponseMap[R]
  : JsonType;

export type HTTPFetch = <T = any, R extends ResponseType = "json">(
  input: HTTPInput,
  init?: HTTPInit<R>,
) => Promise<MappedResponseType<R, T>>;

export type HTTPFetchRaw = <T = any, R extends ResponseType = "json">(
  input: HTTPInput,
  init?: HTTPInit<R>,
) => Promise<HTTPResponse<MappedResponseType<R, T>>>;

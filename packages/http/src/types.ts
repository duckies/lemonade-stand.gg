import type { ReadableStream } from "node:stream/web";

export interface ResponseMap {
  blob: Blob;
  text: string;
  arrayBuffer: ArrayBuffer;
  stream: ReadableStream<Uint8Array>;
}

export type ResponseType = keyof ResponseMap | "json";

export type MappedResponseType<R extends ResponseType, JsonType = any> = R extends keyof ResponseMap
  ? ResponseMap[R]
  : JsonType;

export interface HTTPInit extends Omit<RequestInit, "body"> {
  body?: RequestInit["body"] | Record<string, any>;
}

export type HTTPInput = string | URL | globalThis.Request;

export interface HTTPResponse<T> extends Response {
  _data?: T;
}

export interface HTTPContext<T = any> {
  input: HTTPInput;
  init: HTTPInit;
  response?: HTTPResponse<T>;
  error?: Error;
}

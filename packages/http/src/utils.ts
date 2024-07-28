import type { HTTPInit } from "./types";

export function isJSONSerializable(value: any) {
  if (value === undefined) {
    return false;
  }

  const t = typeof value;

  if (t === "string" || t === "number" || t === "boolean" || t === null) {
    return true;
  }

  if (t !== "object") {
    // BigInt, Function, Symbol, undefined
    return false;
  }

  if (Array.isArray(value)) {
    return true;
  }

  if (value.buffer) {
    return false;
  }

  return value.constructor?.name === "Object" || typeof value.toJSON === "function";
}

export function getMergedInit(defaults: HTTPInit, init: HTTPInit): HTTPInit {
  const merged: HTTPInit = {
    ...defaults,
    ...init,
  };

  if (defaults.headers && init.headers) {
    const headers = new Headers(defaults.headers);

    for (const [key, value] of new Headers(init.headers)) {
      headers.set(key, value);
    }

    merged.headers = headers;
  }

  return merged;
}

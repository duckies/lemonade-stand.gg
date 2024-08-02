import type { ResponseType } from "./types";

export function isJSONSerializable(value: any) {
  if (value === undefined) {
    return false;
  }
  const t = typeof value;

  if (t === "string" || t === "number" || t === "boolean" || t === null) {
    return true;
  }

  if (t !== "object") {
    return false; // bigint, function, symbol, undefined
  }

  if (Array.isArray(value)) {
    return true;
  }

  if (value.buffer) {
    return false;
  }

  return (value.constructor && value.constructor.name === "Object") || typeof value.toJSON === "function";
}

const textTypes = new Set(["image/svg", "application/xml", "application/xhtml", "application/html"]);

const JSON_RE = /^application\/(?:[\w!#$%&*.^`~-]*\+)?json(;.+)?$/i;

export function detectResponseType(contentType: string | null | undefined): ResponseType {
  if (!contentType) return "json";

  // Value might look like: `application/json; charset=utf-8`
  const _contentType = contentType.split(";").shift() || "";

  if (JSON_RE.test(_contentType)) return "json";

  if (textTypes.has(_contentType) || _contentType.startsWith("text/")) {
    return "text";
  }

  return "blob";
}

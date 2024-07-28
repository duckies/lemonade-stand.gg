import type { LiteralUnion } from "../types";

export type HTTPMethod = "get" | "post" | "put" | "patch" | "head" | "delete";

// export type SearchParamsInit = string | URLSearchParams | Record<string, string | number | boolean> | Array<Array<string | number | boolean>>;

export interface Options extends RequestInit {
  method?: LiteralUnion<Uppercase<HTTPMethod>, string>;
  json?: unknown;
  // params?: SearchParamsInit;
}

export interface RequestOptions extends RequestInit {
  method: NonNullable<RequestInit["method"]>;
}

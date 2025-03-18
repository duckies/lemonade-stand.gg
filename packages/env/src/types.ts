import type * as v from "valibot";

export type ExclusiveKeys<T, U> = {
  [K in keyof T]: K extends keyof U ? never : T[K];
};

export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

export type InferSchema<T> = T extends Record<string, v.GenericSchema>
  ? v.InferOutput<v.ObjectSchema<T, undefined>>
  : {};

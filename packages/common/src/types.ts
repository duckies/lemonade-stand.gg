/**
 * A promise, or is it?
 */
export type Awaitable<T> = T | PromiseLike<T>;

/**
 * Generic function.
 */
export type Fn<T> = (...args: any[]) => T;

/**
 * Constructor
 */
export type Constructor<T = void> = new (...args: any[]) => T;

export type Primitive = null | undefined | string | number | boolean | symbol | bigint;

export type LiteralUnion<T extends U, U extends Primitive> = T | (U & { _?: never });

export type ObjectEntries<T> = T extends ArrayLike<infer U>
  ? Array<[string, U]>
  : Array<{ [K in keyof T]: [K, T[K]] }[keyof T]>;

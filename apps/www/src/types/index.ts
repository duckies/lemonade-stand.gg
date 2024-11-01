/**
 * It could be a promise, or not, who knows!
 */
export type MaybePromise<T> = T | PromiseLike<T>;
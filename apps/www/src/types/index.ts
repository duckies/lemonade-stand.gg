export type MaybePromise<T> = T | PromiseLike<T>;

export interface PageProps<T> {
  params: Promise<T>;
}

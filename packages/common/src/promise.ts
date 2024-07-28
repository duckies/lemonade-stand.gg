import type { Fn } from "./types";

export interface SingletonPromise<T> {
  (): Promise<T>;
  reset: () => Promise<void>;
}

/**
 * Creates a singleton promise function.
 *
 * @category Promise
 */
export function createSingletonPromise<T>(
  fn: () => Promise<T>
): SingletonPromise<T> {
  let _promise: Promise<T> | undefined;

  function wrapper() {
    if (!_promise) {
      _promise = fn();
    }
    return _promise;
  }

  wrapper.reset = async () => {
    const _prev = _promise;
    _promise = undefined;
    if (_prev) {
      await _prev;
    }
  };

  return wrapper;
}

/**
 * Promisified `setTimeout`
 *
 * @category Promise
 */
export function sleep(ms: number, callback?: Fn<any>) {
  return new Promise<void>((resolve) => {
    return setTimeout(async () => {
      await callback?.();
      resolve();
    }, ms);
  });
}

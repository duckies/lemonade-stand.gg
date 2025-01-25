export function sample<T>(array: readonly T[]): T {
  return array.at(Math.floor(Math.random() * array.length)) as T;
}

export function samples<T>(array: Array<T>, samples = 1): Array<T> {
  const output = [];

  for (let i = 0; i < samples; i++) {
    output.push(sample(array));
  }

  return output;
}

/**
 * Creates an array of numbers from `start` to `end` via `step`.
 * If `end` is not provided, it will be considered `start`.
 */
export function range(startOrEnd: number, end?: number, step = 1) {
  const output = [];

  if (typeof end === "undefined") {
    end = startOrEnd;
    startOrEnd = 0;
  }

  for (let i = startOrEnd; i < end; i += step) {
    output.push(i);
  }

  return output;
}

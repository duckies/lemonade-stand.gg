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

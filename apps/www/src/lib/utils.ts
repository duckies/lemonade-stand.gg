export function isPOJO(value: unknown): value is object {
  if (value === null || typeof value !== "object") {
    return false;
  }

  return Object.getPrototypeOf(value) === Object.prototype;
}

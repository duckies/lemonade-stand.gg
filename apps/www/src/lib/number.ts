/**
 * Inclusively geneates a random number between min and max.
 */
export function random(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min;
}

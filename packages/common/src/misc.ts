export function createCounter() {
  let count = 0;

  return {
    async increment() {
      count++;
    },
    async decrement() {
      count--;
    },
    get count() {
      return count;
    },
  };
}

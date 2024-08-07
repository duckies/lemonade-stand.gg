import { cookies } from "next/headers";

export const getCookieStore = () => {
  const store = cookies();

  return {
    get: (key: string) => store.get(key)?.value || null,
    getAll: store.getAll,
    has: store.has,
    set: store.set,
    pop: (key: string) => {
      const value = store.get(key)?.value;

      if (value) {
        store.delete(key);
      }

      return value;
    },
    delete: (...keys: string[]) => keys.forEach((key) => store.delete(key)),
  };
};

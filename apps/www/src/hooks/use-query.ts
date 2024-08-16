"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";

export type MaybeArray<T> = T | T[];

export type QueryParam = MaybeArray<string | undefined>;

export function useQueryString() {
  const router = useRouter();
  const pathname = usePathname();
  const params = new URLSearchParams(useSearchParams());

  const set = (key: string, value: MaybeArray<string | undefined>, append?: boolean) => {
    // Note we're checking string and array length.
    if (value === undefined || value.length === 0) {
      params.delete(key);
    } else if (append) {
      params.append(key, Array.isArray(value) ? value.join("") : value);
    } else {
      params.set(key, Array.isArray(value) ? value.join("") : value);
    }

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return {
    router,
    pathname,
    params,
    set,
  };
}

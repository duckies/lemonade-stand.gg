import { useQuery } from "@tanstack/react-query";

export function useSpell(id: number) {
  return useQuery({
    queryKey: ["wowhead", "spell", id],
    queryFn: () =>
      fetch(`https://nether.wowhead.com/tooltip/spell/${id}`).then((res) => res.json()),
    staleTime: Number.POSITIVE_INFINITY,
  });
}

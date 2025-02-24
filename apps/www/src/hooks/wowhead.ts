import { useQuery } from "@tanstack/react-query";
import { type WowheadEnv, WowheadEnvs } from "components/wowhead/constants";

export interface WowheadTooltipSpell {
  icon: string;
  name: string;
  tooltip: string;
  tooltip2: string;
}

export function useSpell(id: number, env?: WowheadEnv) {
  return useQuery({
    queryKey: ["wowhead", "spell", id, env],
    queryFn: async () => {
      const dataEnv = env ? WowheadEnvs[env] : 1;
      const response = await fetch(
        `https://nether.wowhead.com/tooltip/spell/${id}?dataEnv=${dataEnv}`,
      );
      const data = await response.json();

      if (!response.ok) {
        throw data;
      }

      return data as WowheadTooltipSpell;
    },
    staleTime: Number.POSITIVE_INFINITY,
  });
}

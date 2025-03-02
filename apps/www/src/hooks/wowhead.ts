import { useQuery } from "@tanstack/react-query";
import { type WowheadEnv, WowheadEnvs } from "components/wowhead/constants";

export interface WowheadTooltipSpell {
  icon: string;
  name: string;
  tooltip: string;
  tooltip2: string;
}

export function useSpell(id: number | string, env?: WowheadEnv, dd?: string | number, ddsize?: number | string) {
  return useQuery({
    queryKey: ["wowhead", "spell", id, env],
    queryFn: async () => {
      const url = new URL(`https://nether.wowhead.com/tooltip/spell/${id}`)

      if (dd) {
        url.searchParams.set("dd", dd.toString());
      }
      if (ddsize) {
        url.searchParams.set("ddsize", ddsize.toString());
      }
      url.searchParams.set("dataEnv", (env ? WowheadEnvs[env] : 1).toString());

      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        throw data;
      }

      return data as WowheadTooltipSpell;
    },
    staleTime: Number.POSITIVE_INFINITY,
  });
}

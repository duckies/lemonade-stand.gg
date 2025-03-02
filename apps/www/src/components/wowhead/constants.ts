// Source: power.js -> WH.dataEnv
export const WowheadEnvs = {
  main: 1,
  ptr: 2,
  beta: 3,
  classic: 4,
  tbc: 5,
  wrath: 8,
  "ptr-2": 10,
  cata: 11,
  classicptr: 14,
} as const;

export type WowheadEnv = keyof typeof WowheadEnvs;

export function buildWowheadUrl(
  type: "spell" | "item" | "npc" | "zone" | "quest",
  id: string | number,
  env: WowheadEnv = "main",
  dd?: string | number,
  ddsize?: number | string,
) {
  const environment = env === "main" ? "" : `${env}/`;
  const url = new URL(`https://www.wowhead.com/${environment}${type}=${id}`);

  if (dd) {
    url.searchParams.set("dd", dd.toString());
  }
  if (ddsize) {
    url.searchParams.set("ddsize", ddsize.toString());
  }

  return url.toString();
}

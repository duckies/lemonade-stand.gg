import type { ReactNode } from "react";

export function DeathKnight({ children }: { children?: ReactNode }) {
  return <span className="text-death-knight">{children ?? "Death Knight"}</span>;
}

export function DemonHunter({ children }: { children?: ReactNode }) {
  return <span className="text-demon-hunter">{children ?? "Demon Hunter"}</span>;
}

export function Druid({ children }: { children?: ReactNode }) {
  return <span className="text-druid">{children ?? "Druid"}</span>;
}

export function Evoker({ children }: { children?: ReactNode }) {
  return <span className="text-evoker">{children ?? "Evoker"}</span>;
}

export function Hunter({ children }: { children?: ReactNode }) {
  return <span className="text-hunter">{children ?? "Hunter"}</span>;
}

export function Mage({ children }: { children?: ReactNode }) {
  return <span className="text-mage">{children ?? "Mage"}</span>;
}

export function Monk({ children }: { children?: ReactNode }) {
  return <span className="text-monk">{children ?? "Monk"}</span>;
}

export function Paladin({ children }: { children?: ReactNode }) {
  return <span className="text-paladin">{children ?? "Paladin"}</span>;
}

export function Priest({ children }: { children?: ReactNode }) {
  return <span className="text-priest">{children ?? "Priest"}</span>;
}

export function Rogue({ children }: { children?: ReactNode }) {
  return <span className="text-rogue">{children ?? "Rogue"}</span>;
}

export function Shaman({ children }: { children?: ReactNode }) {
  return <span className="text-shaman">{children ?? "Shaman"}</span>;
}

export function Warlock({ children }: { children?: ReactNode }) {
  return <span className="text-warlock">{children ?? "Warlock"}</span>;
}

export function Warrior({ children }: { children?: ReactNode }) {
  return <span className="text-warrior">{children ?? "Warrior"}</span>;
}

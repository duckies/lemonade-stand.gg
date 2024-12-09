import type { ReactNode } from "react";

export function DeathKnight({ children }: { children?: ReactNode }) {
  return <span className="text-class-death-knight">{children ?? "Death Knight"}</span>;
}

export function DemonHunter({ children }: { children?: ReactNode }) {
  return <span className="text-class-demon-hunter">{children ?? "Demon Hunter"}</span>;
}

export function Druid({ children }: { children?: ReactNode }) {
  return <span className="text-class-druid">{children ?? "Druid"}</span>;
}

export function Evoker({ children }: { children?: ReactNode }) {
  return <span className="text-class-evoker">{children ?? "Evoker"}</span>;
}

export function Hunter({ children }: { children?: ReactNode }) {
  return <span className="text-class-hunter">{children ?? "Hunter"}</span>;
}

export function Mage({ children }: { children?: ReactNode }) {
  return <span className="text-class-mage">{children ?? "Mage"}</span>;
}

export function Monk({ children }: { children?: ReactNode }) {
  return <span className="text-class-monk">{children ?? "Monk"}</span>;
}

export function Paladin({ children }: { children?: ReactNode }) {
  return <span className="text-class-paladin">{children ?? "Paladin"}</span>;
}

export function Priest({ children }: { children?: ReactNode }) {
  return <span className="text-class-priest">{children ?? "Priest"}</span>;
}

export function Rogue({ children }: { children?: ReactNode }) {
  return <span className="text-class-rogue">{children ?? "Rogue"}</span>;
}

export function Shaman({ children }: { children?: ReactNode }) {
  return <span className="text-class-shaman">{children ?? "Shaman"}</span>;
}

export function Warlock({ children }: { children?: ReactNode }) {
  return <span className="text-class-warlock">{children ?? "Warlock"}</span>;
}

export function Warrior({ children }: { children?: ReactNode }) {
  return <span className="text-class-warrior">{children ?? "Warrior"}</span>;
}

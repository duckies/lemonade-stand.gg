import { Wowhead } from "components/wowhead";
import type { ReactNode } from "react";

export default function GuideLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Wowhead />
      {children}
    </>
  );
}

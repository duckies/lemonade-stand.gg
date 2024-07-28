import type React from "react";
import { Header } from "~/components/header";

export default function OfficerLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
}

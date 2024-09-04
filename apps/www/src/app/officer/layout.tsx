import type React from "react";

export default function OfficerLayout({ children }: { children: React.ReactNode }) {
  return <main className="container px-6">{children}</main>;
}

import { Wowhead } from "~/components/wowhead";

export default function BlogLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Wowhead />
      <main className="container px-8">{children}</main>
    </>
  );
}

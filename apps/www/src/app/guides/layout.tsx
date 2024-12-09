import { Wowhead } from "~/components/wowhead";

export default function GuideLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Wowhead />
      <div className="container">{children}</div>
    </>
  );
}

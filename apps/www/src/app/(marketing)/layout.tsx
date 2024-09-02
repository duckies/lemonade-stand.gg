import { Header } from "~/components/header";
// import { LayoutTransition } from "~/components/layout-transition";

export default function MarketingLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Header />
      {/* <LayoutTransition initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}> */}
      <div className="container">{children}</div>
      {/* </LayoutTransition> */}
    </>
  );
}

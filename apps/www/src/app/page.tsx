import { Header } from "~/components/header";
import { Icons } from "~/components/icons";

export default function HomePage() {
  return (
    <>
      <Header />
      <div className="container">
        <div className="flex justify-center content-center h-[calc(100vh-56px)] py-10 flex-row flex-wrap">
          <Icons.logo className="basis-full h-[15rem] w-[15rem] mb-5" />
          <h1 className="text-5xl font-bold">Lemonade Stand</h1>
        </div>
      </div>
    </>
  );
}

import { Header } from "~/components/header";
import { Logo } from "~/components/logo";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <div className="container">
          <div className="flex justify-center content-center h-[calc(100vh-56px)] py-10 flex-row flex-wrap">
            <Logo className="basis-full h-[15rem] w-[15rem] mb-5" />
            <h1 className="text-5xl font-bold">Lemonade Stand</h1>
          </div>
        </div>
      </main>
    </>
  );
}

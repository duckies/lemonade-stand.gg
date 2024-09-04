import { LemonLogo } from "~/components/icons/logo";

export default async function HomePage() {
  return (
    <div className="flex justify-center content-center h-[calc(100vh-56px)] py-10">
      <div className="relative my-10 flex items-center">
        <h1 className="text-7xl font-bold drop-shadow-md font-serif tracking-wide rotate-[-15deg]">
          Lemonade Stand
        </h1>
        <LemonLogo className="absolute top-[30%] left-[20%] h-[15rem] w-[15rem] mb-5 z-[-1]" />
      </div>
    </div>
  );
}

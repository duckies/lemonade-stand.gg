import Image from "next/image";

export function Decorations() {
  return (
    <div className="absolute inset-0 bg-pink-300/35 overflow-hidden -z-50 select-none">
      <div className="absolute top-[-50%] left-[-40%] rotate-90 dark:opacity-35">
        <Image src="/images/yellow-gradient.svg" height="1494" width="1418" alt="" />
      </div>
      <div className="absolute right-[-60%] top-0 dark:opacity-35">
        <Image src="/images/purple-gradient.svg" height="1494" width="1418" alt="" />
      </div>
    </div>
  );
}

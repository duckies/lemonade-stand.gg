import { cn } from "@lemonade-stand/ui";
import Image from "next/image";

interface ContentCardProps {
  title: string;
  label?: string;
  href?: string;
  background: string;
  disabled?: boolean;
}

export function ContentCard({ title, label, background, href, disabled }: ContentCardProps) {
  const Component = href && disabled !== true ? "a" : "div";

  return (
    <Component
      className="min-h-[300px] group border border-border shadow-md rounded-2xl overflow-hidden"
      href={href}
    >
      <div className="relative flex items-end bg-card px-7 py-10 min-h-[300px]">
        <Image
          className={cn(
            "media-card__img absolute inset-0 object-cover object-center grow-slide",
            disabled && "grayscale",
            Component === "a" &&
              "origin-bottom-left transition-transform duration-500 ease-in-out-circ group-hover:scale-110",
          )}
          src={background}
          alt=""
          fill
        />
        <div className="absolute inset-0 bg-linear-to-tr from-card transition-opacity ease-in-out-circ group-hover:opacity-70 duration-500" />

        <div className="relative pointer-events-none flex flex-col gap-1 p-6">
          {label && (
            <p className="uppercase text-sm font-semibold text-primary mb-2 tracking-wide">
              {label}
            </p>
          )}
          <h3 className="text-3xl font-serif font-semibold tracking-wider">{title}</h3>
        </div>
      </div>
    </Component>
  );
}

import { cn } from "@lemonade-stand/ui";
import { type VariantProps, cva } from "class-variance-authority";
import Image from "next/image";
import type { ComponentPropsWithoutRef } from "react";

function Root({ children, className, ...props }: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn("flex items-center justify-between h-[400px] relative w-full", className)}
      {...props}
    >
      {children}
    </div>
  );
}

type HeroBackgroundProps = Omit<ComponentPropsWithoutRef<typeof Image>, "alt"> & {
  alt?: string;
};

function Background({ src, className, alt, ...props }: HeroBackgroundProps) {
  return (
    <>
      <Image
        className={cn("w-full h-auto object-top object-cover animate-fade-in", className)}
        src={src}
        sizes="100vw"
        fill
        priority
        alt={alt ?? ""}
        {...props}
      />
      <div className="hero-gradient" />
    </>
  );
}

export const HeroContentStyles = cva("container w-full relative", {
  variants: {
    variant: {
      default: "text-center lg:text-left",
      centered: "text-center",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

function Content({
  className,
  children,
  variant,
  ...props
}: ComponentPropsWithoutRef<"div"> & VariantProps<typeof HeroContentStyles>) {
  return (
    <div className={HeroContentStyles({ variant, className })} {...props}>
      {children}
    </div>
  );
}

function Title({ className, ...props }: ComponentPropsWithoutRef<"h1">) {
  return (
    <h1
      className={cn(
        "text-6xl dark:drop-shadow-sm mb-2 font-serif font-bold tracking-wide",
        className,
      )}
      {...props}
    />
  );
}

function Description({ className, ...props }: ComponentPropsWithoutRef<"p">) {
  return <p className={cn("text-foreground text-xl mt-3 tracking-wide", className)} {...props} />;
}

export { Background, Content, Description, Root, Title };

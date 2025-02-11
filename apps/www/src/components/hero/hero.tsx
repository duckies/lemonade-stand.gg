import { cn } from "@lemonade-stand/ui";
import { type VariantProps, cva } from "class-variance-authority";
import Image from "next/image";
import type { ComponentPropsWithoutRef } from "react";

function Root({ children, className, ...props }: ComponentPropsWithoutRef<"div">) {
  return (
    <div className={cn("hero", className)} {...props}>
      {children}
    </div>
  );
}

type HeroBackgroundProps = Omit<ComponentPropsWithoutRef<typeof Image>, "alt"> & {
  alt?: string;
  gradientClassName?: string;
};

function Background({ src, className, alt, gradientClassName, ...props }: HeroBackgroundProps) {
  return (
    <>
      <Image
        className={cn(
          "w-full h-auto object-center object-cover animate-in fade-in duration-300",
          className,
        )}
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
      default: "slide-enter",
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

const TitleStyles = cva(
  "drop-shadow mb-2 font-serif font-bold tracking-wide text-balance transition-all",
  {
    variants: {
      variant: {
        larger: "text-7xl lg:text-8xl",
        large: "text-6xl",
        normal: "text-5xl lg:text-left",
      },
    },
    defaultVariants: {
      variant: "normal",
    },
  },
);

function Title({
  className,
  variant,
  ...props
}: ComponentPropsWithoutRef<"h1"> & VariantProps<typeof TitleStyles>) {
  return <h1 className={cn(TitleStyles({ variant }), className)} {...props} />;
}

function Description({ className, ...props }: ComponentPropsWithoutRef<"p">) {
  return <p className={cn("text-foreground text-xl mt-3 tracking-wide", className)} {...props} />;
}

export { Background, Content, Description, Root, Title };

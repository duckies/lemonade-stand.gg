"use client";

import {
  TabsContent as TabsContentPrimitive,
  TabsList as TabsListPrimitive,
  Tabs as TabsPrimitive,
  TabsTrigger as TabsTriggerPrimitive,
  cn,
} from "@lemonade-stand/ui";
import { type VariantProps, cva } from "class-variance-authority";
import { type ComponentPropsWithRef, type MouseEvent, useEffect, useRef, useState } from "react";

export function Tabs({ className, ...props }: ComponentPropsWithRef<typeof TabsPrimitive>) {
  return <TabsPrimitive className={cn("my-7", className)} {...props} />;
}

export function TabsList({ className, ...props }: ComponentPropsWithRef<typeof TabsListPrimitive>) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    const checkOverflow = () => {
      if (ref.current) {
        setIsOverflowing(ref.current.scrollWidth > ref.current.clientWidth);
      }
    };

    checkOverflow();

    window.addEventListener("resize", checkOverflow);

    return () => {
      window.removeEventListener("resize", checkOverflow);
    };
  }, []);

  const onMouseDown = (e: MouseEvent) => {
    if (!isOverflowing || !ref.current) return;
    setIsDragging(true);
    setStartX(e.pageX - ref.current.offsetLeft);
    setScrollLeft(ref.current.scrollLeft);
  };

  const onMouseMove = (e: MouseEvent) => {
    if (!isDragging || !ref.current) return;
    e.preventDefault();
    const x = e.pageX - ref.current.offsetLeft;
    const scroll = (x - startX) * 2;
    ref.current.scrollLeft = scrollLeft - scroll;
  };

  const onMouseUp = () => setIsDragging(false);

  return (
    <TabsListPrimitive
      ref={ref}
      data-dragging={isDragging}
      className={cn(
        className,
        isOverflowing && "cursor-grab",
        "data-[dragging=true]:cursor-grabbing",
      )}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      {...props}
    />
  );
}

interface TriggerProps extends ComponentPropsWithRef<typeof TabsTriggerPrimitive> {
  prefix?: string;
}

export function TabsTrigger({ className, children, prefix, ...props }: TriggerProps) {
  return (
    <TabsTriggerPrimitive className={className} {...props}>
      {prefix && <span className="hidden md:block mr-1">{prefix}</span>}
      {children}
    </TabsTriggerPrimitive>
  );
}

const ContentStyles = cva("", {
  variants: {
    variant: {
      block: "prose bg-muted rounded-lg p-5 my-3",
      ghost: "",
    },
  },
  defaultVariants: {
    variant: "block",
  },
});

interface ContentProps
  extends ComponentPropsWithRef<typeof TabsContentPrimitive>,
    VariantProps<typeof ContentStyles> {}

export function TabsContent({ className, children, variant, ...props }: ContentProps) {
  return (
    <TabsContentPrimitive className={ContentStyles({ variant, className })} {...props}>
      {children}
    </TabsContentPrimitive>
  );
}

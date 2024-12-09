import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { cva } from "class-variance-authority";
import { ChevronDown, ChevronDownIcon } from "lucide-react";
import type { ComponentPropsWithRef } from "react";

import "./navigation-menu.css";
import { cn } from "../../utils/cn";

function NavigationMenu({
  className,
  children,
  ref,
  ...props
}: ComponentPropsWithRef<typeof NavigationMenuPrimitive.Root>) {
  return (
    <NavigationMenuPrimitive.Root ref={ref} className={cn("navigation-menu", className)} {...props}>
      {children}
    </NavigationMenuPrimitive.Root>
  );
}

function NavigationMenuList({
  className,
  ref,
  ...props
}: ComponentPropsWithRef<typeof NavigationMenuPrimitive.List>) {
  return (
    <NavigationMenuPrimitive.List
      ref={ref}
      className={cn("navigation-menu__list", className)}
      {...props}
    />
  );
}

const NavigationMenuItem = NavigationMenuPrimitive.Item;

const navigationMenuTriggerStyle = cva([
  "group flex relative h-10 w-max items-center justify-center px-4 py-2 text-sm font-medium focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50",
  "before:absolute before:inset-0 before:bg-white/10 before:transition-[opacity,transform,border-radius] before:duration-250",
  "before:opacity-0 hover:before:opacity-100 before:data-[active]:opacity-100 before:data-[state=open]:opacity-100",
  "before:scale-[.4] hover:before:scale-100 before:data-[active]:scale-100 before:data-[state=open]:scale-100",
  "before:rounded hover:before:rounded-[0.6rem] before:data-[active]:rounded-[0.6rem] before:data-[state=open]:rounded-[0.6rem]",
]);

function NavigationMenuTrigger({
  className,
  children,
  ref,
  ...props
}: ComponentPropsWithRef<typeof NavigationMenuPrimitive.Trigger>) {
  return (
    <NavigationMenuPrimitive.Trigger
      ref={ref}
      className={cn("navigation-menu__trigger", navigationMenuTriggerStyle(), "group", className)}
      onPointerEnter={(e) => e.preventDefault()}
      onPointerMove={(e) => e.preventDefault()}
      onPointerLeave={(e) => e.preventDefault()}
      {...props}
    >
      {children}{" "}
      <ChevronDownIcon
        className="relative top-[1px] ml-1 h-3 w-3 transition-transform duration-250 group-data-[state=open]:rotate-[-180deg]"
        aria-hidden
      />
    </NavigationMenuPrimitive.Trigger>
  );
}

function NavigationMenuContent({
  className,
  ref,
  ...props
}: ComponentPropsWithRef<typeof NavigationMenuPrimitive.Content>) {
  return (
    <NavigationMenuPrimitive.Content
      ref={ref}
      onPointerMove={(e) => e.preventDefault()}
      onPointerLeave={(e) => e.preventDefault()}
      className={cn(
        "navigation-menu__content",
        // "absolute top-0 left-0 w-full data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 md:absolute md:w-auto ",
        className,
      )}
      {...props}
    />
  );
}

const NavigationMenuLink = NavigationMenuPrimitive.Link;

function NavigationMenuViewport({
  className,
  children,
  ref,
  ...props
}: ComponentPropsWithRef<typeof NavigationMenuPrimitive.Viewport>) {
  return (
    <div className="navigation-menu__viewport-position">
      <NavigationMenuPrimitive.Viewport
        className={cn(
          "navigation-menu__viewport",
          // "origin-top-center relative mt-3 h-[var(--radix-navigation-menu-viewport-height)] w-[var(---radix-navigation-menu-viewport-width)] overflow-hidden rounded-md bg-popover/70 backdrop-blur-sm text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 min-[600px]:w-[var(--radix-navigation-menu-viewport-width)]",
          className,
        )}
        ref={ref}
        {...props}
      />
    </div>
  );
}

function NavigationMenuIndicator({
  className,
  ref,
  ...props
}: ComponentPropsWithRef<typeof NavigationMenuPrimitive.Indicator>) {
  return (
    <NavigationMenuPrimitive.Indicator
      ref={ref}
      className={cn(
        "navigation-menu__indicator",
        // "top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in",
        className,
      )}
      {...props}
    />
  );
}

function NavigationMenuArrow({ className, ...props }: ComponentPropsWithRef<"div">) {
  return <div className={cn(className, "navigation-menu__arrow")} {...props} />;
}

export {
  NavigationMenu as Root,
  NavigationMenuContent as Content,
  NavigationMenuIndicator as Indicator,
  NavigationMenuItem as Item,
  NavigationMenuLink as Link,
  NavigationMenuList as List,
  NavigationMenuTrigger as Trigger,
  navigationMenuTriggerStyle,
  NavigationMenuViewport as Viewport,
  NavigationMenuArrow as Arrow,
};

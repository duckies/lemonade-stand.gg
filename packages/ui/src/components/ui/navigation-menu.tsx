import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { cva } from "class-variance-authority";
import { ChevronDownIcon } from "lucide-react";
import type { ComponentPropsWithRef } from "react";

import { cn } from "../../utils/cn";
import "./navigation-menu.css";

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

function NavigationMenuItem({
  className,
  ref,
  ...props
}: ComponentPropsWithRef<typeof NavigationMenuPrimitive.Item>) {
  return (
    <NavigationMenuPrimitive.Item
      ref={ref}
      className={cn("navigation-menu__item", className)}
      {...props}
    />
  );
}

const navigationMenuTriggerStyle = cva([
  "group flex relative h-10 w-max items-center justify-center px-4 py-2 focus:text-accent-foreground focus:outline-hidden disabled:pointer-events-none disabled:opacity-50",
  "hover:text-primary data-[state=open]:text-primary",
]);

interface NavigationMenuTriggerProps
  extends ComponentPropsWithRef<typeof NavigationMenuPrimitive.Trigger> {
  icon?: boolean;
}

function NavigationMenuTrigger({
  className,
  children,
  icon,
  ref,
  ...props
}: NavigationMenuTriggerProps) {
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
      {icon !== false && (
        <ChevronDownIcon
          className="relative top-[1px] ml-1 h-4 w-4 transition-transform duration-250 group-data-[state=open]:rotate-[-180deg]"
          aria-hidden
        />
      )}
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
      className={cn("navigation-menu__content", className)}
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
          // "origin-top-center relative mt-3 h-[var(--radix-navigation-menu-viewport-height)] w-[var(---radix-navigation-menu-viewport-width)] overflow-hidden rounded-md bg-popover/70 backdrop-blur-xs text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 min-[600px]:w-[var(--radix-navigation-menu-viewport-width)]",
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
        // "top-full z-1 flex h-1.5 items-end justify-center overflow-hidden data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in",
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
  NavigationMenuArrow as Arrow,
  NavigationMenuContent as Content,
  NavigationMenuIndicator as Indicator,
  NavigationMenuItem as Item,
  NavigationMenuLink as Link,
  NavigationMenuList as List,
  navigationMenuTriggerStyle,
  NavigationMenu as Root,
  NavigationMenuTrigger as Trigger,
  NavigationMenuViewport as Viewport,
};

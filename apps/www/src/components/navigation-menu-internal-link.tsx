"use client";

import { NavigationMenuLink, navigationMenuTriggerStyle } from "@lemonade-stand/ui";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavigationMenuInternalLink({ href, ...props }: any) {
  const pathname = usePathname();
  const isActive = href === pathname;

  return (
    <NavigationMenuLink asChild active={isActive}>
      <Link href={href} className={navigationMenuTriggerStyle()} {...props} />
    </NavigationMenuLink>
  );
}

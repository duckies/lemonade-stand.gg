"use client";

import { navigationMenuTriggerStyle } from "@lemonade-stand/ui";
import * as NavigationMenu from "@lemonade-stand/ui/navigation-menu";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavigationMenuInternalLink({ href, ...props }: any) {
  const pathname = usePathname();
  const isActive = href === pathname;

  return (
    <NavigationMenu.Link asChild active={isActive}>
      <Link href={href} className={navigationMenuTriggerStyle()} {...props} />
    </NavigationMenu.Link>
  );
}

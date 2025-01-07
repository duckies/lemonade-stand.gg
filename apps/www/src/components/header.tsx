"use client";

import { cn, navigationMenuTriggerStyle } from "@lemonade-stand/ui";
import * as NavigationMenu from "@lemonade-stand/ui/navigation-menu";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { KeyRoundIcon, SwordsIcon } from "lucide-react";
import Link from "next/link";
import type React from "react";
import type { ComponentPropsWithRef, ReactNode } from "react";
import { LemonLogo } from "./icons/logo";
import { MobileNav } from "./mobile-nav";
import { NavigationMenuInternalLink } from "./navigation-menu-internal-link";

function ListItem({ className, title, children, ref, ...props }: ComponentPropsWithRef<"a">) {
  return (
    <li>
      <NavigationMenu.Link asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
        </a>
      </NavigationMenu.Link>
    </li>
  );
}

function ContentGridLink({
  href,
  title,
  subtitle,
  icon,
}: { href: string; title: string; subtitle?: string; icon: ReactNode }) {
  return (
    <a
      href={href}
      rel="noreferrer noopener"
      target="_blank"
      className="rounded-xl bg-popover/70 p-3 hover:bg-primary/50 transition-colors w-full flex items-start gap-3"
    >
      <div className="p-3 bg-neutral-900 rounded-xl">{icon}</div>
      <div className="grow">
        <div className="flex items-center gap-2 justify-between">
          <p className="font-semibold tracking-widest">{title}</p>
        </div>
        {subtitle && <p className="mt-1">{subtitle}</p>}
      </div>
    </a>
  );
}

export function Header({ children }: { children?: React.ReactNode }) {
  return (
    <header className="absolute top-4 inset-x-0 z-50">
      <NavigationMenu.Root className="">
        <div className="mx-auto px-4 max-md:max-w-[24rem] w-[95vw] md:w-fit bg-popover/70 backdrop-blur-md rounded-xl">
          <div className="flex justify-between gap-4">
            <Link className="flex items-center space-x-2" href="/">
              <div className="p-3 rounded-full">
                <LemonLogo className="w-7 h-7 drop-shadow-sm ease-in-back transition-transform rotate-0 hover:rotate-90 duration-1000" />
              </div>
            </Link>

            <div className="hidden md:flex h-14 pt-2 pr-2 pb-2 pl-2 items-center">
              <div className="flex h-14 items-center">
                <div className="items-center gap-4 text-sm lg:gap-6">
                  <NavigationMenu.List>
                    <NavigationMenu.Item>
                      <NavigationMenuInternalLink href="/">Home</NavigationMenuInternalLink>
                    </NavigationMenu.Item>
                    <NavigationMenu.Item>
                      <NavigationMenu.Trigger>Posts</NavigationMenu.Trigger>
                      <NavigationMenu.Content>
                        <ul className="grid gap-3 p-4 w-[400px] grid-cols-2">
                          <ListItem title="Boss Guides" href="/guides">
                            Guides
                          </ListItem>
                        </ul>
                      </NavigationMenu.Content>
                    </NavigationMenu.Item>
                    <NavigationMenu.Item>
                      <NavigationMenu.Link
                        href="https://forms.gle/ZpkSMh5obXPk6Vnd7"
                        target="_blank"
                        className={navigationMenuTriggerStyle()}
                      >
                        Apply
                      </NavigationMenu.Link>
                    </NavigationMenu.Item>
                    <NavigationMenu.Item>
                      <NavigationMenu.Trigger>Links</NavigationMenu.Trigger>
                      <NavigationMenu.Content>
                        <ul className="flex flex-col gap-2 w-auto p-4 md:w-[250px] md:grid-cols-2 lg:w-[300px]">
                          <ContentGridLink
                            href="https://www.warcraftlogs.com/"
                            title="WarcraftLogs"
                            icon={<SwordsIcon className="size-4" />}
                          />
                          <ContentGridLink
                            href="https://raider.io/guilds/us/illidan/Lemonade%20Stand"
                            title="Raider.io"
                            icon={<KeyRoundIcon className="size-4" />}
                          />
                        </ul>
                      </NavigationMenu.Content>
                    </NavigationMenu.Item>

                    <NavigationMenu.Indicator>
                      <NavigationMenu.Arrow className="bg-popover/80 backdrop-blur-md" />
                    </NavigationMenu.Indicator>
                  </NavigationMenu.List>
                </div>
              </div>
            </div>

            <div className="flex gap-3 items-center">{children}</div>
          </div>
        </div>
        <NavigationMenu.Viewport className="bg-popover/80 backdrop-blur-md" />
      </NavigationMenu.Root>
    </header>
  );
}

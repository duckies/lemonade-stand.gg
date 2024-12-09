"use client";

import { cn, navigationMenuTriggerStyle } from "@lemonade-stand/ui";
import * as NavigationMenu from "@lemonade-stand/ui/navigation-menu";
import { ExternalLinkIcon, KeyRoundIcon, MoveUpRightIcon, SwordsIcon } from "lucide-react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import Link from "next/link";
import type React from "react";
import { type ComponentPropsWithRef, type ReactNode, useState } from "react";
import { LemonLogo } from "./icons/logo";
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
}: { href: string; title: string; subtitle: string; icon: ReactNode }) {
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
          <p className="font-serif font-bold tracking-widest">{title}</p>
        </div>
        <p className="mt-1">{subtitle}</p>
      </div>
    </a>
  );
}

export function Header({ children }: { children?: React.ReactNode }) {
  // const { scrollY } = useScroll();
  // const [hidden, setHidden] = useState(false);

  // useMotionValueEvent(scrollY, "change", (latest) => {
  //   const previous = scrollY.getPrevious() ?? 0;
  //   if (latest > previous && latest > 150) {
  //     setHidden(true);
  //   } else {
  //     setHidden(false);
  //   }
  // });

  return (
    <NavigationMenu.Root>
      <header
        // variants={{
        //   visible: { y: 0 },
        //   hidden: { y: "-125%" },
        // }}
        // animate={hidden ? "hidden" : "visible"}
        // transition={{ duration: 0.35, ease: "easeInOut" }}
        className="container sticky px-4 flex z-50 mt-5 w-min-[570px] w-fit justify-center bg-popover/70 backdrop-blur-md rounded-xl"
      >
        <div className="flex w-full justify-between gap-4">
          <Link className="flex items-center space-x-2" href="/">
            <div className="p-3 rounded-full">
              <LemonLogo className="w-7 h-7 drop-shadow-sm ease-in-back transition-transform rotate-0 hover:rotate-90 duration-1000" />
            </div>
            {/* <span className="hidden font-bold lg:inline-block">Lemonade Stand</span> */}
          </Link>

          <div className="h-14 pt-2 pr-2 pb-2 pl-2 flex items-center">
            <div className="flex h-14 items-center">
              <div className="hidden md:flex">
                <nav className="flex items-center gap-4 text-sm lg:gap-6">
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
                            subtitle="Our latest logs"
                            icon={<SwordsIcon className="size-4" />}
                          />
                          <ContentGridLink
                            href="https://raider.io/guilds/us/illidan/Lemonade%20Stand"
                            title="Raider.io"
                            subtitle="Raid and Mythic+ numbies"
                            icon={<KeyRoundIcon className="size-4" />}
                          />
                        </ul>
                      </NavigationMenu.Content>
                    </NavigationMenu.Item>

                    <NavigationMenu.Indicator>
                      <NavigationMenu.Arrow className="bg-popover/80 backdrop-blur-md" />
                    </NavigationMenu.Indicator>
                  </NavigationMenu.List>
                </nav>
              </div>
            </div>
          </div>

          <div className="flex gap-3 items-center">{children}</div>
        </div>
      </header>
      <NavigationMenu.Viewport className="bg-popover/80 backdrop-blur-md" />
    </NavigationMenu.Root>
  );
}

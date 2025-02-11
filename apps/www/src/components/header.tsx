"use client";

import { cn, navigationMenuTriggerStyle } from "@lemonade-stand/ui";
import * as NavigationMenu from "@lemonade-stand/ui/navigation-menu";
import {
  CrownIcon,
  ExternalLinkIcon,
  HourglassIcon,
  MegaphoneIcon,
  ScrollIcon,
  SwordsIcon,
  TrafficConeIcon,
} from "lucide-react";
import Link from "next/link";
import type React from "react";
import type { ComponentPropsWithRef, ReactNode, SVGAttributes } from "react";
import { LemonLogo } from "./icons/logo";
import { NavigationMenuInternalLink } from "./navigation-menu-internal-link";

export type NavLink = {
  href: string;
  title: string;
  subtitle?: string;
  icon: (props: SVGAttributes<SVGSVGElement>) => ReactNode;
};

const Links = [
  {
    href: "https://www.warcraftlogs.com/guild/id/702087",
    title: "WarcraftLogs",
    subtitle: "Raid reports, parses, and progression",
    icon: SwordsIcon,
  },
  {
    href: "https://raider.io/guilds/us/illidan/Lemonade%20Stand",
    title: "Raider.io",
    subtitle: "Mythic+ leaderboards and rankings",
    icon: HourglassIcon,
  },
  {
    href: "https://www.wowprogress.com/guild/us/illidan/Lemonade+Stand",
    title: "WoWProgress",
    subtitle: "Progression and recruitment goals",
    icon: CrownIcon,
  },
];

function ListItem({ className, title, children, ref, ...props }: ComponentPropsWithRef<"a">) {
  return (
    <li>
      <NavigationMenu.Link asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-hidden transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
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
}: {
  href: string;
  title: string;
  subtitle?: string;
  icon: (props: SVGAttributes<SVGSVGElement>) => ReactNode;
}) {
  const isExternal = href.startsWith("http");
  const Component = isExternal ? "a" : Link;
  const Icon = icon;

  return (
    <li>
      <Component
        href={href}
        {...(isExternal && { rel: "noopener noreferrer", target: "_blank" })}
        className="group flex items-center p-2 gap-4"
      >
        {<Icon className="size-6 group-hover:text-primary" />}
        <div className="flex w-full flex-col text-sm whitespace-nowrap">
          <div className="flex items-center gap-2 group-hover:text-primary">
            <p>{title}</p>
            {isExternal && <ExternalLinkIcon className="size-3" />}
          </div>
          {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
        </div>
      </Component>
    </li>
  );
}

export function Header({ children }: { children?: React.ReactNode }) {
  return (
    <header className="absolute top-4 inset-x-0 z-50">
      <NavigationMenu.Root className="">
        <div className="mx-auto px-4 max-md:max-w-[24rem] w-[95vw] md:w-fit bg-surface/70 backdrop-blur-md rounded-xl">
          <div className="flex justify-between gap-4">
            <Link className="flex items-center space-x-2" href="/">
              <div className="p-3 rounded-full">
                <LemonLogo className="w-7 h-7 drop-shadow-xs ease-in-back transition-transform rotate-0 hover:rotate-90 duration-1000" />
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
                        <ul className="grid grid-cols-[max-content_1fr] gap-1 p-4 w-auto text-sm">
                          <li className="row-span-3">
                            <NavigationMenu.Link asChild>
                              <Link href="/guides" className="group flex p-2 h-full">
                                <div className="flex p-2 relative">
                                  <div className="absolute inset-0 bg-[url(/images/hero/liberation_of_undermine.jpg)] bg-cover h-full rounded-lg after:absolute after:inset-0 after:bg-linear-to-tr/oklch after:from-surface/80 after:from-25% after:to-secondary/70 border border-border" />

                                  <div className="p-2 flex flex-col h-full justify-end z-10">
                                    <p className="group-hover:text-primary">Boss Guides</p>
                                    <p className="text-muted-foreground text-balance">
                                      Fight strategies and plans
                                    </p>
                                  </div>
                                </div>
                              </Link>
                            </NavigationMenu.Link>
                          </li>
                          <ContentGridLink
                            href="#"
                            title="Announcements"
                            subtitle="Guild news and accolades"
                            icon={MegaphoneIcon}
                          />
                          <ContentGridLink
                            href="/resources"
                            title="Resources"
                            subtitle="Community goodies"
                            icon={ScrollIcon}
                          />
                          <ContentGridLink
                            href="#"
                            title="Some third thing"
                            subtitle="Secret, tertiary, and worse"
                            icon={TrafficConeIcon}
                          />
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
                        <ul className="flex flex-col gap-1 w-auto p-4 md:grid-cols-[.75fr_auto]">
                          {Links.map((link) => (
                            <ContentGridLink key={link.href} {...link} />
                          ))}
                        </ul>
                      </NavigationMenu.Content>
                    </NavigationMenu.Item>

                    <NavigationMenu.Indicator>
                      <NavigationMenu.Arrow className="bg-surface/80 backdrop-blur-md" />
                    </NavigationMenu.Indicator>
                  </NavigationMenu.List>
                </div>
              </div>
            </div>

            <div className="flex gap-3 items-center">{children}</div>
          </div>
        </div>
        <NavigationMenu.Viewport className="bg-surface/90 backdrop-blur-md border border-border" />
      </NavigationMenu.Root>
    </header>
  );
}

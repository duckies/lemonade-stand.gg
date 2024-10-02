import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  cn,
  navigationMenuTriggerStyle,
} from "@lemonade-stand/ui";
import Link from "next/link";
import {
  // type ComponentPropsWithRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
} from "react";
import { LemonLogo } from "./icons/logo";
import { UserNav } from "./user-nav";

const ListItem = forwardRef<ElementRef<"a">, ComponentPropsWithoutRef<"a">>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
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
        </NavigationMenuLink>
      </li>
    );
  },
);

export function Header() {
  return (
    <header className="container px-6 flex z-50 top-0 w-full mt-4 justify-center ">
      <div className="flex w-full justify-between backdrop-blur-sm bg-card/50 rounded-xl shadow-sm">
        <Link className="flex items-center space-x-2 mr-4 lg:mr-6" href="/">
          <div className="p-3 rounded-full mr-2">
            <LemonLogo className="w-7 h-7 drop-shadow-sm hover:animate-rocking ease-in-back transition-transform" />
          </div>
          {/* <span className="hidden font-bold lg:inline-block">Lemonade Stand</span> */}
        </Link>

        <div className="h-14 pt-2 pr-2 pb-2 pl-2 flex items-center">
          <div className="flex h-14 items-center">
            <div className="hidden md:flex">
              <nav className="flex items-center gap-4 text-sm lg:gap-6">
                <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <Link href="/news" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                          News
                        </NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger>Links</NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid gap-3 w-auto p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                          <ListItem title="WarcraftLogs" href="https://www.warcraftlogs.com/">
                            Our latest logs
                          </ListItem>
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              </nav>
            </div>
          </div>
        </div>

        <div className="flex gap-3 items-center px-3 py-2">
          {/* <ThemeSwitcher /> */}
          <UserNav />
        </div>
      </div>
    </header>
  );
}

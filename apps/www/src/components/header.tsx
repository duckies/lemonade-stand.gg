import { Separator, buttonVariants, cn } from "@lemonade-stand/ui";
import Link from "next/link";
import { DiscordLogo } from "./discord-logo";
import { Icons } from "./icons";
import { ThemeSwitcher } from "./theme-switcher";
import { UserNav } from "./user-nav";

const NavItems = [
  { text: "Blog", value: "/blog" },
  { text: "Roster", value: "/roster" },
  { text: "Apply", value: "https://forms.gle/ie3kYSuR4K3awV3p9", target: "_blank" },
];

export function Header() {
  return (
    <header className="container sticky top-0 w-full mt-4 py-1.5 z-50">
      <div className="bg-card/90 backdrop-filter backdrop-blur-md h-14 shadow-sm rounded-md px-3 py-3 flex items-center">
        <div className="flex w-full h-14 max-w-screen-2xl items-center">
          <div className="mr-4 hidden md:flex">
            <Link className="mr-4 flex items-center space-x-2 lg:mr-6" href="/">
              <Icons.logo className="w-8 h-8 hover:rotate-45 transition-transform" />
              <span className="hidden font-bold lg:inline-block">Lemonade Stand</span>
            </Link>
            <nav className="flex items-center gap-4 text-sm lg:gap-6">
              {NavItems.map((link) => (
                <Link
                  key={link.value}
                  className="teansition-colors hover:text-foreground/80 text-foreground/60"
                  href={link.value}
                  target={link.target}
                >
                  {link.text}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <nav className="flex items-center">
              <Link href="https://discord.gg/ontrack" target="_blank" rel="noreferrer">
                <div
                  className={cn(
                    buttonVariants({
                      variant: "ghost",
                    }),
                    "h-8 w-8 px-0",
                  )}
                >
                  <DiscordLogo className="h-4 w-4" />
                  <span className="sr-only">Discord</span>
                </div>
              </Link>
              <ThemeSwitcher />
              <Separator orientation="vertical" className="mx-2 h-7" />
              <UserNav />
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}

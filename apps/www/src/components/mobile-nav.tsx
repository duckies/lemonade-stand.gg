"use client";

import { Button, cn } from "@lemonade-stand/ui";
import { LucideExternalLink, LucideMenu } from "lucide-react";
import Link, { type LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Drawer } from "vaul";

const mobileNav = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Application",
    href: "https://forms.gle/ZpkSMh5obXPk6Vnd7",
  },
  {
    title: "Content",
    children: [
      {
        title: "Guides",
        href: "/guides",
      },
      {
        title: "Resources",
        href: "/resources",
      },
      {
        title: "Blog",
        href: "/blog",
      },
    ],
  },
];

interface MobileNavLinkProps extends LinkProps {
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}

function MobileNavLink({ href, className, onOpenChange, children, ...props }: MobileNavLinkProps) {
  const router = useRouter();
  const isExternal = href.toString().startsWith("http");

  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString());
        onOpenChange?.(false);
      }}
      className={cn("text-base inline-flex gap-2 items-center hover:text-primary", className)}
      {...props}
    >
      {children}
      {isExternal && <LucideExternalLink className="size-4" />}
    </Link>
  );
}

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Drawer.Root open={open} onOpenChange={setOpen} direction="right">
      <Drawer.Trigger asChild>
        <Button
          variant="ghost"
          className="h-8 w-8 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <LucideMenu className="size-7" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/80 z-50" />
        <Drawer.Content
          className="right-2 top-2 bottom-2 fixed w-[310px] flex z-50"
          style={{ "--initial-transform": "calc(100% + 8px)" } as React.CSSProperties}
        >
          <div className="bg-card/60 backdrop-blur-md h-full w-full grow p-5 flex flex-col rounded-2xl">
            <div className="max-w-md mx-auto">
              <Drawer.Title className="font-serif text-2xl font-semibold mb-3 tracking-wider">
                Lemonade Stand
              </Drawer.Title>
              <nav>
                <ul className="flex flex-col space-y-3">
                  {mobileNav.map((item) => (
                    <li key={item.title}>
                      {item.href ? (
                        <MobileNavLink href={item.href}>{item.title}</MobileNavLink>
                      ) : (
                        item.title
                      )}
                      {item.children && (
                        <ul className="mt-2 ml-2 flex flex-col space-y-3 text-muted-foreground">
                          {item.children.map((child) => (
                            <li key={child.title}>
                              <MobileNavLink href={child.href} onOpenChange={setOpen}>
                                {child.title}
                              </MobileNavLink>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

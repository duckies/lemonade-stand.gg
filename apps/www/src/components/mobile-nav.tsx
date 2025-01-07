"use client";

import { Button, Sheet } from "@lemonade-stand/ui";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useState } from "react";
import { LemonLogo } from "./icons/logo";

const MobileLinks = [{ text: "Home", href: "/" }] as const;

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet.Root open={open} onOpenChange={setOpen}>
      <Sheet.Trigger asChild>
        <Button variant="ghost" className="lg:hidden">
          <HamburgerMenuIcon className="h-5 w-5" />
        </Button>
      </Sheet.Trigger>
      <Sheet.Content side="left">
        <Sheet.Header>
          <Sheet.Title className="flex gap-x-3 items-center">
            <LemonLogo className="h-5 w-5" />
            Lemonade Stand
          </Sheet.Title>
        </Sheet.Header>

        <div className="my-5">
          <nav>
            <ul>
              <li className="rounded-md bg-card px-5 py-4">
                <Link href="/">Home</Link>
              </li>
            </ul>
          </nav>
        </div>
      </Sheet.Content>
    </Sheet.Root>
  );
}

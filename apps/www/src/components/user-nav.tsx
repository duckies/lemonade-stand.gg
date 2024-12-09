"use client";

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@lemonade-stand/ui";
import { DiscordLogo } from "./discord-logo";

export function UserNav() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="pl-3.5 pr-3 rounded-lg">
          <DiscordLogo className="h-4 w-4 mr-2" />
          Sign In
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl tracking-wide">
            😅 Oh Poop, This isn't ready yet.
          </DialogTitle>
          <DialogDescription>
            Such technology is not ready yet, and we humbly ask you to wait for it to be.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

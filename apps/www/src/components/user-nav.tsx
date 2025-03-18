import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@lemonade-stand/ui";
// import { SignInButton } from "~/components/sign-in-button";
// import { getSession } from "~/server/auth";
import { DiscordLogo } from "./discord-logo";

export async function UserNav() {
  // const session = await getSession();

  // if (!session?.user) {
  //   return (
  //     <SignInButton />
  //   );
  // }

  // console.log(session)

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

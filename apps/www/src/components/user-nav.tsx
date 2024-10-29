import { Button } from "@lemonade-stand/ui";
import { getSession } from "~/server/auth";
import { DiscordLogo } from "./discord-logo";
import { UserNavMenu } from "./user-nav-menu";

export async function UserNav() {
  const session = await getSession();

  if (!session.user) {
    return (
      <Button>
        <DiscordLogo className="h-4 w-4 mr-2" />
        Sign In
      </Button>
    );
  }

  return <UserNavMenu user={session.user} />;
}

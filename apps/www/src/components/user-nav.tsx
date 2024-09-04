import { getSession, signIn } from "~/server/auth";
import { DiscordLogo } from "./discord-logo";
import { SubmitButton } from "./submit-button";
import { UserNavMenu } from "./user-nav-menu";

export async function UserNav() {
  const session = await getSession();

  if (!session.user) {
    return (
      <form action={signIn}>
        <SubmitButton className="bg-black dark:bg-white dark:text-black flex gap-x-1.5 leading-none px-3 rounded-[.5rem]">
          <DiscordLogo className="h-4 w-4" />
          Sign in
        </SubmitButton>
      </form>
    );
  }

  return <UserNavMenu user={session.user} />;
}

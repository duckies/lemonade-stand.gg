import { getSession, signIn } from "~/server/auth";
import { SubmitButton } from "./submit-button";
import { UserNavMenu } from "./user-nav-menu";

export async function UserNav() {
  const session = await getSession();

  if (!session.user) {
    return (
      <form action={signIn}>
        <SubmitButton>Sign In</SubmitButton>
      </form>
    );
  }

  return <UserNavMenu user={session.user} />;
}

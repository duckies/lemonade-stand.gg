"use client";

import { Button } from "@lemonade-stand/ui";
import { LucideLoader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { DiscordLogo } from "~/components/discord-logo";
import { client } from "~/server/hc";

export function SignInButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  console.log(client.auth.login.discord.$url());

  function signIn() {
    startTransition(async () => {
      const url = client.auth.login.discord.$url();
      router.replace(url.toString())
    })
  }

  return (
    <Button onClick={signIn} data-loading={isPending} className="group pl-3.5 pr-3 rounded-lg">
      <DiscordLogo className="group-data-[loading=true]:hidden h-4 w-4 mr-2" />
      <LucideLoader className="hidden group-data-[loading=true]:block h-4 w-4 mr-2 animate-spin" />
      Sign In
    </Button>
  )
}
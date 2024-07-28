import { isRedirectError } from "next/dist/client/components/redirect";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { NextRequest } from "next/server";
import { exchangeCode, getSession } from "~/server/auth";
import { getMe } from "~/server/discord";

export async function GET(req: NextRequest) {
  const cookieStore = cookies();

  const code = req.nextUrl.searchParams.get("code");
  const state = req.nextUrl.searchParams.get("state");
  const storedState = cookieStore.get("state")?.value;

  cookieStore.delete("state");

  if (!code || state !== storedState) {
    cookieStore.delete("session");
    redirect("/?error=BAD_REQUEST");
  }

  try {
    const credentials = await exchangeCode(code);
    const profile = await getMe(credentials.access_token);
    const session = await getSession();

    session.access_token = credentials.access_token;
    session.refresh_token = credentials.refresh_token;
    session.expires_in = credentials.expires_in;
    session.user = {
      name: profile.username,
      id: profile.id,
      avatar: profile.avatar,
    };

    await session.save();

    console.log(session);

    redirect("/");
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    console.error(error);

    cookieStore.delete("session");
    cookieStore.delete("state");

    redirect("/?reason=callback_error");
  }
}

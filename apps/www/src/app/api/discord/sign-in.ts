import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(req: Request) {
  const cookieStore = cookies();

  if (cookieStore.get("session")?.value) {
    redirect("/");
  }
}

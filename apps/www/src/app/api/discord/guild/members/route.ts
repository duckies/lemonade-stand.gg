import { getGuildMembers } from "~/server/discord";

export async function GET() {
  const members = await getGuildMembers();

  return Response.json(members, { status: 200 });
}

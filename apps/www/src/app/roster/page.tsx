import * as Hero from "~/components/hero/hero";
import { getGuildRoster } from "~/server/battle.net";
import { RosterDataTable } from "./data-table";

export default async function RosterPage() {
  const roster = await getGuildRoster();

  if (roster.status === "error") {
    console.error(roster.message);

    return <div>Unable to retrieve roster, check back later 🥹</div>;
  }

  return (
    <>
      <Hero.Root>
        <Hero.Background src="/images/hero/nerubar-palace.jpg" alt="" />
        <Hero.Content>
          <Hero.Title>Guild Roster</Hero.Title>
          <Hero.Description>The lemoney peeps.</Hero.Description>
        </Hero.Content>
      </Hero.Root>
      <div className="container">
        <RosterDataTable data={roster.data.members.sort((a, b) => a.rank - b.rank)} />
      </div>
    </>
  );
}

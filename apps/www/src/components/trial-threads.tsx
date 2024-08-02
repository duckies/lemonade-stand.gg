import { GearIcon } from "@radix-ui/react-icons";
import { Button } from "@repo/ui";
import { getActiveChannelThreads, getGuildMembers } from "~/server/discord";
import { CreateThreadDialog } from "./create-thread-dialog";

export async function TrialThreads() {
  const { threads } = await getActiveChannelThreads("1166616543749218375");
  const members = await getGuildMembers();

  return (
    <div>
      <div className="flex justify-between mt-10">
        <h2 className="text-3xl mb-5">Active Trial Threads</h2>
        <CreateThreadDialog members={members} />
      </div>
      {threads.map((thread) => (
        <div key={thread.id} className="px-5 py-2 bg-card mb-4 rounded-md flex justify-between items-center">
          <h3>{thread.name}</h3>
          <Button variant="ghost" size="icon">
            <GearIcon className="w-6 h-6" />
          </Button>
        </div>
      ))}
    </div>
  );
}

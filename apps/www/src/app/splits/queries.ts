import { atomWithQuery } from "jotai-tanstack-query";
import { tokenAtom } from "~/app/splits/page";

export const userAtom = atomWithQuery((get) => ({
  queryKey: ["session", get(tokenAtom)],
  queryFn: async ({ queryKey: [, session] }) => {
    const res = await fetch("http://localhost:4000/users/@me", {
      headers: {
        Authorization: `Bearer ${session}`,
      },
    });
    return res.json() as Promise<{
      id: string;
      username: string;
      avatar: string;
      rank: "officer" | "raider" | "trial" | null;
    }>;
  },
}));

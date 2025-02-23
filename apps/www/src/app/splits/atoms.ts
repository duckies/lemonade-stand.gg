import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { RESET } from "jotai/utils";
import { tokenAtom } from "~/app/splits/page";

const fetcher = async <T>(input: string, init?: RequestInit) => {
  const res = await fetch(new URL(input, "http://localhost:4000"), init);
  const data = await res.json();

  if (!res.ok) {
    throw new Error("Fetcher Failed", { cause: data });
  }
  return data as T;
};

export interface User {
  id: string;
  username: string;
  avatar: string;
  rank: "officer" | "raider" | "trial" | null;
}

export interface Character {
  name: string;
  realm: string;
}

export const useAuth = () => {
  const [token, setToken] = useAtom(tokenAtom);
  const queryClient = useQueryClient();

  const { data, error, status } = useQuery({
    queryKey: ["auth", token],
    queryFn: () => {
      if (!token) return null;

      return fetcher<User>("/users/@me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
  });

  const logout = () => {
    setToken(RESET);
    queryClient.invalidateQueries({ queryKey: ["auth"] });
  };

  return {
    user: data,
    status,
    logout,
    error,
    token,
    setToken,
  };
};

export const useUserResponse = (userId?: string) => {
  const [token] = useAtom(tokenAtom);

  return useQuery({
    queryKey: ["responses", userId],
    queryFn: () =>
      fetcher<{ id: number; main: Character; alts?: Character[] }>(
        `/responses/user/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ),
    enabled: !!token || !!userId,
  });
};

export const useCharacters = () => {
  return useQuery({
    queryKey: ["characters"],
    queryFn: () => fetcher("/splits"),
  });
};

"use client";

import HeroBackground from "#public/images/hero/liberation_of_undermine.jpg";
import { atomWithStorage } from "jotai/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "~/app/splits/atoms";
import { CharacterTable } from "~/app/splits/components/character-table";
import { Controls } from "~/app/splits/components/controls";
import { Hero } from "~/components/hero";

export const tokenAtom = atomWithStorage<string | null>("session", null);

export default function SplitsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const auth = useAuth();

  useEffect(() => {
    if (searchParams.has("token")) {
      auth.setToken(searchParams.get("token")!);
      router.replace("/splits");
    }
  }, [searchParams, auth, router]);

  return (
    <>
      <Hero.Root>
        <Hero.Background src={HeroBackground} />
        <Hero.Content>
          <Hero.Title>Splits Signup</Hero.Title>
          <Hero.Description>
            Select your mains and alts for Liberation of Undermine.
          </Hero.Description>
        </Hero.Content>
      </Hero.Root>

      <section className="container">
        <Controls />
      </section>

      <section className="container">
        <CharacterTable />
      </section>
    </>
  );
}

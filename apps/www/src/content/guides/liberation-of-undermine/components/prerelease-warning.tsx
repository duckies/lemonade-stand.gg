"use client";

import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@lemonade-stand/ui";
import { useState } from "react";

export function PrereleaseWarning() {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="inline" type="button">
          <span className="link cursor-pointer">Prelease Content Warning</span>
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Prerelease Content Warning</DialogTitle>
        </DialogHeader>
        <div className="prose">
          <p>
            The content of these guides, any externally linked research materials, videos, opinions,
            and even the Wowhead tooltips are <span className="underline">guaranteed</span> to be
            filled with inaccuracies and are provided as-is for research purposes only.
          </p>
          <p>
            Understanding the spirit of a fight and how its mechanics weave together can learned now
            to provide a sturdier foundation for when the specifics, the exact strategy, do matter.
          </p>
        </div>
        <DialogFooter>
          <Button onClick={() => setOpen(false)}>Wonderful</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

"use client";

import { cn } from "@lemonade-stand/ui";
import { CircleXIcon } from "lucide-react";
import { type KeyboardEvent, useEffect, useRef, useState } from "react";

export function ImageZoom() {
  const [open, setOpen] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    async function onClick(e: MouseEvent) {
      const path = e.composedPath();
      const first = path[0];

      if (open) {
        setClosed();
        return;
      }

      if (!(first instanceof HTMLElement)) {
        return;
      }

      if (first.tagName !== "IMG") {
        return;
      }

      if (first.classList.contains("no-preview")) {
        return;
      }

      const pos = first.getBoundingClientRect();
      await new Promise((resolve) => setTimeout(resolve, 50));
      const newPos = first.getBoundingClientRect();

      if (pos.left !== newPos.left || pos.top !== newPos.top) {
        return;
      }

      imgRef.current = first as HTMLImageElement;
      setOpen(true);
    }

    function onKeyDown() {
      setClosed();
    }

    window.addEventListener("click", onClick, false);
    window.addEventListener("keydown", onKeyDown, false);

    return () => {
      window.removeEventListener("click", onClick, false);
      window.removeEventListener("keydown", onKeyDown, false);
    };
  }, [open]);

  function setClosed() {
    setOpen(false);
    imgRef.current = null;
  }

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === "Escape") {
      close();
      e.preventDefault();
    }
  }

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-500 backdrop-blur animate-in fade-in duration-200">
          <div className="absolute inset-0 bg-background/30 -z-1 " />

          <div className="fixed top-5 right-5">
            <CircleXIcon className="size-8 hover:text-muted-foreground" />
          </div>

          <div className="absolute inset-0 flex items-center justify-center m-7">
            <img
              className={cn(
                imgRef.current!.className,
                "shadow-md h-full w-auto object-center object-scale-down",
              )}
              src={imgRef.current!.src}
              alt={imgRef.current!.alt}
              onKeyDown={onKeyDown}
            />
          </div>
        </div>
      )}
    </>
  );
}

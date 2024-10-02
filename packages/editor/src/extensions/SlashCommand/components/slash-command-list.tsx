import type { Editor, Range } from "@tiptap/core";
import { Command } from "cmdk";
import { type ComponentPropsWithoutRef, useEffect, useRef } from "react";
import { navigationKeys } from "../constants";
import type { SlashCommandItem } from "../types";

export interface SlashCommandListProps extends ComponentPropsWithoutRef<typeof Command> {
  query: string;
  range: Range;
  editor: Editor;
  items: SlashCommandItem[];
}

export function SlashCommandList({ query, editor, range, items }: SlashCommandListProps) {
  const commandRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (navigationKeys.includes(e.key)) {
        e.preventDefault();

        commandRef.current?.dispatchEvent(
          new KeyboardEvent("keydown", {
            key: e.key,
            cancelable: true,
            bubbles: true,
          }),
        );

        return false;
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <Command
      id="slash-command"
      ref={commandRef}
      className="z-50 h-auto max-h-[330px] overflow-y-auto rounded-md border-1 py-2 shadow-md transition-all bg-background"
      onKeyDown={(e) => e.stopPropagation()}
    >
      <Command.Empty>No results.</Command.Empty>
      <Command.Input value={query} style={{ display: "none" }} />
      <Command.List>
        {items.map((command) => (
          <Command.Item
            value={command.title}
            onSelect={() => command.command?.({ editor, range })}
            className="flex w-full items-center space-x-2 rounded-md px-2 py-1 text-left text-sm hover:bg-accent aria-selected:bg-accent"
            key={command.title}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-md border border-muted bg-background">
              {command.icon}
            </div>
            <div>
              <div className="font-medium">{command.title}</div>
              <div className="text-xs text-muted-foreground">{command.description}</div>
            </div>
          </Command.Item>
        ))}
      </Command.List>
    </Command>
  );
}

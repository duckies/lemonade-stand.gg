import type { Editor } from "@tiptap/core";
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import type { Command, CommandGroup } from "../groups";
import { DropdownButton } from "./dropdown-button";

export interface MenuListProps {
  editor: Editor;
  groups: CommandGroup[];
  command: (command: Command) => void;
}

export const MenuList = forwardRef<HTMLDivElement, MenuListProps>((props, ref) => {
  const scrollContainer = useRef<HTMLDivElement>(null);
  const activeItem = useRef<HTMLButtonElement>(null);
  const [selectedGroupIndex, setSelectedGroupIndex] = useState(0);
  const [selectedCommandIndex, setSelectedCommandIndex] = useState(0);

  // Anytime the groups change, i.e. the user types to narrow it down, we want to
  // reset the current selection to the first menu item
  // biome-ignore lint/correctness/useExhaustiveDependencies: Explicit
  useEffect(() => {
    setSelectedGroupIndex(0);
    setSelectedCommandIndex(0);
  }, [props.groups]);

  const selectItem = useCallback(
    (groupIndex: number, commandIndex: number) => {
      const command = props.groups[groupIndex]!.commands[commandIndex]!;
      props.command(command);
    },
    [props],
  );

  useImperativeHandle<unknown, unknown>(ref, () => ({
    onKeyDown: ({ event }: { event: React.KeyboardEvent }) => {
      if (event.key === "ArrowDown") {
        if (!props.groups.length) {
          return false;
        }

        const commands = props.groups[selectedGroupIndex]!.commands;

        let newCommandIndex = selectedCommandIndex + 1;
        let newGroupIndex = selectedGroupIndex;

        if (commands.length - 1 < newCommandIndex) {
          newCommandIndex = 0;
          newGroupIndex = selectedGroupIndex + 1;
        }

        if (props.groups.length - 1 < newGroupIndex) {
          newGroupIndex = 0;
        }

        setSelectedCommandIndex(newCommandIndex);
        setSelectedGroupIndex(newGroupIndex);

        return true;
      }

      if (event.key === "ArrowUp") {
        if (!props.groups.length) {
          return false;
        }

        let newCommandIndex = selectedCommandIndex - 1;
        let newGroupIndex = selectedGroupIndex;

        if (newCommandIndex < 0) {
          newGroupIndex = selectedGroupIndex - 1;
          // @ts-ignore
          newCommandIndex = props.groups[newGroupIndex]?.commands.length - 1 || 0;
        }

        if (newGroupIndex < 0) {
          newGroupIndex = props.groups.length - 1;
          newCommandIndex = props.groups[newGroupIndex]!.commands.length - 1;
        }

        setSelectedCommandIndex(newCommandIndex);
        setSelectedGroupIndex(newGroupIndex);

        return true;
      }

      if (event.key === "Enter") {
        if (!props.groups.length || selectedGroupIndex === -1 || selectedCommandIndex === -1) {
          return false;
        }

        selectItem(selectedGroupIndex, selectedCommandIndex);

        return true;
      }

      return false;
    },
  }));

  // biome-ignore lint/correctness/useExhaustiveDependencies: Expected
  useEffect(() => {
    if (activeItem.current && scrollContainer.current) {
      const offsetTop = activeItem.current.offsetTop;
      const offsetHeight = activeItem.current.offsetHeight;

      scrollContainer.current.scrollTop = offsetTop - offsetHeight;
    }
  }, [selectedCommandIndex, selectedGroupIndex]);

  const createCommandClickHandler = useCallback(
    (groupIndex: number, commandIndex: number) => {
      return () => {
        selectItem(groupIndex, commandIndex);
      };
    },
    [selectItem],
  );

  if (!props.groups.length) {
    return null;
  }

  return (
    <div
      ref={scrollContainer}
      className="bg-card shadow-lg rounded-md max-h-[min(80vh,24rem)] overflow-auto flex-wrap mb-8 p-2"
    >
      <div className="grid grid-cols-1 gap-0.5">
        {props.groups.map((group, groupIndex) => (
          <React.Fragment key={`group-${group.title}`}>
            <div
              className="text-neutral-500 text-[0.65rem] col-[1/-1] mx-2 mt-4 font-semibold tracking-wider select-none uppercase first:mt-0.5"
              key={group.title}
            >
              {group.title}
            </div>
            {group.commands.map((command, commandIndex) => (
              <DropdownButton
                key={command.label}
                ref={
                  selectedGroupIndex === groupIndex && selectedCommandIndex === commandIndex
                    ? activeItem
                    : null
                }
                isActive={
                  selectedGroupIndex === groupIndex && selectedCommandIndex === commandIndex
                }
                onClick={createCommandClickHandler(groupIndex, commandIndex)}
              >
                <span className="mr-1">{command.icon}</span>
                {command.label}
              </DropdownButton>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
});

MenuList.displayName = "MenuList";

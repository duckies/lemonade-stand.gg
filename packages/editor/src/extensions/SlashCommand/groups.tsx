import type { Editor } from "@tiptap/core";
import { CheckSquare, Heading1, Heading2, Heading3, Quote } from "lucide-react";
import type { ReactNode } from "react";

export interface CommandGroup {
  name: string;
  title: string;
  commands: Command[];
}

export interface Command {
  name: string;
  label: string;
  description: string;
  aliases?: string[];
  icon: ReactNode;
  action: (editor: Editor) => void;
  shouldBeHidden?: (editor: Editor) => boolean;
}

export const CommandGroups: CommandGroup[] = [
  {
    name: "format",
    title: "Format",
    commands: [
      {
        name: "heading1",
        label: "Heading 1",
        description: "High priority section title",
        aliases: ["h1"],
        icon: <Heading1 size="18" />,
        action: (e) => e.chain().focus().setHeading({ level: 1 }).run(),
      },
      {
        name: "heading2",
        label: "Heading 2",
        description: "Medium priority section title",
        aliases: ["h2"],
        icon: <Heading2 size="18" />,
        action: (e) => e.chain().focus().setHeading({ level: 2 }).run(),
      },
      {
        name: "heading3",
        label: "Heading 3",
        description: "Low priority section title",
        aliases: ["h3"],
        icon: <Heading3 size="18" />,
        action: (e) => e.chain().focus().setHeading({ level: 3 }).run(),
      },
      {
        name: "quote",
        label: "Quote",
        description: "Capture a quote",
        aliases: ["qt"],
        icon: <Quote size="18" />,
        action: (e) => e.chain().focus().setBlockquote().run(),
      },
      {
        name: "task-list",
        label: "To-Do List",
        description: "Write a to-do list",
        aliases: ["todo", "task", "checklist"],
        icon: <CheckSquare size="18" />,
        action: (e) => e.chain().focus().toggleTaskList().run(),
      },
    ],
  },
];

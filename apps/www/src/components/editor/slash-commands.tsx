import type { SlashCommandItem } from "@lemonade-stand/editor";
import {
  CheckSquareIcon,
  Columns2Icon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  QuoteIcon,
  SwordIcon,
} from "lucide-react";

export const SlashCommands: SlashCommandItem[] = [
  {
    value: "heading1",
    title: "Heading 1",
    description: "High priority section title",
    icon: <Heading1Icon size="18" />,
    command: ({ editor, range }) =>
      editor.chain().focus().deleteRange(range).setNode("heading", { level: 1 }).run(),
  },
  {
    value: "heading2",
    title: "Heading 2",
    description: "Medium priority section title",
    icon: <Heading2Icon size="18" />,
    command: ({ editor, range }) =>
      editor.chain().focus().deleteRange(range).setNode("heading", { level: 2 }).run(),
  },
  {
    value: "heading3",
    title: "Heading 3",
    description: "Low priority section title",
    icon: <Heading3Icon size="18" />,
    command: ({ editor, range }) =>
      editor.chain().focus().deleteRange(range).setNode("heading", { level: 3 }).run(),
  },
  {
    value: "quote",
    title: "Quote",
    description: "Capture a quote",
    icon: <QuoteIcon size="18" />,
    command: ({ editor, range }) => editor.chain().focus().deleteRange(range).setBlockquote().run(),
  },
  {
    value: "task-list",
    title: "Task List",
    description: "Write a to-do list",
    icon: <CheckSquareIcon size="18" />,
    command: ({ editor, range }) =>
      editor.chain().focus().deleteRange(range).toggleTaskList().run(),
  },
  {
    value: "columns",
    title: "Columns",
    description: "Create a column layout",
    icon: <Columns2Icon size="18" />,
    keywords: ["cols"],
    command: ({ editor, range }) => editor.chain().focus().deleteRange(range).setColumns().run(),
  },
];

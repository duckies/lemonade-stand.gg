import { CheckSquare } from "lucide-react";

export const SlashCommands = [
  {
    title: "To-Do List",
    description: "Track tasks with a to-do list.",
    keywords: ["todo", "task", "check", "checkbox", "list"],
    icon: <CheckSquare size="18" />,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleTaskList().run();
    },
  },
];

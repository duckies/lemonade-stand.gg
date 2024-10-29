import type { Editor, Range } from "@tiptap/core";
import type { ReactNode } from "react";

export interface SlashCommandItem {
  value: string;
  title: string;
  description: string;
  icon: ReactNode;
  keywords?: string[];
  command?: (props: { editor: Editor; range: Range }) => void;
}

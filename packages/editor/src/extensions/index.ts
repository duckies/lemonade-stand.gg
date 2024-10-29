import StarterKit from "@tiptap/starter-kit";

import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import TextAlign from "@tiptap/extension-text-align";
import Typography from "@tiptap/extension-typography";

export * from "./columns";
export * from "./details";
export * from "./slash-command";
export {
  Blockquote,
  type BlockquoteOptions,
  inputRegex as blockquoteInputRegex,
} from "./blockquote";
export * from "./bubble-menu";
export {
  Code,
  type CodeOptions,
  inputRegex as codeInputRegex,
  pasteRegex as codePasteRegex,
} from "./code";
export * from "./document";
export * from "./drag-handle";
export * from "./dropcursor";
export * from "./heading";
export * from "./link";
export * from "./placeholder";
export * from "./title";

export { StarterKit, TextAlign, Typography, TaskList, TaskItem };

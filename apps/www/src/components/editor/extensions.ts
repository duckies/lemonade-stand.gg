import { Details } from "@lemonade-stand/editor";
import type { Extensions } from "@tiptap/core";
import TextAlign from "@tiptap/extension-text-align";
import Typography from "@tiptap/extension-typography";
import StarterKit from "@tiptap/starter-kit";
import GlobalDragHandle from "tiptap-extension-global-drag-handle";

export const DefaultExtensions: Extensions = [
  StarterKit,
  TextAlign.configure({ types: ["paragraph", "code"] }),
  Typography,
  Details,
  GlobalDragHandle,
];

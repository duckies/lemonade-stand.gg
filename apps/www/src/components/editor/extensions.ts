import { Column, Columns, Details, Document, Placeholder, Title } from "@lemonade-stand/editor";
import type { Extensions } from "@tiptap/core";
import TextAlign from "@tiptap/extension-text-align";
import Typography from "@tiptap/extension-typography";
import StarterKit from "@tiptap/starter-kit";
import GlobalDragHandle from "tiptap-extension-global-drag-handle";

export const DefaultExtensions: Extensions = [
  Document.configure({
    content: "(block|columns)+",
  }),
  Columns,
  Column,
  // Title,
  StarterKit.configure({
    document: false,
  }),
  // Placeholder.configure({
  //   showOnlyCurrent: false,
  //   placeholder: ({ node }) => {
  //     if (node.type.name === "title") {
  //       return "What's the title?";
  //     }

  //     if (node.type.name === "heading") {
  //       return `Heading ${node.attrs.level}`;
  //     }

  //     return "Write something...";
  //   },
  // }),
  // TextAlign.configure({ types: ["paragraph", "code"] }),
  // Typography,
  // Details,
  // GlobalDragHandle,
];

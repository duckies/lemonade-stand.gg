import { Column, Columns, Document, StarterKit } from "@lemonade-stand/editor";
import type { Extensions } from "@tiptap/core";

export const DefaultExtensions: Extensions = [
  StarterKit.configure({ document: false }),
  Document,
  Columns,
  Column,
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

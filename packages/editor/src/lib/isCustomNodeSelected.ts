import type { Editor } from "@tiptap/react";
import { Link } from "~/extensions";

export function isTableGripSelected(node: HTMLElement) {
  let container = node;

  while (container && !["TD", "TH"].includes(container.tagName)) {
    container = container.parentElement!;
  }

  const gripColumn = container?.querySelector?.("a.grip-column.selected");
  const gripRow = container?.querySelector?.("a.grip-row.selected");

  if (gripColumn || gripRow) {
    return true;
  }

  return false;
}

export function isCustomNodeSelected(editor: Editor, node: HTMLElement) {
  const customNodes = [
    // HorizontalRule.name,
    // ImageBlock.name,
    // ImageUpload.name,
    // CodeBlock.name,
    // ImageBlock.name,
    Link.name,
    // AiWriter.name,
    // AiImage.name,
    // Figcaption.name,
    // TableOfContentsNode.name,
  ];

  return customNodes.some((type) => editor.isActive(type)) || isTableGripSelected(node);
}

export default isCustomNodeSelected;

import { mergeAttributes } from "@tiptap/core";
import TipTapHeading, { type Level } from "@tiptap/extension-heading";

export const Heading = TipTapHeading.extend({
  renderHTML({ node, HTMLAttributes }) {
    const nodeLevel = Number.parseInt(node.attrs.level, 10) as Level;
    const hasLevel = this.options.levels.includes(nodeLevel);
    const level = hasLevel ? nodeLevel : this.options.levels[0];

    return [`h${level}`, mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  },
});

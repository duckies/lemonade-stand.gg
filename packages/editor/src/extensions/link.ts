import { mergeAttributes } from "@tiptap/core";
import TipTapLink from "@tiptap/extension-link";
import { Plugin } from "@tiptap/pm/state";
import type { EditorView } from "@tiptap/pm/view";

export const Link = TipTapLink.extend({
  inclusive: false,

  parseHTML() {
    return [{ tag: 'a[href]:not([data-type="button"]):not([href *= "javascript:" i])' }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "a",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, { class: "link" }),
      0,
    ];
  },

  addProseMirrorPlugins() {
    const { editor } = this;

    return [
      ...(this.parent?.() || []),
      new Plugin({
        props: {
          handleKeyDown: (_view: EditorView, event: KeyboardEvent) => {
            const { selection } = editor.state;

            if (event.key === "Escape" && selection.empty !== true) {
              editor.commands.focus(selection.to, { scrollIntoView: false });
            }

            return false;
          },
        },
      }),
    ];
  },
});

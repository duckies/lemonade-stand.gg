import type { Editor } from "@tiptap/core";

export function setAttributes(
  editor: Editor,
  getPos: (() => number) | boolean,
  attrs: Record<string, any>,
) {
  if (editor.isEditable && typeof getPos === "function") {
    editor.view.dispatch(editor.view.state.tr.setNodeMarkup(getPos(), undefined, attrs));
  }
}

export function icon(name: string) {
  return `<span class="ProseMirror-icon ProseMirror-icon-${name}"></span>`;
}

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

export function getRenderContainer(editor: Editor, nodeType: string) {
  const {
    view,
    state: {
      selection: { from },
    },
  } = editor;

  const elements = document.querySelectorAll(".has-focus");
  const elementCount = elements.length;
  const innermostNode = elements[elementCount - 1];
  const element = innermostNode;

  if (element?.getAttribute("data-type") === nodeType || element?.classList.contains(nodeType)) {
    return element;
  }

  const node = view.domAtPos(from).node as HTMLElement;
  let container: HTMLElement | null = node;

  if (!container.tagName) {
    container = node.parentElement;
  }

  while (
    container &&
    !(container.getAttribute("data-type") === nodeType && !container.classList.contains(nodeType))
  ) {
    container = container.parentElement;
  }

  return container;
}

import { Node, defaultBlockAt, mergeAttributes } from "@tiptap/core";
import { Plugin, PluginKey, Selection } from "@tiptap/pm/state";

export interface DetailsSummaryOptions {
  HTMLAttributes: Record<string, any>;
}

export const DetailsSummary = Node.create<DetailsSummaryOptions>({
  name: "detailsSummary",
  group: "details",
  content: "inline*",
  defining: true,
  isolating: true,
  selectable: false,
  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },
  parseHTML() {
    return [
      {
        tag: "summary",
      },
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return [
      "summary",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        class: "details-summary",
      }),
      0,
    ];
  },
  addKeyboardShortcuts() {
    return {
      Backspace: ({ editor }) => {
        const state = editor.state;
        const selection = state.selection;
        if (selection.$anchor.parent.type.name !== this.name) {
          return false;
        }
        if (selection.$anchor.parentOffset !== 0) {
          return false;
        }
        // return editor.chain().unsetDetails().focus().run();
        return true;
      },
      Enter: ({ editor }) => {
        const view = editor.view;
        const state = editor.state;
        const head = state.selection.$head;

        if (head.parent.type.name !== this.name) {
          return false;
        }

        // @ts-ignore OffsetParent is from where?
        const hasOffset = view.domAtPos(head.after() + 1).node.offsetParent !== null;
        const findNode = hasOffset ? state.doc.nodeAt(head.after()) : head.node(-2);

        if (!findNode) {
          return false;
        }

        const indexAfter = hasOffset ? 0 : head.indexAfter(-1);
        const nodeType = defaultBlockAt(findNode.contentMatchAt(indexAfter));
        if (!nodeType || !findNode.canReplaceWith(indexAfter, indexAfter, nodeType)) {
          return false;
        }

        const defaultNode = nodeType.createAndFill();
        if (!defaultNode) {
          return false;
        }

        const tr = state.tr;
        const after = hasOffset ? head.after() + 1 : head.after(-1);
        tr.replaceWith(after, after, defaultNode);
        tr.setSelection(Selection.near(tr.doc.resolve(after), 1));

        tr.scrollIntoView();
        view.dispatch(tr);

        return true;
      },
    };
  },
  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey(this.name),
        props: {
          handleClickOn: (view, _pos, node, nodePos, _event, direct) => {
            if (!direct || node.type.name !== this.name) {
              return false;
            }

            const detailsNode = view.state.doc.resolve(nodePos).parent;
            const tr = view.state.tr.setNodeAttribute(nodePos - 1, "open", !detailsNode.attrs.open);

            view.dispatch(tr);
          },
        },
      }),
    ];
  },
});

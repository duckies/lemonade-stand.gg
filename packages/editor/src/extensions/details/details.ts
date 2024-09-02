import { Node, findChildren, findParentNode, mergeAttributes } from "@tiptap/core";
import { DetailsContent } from "./details-content";
import { DetailsSummary } from "./details-summary";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    details: {
      setDetails: () => ReturnType;
      unsetDetails: () => ReturnType;
      toggleDetails: () => ReturnType;
    };
  }
}

export interface DetailsOptions {
  HTMLAttributes: Record<string, any>;
}

export const Details = Node.create<DetailsOptions>({
  name: "details",
  group: "block",
  content: "detailsSummary detailsContent",
  defining: true,
  isolating: true,
  allowGapCursor: false,
  addOptions: () => ({ HTMLAttributes: {} }),
  addAttributes: () => ({
    open: { detault: false },
    parseHTML: (e: HTMLDetailsElement) => e.getAttribute("open"),
    renderHTML: (a: DetailsOptions["HTMLAttributes"]) => (a.open ? { open: "" } : {}),
  }),
  parseHTML: () => [{ tag: "details" }],
  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        class: "details",
      }),
      0,
    ];
  },
  addCommands() {
    return {
      setDetails: () => {
        return ({ state, chain }) => {
          const range = state.selection.$from.blockRange(state.selection.$to);
          if (!range) {
            return false;
          }

          const slice = state.doc.slice(range.start, range.end);
          if (!state.schema.nodes.detailsContent!.contentMatch.matchFragment(slice.content)) {
            return false;
          }

          return chain()
            .insertContentAt(
              {
                from: range.start,
                to: range.end,
              },
              {
                type: this.name,
                attrs: {
                  open: true,
                },
                content: [
                  {
                    type: "detailsSummary",
                  },
                  {
                    type: "detailsContent",
                    content: slice.toJSON()?.content ?? [],
                  },
                ],
              },
            )
            .setTextSelection(range.start + 2)
            .run();
        };
      },
      unsetDetails: () => {
        return ({ state, chain }) => {
          const parent = findParentNode((node) => node.type === this.type)(state.selection);
          if (!parent) {
            return false;
          }

          const summary = findChildren(parent.node, (node) => node.type.name === "detailsSummary");
          const content = findChildren(parent.node, (node) => node.type.name === "detailsContent");
          if (!summary.length || !content.length) {
            return false;
          }

          const range = {
            from: parent.pos,
            to: parent.pos + parent.node.nodeSize,
          };
          const defaultType = state.doc.resolve(range.from).parent.type.contentMatch.defaultType;
          return chain()
            .insertContentAt(range, [
              defaultType?.create(null, summary[0]!.node.content).toJSON(),
              ...(content[0]!.node.content.toJSON() ?? []),
            ])
            .setTextSelection(range.from + 1)
            .run();
        };
      },
      toggleDetails: () => {
        return ({ state, chain }) => {
          const node = findParentNode((node) => node.type === this.type)(state.selection);
          if (node) {
            return chain().unsetDetails().run();
          }

          return chain().setDetails().run();
        };
      },
    };
  },
  addExtensions() {
    return [DetailsSummary, DetailsContent];
  },
});

import { type Editor, Extension } from "@tiptap/core";
import { PluginKey } from "@tiptap/pm/state";
import { ReactRenderer } from "@tiptap/react";
import Suggestion, {
  type SuggestionProps,
  type SuggestionKeyDownProps,
  type SuggestionOptions,
} from "@tiptap/suggestion";
import tippy, { type Instance } from "tippy.js";
import { MenuList } from "./components/menu-list";
import { CommandGroups } from "./groups";

let popup: Instance[];

const extensionName = "slash-command";

export interface SlashCommandOptions {
  suggestion: Omit<SuggestionOptions, "editor">;
}

export const SlashCommand = Extension.create<SlashCommandOptions>({
  name: "slash-command",
  addOptions() {
    return {
      suggestion: {
        char: "/",
        allowSpaces: true,
        startOfLine: true,
      },
    };
  },
  onCreate() {
    popup = tippy("body", {
      interactive: true,
      trigger: "manual",
      placement: "bottom-start",
      theme: "slash-command",
      maxWidth: "16rem",
      offset: [16, 8],
      popperOptions: {
        strategy: "fixed",
        modifiers: [
          {
            name: "flip",
            enabled: false,
          },
        ],
      },
    });
  },

  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        pluginKey: new PluginKey(extensionName),
        ...this.options.suggestion,
        allow: ({ state, range }) => {
          const $from = state.doc.resolve(range.from);
          const isRootDepth = $from.depth === 1;
          const isParagraph = $from.parent.type.name === "paragraph";
          const isStartOfNode = $from.parent.textContent?.charAt(0) === "/";
          // TODO
          const isInColumn = this.editor.isActive("column");

          const afterContent = $from.parent.textContent?.substring(
            $from.parent.textContent?.indexOf("/"),
          );
          const isValidAfterContent = !afterContent?.endsWith("  ");

          return (
            ((isRootDepth && isParagraph && isStartOfNode) ||
              (isInColumn && isParagraph && isStartOfNode)) &&
            isValidAfterContent
          );
        },
        command: ({ editor, props }: { editor: Editor; props: any }) => {
          const { view, state } = editor;
          const { $head, $from } = view.state.selection;

          const end = $from.pos;
          const from = $head?.nodeBefore
            ? end -
              ($head.nodeBefore.text?.substring($head.nodeBefore.text?.indexOf("/")).length ?? 0)
            : $from.start();

          const tr = state.tr.deleteRange(from, end);
          view.dispatch(tr);

          props.action(editor);
          view.focus();
        },
        items: ({ query }: { query: string }) => {
          const withFilteredCommands = CommandGroups.map((group) => ({
            ...group,
            commands: group.commands
              .filter((command) => {
                const labelNormalized = command.label.toLowerCase().trim();
                const queryNormalized = query.toLowerCase().trim();

                if (command.aliases) {
                  return (
                    command.aliases.some(
                      (alias) => alias.toLowerCase().trim() === queryNormalized,
                    ) || labelNormalized.includes(queryNormalized)
                  );
                }

                return labelNormalized.includes(queryNormalized);
              })
              .filter((command) =>
                command.shouldBeHidden ? !command.shouldBeHidden(this.editor) : true,
              ),
          }));

          const withoutEmptyGroups = withFilteredCommands.filter(
            (group) => group.commands.length > 0,
          );

          const withEnabledSettings = withoutEmptyGroups.map((group) => ({
            ...group,
            commands: group.commands.map((command) => ({
              ...command,
              isEnabled: true,
            })),
          }));

          return withEnabledSettings;
        },
        render: () => {
          let component: any;
          let scrollHandler: (() => void) | null = null;

          return {
            onStart: ({ items, ...props }: SuggestionProps) => {
              component = new ReactRenderer(MenuList, {
                props: { ...props, groups: items },
                editor: props.editor,
              });

              const { view } = props.editor;

              // const editorNode = view.dom as HTMLElement;

              const getReferenceClientRect = () => {
                if (!props.clientRect) {
                  return props.editor.storage[this.name].rect;
                }

                const rect = props.clientRect();

                if (!rect) {
                  return props.editor.storage[this.name].rect;
                }

                let yPos = rect.y;

                if (rect.top + component.element.offsetHeight + 40 > window.innerHeight) {
                  const diff = rect.top + component.element.offsetHeight - window.innerHeight + 40;
                  yPos = rect.y - diff;
                }

                // Account for when the editor is bound inside a container that doesn't go all the way to the edge of the screen
                // const editorXOffset = editorNode.getBoundingClientRect().x;
                return new DOMRect(rect.x, yPos, rect.width, rect.height);
              };

              scrollHandler = () => {
                popup?.[0]?.setProps({
                  getReferenceClientRect,
                });
              };

              view.dom.parentElement?.addEventListener("scroll", scrollHandler);

              popup?.[0]?.setProps({
                getReferenceClientRect,
                appendTo: () => document.body,
                content: component.element,
              });

              popup?.[0]?.show();
            },

            onUpdate(props: SuggestionProps) {
              component.updateProps(props);

              const { view } = props.editor;

              // const editorNode = view.dom as HTMLElement;

              const getReferenceClientRect = () => {
                if (!props.clientRect) {
                  return props.editor.storage["slash-command"].rect;
                }

                const rect = props.clientRect();

                if (!rect) {
                  return props.editor.storage["slash-command"].rect;
                }

                // Account for when the editor is bound inside a container that doesn't go all the way to the edge of the screen
                return new DOMRect(rect.x, rect.y, rect.width, rect.height);
              };

              const scrollHandler = () => {
                popup?.[0]?.setProps({
                  getReferenceClientRect,
                });
              };

              view.dom.parentElement?.addEventListener("scroll", scrollHandler);

              // eslint-disable-next-line no-param-reassign
              props.editor.storage["slash-command"].rect = props.clientRect
                ? getReferenceClientRect()
                : {
                    width: 0,
                    height: 0,
                    left: 0,
                    top: 0,
                    right: 0,
                    bottom: 0,
                  };
              popup?.[0]?.setProps({
                getReferenceClientRect,
              });
            },

            onKeyDown(props: SuggestionKeyDownProps) {
              if (props.event.key === "Escape") {
                popup?.[0]?.hide();

                return true;
              }

              if (!popup?.[0]?.state.isShown) {
                popup?.[0]?.show();
              }

              return component.ref?.onKeyDown(props);
            },

            onExit(props) {
              popup?.[0]?.hide();
              if (scrollHandler) {
                const { view } = props.editor;
                view.dom.parentElement?.removeEventListener("scroll", scrollHandler);
              }
              component.destroy();
            },
          };
        },
      }),
    ];
  },
  addStorage() {
    return {
      rect: {
        width: 0,
        height: 0,
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
      },
    };
  },
});

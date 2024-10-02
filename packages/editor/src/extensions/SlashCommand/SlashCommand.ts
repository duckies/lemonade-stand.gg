import { Extension } from "@tiptap/core";
import { PluginKey } from "@tiptap/pm/state";
import { ReactRenderer } from "@tiptap/react";
import Suggestion, { type SuggestionOptions } from "@tiptap/suggestion";
import tippy, { type GetReferenceClientRect, type Instance, type Props } from "tippy.js";
import { SlashCommandList } from "./components/slash-command-list";
import type { SlashCommandItem } from "./types";

const extensionName = "slash-command";

export interface SlashCommandOptions {
  commands: SlashCommandItem[];
  suggestion: Omit<SuggestionOptions, "editor">;
}

export const SlashCommand = Extension.create<SlashCommandOptions>({
  name: "slash-command",
  addOptions() {
    return {
      commands: [],
      suggestion: {
        char: "/",
        allowSpaces: true,
        startOfLine: true,
      },
    };
  },
  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        pluginKey: new PluginKey(extensionName),
        ...this.options.suggestion,
        items: () => this.options.commands,
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
        command: ({ editor, range, props }) => {
          props.command({ editor, range });
        },
        render: () => {
          let component: ReactRenderer | null = null;
          let popup: Instance<Props>[] | null = null;

          return {
            onStart: (props) => {
              component = new ReactRenderer(SlashCommandList, {
                props,
                editor: props.editor,
              });

              // @ts-ignore
              popup = tippy("body", {
                getReferenceClientRect: props.clientRect,
                appendTo: () => document.body,
                content: component.element,
                showOnCreate: true,
                interactive: true,
                trigger: "manual",
                placement: "bottom-start",
              });
            },
            onUpdate: (props) => {
              component?.updateProps(props);

              popup?.[0]?.setProps({
                getReferenceClientRect: props.clientRect as GetReferenceClientRect,
              });
            },
            onKeyDown: (props: { event: KeyboardEvent }) => {
              if (props.event.key === "Escape") {
                popup?.[0]?.hide();

                return true;
              }

              // @ts-ignore
              return component?.ref?.onKeyDown(props);
            },
            onExit: () => {
              popup?.[0]?.destroy();
              component?.destroy();
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

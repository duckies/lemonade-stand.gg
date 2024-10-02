import type { Editor } from "@tiptap/core";
import { BubbleMenu, useEditorState } from "@tiptap/react";
import deepEql from "fast-deep-equal";
import { type RefObject, useCallback, useState } from "react";
import { EditLinkPopover } from "../EditLinkPopover";
import { LinkPreviewPopover } from "../LinkPreviewPopover";

export interface LinkMenuProps {
  editor: Editor;
  appendTo?: RefObject<any>;
  shouldHide?: boolean;
}

export function LinkMenu({ editor, appendTo }: LinkMenuProps) {
  const [show, setShow] = useState(false);
  const { link, target } = useEditorState({
    editor,
    selector: (ctx) => {
      const attrs = ctx.editor.getAttributes("link");
      return { link: attrs.href, target: attrs.target };
    },
    equalityFn: deepEql,
  });

  const shouldShow = useCallback(() => {
    const isActive = editor.isActive("link");
    return isActive;
  }, [editor]);

  const onEdit = useCallback(() => {
    setShow(true);
  }, []);

  const onSetLink = useCallback(
    (url: string, openInNewTab?: boolean) => {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url, target: openInNewTab ? "_blank" : "" })
        .run();
      setShow(false);
    },
    [editor],
  );

  const onUnsetLink = useCallback(() => {
    editor.chain().focus().extendMarkRange("link").unsetLink().run();
    setShow(false);
    return null;
  }, [editor]);

  return (
    <BubbleMenu
      editor={editor}
      pluginKey="textMenu"
      shouldShow={shouldShow}
      updateDelay={0}
      tippyOptions={{
        popperOptions: {
          modifiers: [{ name: "flip", enabled: false }],
        },
        appendTo: () => {
          return appendTo?.current;
        },
        onHidden: () => {
          setShow(false);
        },
      }}
    >
      {show ? (
        <EditLinkPopover
          initialUrl={link}
          initialOpenInNewTab={target === "_blank"}
          onSetLink={onSetLink}
        />
      ) : (
        <LinkPreviewPopover url={link} onEdit={onEdit} onClear={onUnsetLink} />
      )}
    </BubbleMenu>
  );
}

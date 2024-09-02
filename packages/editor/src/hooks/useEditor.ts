import { useEditor as useTipTapEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { Link } from "~/extensions";
import { Details } from "~/extensions/details/details";

export function useEditor({ content }: { content?: string } = {}) {
  const editor = useTipTapEditor({
    immediatelyRender: true,
    shouldRerenderOnTransaction: false,
    autofocus: true,
    extensions: [
      StarterKit.configure({}),
      // Document,
      // Heading,
      Link,
      Details,
      // DetailsContent,
      // DetailsSummary,
    ],
    content,
    editorProps: {
      attributes: {
        class: "prose dark:prose-invert px-5 py-8",
      },
    },
  });

  return { editor };
}

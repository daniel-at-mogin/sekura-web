import { EditorContent, useEditor } from "@tiptap/react";
import type { JSONContent } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Placeholder from "@tiptap/extension-placeholder";

import { cn } from "@/lib/utils";
import { Toolbar } from "./toolbar";

type TiptapInputProps = {
  content?: JSONContent;
  initialContent?: JSONContent;
  onChange?: (content: JSONContent) => void;
  onBlur?: () => void;
  placeholder?: string;
  editable?: boolean;
  className?: string;
  invalid?: boolean;
};

const RichTextEditor = ({
  content,
  initialContent,
  onChange,
  onBlur,
  placeholder = "Start writing, or type '/' for commands…",
  editable = true,
  className,
  invalid = false,
}: TiptapInputProps) => {
  const editor = useEditor({
    immediatelyRender: false,
    editable,
    extensions: [
      StarterKit,
      Highlight,
      Image.configure({
        inline: false,
        allowBase64: true,
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        linkOnPaste: true,
        HTMLAttributes: {
          target: "_blank",
          rel: "noopener noreferrer nofollow",
        },
      }),
      TaskList,
      TaskItem.configure({ nested: true }),
      Placeholder.configure({
        placeholder,
        showOnlyCurrent: true,
      }),
    ],
    content: content ??
      initialContent ?? {
        type: "doc",
        content: [{ type: "paragraph" }],
      },
    onUpdate: ({ editor }) => {
      onChange?.(editor.getJSON());
    },
    editorProps: {
      attributes: {
        class: cn(
          "tiptap-editor prose prose-neutral max-w-none text-sm leading-6 text-foreground dark:prose-invert focus:outline-none",
          className,
        ),
        "aria-label": "Rich text editor",
      },
    },
  });

  return (
    <div className="w-full space-y-3">
      {editable && <Toolbar editor={editor} />}

      <div
        className={cn(
          "overflow-hidden rounded-lg border border-input bg-background transition-colors focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50",
          invalid &&
            "border-destructive ring-3 ring-destructive/20 dark:border-destructive/50 dark:ring-destructive/40",
        )}
      >
        <EditorContent
          editor={editor}
          onBlur={onBlur}
          className="min-h-[220px] w-full text-sm text-foreground [&_.ProseMirror]:min-h-[220px] [&_.ProseMirror]:px-3 [&_.ProseMirror]:py-2 [&_.ProseMirror]:outline-none [&_.ProseMirror]:text-sm [&_.ProseMirror]:leading-6 [&_.ProseMirror]:text-foreground"
        />
      </div>
    </div>
  );
};

export default RichTextEditor;

import { useEffect, useState } from "react";
import type { Editor as TiptapEditor } from "@tiptap/react";
import {
  Bold,
  Code as CodeIcon,
  Highlighter,
  ImagePlus,
  Indent,
  Italic,
  Link as LinkIcon,
  List as ListIcon,
  ListOrdered,
  ListTodo,
  Outdent,
  Quote,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { LinkPopover } from "./link-popover";

const btn = (active: boolean) =>
  cn(
    "rte-toolbar-btn relative inline-flex h-8 w-8 items-center justify-center rounded-md border border-transparent transition duration-200 hover:bg-accent hover:text-accent-foreground disabled:cursor-not-allowed disabled:opacity-40",
    active
      ? "border-ring bg-accent text-accent-foreground shadow-sm ring-2 ring-ring/20"
      : "text-muted-foreground",
  );

export function Toolbar({ editor }: { editor: TiptapEditor | null }) {
  const [, setTick] = useState(0);

  useEffect(() => {
    if (!editor) return;

    const update = () => setTick((tick) => tick + 1);
    editor.on("transaction", update);
    editor.on("selectionUpdate", update);

    return () => {
      editor.off("transaction", update);
      editor.off("selectionUpdate", update);
    };
  }, [editor]);

  if (!editor) return null;

  const addImage = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = () => {
      const file = input.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          editor
            .chain()
            .focus()
            .setImage({ src: reader.result, alt: file.name })
            .run();
        }
      };
      reader.readAsDataURL(file);
    };
    input.click();
  };

  const indent = () => {
    const itemType = editor.isActive("taskItem") ? "taskItem" : "listItem";
    editor.chain().focus().sinkListItem(itemType).run();
  };

  const outdent = () => {
    const itemType = editor.isActive("taskItem") ? "taskItem" : "listItem";
    editor.chain().focus().liftListItem(itemType).run();
  };

  return (
    <div className="sticky top-[49px] z-10 flex flex-wrap items-center gap-1 border-b bg-background/60 px-4 py-1.5 backdrop-blur">
      <button
        type="button"
        className={btn(editor.isActive("bold"))}
        onClick={() => editor.chain().focus().toggleBold().run()}
        title="Bold"
        aria-label="Bold"
      >
        <Bold className="h-4 w-4" />
      </button>
      <button
        type="button"
        className={btn(editor.isActive("italic"))}
        onClick={() => editor.chain().focus().toggleItalic().run()}
        title="Italic"
        aria-label="Italic"
      >
        <Italic className="h-4 w-4" />
      </button>
      <button
        type="button"
        className={btn(editor.isActive("code"))}
        onClick={() => editor.chain().focus().toggleCode().run()}
        title="Inline code"
        aria-label="Inline code"
      >
        <CodeIcon className="h-4 w-4" />
      </button>
      <button
        type="button"
        className={btn(editor.isActive("highlight"))}
        onClick={() => editor.chain().focus().toggleHighlight().run()}
        title="Highlight"
        aria-label="Highlight"
      >
        <Highlighter className="h-4 w-4" />
      </button>

      <LinkPopover
        editor={editor}
        align="start"
        trigger={
          <span
            className={btn(editor.isActive("link"))}
            title="Link"
            aria-label="Link"
          >
            <LinkIcon className="h-4 w-4" />
          </span>
        }
      />

      <span className="mx-1 h-5 w-px bg-border" />

      {[1, 2, 3].map((level) => (
        <button
          key={level}
          type="button"
          className={btn(editor.isActive("heading", { level }))}
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleHeading({ level: level as 1 | 2 | 3 })
              .run()
          }
          title={`Heading ${level}`}
          aria-label={`Heading ${level}`}
        >
          <span className="text-xs font-semibold">H{level}</span>
        </button>
      ))}

      <span className="mx-1 h-5 w-px bg-border" />

      <button
        type="button"
        className={btn(editor.isActive("orderedList"))}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        title="Ordered list"
        aria-label="Ordered list"
      >
        <ListOrdered className="h-4 w-4" />
      </button>
      <button
        type="button"
        className={btn(editor.isActive("bulletList"))}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        title="Unordered list"
        aria-label="Unordered list"
      >
        <ListIcon className="h-4 w-4" />
      </button>
      <button
        type="button"
        className={btn(editor.isActive("taskList"))}
        onClick={() => editor.chain().focus().toggleTaskList().run()}
        title="Task list"
        aria-label="Task list"
      >
        <ListTodo className="h-4 w-4" />
      </button>
      <button
        type="button"
        className={btn(editor.isActive("image"))}
        onClick={addImage}
        title="Insert image"
        aria-label="Insert image"
      >
        <ImagePlus className="h-4 w-4" />
      </button>
      <button
        type="button"
        className={btn(editor.isActive("blockquote"))}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        title="Quote"
        aria-label="Quote"
      >
        <Quote className="h-4 w-4" />
      </button>

      <span className="mx-1 h-5 w-px bg-border" />

      <button
        type="button"
        className={btn(false)}
        onClick={indent}
        title="Indent list item"
        aria-label="Indent list item"
      >
        <Indent className="h-4 w-4" />
      </button>
      <button
        type="button"
        className={btn(false)}
        onClick={outdent}
        title="Outdent list item"
        aria-label="Outdent list item"
      >
        <Outdent className="h-4 w-4" />
      </button>
    </div>
  );
}

export default Toolbar;

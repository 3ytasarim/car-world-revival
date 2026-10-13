// Leichter Rich-Text-Editor fürs Admin-Panel (Blog-Inhalt) — Tiptap mit
// StarterKit + Link + Placeholder. Liefert/erhält HTML (nicht Markdown),
// das public/blog.$slug.tsx direkt per dangerouslySetInnerHTML (siehe dort
// für die Begründung) mit der Tailwind-Typography-Klasse "prose" rendert.
import { useEffect } from "react";
import { EditorContent, useEditor, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import {
  Bold,
  Italic,
  Strikethrough,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Link as LinkIcon,
  Undo,
  Redo,
} from "lucide-react";

import { cn } from "@/lib/utils";

function ToolbarButton({
  onClick,
  active,
  label,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-pressed={active}
      className={cn(
        "grid size-8 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-black/5 hover:text-brand-navy",
        active && "bg-brand-navy/10 text-brand-navy",
      )}
    >
      {children}
    </button>
  );
}

function Toolbar({ editor }: { editor: Editor }) {
  function setLink() {
    const previous = editor.getAttributes("link")["href"] as string | undefined;
    const url = window.prompt("Link-URL (https://…)", previous ?? "");
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }

  return (
    <div className="flex flex-wrap items-center gap-0.5 rounded-t-md border border-b-0 border-input bg-muted/30 p-1">
      <ToolbarButton label="Fett" active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()}>
        <Bold className="size-4" aria-hidden="true" />
      </ToolbarButton>
      <ToolbarButton label="Kursiv" active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()}>
        <Italic className="size-4" aria-hidden="true" />
      </ToolbarButton>
      <ToolbarButton
        label="Durchgestrichen"
        active={editor.isActive("strike")}
        onClick={() => editor.chain().focus().toggleStrike().run()}
      >
        <Strikethrough className="size-4" aria-hidden="true" />
      </ToolbarButton>
      <span className="mx-1 h-5 w-px bg-black/10" />
      <ToolbarButton
        label="Überschrift 2"
        active={editor.isActive("heading", { level: 2 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      >
        <Heading2 className="size-4" aria-hidden="true" />
      </ToolbarButton>
      <ToolbarButton
        label="Überschrift 3"
        active={editor.isActive("heading", { level: 3 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
      >
        <Heading3 className="size-4" aria-hidden="true" />
      </ToolbarButton>
      <span className="mx-1 h-5 w-px bg-black/10" />
      <ToolbarButton
        label="Aufzählung"
        active={editor.isActive("bulletList")}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List className="size-4" aria-hidden="true" />
      </ToolbarButton>
      <ToolbarButton
        label="Nummerierte Liste"
        active={editor.isActive("orderedList")}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered className="size-4" aria-hidden="true" />
      </ToolbarButton>
      <ToolbarButton
        label="Zitat"
        active={editor.isActive("blockquote")}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
      >
        <Quote className="size-4" aria-hidden="true" />
      </ToolbarButton>
      <ToolbarButton label="Link" active={editor.isActive("link")} onClick={setLink}>
        <LinkIcon className="size-4" aria-hidden="true" />
      </ToolbarButton>
      <span className="mx-1 h-5 w-px bg-black/10" />
      <ToolbarButton label="Rückgängig" onClick={() => editor.chain().focus().undo().run()}>
        <Undo className="size-4" aria-hidden="true" />
      </ToolbarButton>
      <ToolbarButton label="Wiederholen" onClick={() => editor.chain().focus().redo().run()}>
        <Redo className="size-4" aria-hidden="true" />
      </ToolbarButton>
    </div>
  );
}

export function RichTextEditor({
  value,
  onChange,
  placeholder = "Beitragstext …",
}: {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
}) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: false, autolink: true }),
      Placeholder.configure({ placeholder }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class: "prose prose-sm max-w-none min-h-56 px-3 py-2 focus:outline-none",
      },
    },
    onUpdate: ({ editor: e }) => onChange(e.getHTML()),
  });

  // Hält den Editor synchron, wenn `value` von außen wechselt (z. B. beim
  // Öffnen eines anderen Beitrags) — ohne das, würde der Editor immer nur
  // den Inhalt zeigen, mit dem er ursprünglich erstellt wurde.
  useEffect(() => {
    if (!editor) return;
    if (editor.getHTML() !== value) {
      editor.commands.setContent(value, false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor, value]);

  if (!editor) return null;

  return (
    <div className="rounded-md">
      <Toolbar editor={editor} />
      <div className="rounded-b-md border border-input bg-white">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}

export default RichTextEditor;

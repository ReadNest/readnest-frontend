import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import { useEffect } from "react";
import ToolBar from "./Toolbar";

interface RichTextEditorProps {
  content: string;
  onChange?: (content: string) => void;
}

function RichTextEditor({ content, onChange }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({ openOnClick: false, autolink: false }),
      Image,
    ],
    content: content,
    onUpdate: ({ editor }) => {
      if (onChange) {
        onChange(editor.getHTML());
      }
    },
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  useEffect(() => {
    return () => {
      editor?.destroy();
    };
  }, [editor]);

  if (!editor) return <></>;

  return (
    <div className="space-y-2 border border-gray-300 rounded-lg p-4">
      <ToolBar editor={editor} />
      <EditorContent
        editor={editor}
        className="prose max-w-full min-h-[200px]"
      />
    </div>
  );
}

export default RichTextEditor;

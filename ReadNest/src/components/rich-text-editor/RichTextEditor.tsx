import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import { useEffect } from "react";
import ToolBar from "./ToolBar";

interface RichTextEditorProps {
  content: string;
}

function RichTextEditor({ ...props }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({ openOnClick: false, autolink: false }),
      Image,
    ],
    content: props.content,
  });

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

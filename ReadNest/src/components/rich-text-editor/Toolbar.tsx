import type { Editor } from "@tiptap/react";
import {
  Bold,
  Italic,
  Underline,
  Link,
  Image as ImageIcon,
} from "lucide-react";
import { useState } from "react";
import { Input } from "../ui/input";
import { Toggle } from "../ui/toggle";

interface ToolbarProps {
  editor: Editor;
}

function ToolBar({ ...props }: ToolbarProps) {
  const [imageUrl, setImageUrl] = useState("");
  const [linkUrl, setLinkUrl] = useState("");

  const insertImage = () => {
    if (imageUrl) {
      props?.editor?.chain().focus().setImage({ src: imageUrl }).run();
      setImageUrl("");
    }
  };

  const setLink = () => {
    if (linkUrl) {
      props?.editor?.chain().focus().setLink({ href: linkUrl }).run();
      setLinkUrl("");
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Toggle
        pressed={props.editor.isActive("bold")}
        onPressedChange={() => props.editor.chain().focus().toggleBold().run()}
      >
        <Bold className="w-4 h-4" />
      </Toggle>
      <Toggle
        pressed={props.editor.isActive("italic")}
        onPressedChange={() =>
          props.editor.chain().focus().toggleItalic().run()
        }
      >
        <Italic className="w-4 h-4" />
      </Toggle>
      <Toggle
        pressed={props.editor.isActive("underline")}
        onPressedChange={() =>
          props.editor.chain().focus().toggleUnderline().run()
        }
      >
        <Underline className="w-4 h-4" />
      </Toggle>

      <div className="flex items-center gap-1">
        <Input
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="w-40"
        />
        <Toggle onClick={insertImage}>
          <ImageIcon className="w-4 h-4" />
        </Toggle>
      </div>

      <div className="flex items-center gap-1">
        <Input
          placeholder="Link URL"
          value={linkUrl}
          onChange={(e) => setLinkUrl(e.target.value)}
          className="w-40"
        />
        <Toggle onClick={setLink}>
          <Link className="w-4 h-4" />
        </Toggle>
      </div>
    </div>
  );
}

export default ToolBar;

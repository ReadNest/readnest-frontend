'use client';

import { useEffect, useState } from 'react';
import { TinyMCETextEditor } from '@/components/rich-text-editor/TinyMCETextEditor';
import { Label } from '@radix-ui/react-dropdown-menu';

interface PostEditorProps {
  onContentChange: (content: string) => void;
  initialContent?: string;
}

export default function PostEditor({ onContentChange, initialContent = '' }: PostEditorProps) {
  const [content, setContent] = useState(initialContent);

  useEffect(() => {
    setContent(initialContent);     
    onContentChange(initialContent);
  }, [initialContent]);

  const handleChange = (val: string) => {
    setContent(val);
    onContentChange(val);
  };

  return (
    <div className="space-y-4">
      <Label className="text-sm font-medium text-gray-700">
        Nội dung bài viết
      </Label>

      <div className="border rounded-lg">
        <TinyMCETextEditor
          value={content}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { TinyMCETextEditor } from '@/components/rich-text-editor/TinyMCETextEditor';
import { Label } from '@radix-ui/react-dropdown-menu';

interface PostEditorProps {
  onContentChange: (content: string) => void;
}

export default function PostEditor({ onContentChange }: PostEditorProps) {
  const [content, setContent] = useState('<p>Chia sẻ cảm nghĩ của bạn về cuốn sách...</p>');

  const handleChange = (val: string) => {
    setContent(val);
    onContentChange(val);
  };

  return (
    <div className="space-y-4">
      <Label className="text-sm font-medium text-gray-700">
        Nội dung bài viết
      </Label>

      {/* TinyMCE Editor */}
      <div className="border rounded-lg">
        <TinyMCETextEditor
          value={content}
          onChange={handleChange}
        />
        {/* <button
          onClick={() => console.log(content)}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Log Content
        </button> */}
      </div>
    </div>
  );
}
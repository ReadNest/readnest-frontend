'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import PostEditor from './PostEditor';
import PostPreview from './PostPreview';

export default function CreatePostForm() {
  const [bookName, setBookName] = useState('');
  const [content, setContent] = useState<any>(null);
  const [previewOpen, setPreviewOpen] = useState(false);

  const handleSubmit = () => {
    console.log('Submitting post:', { bookName, content });
    // Xử lý submit ở đây
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Tạo bài viết đánh giá sách</h1>

      {/* Book Selection */}
      <div className="space-y-2">
        <h2 className="font-semibold">Chọn sách</h2>
        <Input 
          placeholder="Tìm kiếm sách..."
          value={bookName}
          onChange={(e) => setBookName(e.target.value)}
        />
      </div>

      {/* Post Editor */}
      <PostEditor onContentChange={setContent} />

      {/* Actions */}
      <div className="flex justify-between">
        <PostPreview 
          open={previewOpen} 
          onOpenChange={setPreviewOpen}
          bookName={bookName}
          content={content}
        />
        <div className="flex gap-2">
          <Button variant="outline">Hủy</Button>
          <Button onClick={handleSubmit}>Đăng bài</Button>
        </div>
      </div>
    </div>
  );
}
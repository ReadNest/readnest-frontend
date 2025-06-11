'use client';

import { useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import { Button } from '@/components/ui/button';

interface PostPreviewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  bookName: string;
  content: string;
  title?: string;
  authorName?: string;
  avatarUrl?: string;
}

export default function PostPreview({
  open,
  onOpenChange,
  bookName,
  content,
  title,
  authorName = 'Nguyễn A',
  avatarUrl = '/user-avatar.jpg',
}: PostPreviewProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        HTMLAttributes: {
          class: 'rounded-lg max-w-full h-auto',
        },
      }),
    ],
    content,
    editable: false,
  });

  useEffect(() => {
    if (editor && content) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <Button variant="outline" onClick={() => onOpenChange(true)}>
        Xem trước bài viết
      </Button>

      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Xem trước bài viết</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Avatar className="h-10 w-10">
              <AvatarImage src={avatarUrl} />
              <AvatarFallback>{authorName.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <span>{authorName}</span>
          </div>

          {bookName && (
            <h2 className="text-xl font-semibold">
              <span className="text-base font-normal">Đánh giá sách </span>
              <span className="text-purple-500 font-semibold">{bookName}</span>
              <span className="text-base font-normal"> - </span>
              <span className="font-bold">{title}</span>
            </h2>
          )}

          {/* {title && (
            <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          )} */}

        <div className="prose dark:prose-invert max-w-none max-h-[60vh] overflow-y-auto pr-2">
          <EditorContent editor={editor} />
        </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

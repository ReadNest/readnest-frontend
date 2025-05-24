'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import { Button } from '@/components/ui/button';

interface PostPreviewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  bookName: string;
  content: any;
}

export default function PostPreview({ open, onOpenChange, bookName, content }: PostPreviewProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        HTMLAttributes: {
          class: 'rounded-lg max-w-full h-auto',
        },
      }),
    ],
    content: content,
    editable: false,
  });

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
              <AvatarImage src="/user-avatar.jpg" />
              <AvatarFallback>NV</AvatarFallback>
            </Avatar>
            <span>Nguyễn A</span>
          </div>
          
          {bookName && <h2 className="text-xl font-bold">Đánh giá: {bookName}</h2>}
          
          <div className="prose dark:prose-invert max-w-none">
            <EditorContent editor={editor} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
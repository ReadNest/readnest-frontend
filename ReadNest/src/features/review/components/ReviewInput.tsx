"use client";

import { useEffect, useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { SendIcon } from 'lucide-react';
import { toast } from 'react-toastify';
import type { GetBookResponse } from '@/api/@types';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';

interface ReviewInputProps {
    isOpen: boolean
    onClose: () => void
    onSubmit: (review: string) => void
    book: GetBookResponse
    initialContent?: string
    isUpdate?: boolean
}

export default function ReviewInput({ isOpen, onClose, onSubmit, book, initialContent = "", isUpdate }: ReviewInputProps) {
    const maxLength = 255;

    const { user } = useSelector((state: RootState) => state.auth);
    const selectedBook = book;

    const [reviewContent, setReviewContent] = useState(initialContent)
    useEffect(() => {
        setReviewContent(initialContent);
    }, [initialContent, isOpen]);
    const [isSubmitting, setIsSubmitting] = useState(false)

    const remainingChars = maxLength - reviewContent.length

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!reviewContent.trim()) {
            // Hiển thị toast ở đây
            toast.warn('Nội dung đánh giá không được để trống!');
            return;
        }
        setIsSubmitting(true)
        onSubmit(reviewContent)
        // Reset after submission if needed
        setIsSubmitting(false)
        setReviewContent("")
        onClose()
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl">
                <DialogHeader>
                    <div className="flex items-center gap-6">
                        <Avatar className="h-16 w-16 rounded-full overflow-hidden flex-shrink-0">
                            <AvatarImage
                                src={user.avatarUrl ?? "https://github.com/shadcn.png"}
                                className="w-full h-full object-cover rounded-full"
                            />
                            <AvatarFallback className="w-full h-full flex items-center justify-center rounded-full bg-gray-200">
                                Avatar
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <DialogTitle>
                                {isUpdate ? "Cập nhật đánh giá" : (
                                    <>
                                        Viết đánh giá cho cuốn sách
                                        <span className="text-blue-600 font-semibold">
                                            {` "${selectedBook.title}"`}
                                        </span>
                                    </>
                                )}
                            </DialogTitle>
                            <DialogDescription>
                                Đánh giá của bạn sẽ giúp người khác hiểu hơn về cuốn sách này.
                            </DialogDescription>
                        </div>
                    </div>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="review">
                            Nội dung đánh giá
                            <span className="text-red-500 ml-0.5">*</span>
                        </Label>
                        <Textarea
                            id="review"
                            value={reviewContent}
                            onChange={(e) => setReviewContent(e.target.value)}
                            maxLength={255}
                            placeholder="Viết đánh giá của bạn tại đây..."
                            className="min-h-[120px]"
                        />
                        <div className={`text-xs text-right ${remainingChars < 20 ? 'text-orange-500' : 'text-muted-foreground'}`}>
                            {remainingChars}/255 ký tự còn lại
                        </div>
                    </div>

                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground"
                            disabled={isSubmitting}
                        >
                            Hủy bỏ
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 text-sm font-medium rounded-md bg-violet-600 text-white hover:bg-violet-700"
                            disabled={isSubmitting || !reviewContent.trim()}
                        >
                            {isSubmitting ? "Đang gửi..." : (
                                <>
                                    <SendIcon className="inline-block mr-2" />
                                    {isUpdate ? "Cập nhật" : "Gửi đánh giá"}
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
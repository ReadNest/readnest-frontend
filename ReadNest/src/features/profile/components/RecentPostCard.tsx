import { Heart } from 'lucide-react';

interface PostCardProps {
    // postID: string;
    bookImage: string;
    bookName: string;
    bookAuthor: string;
    likes: number;
}

export function RecentPostCard({ bookImage, bookName, bookAuthor, likes }: PostCardProps) {
    return (
        <div className="w-full max-w-xs overflow-hidden rounded-lg border shadow-sm bg-white">
            {/* Phần ảnh sách - sử dụng background image của Tailwind */}
            <div
                className="h-48 w-full bg-cover bg-center"
                style={{ backgroundImage: `url(${bookImage})` }}
            ></div>

            {/* Phần thông tin sách */}
            <div className="p-4 space-y-2">
                <div>
                    <h3 className="text-lg font-semibold">{bookName}</h3>
                    <p className="text-sm text-gray-600">{bookAuthor}</p>
                </div>

                {/* Phần lượt thích - góc dưới bên phải */}
                <div className="flex justify-end">
                    <div className="flex items-center gap-1">
                        <Heart className="h-4 w-4 text-red-500" />
                        <span className="text-sm">{likes.toLocaleString()}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
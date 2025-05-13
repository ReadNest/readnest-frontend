import { Heart } from 'lucide-react';

interface ReviewCardProps {
  bookImage: string;
  bookName: string;
  author: string;
  likes: number;
  content: string;
}

export function RecentReviewCard({ bookImage, bookName, author, likes, content }: ReviewCardProps) {
  return (
    <div className="w-full p-6 space-y-4 border rounded-lg shadow-sm bg-white">
      {/* Tiêu đề phần */}
      <h2 className="text-xl font-semibold">Đánh giá gần đây</h2>
      
      {/* Thông tin sách */}
      <div className="flex items-start gap-4">
        {/* Ảnh sách */}
        <div className="flex-shrink-0">
          <img
            src={bookImage}
            alt={bookName}
            className="w-24 h-32 object-cover rounded border"
            loading="lazy"
          />
        </div>
        
        {/* Tên sách và tác giả */}
        <div>
          <h3 className="text-lg font-medium">{bookName}</h3>
          <p className="text-sm text-gray-600">{author}</p>
        </div>
      </div>
      
      {/* Nội dung đánh giá */}
      <p className="text-gray-700 leading-relaxed">{content}</p>
      
      {/* Lượt thích */}
      <div className="flex justify-end items-center gap-1 text-sm text-gray-500">
        <Heart className="h-4 w-4 text-red-500" />
        <span>{likes.toLocaleString()}</span>
      </div>
    </div>
  );
}
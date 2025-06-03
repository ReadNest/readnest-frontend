import type { CreateCommentLikeRequest, GetBookResponse } from '@/api/@types';
import { Button } from '@/components/ui/button';
import { likeCommentRequested } from '@/features/review/commentSlice';
import { RatingStars } from '@/features/search/components/RatingStars';
import type { RootState } from '@/store';
import { HeartIcon } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

interface ReviewCardProps {
  // bookImage: string;
  // bookName: string;
  book: GetBookResponse;
  author: string;
  likes: number;
  content: string;
  userLikes: string[];
  commentId?: string;
}

export function RecentReviewCard({ book, author, likes, content, userLikes, commentId }: ReviewCardProps) {

  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLikeClick = (commentId: string) => {
    if (commentId === "") {
      toast.info("Đã xãy ra lỗi, vui lòng thử lại sau");
      return;
    }
    const likeData: CreateCommentLikeRequest = {
      commentId: commentId,
      userId: user?.userId ?? "",
    };
    dispatch(likeCommentRequested(likeData));
  }

  const onNavigateToBookDetail = () => {
    if (!book.id) {
      toast.error("Không tìm thấy thông tin sách");
      return;
    }
    navigate(`/book-detail/${book.id}`);
  }


  return (
    <div className="w-full p-6 space-y-4 border rounded-lg shadow-sm bg-white">
      {/* Thông tin sách */}
      <div className="flex items-start gap-4">
        {/* Ảnh sách */}
        <div className="flex-shrink-0">
          <img
            src={book.imageUrl ?? ""}
            alt={book.title ?? "Chưa cập nhật tên sách"}
            className="w-24 h-32 object-cover rounded border cursor-pointer"
            loading="lazy"
            onClick={() => onNavigateToBookDetail()}
          />
        </div>

        {/* Tên sách và tác giả */}
        <div>
          <h3
            className="text-lg font-medium cursor-pointer"
            onClick={() => onNavigateToBookDetail()}
          >
            {book.title}</h3>
          <p
            className="text-sm text-gray-600 cursor-pointer"
            onClick={() => onNavigateToBookDetail()}
          >
            {author}</p>
        </div>
        <div className='ml-auto flex items-center gap-2 mt-5'>
          <RatingStars rating={book.averageRating ?? 0} showText={true} />
        </div>
      </div>

      {/* Nội dung đánh giá */}
      <p
        className="text-gray-700 leading-relaxed"
      >
        {content}
      </p>

      {/* Lượt thích */}
      <div className="flex justify-end items-center gap-1 text-sm text-gray-500">
        <Button
          variant="ghost"
          className="text-gray-500 hover:bg-transparent"
          onClick={() => onLikeClick(commentId ?? "")}
        >
          <HeartIcon
            className={`h-4 w-4 mr-1 ${userLikes.includes(user.userId ?? "") ? "text-red-500 fill-red-500" : ""}`}
          />
          <span>{likes.toLocaleString()}</span>
        </Button>
      </div>
    </div>
  );
}
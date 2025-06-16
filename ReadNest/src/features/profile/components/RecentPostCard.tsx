import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { ReactNode } from "react";

interface PostCardProps {
  postId: string;
  bookImage: string;
  postTitle: string;
  content: ReactNode;
  likes: number;
}

export function RecentPostCard({
  postId,
  bookImage,
  postTitle,
  content,
  likes,
}: PostCardProps) {
  const navigate = useNavigate();

  return (
    <div
      className="w-full max-w-xs overflow-hidden rounded-lg border shadow-sm bg-white cursor-pointer hover:shadow-md transition-shadow"
      onClick={() => navigate(`/post/${postId}`)}
    >
      {/* Phần ảnh sách */}
      <div
        className="h-48 w-full bg-cover bg-center"
        style={{ backgroundImage: `url(${bookImage})` }}
      ></div>

      {/* Phần thông tin */}
      <div className="p-4 space-y-2">
        <div>
          <h3 className="text-lg font-semibold line-clamp-2">{postTitle}</h3>
          <div className="text-sm text-gray-600 line-clamp-2 min-h-[40px] max-h-5">
            {content}
          </div>
        </div>

        {/* Lượt thích */}
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

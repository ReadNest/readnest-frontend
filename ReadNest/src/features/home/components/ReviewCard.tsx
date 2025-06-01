import type { CreateCommentLikeRequest } from "@/api/@types";
import { Button } from "@/components/ui/button";
import { likeCommentRequested } from "@/features/review/commentSlice";
import type { RootState } from "@/store";
import { HeartIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ReviewCard({ creator, book, desc, time, likes, userLikes, commentId }: any) {
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

  const onNavigateToCreatorProfile = () => {
    if (!creator?.userId) {
      toast.error("Không tìm thấy thông tin người dùng");
      return;
    }
    navigate(`/profile/${creator.userName}`);
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 w-full max-w-sm">
      <div className="flex items-center gap-3 mb-4">
        <img
          src={creator?.avatarUrl || "/default-avatar.png"}
          alt={creator?.fullName || "Người dùng ẩn danh"}
          className="w-10 h-10 rounded-full object-cover cursor-pointer"
          onClick={() => onNavigateToCreatorProfile()}
        />
        <p
          className="font-medium text-gray-800 cursor-pointer"
          onClick={() => onNavigateToCreatorProfile()}
        >
          {creator?.fullName || "Người dùng ẩn danh"}

        </p>
      </div>
      <h3
        className="text-lg font-semibold text-gray-900 mb-2 cursor-pointer"
        onClick={() => onNavigateToBookDetail()}
      >
        {book?.title}
      </h3>
      <p
        className="text-sm text-gray-600 mb-4 line-clamp-3"
        style={{
          minHeight: "3.6em", // 3 dòng với line-height mặc định ~1.2em
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {desc}
      </p>
      <div className="flex justify-between text-sm text-gray-500 items-center">
        <span>{time}</span>
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

export default ReviewCard;

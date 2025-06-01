import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BookRating } from "@/features/favouriteBooks/components/BookRating";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Separator } from "@radix-ui/react-separator";
import { HeartIcon, PenToolIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import type { RootState } from "@/store";
import { getBookByIdStart } from "@/features/book/bookSlice";
import BookImageGallery, {
  type BookImage,
} from "@/components/ui/BookImageGallery";
import ReviewInput from "@/features/review/components/ReviewInput";
import { UserCommentCard } from "@/features/review/components/UserCommentCard";
import {
  addCommentRequested,
  fetchCommentsRequested,
  likeCommentRequested,
} from "@/features/review/commentSlice";
import type {
  CreateCommentLikeRequest,
  CreateCommentRequest,
} from "@/api/@types";
import { toast } from "react-toastify";
import {
  getFavoritesStart,
  toggleFavoriteStart,
} from "@/features/favouriteBooks/favoriteSlice";
import AffiliateButton from "@/features/affiliate/components/AffiliateButton";

export default function BookDetailPage() {
  const dispatch = useDispatch();
  const { bookId } = useParams(); // URL dạng /books/:bookId
  const book = useSelector((state: RootState) => state.book.selectedBook);
  const loading = useSelector((state: RootState) => state.book.loading);
  const auth = useSelector((state: RootState) => state.auth);
  const comments = useSelector((state: RootState) => state.comment.comments);
  const favorites = useSelector(
    (state: RootState) => state.favorites.favorites
  );
  const isFavorite = book ? favorites.some((fav) => fav.id === book.id) : false;
  const [showAllComments, setShowAllComments] = useState(false);

  useEffect(() => {
    if (bookId) {
      dispatch(getBookByIdStart(bookId));
      // Fetch comments for the book when the component mounts
      dispatch(fetchCommentsRequested(bookId));
      dispatch(
        getFavoritesStart({
          userId: auth.user.userId ?? "",
          paging: { pageIndex: 1, pageSize: 100 },
        })
      );
    }
  }, [dispatch, bookId]);

  // State quản lý việc hiển thị ReviewInput
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Hàm để xử lý lưu đánh giá vào database ở đây
  const handleSubmitReview = (reviewContent: string) => {
    const commentData: CreateCommentRequest = {
      bookId: book?.id ?? "",
      userId: auth.user?.userId ?? "",
      content: reviewContent,
    };
    dispatch(addCommentRequested(commentData));
    setIsModalOpen(false); // Ẩn form sau khi submit
    // Xử lý lưu đánh giá vào database ở đây
  };
  // Hàm để xử lý sự kiện click vào nút "Thích" trong UserCommentCard
  const handleOnLikeClick = (commentId: string) => {
    if (commentId === "") {
      toast.info("Đã xãy ra lỗi, vui lòng thử lại sau");
      return;
    }
    const likeData: CreateCommentLikeRequest = {
      commentId: commentId,
      userId: auth.user?.userId ?? "",
    };
    dispatch(likeCommentRequested(likeData));
  };

  const handleToggleFavorite = () => {
    if (!auth.user?.userId) {
      toast.info("Bạn cần đăng nhập để lưu yêu thích");
      return;
    }
    if (!book?.id) return;

    dispatch(
      toggleFavoriteStart({
        bookId: book.id,
        userId: auth.user.userId,
      })
    );
  };

  if (loading || !book) {
    return <div className="text-center py-10">Đang tải dữ liệu sách...</div>;
  }

  return (
    <div className="container mx-auto py-8 px-10">
      <div className="flex space-x-6 mb-6">
        <Card className="w-1/3 p-4">
          <BookImageGallery
            bookImages={
              book.bookImages?.map(
                (x) =>
                ({
                  id: x.id ?? "",
                  imageUrl: x.imageUrl ?? "",
                  order: x.order,
                } as BookImage)
              ) ?? []
            }
          />
        </Card>

        <Card className="w-2/3 p-4 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-4">{book.title}</h1>
            <BookRating rating={book.averageRating || 0} />

            <p className="text-lg mb-4 mt-4">
              Tác giả: <span className="font-medium">{book.author}</span>
            </p>

            <div className="mb-6">
              <p>
                Thể loại:{" "}
                {book.categories && book.categories.length > 0 ? (
                  book.categories.map((cat, index) => (
                    <span key={cat.id} className="font-medium">
                      {cat.name}
                      {index < book.categories!.length - 1 && ", "}
                    </span>
                  ))
                ) : (
                  <span>Chưa có thể loại</span>
                )}
              </p>
            </div>
          </div>

          <div className="mt-6">
            <div className="flex flex-wrap gap-3 mb-4">
              {book.affiliateLinks?.map((link) => (
                <AffiliateButton
                  key={link.id}
                  partnerName={link.partnerName ?? ""}
                  affiliateLink={link.affiliateLink ?? ""}
                />
              ))}
            </div>

            <Button
              onClick={handleToggleFavorite}
              className={`flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition-all duration-300
                ${isFavorite
                  ? "bg-red-50 text-red-600 hover:bg-red-100 shadow-sm border border-red-200"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-gray-300 hover:bg-gray-50 shadow-sm"
                }`}
            >
              <HeartIcon
                className={`h-5 w-5 ${isFavorite
                  ? "fill-red-500 text-red-500 animate-pulse"
                  : "text-gray-400 group-hover:text-gray-500"
                  } transition-colors`}
              />
              <span className="group-hover:underline">
                {isFavorite ? "Đã yêu thích" : "Lưu yêu thích"}
              </span>
            </Button>
          </div>
        </Card>
      </div>

      <Separator className="mb-10" />

      {/* Book Description Section */}
      <Card className="p-4">
        <div className="mb-12">
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Nội dung chính</h3>
            <div
              className="text-gray-700"
              dangerouslySetInnerHTML={{ __html: book.description ?? "" }}
            />
          </div>

          {/* Tuỳ biến hoặc render thêm phần ưu điểm/nhược điểm nếu có trong dữ liệu */}
        </div>
      </Card>

      <Separator className="mb-10" />

      <Card className="p-4">
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-8 text-left">Đánh giá & Nhận xét cuốn sách {book.title}</h2>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            {/* Circle rating */}
            <div className="flex-1 flex justify-center">
              <div className="relative w-32 h-32 flex items-center justify-center">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle
                    className="text-gray-200"
                    strokeWidth="8"
                    stroke="currentColor"
                    fill="transparent"
                    r="40"
                    cx="50"
                    cy="50"
                  />
                  <circle
                    className="text-yellow-500"
                    strokeWidth="8"
                    strokeDasharray="251.2"
                    strokeDashoffset={251.2 - (251.2 * (book.averageRating || 0) / 5)}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r="40"
                    cx="50"
                    cy="50"
                  />
                </svg>
                <div className="absolute text-center">
                  <div className="text-3xl font-bold">
                    {book.averageRating?.toFixed(1) || "0.0"}
                  </div>
                  <div className="text-sm text-gray-500">/5</div>
                </div>
              </div>
            </div>

            {/* Nút viết đánh giá */}
            <div className="flex-1 flex justify-center">
              {!auth.isAuthenticated ? (
                <div className="bg-violet-50 border border-violet-300 text-violet-800 rounded px-4 py-3 font-semibold text-center shadow-sm">
                  Hãy đăng nhập để có thể viết đánh giá!
                </div>
              ) : (
                <button
                  className="flex items-center bg-gradient-to-r from-violet-600 to-blue-500 text-white font-medium py-3 px-6 rounded-lg hover:shadow-lg transition"
                  onClick={() => setIsModalOpen(true)}
                >
                  <PenToolIcon className="h-5 w-5 mr-2" />
                  Viết đánh giá
                </button>
              )}
            </div>
          </div>
        </div>
      </Card>

      <Separator className="mb-10" />

      {/* User Comments Section */}
      <div className="space-y-4">
        {(showAllComments ? comments : comments.slice(0, 4)).map((comment) => (
          <UserCommentCard
            key={comment.commentId}
            avatarSrc={comment.creator?.avatarUrl || ""}
            fullName={comment.creator?.fullName || "Người dùng ẩn danh"}
            createdAt={comment.createdAt || new Date().toISOString()}
            comment={comment.content ?? ""}
            likeCount={comment.numberOfLikes || 0}
            userLikes={comment.userLikes || []}
            userId={comment.creator?.userId || ""}
            onLikeClick={() => handleOnLikeClick(comment.commentId || "")}
            commentId={comment.commentId || ""}
            userName={comment.creator?.userName || ""}
          />
        ))}
        {comments.length > 4 && !showAllComments && (
          <div className="flex justify-end">
            <button
              className="mt-2 px-4 py-2 rounded bg-transparent hover:bg-transparent text-violet-700 font-medium shadow-none border-none"
              onClick={() => setShowAllComments(true)}
            >
              Xem thêm bình luận
            </button>
          </div>
        )}
        {comments.length > 4 && showAllComments && (
          <div className="flex justify-end">
            <button
              className="mt-2 px-4 py-2 rounded bg-transparent hover:bg-transparent text-violet-700 font-medium shadow-none border-none"
              onClick={() => setShowAllComments(false)}
            >
              Ẩn bớt bình luận
            </button>
          </div>
        )}
      </div>

      {/* Related Articles Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-6">Các bài viết liên quan</h2>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Article 1 */}
            <Card className="p-4">
              <div className="flex gap-4">
                <div className="relative flex flex-col items-center text-center">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>LL</AvatarFallback>
                  </Avatar>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-lg">Long Lê</h3>
                      <p className="text-gray-500 text-sm">2 ngày trước</p>
                    </div>
                    <Button
                      variant="ghost"
                      className="text-gray-500 hover:bg-transparent"
                    >
                      <HeartIcon className="h-4 w-4 mr-1" />
                      <span>245</span>
                    </Button>
                  </div>
                  <h4 className="font-bold mb-2">
                    Sự thở của nghệ thuật tối giản
                  </h4>
                  <p className="text-gray-700">
                    Có thể nói nghệ thuật là một phần của cuộc sống...
                  </p>
                </div>
              </div>
            </Card>

            {/* Article 2 */}
            <Card className="p-4">
              <div className="flex gap-4">
                <div className="relative flex flex-col items-center text-center">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>NA</AvatarFallback>
                  </Avatar>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-lg">Nhật Anh</h3>
                      <p className="text-gray-500 text-sm">5 ngày trước</p>
                    </div>
                    <Button
                      variant="ghost"
                      className="text-gray-500 hover:bg-transparent"
                    >
                      <HeartIcon className="h-4 w-4 mr-1" />
                      <span>145</span>
                    </Button>
                  </div>
                  <h4 className="font-bold mb-2">Nghệ thuật tối giản là gì?</h4>
                  <p className="text-gray-700">
                    Một trong nghệ thuật trừu tượng nhất đó là...
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
      {/* Review Input Modal */}
      <ReviewInput
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmitReview}
        book={book}
        isUpdate={false} // Chỉ sử dụng khi cần cập nhật đánh giá
      />
    </div>
  );
}

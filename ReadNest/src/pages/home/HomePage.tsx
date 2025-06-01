import { Button } from "@/components/ui/button";
import { ROUTE_PATHS } from "@/constants/routePaths";

import ReviewCard from "@/features/home/components/ReviewCard";
import { WelcomePopup } from "@/features/home/components/WelcomePopup";
import { fetchTop3MostLikedCommentsRequested } from "@/features/review/commentSlice";
import { formatTimeAgo } from "@/lib/utils";
import type { RootState } from "@/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const comment = useSelector((state: RootState) => state.comment);
  const [showWelcome, setShowWelcome] = useState(false);
  const userId = useSelector((state: RootState) => state.auth.user?.userId);

  useEffect(() => {
    if (!userId) return; // Chưa đăng nhập thì không show popup
    const key = `hasSeenWelcome_${userId}`;
    const hasSeenWelcome = localStorage.getItem(key);

    if (!hasSeenWelcome) {
      setShowWelcome(true);
      localStorage.setItem(key, "true");
    }
  }, [userId]);

  useEffect(() => {
    dispatch(fetchTop3MostLikedCommentsRequested({}));
    console.log("Fetching top 3 most liked comments...");
  }, [dispatch]);

  useEffect(() => {
    console.log("Top 3 recent comments:", comment.top3MostLikedComments);
  }, [comment]);

  return (
    <div className="bg-[#f5f6ff]">
      {/* Hero Section */}
      <section className="py-24">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          {/* Left */}
          <div>
            <h1 className="text-5xl font-extrabold text-gray-900 leading-tight mb-6">
              Your Next Great <br /> Read Awaits
            </h1>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              Tham gia cộng đồng những người yêu sách của chúng tôi. <br />
              Khám phá, đánh giá và trao đổi sách với những người đọc khác.
            </p>
            <div className="flex gap-4">
              <Button className="bg-[#5a4bff] text-white hover:bg-[#4739e6] px-6 py-3 text-base font-medium rounded-full shadow-md">
                Khám phá ngay
              </Button>
              <Button
                onClick={() => {
                  navigate(ROUTE_PATHS.SEARCH);
                }}
                variant="outline"
                className="px-6 py-3 text-base font-medium rounded-full border-2 border-[#5a4bff] text-[#5a4bff] hover:bg-[#eee]"
              >
                Sách hay
              </Button>
            </div>
          </div>

          {/* Right Image */}
          <div className="flex justify-center">
            <img
              src="/image_home.png"
              alt="Magical Stack of Books"
              className="rounded-2xl shadow-2xl max-w-md"
            />
          </div>
        </div>
      </section>

      {/* Popular Reviews */}
      <section className="bg-white py-16 px-6">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Đánh giá phổ biến
          </h2>
          <div className="flex flex-wrap gap-6 justify-between">
            {comment.isLoadingTop3 ? (
              <div className="col-span-3 text-center text-gray-500 text-lg py-8 font-semibold">
                Đang tải đánh giá gần đây...
              </div>
            ) : !comment.top3MostLikedComments ||
              comment.top3MostLikedComments.length === 0 ? (
              <div className="col-span-3 text-center text-gray-500 text-lg py-8 font-semibold">
                Hiện tại chưa có bài post nào đã được đăng tải gần đây
              </div>
            ) : (
              comment.top3MostLikedComments.map((review) => (
                <ReviewCard
                  key={review.commentId}
                  creator={review.creator ?? ""}
                  book={review.book ?? "Chưa cập nhật tên sách"}
                  desc={review.content ?? "Chưa cập nhật nội dung đánh giá"}
                  time={formatTimeAgo(review.createdAt ?? new Date())}
                  likes={review.numberOfLikes?.toString() ?? "0"}
                  userLikes={review.userLikes ?? []}
                  commentId={review.commentId ?? ""}
                />
              ))
            )}
          </div>
        </div>
      </section>
      <WelcomePopup 
        isOpen={showWelcome} 
        onClose={() => setShowWelcome(false)} 
      />
    </div>
  );
}
export default HomePage;

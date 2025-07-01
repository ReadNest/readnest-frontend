import type {
  GetBookTradingPostV2Response,
  GetCommentResponse,
} from "@/api/@types";
import { Button } from "@/components/ui/button";
import { ROUTE_PATHS } from "@/constants/routePaths";
import TradingBookCard from "@/features/bookExchange/components/TradingBookCard";

import ReviewCard from "@/features/home/components/ReviewCard";
import { WelcomePopup } from "@/features/home/components/WelcomePopup";
import { PremiumFeatureCard } from "@/features/premium/components/PremiumFeatureCard";
import { fetchTop3MostLikedCommentsRequested } from "@/features/review/commentSlice";
import client from "@/lib/api/axiosClient";
import { formatTimeAgo } from "@/lib/utils";
import type { RootState } from "@/store";
import { Bookmark, ChartLine, Search, Star, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function HomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const comment = useSelector((state: RootState) => state.comment);
  const [showWelcome, setShowWelcome] = useState(false);
  const userId = useSelector((state: RootState) => state.auth.user?.userId);
  const userName = useSelector((state: RootState) => state.auth.user?.userName);
  const [tradingBooks, setTradingBooks] = useState<
    GetBookTradingPostV2Response[]
  >([]);

  useEffect(() => {
    client.api.v1.trading_posts.top.$get().then((res) => {
      setTradingBooks(res.data ?? []);
    });
  }, []);

  const features = [
    {
      icon: <Bookmark size={20} />,
      title: "Lưu danh sách yêu thích",
      description: "Lưu sách vào danh sách yêu thích không giới hạn",
    },
    {
      icon: <Users size={20} />,
      title: "Sự kiện của nền tảng",
      description:
        "Được tham gia các sự kiện do nền tảng tổ chức không mất phí",
    },
    {
      icon: <ChartLine size={20} />,
      title: "Gợi ý sách thông minh",
      description:
        "Nhận thông tin chi tiết về các loại sách bạn đọc và các đề xuất được cá nhân hóa",
    },
  ];

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
  }, [dispatch]);

  return (
    <div className="bg-[#f5f6ff]">
      {/* Hero Section */}
      <section className="relative py-32 bg-gray-900 overflow-hidden">
        {/* Enhanced Background with Parallax Effect */}
        <div className="absolute inset-0 z-0">
          <img
            src="/book_background.png"
            alt="Book lovers background"
            className="w-full h-full object-cover object-center scale-110"
            style={{ filter: "brightness(0.7)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30"></div>
        </div>

        {/* Content with Animation Ready Classes */}
        <div className="container mx-auto max-w-7xl px-6 relative z-10">
          <div className="max-w-2xl mx-auto text-center transform transition-all duration-500 hover:scale-105">
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
              Your Next Great
              <br />
              <span className="text-[#5a4bff] bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
                Read Awaits
              </span>
            </h1>

            <p className="text-gray-200 text-lg md:text-xl mb-10 leading-relaxed max-w-lg mx-auto">
              Tham gia cộng đồng những người yêu sách của chúng tôi để khám phá,
              <span className="block md:inline">
                {" "}
                đánh giá và trao đổi sách với những người đọc khác.
              </span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                className="bg-[#5a4bff] hover:bg-[#4739e6] text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                onClick={() => navigate("/posts")}
              >
                <span className="flex items-center gap-2">
                  <Search className="h-5 w-5" />
                  Khám phá ngay
                </span>
              </Button>

              <Button
                onClick={() => navigate(ROUTE_PATHS.SEARCH)}
                variant="outline"
                className="px-8 py-4 text-lg font-semibold rounded-full border-2 border-white text-white bg-transparent hover:bg-white/10 hover:border-[#5a4bff] hover:text-[#5a4bff] transition-all duration-300"
              >
                <span className="flex items-center gap-2">
                  <Star className="h-5 w-5" />
                  Sách hay
                </span>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Reviews */}
      <section className="bg-white py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-10">
            Đánh giá phổ biến
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
              comment.top3MostLikedComments.map(
                (review: GetCommentResponse) => (
                  <ReviewCard
                    key={review.commentId}
                    creator={review.creator ?? ""}
                    book={review.book ?? "Chưa cập nhật tên sách"}
                    desc={review.content ?? "Chưa cập nhật nội dung đánh giá"}
                    time={formatTimeAgo(review.createdAt ?? new Date())}
                    likes={review.numberOfLikes?.toString() ?? "0"}
                    userLikes={review.userLikes ?? []}
                    commentId={review.commentId ?? ""}
                    badgeCode={review.creator?.selectedBadgeCode ?? "DEFAULT"}
                  />
                )
              )
            )}
          </div>
        </div>
      </section>

      {/* Trading Enable */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Header với tiêu đề và nút */}
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Có thể trao đổi
            </h2>
            <a
              href={ROUTE_PATHS.BOOK_EXCHANGE}
              className="text-indigo-600 text-sm md:text-base hover:underline flex items-center gap-1"
            >
              Xem tất cả <span>→</span>
            </a>
          </div>

          {/* Grid hiển thị 5 sách một hàng */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {tradingBooks.map((book) => (
              <TradingBookCard
                key={book.id}
                book={book}
                onRequestExchange={(id) => {
                  client.api.v1.trading_requests
                    .$post({
                      body: {
                        tradingPostId: id,
                        userId: userId ?? "",
                      },
                    })
                    .then((res) => {
                      if (res.success) {
                        toast.success(
                          "Yêu cầu trao đổi đã được gửi thành công!"
                        );
                      }
                    });
                }}
                disableExchange={userName === book.userName}
                currentUserName={userName ?? undefined}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Premium Section */}
      <section className="py-12 px-4 text-center bg-muted/50">
        <h2 className="text-2xl font-bold mb-2">Mở khóa tính năng premium</h2>
        <p className="text-muted-foreground mb-8">
          Nâng cao trải nghiệm đọc của bạn với những lợi ích độc quyền
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-8">
          {features.map((f, idx) => (
            <PremiumFeatureCard
              key={idx}
              icon={f.icon}
              title={f.title}
              description={f.description}
            />
          ))}
        </div>

        <Button
          size="lg"
          className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold px-8 py-5 rounded-full shadow-lg hover:brightness-110 hover:shadow-xl transition duration-300"
        >
          Mở khóa premium
        </Button>
      </section>

      {/* Welcome Modal */}
      {showWelcome && (
        <div className="mx-auto my-10 max-w-3xl bg-white rounded-xl shadow-lg p-6">
          <WelcomePopup
            isOpen={showWelcome}
            onClose={() => setShowWelcome(false)}
          />
        </div>
      )}
    </div>
  );
}
export default HomePage;

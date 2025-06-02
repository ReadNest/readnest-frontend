import { Button } from "@/components/ui/button";
import { ROUTE_PATHS } from "@/constants/routePaths";
import TradingBookCard from "@/features/book/components/TradingBookCard";

import ReviewCard from "@/features/home/components/ReviewCard";
import { WelcomePopup } from "@/features/home/components/WelcomePopup";
import { PremiumFeatureCard } from "@/features/premium/components/PremiumFeatureCard";
import { fetchTop3MostLikedCommentsRequested } from "@/features/review/commentSlice";
import { formatTimeAgo } from "@/lib/utils";
import type { RootState } from "@/store";
import { Bookmark, ChartLine, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const comment = useSelector((state: RootState) => state.comment);
  const [showWelcome, setShowWelcome] = useState(false);
  const userId = useSelector((state: RootState) => state.auth.user?.userId);
  const tradingBooks = [
    {
      id: 1,
      imageUrl: "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-llk4ubz24f5if9",
      title: "Đắc Nhân Tâm",
      author: "Dale Carnegie",
      condition: "Như mới",
      owner: "Nguyễn Văn A",
      requestCount: 5
    },
    {
      id: 2,
      imageUrl: "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-llk4ubz24f5if9",
      title: "Nhà Giả Kim",
      author: "Paulo Coelho",
      condition: "Đồ qua sử dụng",
      owner: "Trần Thị B",
      requestCount: 3
    },
    {
      id: 3,
      imageUrl: "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-llk4ubz24f5if9",
      title: "Tuổi Trẻ Đáng Giá Bao Nhiêu",
      author: "Rosie Nguyễn",
      condition: "Như mới",
      owner: "Lê Văn C",
      requestCount: 2
    },
    {
      id: 4,
      imageUrl: "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-llk4ubz24f5if9",
      title: "Tư Duy Phản Biện",
      author: "Richard Paul",
      condition: "Đồ qua sử dụng",
      owner: "Phạm Thị D",
      requestCount: 0
    },
    {
      id: 5,
      imageUrl: "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-llk4ubz24f5if9",
      title: "Dune",
      author: "Frank Herbert",
      condition: "Đồ qua sử dụng",
      owner: "Nguyễn A",
      requestCount: 1
    },
  ];

  const features = [
    {
      icon: <Bookmark size={20} />,
      title: "Lưu danh sách yêu thích",
      description: "Lưu sách vào danh sách yêu thích không giới hạn",
    },
    {
      icon: <Users size={20} />,
      title: "Sự kiện của nền tảng",
      description: "Được tham gia các sự kiện do nền tảng tổ chức không mất phí",
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
      <section className="py-24">
        <div className="container mx-auto max-w-7xl px-6 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
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
              <Button
                className="bg-[#5a4bff] text-white hover:bg-[#4739e6] px-6 py-3 text-base font-medium rounded-full shadow-md"
                onClick={() => navigate("/search?keyword=")}
              >
                Khám phá ngay
              </Button>
              <Button
                onClick={() => navigate(ROUTE_PATHS.SEARCH)}
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
              comment.top3MostLikedComments.map((review: any) => (
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
  
      {/* Trading Enable */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Header với tiêu đề và nút */}
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Có thể trao đổi
            </h2>
            <a
              href="/trades"
              className="text-indigo-600 text-sm md:text-base hover:underline flex items-center gap-1"
            >
              Xem tất cả <span>→</span>
            </a>
          </div>
  
          {/* Grid hiển thị 5 sách một hàng */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {tradingBooks.map((book) => (
              <TradingBookCard key={book.id} book={book} />
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

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
              Your Next Great<br />
              <span className="text-[#5a4bff] bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
                Read Awaits
              </span>
            </h1>
            
            <p className="text-gray-200 text-lg md:text-xl mb-10 leading-relaxed max-w-lg mx-auto">
              Tham gia cộng đồng những người yêu sách của chúng tôi để khám phá, 
              <span className="block md:inline"> đánh giá và trao đổi sách với những người đọc khác.</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                className="bg-[#5a4bff] hover:bg-[#4739e6] text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                onClick={() => navigate("/search?keyword=")}
              >
                <span className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                  Khám phá ngay
                </span>
              </Button>
              
              <Button
                onClick={() => navigate(ROUTE_PATHS.SEARCH)}
                variant="outline"
                className="px-8 py-4 text-lg font-semibold rounded-full border-2 border-white text-white bg-transparent hover:bg-white/10 hover:border-[#5a4bff] hover:text-[#5a4bff] transition-all duration-300"
              >
                <span className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
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

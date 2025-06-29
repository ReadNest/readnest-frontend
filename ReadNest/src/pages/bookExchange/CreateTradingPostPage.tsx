import { useDispatch } from "react-redux";
import { createTradingPostStart } from "@/features/bookExchange/tradingPostSlice";
import TradingPostForm from "@/features/bookExchange/components/TradingPostForm";

export default function CreateTradingPostPage() {
  const dispatch = useDispatch();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = (data: any) => {
    dispatch(createTradingPostStart(data));
    // Có thể show toast hoặc redirect ở saga hoặc lắng nghe state
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-sm mt-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">
        Tạo bài đăng trao đổi sách
      </h1>
      <p className="text-gray-600 mb-8">
        Đăng sách bạn muốn trao đổi và mô tả hiện trạng, điều kiện trao đổi.
      </p>
      <TradingPostForm onSubmit={handleSubmit} />
    </div>
  );
}

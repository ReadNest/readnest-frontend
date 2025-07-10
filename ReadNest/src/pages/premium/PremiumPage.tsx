import type { GetPaymentLinkResponseApiResponse } from "@/api/@types";
import { Button } from "@/components/ui/button";
import { ROUTE_PATHS } from "@/constants/routePaths";
import client from "@/lib/api/axiosClient";
import type { RootState } from "@/store";
import { Bookmark, Users, ChartLine, Crown } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";
import { Loader2 } from "lucide-react";

const features = [
  {
    icon: <Bookmark size={28} className="text-indigo-500" />,
    title: "Lưu danh sách yêu thích",
    description: "Lưu sách vào danh sách yêu thích không giới hạn",
  },
  {
    icon: <Users size={28} className="text-purple-500" />,
    title: "Sự kiện của nền tảng",
    description: "Được tham gia các sự kiện do nền tảng tổ chức không mất phí",
  },
  {
    icon: <ChartLine size={28} className="text-pink-500" />,
    title: "Gợi ý sách thông minh",
    description:
      "Nhận thông tin chi tiết về các loại sách bạn đọc và các đề xuất được cá nhân hóa",
  },
];

export default function PremiumPage() {
  const navigate = useNavigate();
  const userId = useSelector((state: RootState) => state.auth.user?.userId);
  const [loading, setLoading] = useState(false);

  const handleCreatePaymentLink = async () => {
    const response: GetPaymentLinkResponseApiResponse =
      await client.api.v1.payment.payment_links.$post({
        body: {
          userId: userId || "",
          packageId: import.meta.env.VITE_PREMIUM_ID || "",
        },
      });

    return (
      response?.data?.checkoutUrl ??
      `${ROUTE_PATHS.PREMIUM_PAYMENT_RETURN}?status=fail`
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-16 px-4 flex flex-col items-center">
      <div className="flex flex-col items-center mb-8">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full p-4 shadow-lg mb-4">
          <Crown size={48} className="text-white" />
        </div>
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
          Nâng cấp Premium
        </h1>
        <p className="text-lg text-gray-600 max-w-xl mb-4">
          Trở thành thành viên{" "}
          <span className="font-bold text-indigo-600">Premium</span> để tận
          hưởng những đặc quyền chỉ dành riêng cho bạn!
        </p>
        <div className="flex flex-col items-center mt-2">
          <span className="inline-block bg-pink-100 text-pink-600 font-semibold px-3 py-1 rounded-full text-sm mb-2 animate-pulse">
            Khuyến mãi đến 1/9/2025 🎉
          </span>
          <div className="flex items-end gap-2">
            <span className="text-2xl font-bold text-indigo-600">21.000đ</span>
            <span className="text-base text-gray-400 line-through mb-1">
              49.000đ
            </span>
          </div>
          <span className="text-sm text-gray-500 mt-1">
            Chỉ còn trong thời gian ưu đãi!
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 w-full max-w-5xl">
        {features.map((f, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl shadow-xl p-6 border border-indigo-100 hover:scale-105 hover:shadow-2xl transition-all duration-300"
          >
            <div className="mb-4 flex justify-center">{f.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
            <p className="text-gray-500">{f.description}</p>
          </div>
        ))}
      </div>
      <Button
        size="lg"
        disabled={loading}
        className="bg-gradient-to-r from-pink-500 to-indigo-500 text-white font-bold px-10 py-5 rounded-full shadow-xl hover:brightness-110 hover:scale-105 transition-all duration-300 text-lg flex items-center gap-2 mt-4 animate-bounce disabled:opacity-70"
        onClick={async () => {
          if (!userId) {
            toast.error("Bạn cần đăng nhập để nâng cấp Premium!");
            return;
          }
          setLoading(true);
          const paymentLink = await handleCreatePaymentLink();
          window.location.href = paymentLink;
        }}
      >
        {loading ? (
          <Loader2 size={24} className="mr-2 animate-spin" />
        ) : (
          <Crown size={24} className="mr-2" />
        )}
        {loading ? "Đang chuyển hướng..." : "Thanh toán & Nâng cấp Premium"}
      </Button>
      <Button
        variant="ghost"
        className="mt-6 text-indigo-500"
        onClick={() => navigate(-1)}
      >
        Quay lại trang trước
      </Button>
    </div>
  );
}

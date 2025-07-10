import { useSearchParams, useNavigate } from "react-router-dom";
import { CheckCircle2, XCircle, Ban } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PremiumPaymentReturnPage() {
  const [params] = useSearchParams();
  const code = params.get("code");
  const status = params.get("status");
  const cancel = params.get("cancel");

  const navigate = useNavigate();

  let result: "success" | "cancel" | "fail" = "fail";
  if (code === "00" && status === "PAID" && cancel === "false") {
    result = "success";
  } else if (status === "CANCELLED" || cancel === "true") {
    result = "cancel";
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-10 flex flex-col items-center max-w-md w-full">
        <div className="mb-4">
          {result === "success" && (
            <CheckCircle2 size={64} className="text-green-500 animate-bounce" />
          )}
          {result === "cancel" && (
            <Ban size={64} className="text-yellow-500 animate-pulse" />
          )}
          {result === "fail" && (
            <XCircle size={64} className="text-red-400 animate-shake" />
          )}
        </div>
        <h2
          className={`text-2xl font-bold mb-2 ${
            result === "success"
              ? "text-green-600"
              : result === "cancel"
              ? "text-yellow-600"
              : "text-red-500"
          }`}
        >
          {result === "success"
            ? "Thanh toán thành công!"
            : result === "cancel"
            ? "Bạn đã hủy thanh toán"
            : "Thanh toán thất bại"}
        </h2>
        <p className="text-gray-600 mb-2 text-center">
          {result === "success"
            ? "Chúc mừng bạn đã trở thành thành viên Premium! Hãy tận hưởng các đặc quyền ngay bây giờ."
            : result === "cancel"
            ? "Bạn đã hủy giao dịch thanh toán. Nếu cần hỗ trợ, vui lòng liên hệ chúng tôi."
            : "Có lỗi xảy ra trong quá trình thanh toán. Vui lòng thử lại hoặc liên hệ hỗ trợ."}
        </p>
        {result === "success" && (
          <p className="text-indigo-600 font-medium mb-6 text-center">
            Bạn có thể kiểm tra email sau khoảng 10-15 phút để xem hóa đơn của
            mình.
          </p>
        )}
        <Button
          className="w-full mb-2 bg-indigo-600 hover:bg-indigo-700 text-white"
          onClick={() => navigate("/")}
        >
          Về trang chủ
        </Button>
        <Button
          variant="outline"
          className="w-full"
          onClick={() => navigate(result === "success" ? "/" : "/premium")}
        >
          {result === "success" ? "Khám phá thêm" : "Thử lại"}
        </Button>
      </div>
    </div>
  );
}

import { Card } from "@/components/ui/card";
import LoginForm from "@/features/auth/components/LoginForm";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";

export default function LoginPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="flex max-w-4xl w-full shadow-lg overflow-hidden">
        {/* Left section - Form */}
        <div className="flex-1 p-10">
          <h2 className="text-2xl font-bold mb-1 text-center">
            Tham gia ReadNest ngay
          </h2>
          <p className="text-sm text-muted-foreground text-center mb-6">
            Đăng nhập và tiếp tục hành trình đọc của bạn
          </p>

          <LoginForm />

          {/* Register link */}
          <p className="text-center text-sm text-gray-600 mt-6">
            Chưa có tài khoản?{" "}
            <Link to="/register" className="text-indigo-600 hover:underline">
              Đăng ký
            </Link>
          </p>
        </div>
        <div className="hidden md:flex flex-col flex-1 bg-blue-50 p-8 space-y-4 justify-center rounded-r-md">
          <h3 className="text-lg font-semibold">
            Lợi ích khi tham gia ReadNest
          </h3>

          <ul className="space-y-3 text-sm text-muted-foreground">
            {[
              "Truy cập hơn 1 triệu cuốn sách và bài viết",
              "Nhận gợi ý đọc cá nhân hóa",
              "Tham gia nhóm đọc và thảo luận",
              "Theo dõi tiến độ đọc của bạn",
            ].map((item, index) => (
              <li key={index} className="flex items-start gap-2">
                <CheckCircle className="text-green-600 w-5 h-5 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="bg-white p-4 rounded shadow mt-6">
            <div className="flex items-center gap-3">
              <img
                src="https://randomuser.me/api/portraits/women/68.jpg"
                alt="avatar"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-medium text-sm">Sarah Johnson</p>
                <p className="text-xs text-muted-foreground">Active Reader</p>
              </div>
            </div>
            <p className="text-sm mt-2 text-gray-600 italic">
              "ReadNest đã thay đổi thói quen đọc sách của tôi. Các đề xuất cực
              kỳ chính xác và mình rất thích cộng đồng ở đây!"
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

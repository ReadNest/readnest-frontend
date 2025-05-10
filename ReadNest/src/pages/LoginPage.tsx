import { Card, CardContent } from "@/components/ui/card";
import TestimonialCard from "@/components/ui/testimonial-card";
import LoginForm from "@/features/auth/components/LoginForm";
import { Check } from "lucide-react";

export default function LoginPage() {
  const benefits = [
    "Truy cập hơn 1 triệu cuốn sách và bài viết",
    "Nhận gợi ý đọc cá nhân hóa",
    "Tham gia nhóm đọc và thảo luận",
    "Theo dõi tiến độ đọc của bạn",
  ];

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 bg-gray-50">
      <Card className="w-full max-w-5xl shadow-lg">
        {/* Header */}
        <div className="text-center py-10 px-4">
          <h1 className="text-3xl font-bold">Tham gia ReadNest ngay</h1>
          <p className="text-sm text-gray-600 mt-2">
            Tạo tài khoản và bắt đầu hành trình đọc của bạn
          </p>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Login Form */}
          <CardContent className="p-8 flex items-center justify-center">
            <LoginForm />
          </CardContent>

          {/* Benefits */}
          <div className="bg-indigo-50 p-8 flex flex-col space-y-4 rounded-xl w-full max-w-[400px] mx-auto">
            <h2 className="text-left text-lg font-bold mb-2">
              Lợi ích khi tham gia ReadNest
            </h2>
            <ul className="space-y-3">
              {benefits.map((benefit: string, index: number) => (
                <li key={index} className="flex items-start space-x-2">
                  <Check className="w-5 h-5 text-indigo-600 mt-1" />
                  <span className="text-sm text-gray-800">{benefit}</span>
                </li>
              ))}
            </ul>
            <TestimonialCard />
          </div>
        </div>

        {/* Footer */}
        <div className="text-center py-6">
          <p className="text-sm text-gray-600">
            Chưa có tài khoản?{" "}
            <a
              href="/register"
              className="text-indigo-600 font-medium hover:underline"
            >
              Đăng ký
            </a>
          </p>
        </div>
      </Card>
    </div>
  );
}

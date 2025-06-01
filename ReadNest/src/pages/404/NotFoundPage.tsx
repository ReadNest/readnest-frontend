import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom"; // hoặc 'next/navigation' nếu dùng Next.js

export default function NotFoundPage() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-gray-900 p-4 text-center">
            <div className="space-y-6 max-w-2xl">
                {/* Số 404 lớn */}
                <h1 className="text-9xl font-bold text-gray-800 dark:text-gray-100">404</h1>

                {/* Tiêu đề */}
                <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-100">
                    Page Not Found
                </h2>

                {/* Mô tả */}
                <p className="text-lg text-gray-600 dark:text-gray-300">
                    Oops! Trang bạn đang tìm kiếm không tồn tại hoặc đang được phát triển.<br />
                    Vui lòng kiểm tra lại đường dẫn hoặc quay về trang chủ.<br />
                    Nếu bạn nghi ngờ có lỗi xảy ra, vui lòng báo cho admin nhé!
                </p>

                {/* Nút hành động */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                    <Button
                        size="lg"
                        onClick={() => navigate("/")}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white"
                    >
                        Quay về trang chủ
                    </Button>
                    <Button
                        size="lg"
                        variant="outline"
                        onClick={() => navigate("/search?keyword=")}
                        className="border-indigo-600 text-indigo-600 hover:bg-indigo-50"
                    >
                        Khám phá sách
                    </Button>
                </div>
            </div>
        </div>
    );
}
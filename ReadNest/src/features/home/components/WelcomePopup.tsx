"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import { BugIcon, Contact2Icon, FacebookIcon, Link2Icon, MailIcon, MessageCircleMoreIcon, PhoneIcon, RefreshCcwIcon, RocketIcon, SearchCheckIcon, StarIcon, TargetIcon, Users2Icon } from "lucide-react";
import { Link } from "react-router-dom";

interface WelcomePopupProps {
    isOpen: boolean;
    onClose: () => void;
}

export function WelcomePopup({ isOpen, onClose }: WelcomePopupProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent
                // className="max-w-4xl p-0 rounded-xl overflow-hidden my-7 shadow-none border-none"
                className="max-w-3xl p-0 rounded-xl shadow-none border-none max-h-[90vh]"
            >
                <div className="bg-gradient-to-r from-blue-500 to-violet-500 p-1 rounded-t-lg">
                    <DialogHeader className="bg-transparent p-0">
                        <RocketIcon className="w-16 h-16 text-white drop-shadow-lg mx-auto" />
                        <DialogTitle className="text-2xl font-bold text-center text-white">
                            Chào mừng đến với ReadNest!
                        </DialogTitle>
                        <DialogDescription className="text-lg text-center text-white">
                            Khám phá tất cả thông tin quan trọng về dự án của chúng tôi.
                        </DialogDescription>
                    </DialogHeader>
                </div>

                <div className="auto-scroll max-h-[70vh] overflow-y-auto bg-white rounded-b-lg shadow-lg">
                    <div className="text-gray-800 px-7">

                        <div className="border-t border-gray-200 py-2">
                            <h2 className="text-xl font-bold mb-1 flex items-center gap-2">
                                <span className="inline-flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg">
                                    <TargetIcon className="w-6 h-6 text-blue-600" />
                                </span>
                                Mục tiêu dự án
                            </h2>
                            <p className="mb-6">
                                Tạo ra một nền tảng hân thiện với người dùng, cho phép độc giả dễ dàng tìm kiếm, chia sẻ và đóng góp các đánh giá (review) về những cuốn sách mà họ đã đọc. Website sẽ đóng vai trò như một cộng đồng trao đổi thông tin sách, giúp người dùng khám phá thêm nhiều đầu sách hay thông qua trải nghiệm và nhận xét từ những người đọc khác.
                            </p>

                            <div className="flex flex-col gap-6">
                                {/* Chức năng chính */}
                                <div>
                                    <h3 className="font-bold mb-1 flex items-center gap-2">
                                        <span className="inline-flex items-center justify-center w-10 h-10 bg-green-100 rounded-lg">
                                            <StarIcon className="w-6 h-6 text-green-500 fill-green-500" />
                                        </span>
                                        Chức năng chính
                                    </h3>
                                    <ul className="grid grid-cols-2 gap-x-4 mb-3 gap-y-2 mt-2">
                                        <li className="flex items-start bg-gray-100 p-2 rounded-lg">
                                            <span className="mr-2">
                                                <SearchCheckIcon className="text-orange-500" />
                                            </span>
                                            <span>Tìm kiếm và xem chi tiết sách</span>
                                        </li>
                                        <li className="flex items-start bg-gray-100 p-2 rounded-lg">
                                            <span className="mr-2">
                                                <MessageCircleMoreIcon className="text-purple-500" />
                                            </span>
                                            <span>Viết và đăng bài đánh giá</span>
                                        </li>
                                        <li className="flex items-start bg-gray-100 p-2 rounded-lg">
                                            <span className="mr-2">
                                                <Users2Icon className="text-blue-500" />
                                            </span>
                                            <span>Quản lý cộng đồng</span>
                                        </li>
                                        <li className="flex items-start bg-gray-100 p-2 rounded-lg">
                                            <span className="mr-2">
                                                <Link2Icon className="text-green-500" />
                                            </span>
                                            <span>Tích hợp liên kết tiếp thị liên kết</span>
                                        </li>
                                    </ul>
                                </div>

                                {/* Cập nhật mới nhất */}
                                <div>
                                    <h3 className="font-bold mb-1 flex items-center gap-2">
                                        <span className="inline-flex items-center justify-center w-10 h-10 bg-violet-100 rounded-lg">
                                            <RefreshCcwIcon className="w-6 h-6 text-violet-500" />
                                        </span>
                                        Cập nhật mới nhất
                                    </h3>
                                    <div className="space-y-4">
                                        <div>
                                            <div className="flex justify-between items-center mb-1">
                                                <h4 className="font-semibold">Phiên bản 1.0.0</h4>
                                                <p className="text-xs text-gray-500">01/06/2025</p>
                                            </div>
                                            <p className="text-m">
                                                Đây là phiên bản đầu tiên được triển khai chính thức của hệ thống.
                                                Phiên bản 1.0.0 tập trung vào các chức năng cốt lõi nhằm mang lại trải nghiệm ban đầu cho người dùng trong việc khám phá và chia sẻ về các đầu sách yêu thích.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-gray-200 pt-3">
                            <h3 className="font-bold mb-1 flex items-center gap-2">
                                <span className="inline-flex items-center justify-center w-10 h-10 bg-orange-100 rounded-lg">
                                    <Contact2Icon className="w-6 h-6 text-orange-600" />
                                </span>
                                Thông tin liên hệ
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                <div className="bg-blue-100 rounded-lg p-1 pl-3">
                                    <h4 className="font-semibold flex items-center gap-2">
                                        <span className="inline-flex items-center justify-center w-5 h-5 bg-blue-100 rounded-lg">
                                            <FacebookIcon className="w-4 h-4 text-blue-600" />
                                        </span>
                                        Fanpage
                                    </h4>
                                    <Link className="text-blue-600 hover:underline text-sm"
                                        to="https://www.facebook.com/profile.php?id=61576737382029"
                                        target="_blank"
                                    >
                                        facebook.com/ReadNest/
                                    </Link>
                                </div>
                                <div className="bg-red-100 rounded-lg p-1 pl-3">
                                    <h4 className="font-semibold flex items-center gap-2">
                                        <span className="inline-flex items-center justify-center w-5 h-5 bg-red-100 rounded-lg">
                                            <BugIcon className="w-4 h-4 text-red-600" />
                                        </span>
                                        Góp ý và báo lỗi
                                    </h4>
                                    <a
                                        href="https://mail.google.com/mail/?view=cm&fs=1&to=readnest2@gmail.com&su=Báo%20lỗi%20ReadNest&body=Nhập%20nội%20dung%20báo%20lỗi%20tại%20đây..."
                                        className="text-blue-600 hover:underline text-sm"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Góp ý và báo lỗi
                                    </a>
                                </div>
                                <div className="bg-green-100 rounded-lg p-1 pl-3">
                                    <h4 className="font-semibold flex items-center gap-2">
                                        <span className="inline-flex items-center justify-center w-5 h-5 bg-green-100 rounded-lg">
                                            <MailIcon className="w-4 h-4 text-green-600" />
                                        </span>
                                        Hợp tác
                                    </h4>
                                    <a
                                        href="https://mail.google.com/mail/?view=cm&fs=1&to=readnest2@gmail.com&su=Liên%20hệ%20hợp%20tác%20ReadNest&body=Nhập%20nội%20dung%20liên%20hệ%20hợp%20tác%20tại%20đây..."
                                        className="text-blue-600 hover:underline text-sm"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Liên hệ hợp tác
                                    </a>
                                </div>
                                <div className="bg-violet-100 rounded-lg p-1 pl-3">
                                    <h4 className="font-semibold flex items-center gap-2">
                                        <span className="inline-flex items-center justify-center w-5 h-5 bg-violet-100 rounded-lg">
                                            <PhoneIcon className="w-4 h-4 text-violet-600" />
                                        </span>
                                        Hotline
                                    </h4>
                                    <p className="text-sm">0123 456 799</p>
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-gray-200 pt-3 text-center text-sm">
                            <p>Cảm ơn bạn đã sử dụng nền tảng của chúng tôi</p>
                            <p className="text-gray-500 mt-1">© ReadNest 2025</p>
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <Button
                            onClick={onClose}
                            className="px-8 py-2 bg-violet-600 hover:bg-violet-700 text-white"
                        >
                            Đã hiểu
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog >
    );
}
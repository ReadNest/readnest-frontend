import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { RecentPostCard } from "@/features/profile/components/RecentPostCard";
import { RecentReviewCard } from "@/features/profile/components/RecentReviewCard";
import { CameraIcon, FrameIcon, PlusIcon } from "lucide-react";
import { useState } from "react";

export default function ProfilePage() {
    const [showModal, setShowModal] = useState(false);
    return (
        <div className="container mx-auto py-8 px-10">
            {/* Top Profile Page */}
            <Card className="p-4">
                <div className="flex items-center space-x-4 mb-1">
                    {/* Profile Header */}
                    <div className="relative flex flex-col items-center text-center">
                        <Avatar className="h-40 w-40 mb-4">
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>NA</AvatarFallback>
                        </Avatar>
                        <Button
                            className="absolute bottom-3 right-2 p-2 rounded-full shadow-md bg-blue-500 hover:bg-blue-600 text-white"
                            onClick={() => setShowModal(true)}
                        >
                            <CameraIcon />
                        </Button>
                    </div>
                    <div className="w-full flex flex-col items-start">
                        {/* Profile Info */}
                        <div className="flex flex-col items-center text-center ml-10">
                            <h1 className="text-2xl font-bold">Huỳnh Trần Vũ Đạt</h1>
                            <p className="text-gray-500">@dathuynh2k3</p>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-3 text-center mt-6">
                            <div>
                                <p className="text-2xl font-bold">12</p>
                                <p className="text-sm text-gray-500">Bài viết</p>
                            </div>
                            <div>
                                <p className="text-2xl font-bold">89</p>
                                <p className="text-sm text-gray-500">Lượt đánh giá</p>
                            </div>
                            <div>
                                <p className="text-2xl font-bold">1003</p>
                                <p className="text-sm text-gray-500">Điểm đánh giá</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex justify-end">
                        {/* Edit Profile Button */}
                        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold end-0">
                            Chỉnh sửa hồ sơ
                        </Button>
                    </div>
                </div>
            </Card>
            <Separator className="mb-10" />
            {/* Bot Profile Page */}
            <div className="flex flex-col md:flex-row gap-8">
                {/* Left Column */}
                <div className="w-full md:w-1/3 space-y-6">
                    {/* About */}
                    <Card className="p-4">
                        <h2 className="text-lg font-semibold mb-2">Giới thiệu</h2>
                        <p className="text-sm text-gray-700 mb-4">
                            Yêu thích đọc sách, đặc biệt là thể loại văn học dương đại và tâm lý học. Luôn tìm kiếm những cuốn sách hay để chia sẻ với cộng đồng.
                        </p>
                        <ul className="space-y-2 text-sm">
                            <li className="flex items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4 mr-2 text-gray-500"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                </svg>
                                Hồ Chí Minh, Việt Nam
                            </li>
                            <li className="flex items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4 mr-2 text-gray-500"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                    />
                                </svg>
                                Tham gia từ Tháng 3, 2025
                            </li>
                        </ul>
                    </Card>
                </div>

                {/* Right Column */}
                <div className="w-full md:w-2/3 space-y-6">
                    {/* Recent Posts */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-xl font-bold">Bài viết gần đây</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <RecentPostCard
                                    bookImage="https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-llk4ubz24f5if9"
                                    bookName="Nghệ thuật tinh tế của việc đếch quan tâm"
                                    bookAuthor="Mark Manson"
                                    likes={124}
                                />
                                <RecentPostCard
                                    bookImage="https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-llk4ubz24f5if9"
                                    bookName="Nghệ thuật tinh tế của việc đếch quan tâm"
                                    bookAuthor="Mark Manson"
                                    likes={124}
                                />
                                <RecentPostCard
                                    bookImage="https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-llk4ubz24f5if9"
                                    bookName="Nghệ thuật tinh tế của việc đếch quan tâm"
                                    bookAuthor="Mark Manson"
                                    likes={124}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Recent Reviews */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-xl font-bold">Đánh giá gần đây</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <RecentReviewCard
                                bookImage="https://cdn1.fahasa.com/media/flashmagazine/images/page_images/nhung_nguoi_khon_kho_hop_3_cuon/2022_06_07_15_45_42_9-390x510.jpg"
                                bookName="Những người khốn khổ"
                                author="Victor Hugo"
                                likes={245}
                                content="Một tác phẩm kinh điển về tình người và sự cứu rỗi. Câu chuyện về Jean Valjean đã để lại trong tôi nhiều suy ngẫm về ý nghĩa của cuộc sống và sự tha thứ."
                            />
                            <RecentReviewCard
                                bookImage="https://cdn1.fahasa.com/media/flashmagazine/images/page_images/nhung_nguoi_khon_kho_hop_3_cuon/2022_06_07_15_45_42_9-390x510.jpg"
                                bookName="Những người khốn khổ"
                                author="Victor Hugo"
                                likes={245}
                                content="Một tác phẩm kinh điển về tình người và sự cứu rỗi. Câu chuyện về Jean Valjean đã để lại trong tôi nhiều suy ngẫm về ý nghĩa của cuộc sống và sự tha thứ."
                            />
                        </CardContent>
                    </Card>
                </div>
            </div>
            {/* Modal for Avatar Change */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-lg font-semibold mb-4 text-center">Thay đổi Avatar</h2>
                        <Separator className="mb-4 w-full" />
                        <div className="flex flex-col items-center space-y-4">
                            {/* <label className="cursor-pointer inline-flex items-center bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
                                <PlusIcon className="mr-2" /> Chọn ảnh
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                />
                            </label> */}
                            <div className="flex items-center space-x-4">
                                <label className="cursor-pointer inline-flex items-center bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
                                    <PlusIcon className="mr-2" /> Chọn ảnh
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                const reader = new FileReader();
                                                reader.onload = () => {
                                                    const result = reader.result as string;
                                                    document.querySelector('.h-20.w-20 img')?.setAttribute('src', result);
                                                };
                                                reader.readAsDataURL(file);
                                            }
                                        }}
                                    />
                                </label>
                                <Button
                                    className="cursor-pointer inline-flex items-center bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded"
                                    onClick={() => {
                                        alert("Tính năng này hiện chưa khả dụng. Khung có thể kiếm được dựa vào đua top sự kiện hoặc sự kiện đặc biệt.");
                                    }}
                                >
                                    <FrameIcon className="mr-2" /> Chọn khung
                                </Button>
                            </div>
                            {showModal && (
                                <div className="flex flex-col items-center space-y-4">
                                    <Avatar className="h-25 w-25">
                                        <AvatarImage src="https://github.com/shadcn.png" />
                                        <AvatarFallback>NA</AvatarFallback>
                                    </Avatar>
                                </div>
                            )}
                        </div>
                        <div className="flex justify-end space-x-2">
                            <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                                Lưu
                            </Button>
                            <Button
                                className="bg-gray-300 hover:bg-gray-400 text-black"
                                onClick={() => setShowModal(false)}
                            >
                                Hủy
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
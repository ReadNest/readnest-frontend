"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { RatingStars } from "@/features/search/components/RatingStars";
import type { RootState } from "@/store";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { HeartIcon, EyeIcon, Share2Icon, BookmarkIcon, MoreVertical } from "lucide-react";
import { useSelector } from "react-redux";
import { Fragment } from "react/jsx-runtime";

interface BookReviewPost {
    id: string;
    author: {
        id: string;
        name: string;
        avatar?: string;
    };
    createdAt: string;
    title: string;
    book: {
        title: string;
        author: string;
        genre: string;
        publishYear: number;
        publisher: string;
        pageCount: number;
        language: string;
        coverImage: string;
        rating: number;
    };
    content: string;
    likes: number;
    views: number;
}

export default function DetailPostPage() {
    const auth = useSelector((state: RootState) => state.auth);
    const post: BookReviewPost = {
        id: "1",
        author: {
            id: "123",
            name: "Huỳnh Trần Vũ Đạt",
            avatar: "https://github.com/shadcn.png",
        },
        createdAt: "2023-02-21T00:00:00Z",
        title: "Đánh giá: 'Nhà Giả Kim' - Hành trình khám phá bản thân",
        book: {
            title: "Nhà Giả Kim",
            author: "Paulo Coelho",
            genre: "Phát triển bản thân",
            publishYear: 2020,
            publisher: "NKB Hải Nha Văn",
            pageCount: 244,
            language: "Tiếng Việt",
            coverImage: "/book-covers/nha-gia-kim.jpg",
            rating: 4.0
        },
        content: `"Nhà Giả Kim" (tên gốc The Alchemist) là một trong những tác phẩm nổi tiếng và được yêu thích nhất của tác giả người Brazil Paulo Coelho. Cuốn sách này đã chinh phục hàng triệu trái tim độc giả trên khắp thế giới, trở thành một trong những cuốn sách bán chạy nhất mọi thời đại, được dịch ra hơn 80 ngôn ngữ và tái bản nhiều lần.Add commentMore actions

Trong suốt nhiều năm, Nhà Giả Kim tiếp tục mang lại những cảm hứng mạnh mẽ và những thông điệp sâu sắc về cuộc sống, về hành trình theo đuổi ước mơ và khám phá bản thân.

Cuốn sách không chỉ là câu chuyện về một chuyến phiêu lưu tìm kiếm kho báu vật chất mà còn là hành trình tìm kiếm ý nghĩa cuộc sống, tìm ra ước mơ thực sự của bản thân và dũng cảm theo đuổi chúng.
"Khi yêu, ta luôn có gắng để trở nên tốt hơn. Khi ta có gắng để trở nên hoàn thiện, vạn vật xung quanh cũng sẽ trở nên tốt đẹp hơn.",
            "Một người được yêu thương chỉ vì họ đang được yêu thương, không cần có bất kỳ lý do nào cho việc yêu thương cả.",
            "Hãy nhớ rằng, trái tim của bạn đau, thì tại nơi đó bạn sẽ tìm thấy kho báu của đời mình."`,
        likes: 245,
        views: 1024,
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return `Đăng ngày ${date.getDate()} tháng ${date.getMonth() + 1}, ${date.getFullYear()}`;
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
        {/* <div className="container mx-auto px-4 py-8 max-w-7xl"> */}
            <Card className="shadow-lg">
                {/* Card Header - Author Info */}
                <CardHeader className="border-b pb-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <Avatar className="h-10 w-10">
                                <AvatarImage src={post.author.avatar} alt={post.author.name} />
                                <AvatarFallback>
                                    {post.author.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-medium">{post.author.name}</p>
                                <p className="text-sm text-gray-500">{formatDate(post.createdAt)}</p>
                            </div>
                        </div>
                        
                        {auth.isAuthenticated && (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="ml-1 p-1 h-6 w-6 text-gray-500 hover:bg-gray-200"
                                    >
                                        <MoreVertical className="w-4 h-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    align="start"
                                    className="bg-white shadow-2xl rounded-lg p-2"
                                >
                                    {auth.user.userId == post.author.id && (
                                        <>
                                            <DropdownMenuItem className="cursor-pointer bg-white hover:bg-gray-100 rounded mb-1 first:mt-0 last:mb-0">
                                                Chỉnh sửa
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="cursor-pointer bg-white hover:bg-gray-100 rounded mb-1 first:mt-0 last:mb-0">
                                                Xóa
                                            </DropdownMenuItem>
                                        </>
                                    )}
                                    {auth.user.userId !== post.author.id && (
                                        <DropdownMenuItem className="cursor-pointer bg-white hover:bg-gray-100 rounded first:mt-0 last:mb-0">
                                            Báo cáo bình luận
                                        </DropdownMenuItem>
                                    )}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        )}
                    </div>
                </CardHeader>

                {/* Card Content - Post Content */}
                <CardContent className="pt-6">
                    {/* Post Title */}
                    <CardTitle className="text-3xl font-bold mb-6">
                        {post.title.split(post.book.title).map((part, idx, arr) =>
                            idx < arr.length - 1 ? (
                                <Fragment key={idx}>
                                    {part}
                                    <span className="text-purple-500">{post.book.title}</span>
                                </Fragment>
                            ) : (
                                part
                            )
                        )}
                    </CardTitle>

                    {/* Book Info Section */}
                    <div className="flex flex-col md:flex-row gap-8 mb-8">
                        {/* Book Cover */}
                        <div className="w-full md:w-1/3">
                            <img
                                src={post.book.coverImage}
                                alt={post.book.title}
                                width={300}
                                height={450}
                                className="rounded-lg shadow-md w-full h-auto"
                            />
                        </div>

                        {/* Book Details */}
                        <div className="w-full md:w-2/3">
                            <h2 className="text-2xl font-bold mb-4">{post.book.title}</h2>

                            <RatingStars rating={post.book.rating} />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                                <div>
                                    <p className="text-gray-600">Tác giả:</p>
                                    <p className="font-medium">{post.book.author}</p>
                                </div>
                                <div>
                                    <p className="text-gray-600">Thể loại:</p>
                                    <p className="font-medium">{post.book.genre}</p>
                                </div>
                                <div>
                                    <p className="text-gray-600">Năm xuất bản:</p>
                                    <p className="font-medium">{post.book.publishYear}</p>
                                </div>
                                <div>
                                    <p className="text-gray-600">Nhà xuất bản:</p>
                                    <p className="font-medium">{post.book.publisher}</p>
                                </div>
                                <div>
                                    <p className="text-gray-600">Số trang:</p>
                                    <p className="font-medium">{post.book.pageCount} trang</p>
                                </div>
                                <div>
                                    <p className="text-gray-600">Ngôn ngữ:</p>
                                    <p className="font-medium">{post.book.language}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Post Content */}
                    <div className="prose max-w-none mb-8">
                        {post.content.split('\n').map((paragraph, index) => (
                            <p key={index} className="mb-4 text-gray-800">
                                {paragraph}
                            </p>
                        ))}
                    </div>
                </CardContent>

                {/* Card Footer - Stats and Actions */}
                <CardFooter className="border-t pt-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full">
                        <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                            <div className="flex items-center text-gray-600">
                                <HeartIcon className="h-5 w-5 mr-1 text-red-500" />
                                <span>{post.likes} lượt thích</span>
                            </div>
                            <div className="flex items-center text-gray-600">
                                <EyeIcon className="h-5 w-5 mr-1 text-blue-500" />
                                <span>{post.views} lượt xem</span>
                            </div>
                        </div>

                        <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                                <Share2Icon className="h-4 w-4 mr-2" />
                                Chia sẻ
                            </Button>
                            <Button variant="outline" size="sm">
                                <BookmarkIcon className="h-4 w-4 mr-2" />
                                Lưu lại
                            </Button>
                        </div>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}
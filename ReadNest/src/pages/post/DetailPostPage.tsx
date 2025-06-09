"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { getPostByIdStart } from "@/features/post/postSlice";
import { RatingStars } from "@/features/search/components/RatingStars";
import type { RootState } from "@/store";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { HeartIcon, EyeIcon, Share2Icon, BookmarkIcon, MoreVertical } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";

export default function DetailPostPage() {
    const dispatch = useDispatch();
    const { postId } = useParams();
    const post = useSelector((state: RootState) => state.post.selectedPost);
    const loading = useSelector((state: RootState) => state.post.loading);
    const auth = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        if (postId) {
          dispatch(getPostByIdStart(postId));

        }
      }, [dispatch, postId]);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return `Đăng ngày ${date.getDate()} tháng ${date.getMonth() + 1}, ${date.getFullYear()}`;
    };

    if (loading || !post) {
        return <div className="text-center py-10">Đang tải dữ liệu bài viết...</div>;
    }

    return (
        // <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="container mx-auto px-4 py-8 max-w-7xl"> 
            <Card className="shadow-lg">
                {/* Card Header - Author Info */}
                <CardHeader className="border-b pb-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <Avatar className="h-10 w-10">
                                <AvatarImage src={post.creator?.avatarUrl ?? ""} alt={post.creator?.fullName ?? ""} />
                                <AvatarFallback>
                                    {post.creator?.fullName ?? ""
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-medium">{post.creator?.fullName}</p>
                                <p className="text-sm text-gray-500">{formatDate(post.createdAt ?? "")}</p>
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
                                    {auth.user.userId == post.creator?.userId && (
                                        <>
                                            <DropdownMenuItem className="cursor-pointer bg-white hover:bg-gray-100 rounded mb-1 first:mt-0 last:mb-0">
                                                Chỉnh sửa
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="cursor-pointer bg-white hover:bg-gray-100 rounded mb-1 first:mt-0 last:mb-0">
                                                Xóa
                                            </DropdownMenuItem>
                                        </>
                                    )}
                                    {auth.user.userId !== post.creator?.userId && (
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
                        Đánh giá sách <span className="text-purple-500">{post.book?.title}</span> - {post.title}
                    </CardTitle>

                    {/* Book Info Section */}
                    <div className="flex flex-col md:flex-row gap-8 mb-8">
                        {/* Book Cover */}
                        <div className="w-full md:w-1/3">
                            <img
                                src={post.book?.imageUrl ?? ""}
                                alt={post.book?.title ?? ""}
                                width={300}
                                height={450}
                                className="rounded-lg shadow-md w-full h-auto"
                            />
                        </div>

                        {/* Book Details */}
                        <div className="w-full md:w-2/3">
                            <h2 className="text-2xl font-bold mb-4">{post.book?.title}</h2>

                            <RatingStars rating={post.book?.avarageRating ?? 0} />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                                <div>
                                    <p className="">Tác giả: <span className="font-medium">{post.book?.author}</span></p>
                                </div>
                                <div>
                                    <p>
                                        Thể loại:{" "}
                                        {post.book?.categories && post.book?.categories.length > 0 ? (
                                        post.book?.categories.map((cat, index) => (
                                            <span key={cat.id ?? index} className="font-medium">
                                            {cat.name ?? "Không tên"}
                                            {index < (post.book?.categories!.length ?? 0) - 1 && ", "}
                                            </span>
                                        ))
                                        ) : (
                                        <span>Chưa có thể loại</span>
                                        )}
                                    </p>
                                </div>
                                {/* <div>
                                    <p className="text-gray-600">Ngôn ngữ:</p>
                                    <p className="font-medium">{post.book?.language}</p>
                                </div> */}
                            </div>
                        </div>
                    </div>

                    {/* Post Content */}
                    <div className="prose max-w-none mb-8">
                    <div className="text-gray-700">{parse(post.content ?? "")}</div>
                    </div>
                </CardContent>

                {/* Card Footer - Stats and Actions */}
                <CardFooter className="border-t pt-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full">
                        <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                            <div className="flex items-center text-gray-600">
                                <HeartIcon className="h-5 w-5 mr-1 text-red-500" />
                                <span>{post.likesCount} lượt thích</span>
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
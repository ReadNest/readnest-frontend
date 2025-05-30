"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { FlagIcon, MessageCircleMoreIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ReportBadgeWithTooltip } from "@/features/commentReport/components/ReportBadgeWithTooltip";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store";
import { banCommentRequested, fetchReportedCommentsRequested, ignoreCommentRequested } from "@/features/commentReport/commentReportSlice";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function CommentReportsPage() {

    const { reportedComments } = useSelector((state: RootState) => state.commentReports);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchReportedCommentsRequested());
    }, [dispatch]);

    function formatTimeAgo(timestamp?: string | null) {
        if (!timestamp) return "Không xác định";
        const now = new Date();
        const date = new Date(timestamp);
        const diff = Math.floor((now.getTime() - date.getTime()) / 1000); // giây

        if (diff < 60) return `${diff} giây trước`;
        if (diff < 3600) return `${Math.floor(diff / 60)} phút trước`;
        if (diff < 86400) return `${Math.floor(diff / 3600)} giờ trước`;
        return `${Math.floor(diff / 86400)} ngày trước`;
    }

    const [banDialogOpen, setBanDialogOpen] = useState(false);
    const [selectedCommentId, setSelectedCommentId] = useState<string | null>(null);
    const handleBanClick = (commentId: string) => {
        setSelectedCommentId(commentId);
        setBanDialogOpen(true);
    };
    const handleConfirmBan = () => {
        if (selectedCommentId) {
            dispatch(banCommentRequested(selectedCommentId));
        }
        setBanDialogOpen(false);
        setSelectedCommentId(null);
    };

    const [ignoreDialogOpen, setIgnoreDialogOpen] = useState(false);
    const [selectedIgnoreCommentId, setSelectedIgnoreCommentId] = useState<string | null>(null);
    const handleIgnoreClick = (commentId: string) => {
        setSelectedIgnoreCommentId(commentId);
        setIgnoreDialogOpen(true);
    };
    const handleConfirmIgnore = () => {
        if (selectedIgnoreCommentId) {
            dispatch(ignoreCommentRequested(selectedIgnoreCommentId));
        }
        setIgnoreDialogOpen(false);
        setSelectedIgnoreCommentId(null);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="space-y-6">
                <h1 className="text-2xl font-bold flex items-center gap-2">
                    <FlagIcon className="w-7 h-7 text-red-600" />
                    Quản lý Báo cáo Bình luận
                </h1>
                <p className="text-gray-600">Xem và xử lý các bình luận bị báo cáo bởi người dùng.</p>

                <Card>
                    <CardHeader>
                        <CardTitle>Danh sách Bình luận bị Báo cáo</CardTitle>
                        <p className="text-sm text-gray-500">Mỗi dòng là một bình luận có ít nhất một report.</p>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {!reportedComments ? (
                                <div className="text-center text-gray-500 py-8">Đang tải dữ liệu...</div>
                            ) : reportedComments.length === 0 ? (
                                <div className="text-center text-violet-600 py-8 font-bold text-xl">
                                    Hiện tại không có khiếu nại nào
                                </div>) : (
                                reportedComments.map((reportedComment) => (
                                    <div key={reportedComment.commentId} className="border rounded-lg p-4">
                                        <div className="flex items-start gap-4">
                                            {/* Avatar và tên người báo cáo */}
                                            <div className="flex items-center gap-2 min-w-[160px]">
                                                <Avatar className="w-14 h-14 rounded-full border-2 border-violet-300 shadow">
                                                    <AvatarImage
                                                        src={reportedComment.commenter?.avatarUrl ?? undefined}
                                                        alt={reportedComment.commenter?.fullName ?? undefined}
                                                        className="w-full h-full object-cover"
                                                    />
                                                    <AvatarFallback className="bg-gray-200 text-lg font-bold w-full h-full flex items-center justify-center rounded-full">
                                                        {reportedComment.commenter?.fullName ?? "Người dùng ẩn danh"
                                                            .split(" ")
                                                            .map((part) => part[0])
                                                            .join("")
                                                            .toUpperCase()
                                                            .slice(0, 2)}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <span className="font-semibold text-violet-700 text-center text-base">
                                                    {reportedComment.commenter?.fullName ?? "Người dùng ẩn danh"}
                                                </span>
                                            </div>
                                            <div className="flex-1 space-y-2">
                                                <div className="flex justify-between">
                                                    <div className="flex items-start gap-2 font-medium max-w-3xl">
                                                        <MessageCircleMoreIcon size={28} className="mt-3 text-gray-500 flex-shrink-0" />
                                                        <TooltipProvider>
                                                            <Tooltip>
                                                                <TooltipTrigger asChild>
                                                                    <span
                                                                        className="line-clamp-2 mx-6 break-words cursor-pointer"
                                                                        style={{
                                                                            display: "-webkit-box",
                                                                            WebkitLineClamp: 2,
                                                                            WebkitBoxOrient: "vertical",
                                                                            overflow: "hidden",
                                                                        }}
                                                                    >
                                                                        {reportedComment.content}
                                                                    </span>
                                                                </TooltipTrigger>
                                                                <TooltipContent className="max-w-xs whitespace-pre-line break-words">
                                                                    {reportedComment.content}
                                                                </TooltipContent>
                                                            </Tooltip>
                                                        </TooltipProvider>
                                                    </div>
                                                    <div className="flex gap-4">
                                                        <span className="text-sm text-gray-500">
                                                            <ReportBadgeWithTooltip reports={reportedComment.reports ?? []} />
                                                        </span>
                                                        <span className="text-sm text-gray-500">
                                                            <strong>Thời gian gần nhất:</strong> {formatTimeAgo(reportedComment.reports?.[0]?.createdAt)}                                                    </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <Separator className="my-3" />

                                        <div className="flex justify-end gap-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleIgnoreClick(reportedComment.commentId ?? "")}
                                            >
                                                Bỏ qua
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => handleBanClick(reportedComment.commentId ?? "")}
                                            >
                                                Ban
                                            </Button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </CardContent>
                </Card>

                <div className="flex justify-between items-center">
                    <Button
                        variant="outline"
                        onClick={() => dispatch(fetchReportedCommentsRequested())}
                    >
                        Làm mới
                    </Button>

                    <div className="flex gap-4">
                        <div className="text-sm">
                            <strong>Tổng báo cáo:</strong>{" "}
                            {(reportedComments ?? []).reduce(
                                (sum, comment) => sum + (comment.reports?.length ?? 0),
                                0
                            )}
                        </div>
                        <div className="text-sm">
                            <strong>Tổng bình luận bị báo cáo:</strong>{" "}
                            {(reportedComments ?? []).length}
                        </div>
                    </div>
                </div>
            </div>
            {/* Dialog xác nhận ban*/}
            <Dialog open={banDialogOpen} onOpenChange={setBanDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Xác nhận Ban bình luận</DialogTitle>
                        <DialogDescription>
                            Hành động này sẽ ẩn bình luận bị báo cáo khỏi hệ thống. Bạn có chắc chắn muốn tiếp tục?
                        </DialogDescription>
                    </DialogHeader>
                    <div>Bạn có chắc chắn muốn ban bình luận này không?</div>
                    <div className="flex justify-end gap-2 mt-4">
                        <Button variant="outline" onClick={() => setBanDialogOpen(false)}>
                            Hủy
                        </Button>
                        <Button variant="destructive" onClick={handleConfirmBan}>
                            Xác nhận Ban
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
            {/* Dialog xác nhận ignore */}
            <Dialog open={ignoreDialogOpen} onOpenChange={setIgnoreDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Xác nhận Bỏ qua báo cáo</DialogTitle>
                        <DialogDescription>
                            Hành động này sẽ bỏ qua báo cáo và giữ lại bình luận. Bạn có chắc chắn muốn tiếp tục?
                        </DialogDescription>
                    </DialogHeader>
                    <div>Bạn có chắc chắn muốn bỏ qua báo cáo cho bình luận này không?</div>
                    <div className="flex justify-end gap-2 mt-4">
                        <Button variant="outline" onClick={() => setIgnoreDialogOpen(false)}>
                            Hủy
                        </Button>
                        <Button
                            className="bg-yellow-500 hover:bg-yellow-600 text-white"
                            onClick={handleConfirmIgnore}
                        >
                            Xác nhận Bỏ qua
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
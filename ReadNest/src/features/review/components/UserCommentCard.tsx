import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "@/components/ui/button";
import { HeartIcon, MoreVertical } from "lucide-react";
import { Card } from "@/components/ui/card";
import { formatTimeAgo } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store";
import { useState } from "react";
import ReviewInput from "./ReviewInput";
import type {
  CreateCommentReportRequest,
  GetBookResponse,
  UpdateCommentRequest,
} from "@/api/@types";
import {
  deleteCommentRequested,
  reportCommentRequested,
  updateCommentRequested,
} from "../commentSlice";
import { ReportDialog } from "./ReportDialog";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FirstParticipantAvatar } from "@/features/badge/components/avatarBadge/FirstParticipantAvatar";
import { TopUserBadge } from "@/features/badge/components/avatarBadge/TopUserBadgeProps ";

interface UserCommentCardProps {
  avatarSrc?: string;
  fullName: string;
  userName?: string;
  createdAt: string;
  comment: string;
  likeCount: number;
  userLikes: string[];
  userId?: string;
  commentId?: string;
  badgeCode?: string;
  onLikeClick?: () => void;
}

export function UserCommentCard({
  avatarSrc,
  fullName,
  userName,
  createdAt,
  comment,
  likeCount,
  userLikes,
  userId,
  commentId,
  badgeCode,
  onLikeClick,
}: UserCommentCardProps) {
  const auth = useSelector((state: RootState) => state.auth);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  // State quản lý việc hiển thị ReviewInput
  const [isModalOpen, setIsModalOpen] = useState(false);
  // State quản lý việc hiển thị form báo cáo
  const [isReportOpen, setIsReportOpen] = useState(false);
  // State quản lý lý do báo cáo
  const [reportReason, setReportReason] = useState("");

  // Hàm để xử lý gửi báo cáo
  const handleReportSubmit = () => {
    if (!reportReason.trim()) {
      toast.info("Vui lòng nhập lý do báo cáo!");
      return;
    }
    // TODO: Gửi reportReason và commentId lên server tại đây
    const reportData: CreateCommentReportRequest = {
      commentId: commentId ?? "",
      reason: reportReason,
      reporterId: auth.user.userId ?? "",
    };
    dispatch(reportCommentRequested(reportData));
    setIsReportOpen(false);
    setReportReason("");
  };

  // Hàm để xử lý lưu đánh giá vào database ở đây
  const handleSubmitReview = (reviewContent: string) => {
    const commentData: UpdateCommentRequest = {
      commentId: commentId ?? "",
      content: reviewContent,
    };
    dispatch(updateCommentRequested(commentData));
    setIsModalOpen(false); // Ẩn form sau khi submit
  };
  // Hàm để xử lý xóa comment
  const handleDelteComment = (commentId: string) => {
    dispatch(deleteCommentRequested(commentId));
  };

  const { user } = useSelector((state: RootState) => state.auth);

  const onNavigateToCreatorProfile = () => {
    if (!userName) {
      toast.error("Không tìm thấy thông tin người dùng");
      return;
    }
    navigate(`/profile/${userName}`);
  };

  return (
    <Card className="p-4">
      <div className="flex gap-4">
        <div className="relative flex flex-col items-center text-center">
          {badgeCode === "DEFAULT" && (
            <Avatar
              className="h-10 w-10 rounded-full overflow-hidden cursor-pointer"
              onClick={() => onNavigateToCreatorProfile()}
            >
              <AvatarImage
                src={avatarSrc}
                className="w-full h-full object-cover rounded-full"
              />
              <AvatarFallback className="w-full h-full flex items-center justify-center rounded-full bg-gray-200">
                {fullName?.charAt(0)}
              </AvatarFallback>
            </Avatar>
          )}
          {badgeCode === "PIONEER_001" && (
            <div
              onClick={onNavigateToCreatorProfile}
              style={{ cursor: "pointer" }}
            >
              <FirstParticipantAvatar
                avatarUrl={avatarSrc || "/default-avatar.png"}
                className="mb-3"
                avatarClassName="sm:h-10 sm:w-10 md:h-14 md:w-14"
                badgePosClassName="-top-2 right-0 transform translate-x-1/4 -translate-y-1/4 z-10"
                badgeClassName="font-medium px-2 py-0.5 text-[10px]"
                iconClassName="h-4 w-4 sm:h-4 sm:w-4"
                optionalDecorativeClassName1="sm:h-5 sm:w-5 md:h-6 md:w-6"
                optionalDecorativeClassName2="sm:h-4 sm:w-4 md:h-5 md:w-5"
              />
            </div>
          )}
          {badgeCode === "PREMIUM" && (
            <div
              onClick={onNavigateToCreatorProfile}
              style={{ cursor: "pointer" }}
            >
              <TopUserBadge
                avatarUrl={avatarSrc || "/default-avatar.png"}
                avatarClassName="sm:h-10 sm:w-10 md:h-14 md:w-14"
                badgePosClassName="-top-2 right-0 transform translate-x-1/4 -translate-y-1/4 z-10"
                badgeClassName="font-medium px-2 py-0.5 text-[10px]"
                badgeTitleClassName="min-w-[90px]"
                decorativeLeftClassName="sm:h-5 sm:w-5 md:h-6 md:w-6"
                decorativeRightClassName="sm:h-4 sm:w-4 md:h-5 md:w-5"
                valueIndicatorClassName="text-xs font-bold px-2 py-0"
                type="premiumUser"
                value={0}
                className="mb-3"
              />
            </div>
          )}

        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3
                className="font-semibold text-lg cursor-pointer"
                onClick={() => onNavigateToCreatorProfile()}
              >
                {fullName}
              </h3>
              <p className="text-gray-500 text-sm">
                {formatTimeAgo(createdAt)}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {auth.isAuthenticated && (
                <Button
                  variant="ghost"
                  className="text-gray-500 hover:bg-transparent"
                  onClick={onLikeClick}
                >
                  <HeartIcon
                    className={`h-4 w-4 mr-1 ${userLikes.includes(user.userId ?? "")
                        ? "text-red-500 fill-red-500"
                        : ""
                      }`}
                  />
                  <span>{likeCount}</span>
                </Button>
              )}
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
                    {user.userId == userId && (
                      <DropdownMenuItem
                        className="cursor-pointer bg-white hover:bg-gray-100 rounded mb-1 first:mt-0 last:mb-0"
                        onClick={() => setIsModalOpen(true)}
                      >
                        Chỉnh sửa
                      </DropdownMenuItem>
                    )}
                    {user.userId == userId && (
                      <DropdownMenuItem
                        className="cursor-pointer bg-white hover:bg-gray-100 rounded mb-1 first:mt-0 last:mb-0"
                        onClick={() => handleDelteComment(commentId ?? "")}
                      >
                        Xóa
                      </DropdownMenuItem>
                    )}
                    {user.userId !== userId && (
                      <DropdownMenuItem
                        className="cursor-pointer bg-white hover:bg-gray-100 rounded first:mt-0 last:mb-0"
                        onClick={() => setIsReportOpen(true)}
                      >
                        Báo cáo bình luận
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </div>
          <p className="text-gray-700">{comment}</p>
        </div>
      </div>
      {/* Review Input Modal */}
      <ReviewInput
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmitReview}
        book={{} as GetBookResponse} // Empty book mean update comment review
        initialContent={comment} // Set initial content to the current comment
        isUpdate={true} // Indicate that this is an update mode
      />
      <ReportDialog
        isOpen={isReportOpen}
        onOpenChange={setIsReportOpen}
        reportReason={reportReason}
        onReportReasonChange={setReportReason}
        onSubmit={handleReportSubmit}
      />
    </Card>
  );
}

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { RecentReviewCard } from "@/features/profile/components/RecentReviewCard";
import { CameraIcon, PlusIcon } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import {
  fetchUserProfileRequested,
  setIsProfileNotFound,
  updateProfileRequested,
} from "@/features/profile/profileSlice";
import type { RootState } from "@/store";
import { EditProfileModal } from "@/features/profile/components/EditProfileModal";
import { toast } from "react-toastify";
import { uploadFileToCloudinary } from "@/lib/utils";
import { fetchTop3RecentCommentsRequested } from "@/features/review/commentSlice";
import { setAvatarUrl } from "@/features/auth/authSlice";
import { fetchPostsByUserIdStart, resetState } from "@/features/post/postSlice";
import { RecentPostCard } from "@/features/profile/components/RecentPostCard";
import parse from "html-react-parser";
import { BadgeSelectionButton } from "@/features/badge/components/BadgeButton/BadgeSelectionButton";
import type { UserBadgeResponse } from "@/api/@types";
import { FirstParticipantAvatar } from "@/features/badge/components/avatarBadge/FirstParticipantAvatar";

export default function ProfilePage() {
  const [showModalAvatar, setShowModalAvatar] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { username } = useParams<{ username: string }>();
  const { profile } = useSelector((state: RootState) => state.profile);
  const { isLoading } = useSelector((state: RootState) => state.profile);
  // Removed incorrect and unused profileError destructuring
  const isProfileNotFound = useSelector(
    (state: RootState) => state.profile.isProfileNotFound
  );
  const { user } = useSelector((state: RootState) => state.auth);
  const comment = useSelector((state: RootState) => state.comment);
  const posts = useSelector((state: RootState) => state.post.posts);

  // ========== Avatar Upload ========== //
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Xử lý chọn file ảnh
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.size > 5 * 1024 * 1024) {
      toast.error("Kích thước file không được vượt quá 5MB");
      return;
    }

    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onload = () => setAvatarPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  // Xử lý lưu avatar mới
  const handleSaveAvatar = async () => {
    if (!avatarFile) {
      toast.error("Vui lòng chọn ảnh!");
      return;
    }
    setIsUploading(true);
    try {
      // Upload lên Cloudinary
      const uploadResult = await uploadFileToCloudinary(avatarFile);
      if (!uploadResult) {
        toast.error("Upload ảnh thất bại!");
        setIsUploading(false);
        return;
      }
      const data = {
        userId: user.userId,
        avatarUrl: uploadResult,
      };
      // Gọi API update profile (chỉ update avatar)
      dispatch(updateProfileRequested(data));
      dispatch(setAvatarUrl(uploadResult));
      // toast.success("Cập nhật avatar thành công!");
      setShowModalAvatar(false);
      setAvatarPreview(null);
      setAvatarFile(null);
    } catch {
      toast.error("Có lỗi khi cập nhật avatar!");
    } finally {
      setIsUploading(false);
    }
  };

  //Call API to get user data
  useEffect(() => {
    dispatch(setIsProfileNotFound(false));
    dispatch(resetState());
    if (username) {
      dispatch(fetchUserProfileRequested(username));
      dispatch(fetchTop3RecentCommentsRequested(username));
    }
  }, [username]);

  useEffect(() => {
    if (profile.userId) {
      dispatch(fetchPostsByUserIdStart({ 
        userId: profile.userId, 
        paging: { 
          pageIndex: 1, 
          pageSize: 3 
        } 
      }));
    }
  }, [profile.userId]);

  // Navigate to 404 if user not found
  useEffect(() => {
    if (isProfileNotFound && isLoading === false) {
      navigate("/404");
    }
  }, [isProfileNotFound, isLoading, navigate]);

  // Get selected badge code
  const selectedBadge =
    Array.isArray(profile.ownedBadges) && profile.ownedBadges.length > 0
      ? profile.ownedBadges.find((badge: UserBadgeResponse) => badge.isSelected)
      : undefined;

  return (
    <div className="container mx-auto py-8 px-10">
      {/* Top Profile Page */}
      <Card className="p-4">
        <div className="flex items-center space-x-4 mb-1">
          {/* Profile Header */}
          <div className="relative flex flex-col items-center text-center">
            <div className="flex flex-col items-center">
              {selectedBadge?.badgeCode === "DEFAULT" && (
                <Avatar className="h-40 w-40 mb-4">
                  <AvatarImage
                    src={profile.avatarUrl ?? "https://github.com/shadcn.png"}
                  />
                  <AvatarFallback className="text-5xl font-bold">{profile.fullName?.charAt(0)}</AvatarFallback>
                </Avatar>
              )}
              {selectedBadge?.badgeCode === "PIONEER_001" && (
                <FirstParticipantAvatar
                  avatarUrl={profile.avatarUrl ?? ""}
                  className="mb-3"
                />
              )}
              {selectedBadge?.badgeCode === "TOP1" && (
                <>
                  {/* <TopContributorBadge
                    avatarUrl={profile.avatarUrl ?? ""}
                    rank={1}
                    contributionCount={42}
                  /> */}
                </>
              )}
              {selectedBadge?.badgeCode === "TOP2" && (
                <>
                  {/* <TopContributorBadge
                    avatarUrl={profile.avatarUrl ?? ""}
                    rank={2}
                    contributionCount={42}
                  /> */}
                </>
              )}
              {selectedBadge?.badgeCode === "TOP3" && (
                <>
                  {/* <TopContributorBadge
                    avatarUrl={profile.avatarUrl ?? ""}
                    rank={3}
                    contributionCount={42}
                  /> */}
                </>
              )}
              {selectedBadge?.badgeCode === "MOST_ACTIVE" && (
                <>
                  {/* <TopUserBadge
                    avatarUrl={profile.avatarUrl ?? ""}
                    type="mostActive"
                    value={1250}
                    className="mx-2"
                  /> */}
                </>
              )}
            </div>


            {user.userId == profile.userId && (
              <Button
                className="absolute bottom-3 right-2 p-2 rounded-full shadow-md bg-blue-500 hover:bg-blue-600 text-white"
                onClick={() => setShowModalAvatar(true)}
              >
                <CameraIcon />
              </Button>
            )}
          </div>
          <div className="w-full flex flex-col items-start">
            {/* Profile Info */}
            <div className="flex flex-col items-center text-center ml-10">
              <h1 className="text-2xl font-bold">{profile.fullName}</h1>
              <p className="text-gray-500">@{profile.userName}</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 text-center mt-6">
              <div>
                <p className="text-2xl font-bold">{profile.numberOfPosts}</p>
                <p className="text-sm text-gray-500">Bài viết</p>
              </div>
              <div>
                <p className="text-2xl font-bold">{profile.numberOfComments}</p>
                <p className="text-sm text-gray-500">Lượt đánh giá</p>
              </div>
              <div>
                <p className="text-2xl font-bold">{profile.ratingScores}</p>
                <p className="text-sm text-gray-500">Điểm đánh giá</p>
              </div>
            </div>
          </div>
          <div className="w-full flex justify-end">
            {/* Edit Profile Button */}
            {user.userId == profile.userId && (
              <EditProfileModal
                profileData={{
                  fullName: profile.fullName ?? "",
                  dateOfBirth: profile.dateOfBirth?.split("T")[0] ?? "",
                  bio: profile.bio ?? "",
                  address: profile.address ?? "",
                }}
              />
            )}
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
              &emsp;&emsp;
              {profile.bio == ""
                ? "Người dùng này quá lười để viết phần giới thiệu"
                : profile.bio}
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
                {profile.address ?? "Chưa cập nhật địa chỉ"}
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
                {profile.dateOfBirth
                  ? new Date(profile.dateOfBirth).toLocaleDateString("vi-VN", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })
                  : "Chưa cập nhật ngày sinh"}
              </li>
            </ul>
          </Card>
        </div>

        {/* Right Column */}
        <div className="w-full md:w-2/3 space-y-6">
          {/* Recent Posts */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold">
                Bài viết gần đây
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {posts && posts.length > 0 ? (
                posts.map((post) => (
                  <RecentPostCard
                    key={post.id}
                    postId={post.id ?? ""}
                    bookImage={post.book?.imageUrl ?? ""}
                    postTitle={post.title ?? ""}
                    content={parse(post.content ?? "")}
                    likes={post.likesCount ?? 0}
                  />
                ))
              ) : (
                <div className="col-span-3 text-center text-gray-500 text-lg py-8 font-semibold">
                  Hiện tại chưa có bài post nào được đăng tải gần đây
                </div>
              )}
            </div>
            </CardContent>
          </Card>

          {/* Recent Reviews */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold">
                Đánh giá gần đây
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {comment.isLoadingTop3 ? (
                <div className="col-span-3 text-center text-gray-500 text-lg py-8 font-semibold">
                  Đang tải đánh giá gần đây...
                </div>
              ) : !comment.top3RecentComments ||
                comment.top3RecentComments.length === 0 ? (
                <div className="col-span-3 text-center text-gray-500 text-lg py-8 font-semibold">
                  Hiện tại chưa có review nào được đăng tải gần đây
                </div>
              ) : (
                comment.top3RecentComments.map((review: any) => (
                  <RecentReviewCard
                    key={review.commentId}
                    // bookImage={review.book?.imageUrl ?? "https://via.placeholder.com/150"}
                    // bookName={review.book?.title ?? "Chưa cập nhật tên sách"}
                    book={
                      review.book ?? {
                        imageUrl: "",
                        title: "Chưa cập nhật tên sách",
                      }
                    }
                    author={review.book?.author ?? "Chưa cập nhật tác giả"}
                    likes={review.numberOfLikes ?? 0}
                    content={review.content ?? "Chưa có nội dung đánh giá"}
                    userLikes={review.userLikes ?? []}
                    commentId={review.commentId ?? ""} // Ensure commentId is passed correctly
                  />
                ))
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      {/* Modal for Avatar Change */}
      {showModalAvatar && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-4 text-center">
              Thay đổi Avatar
            </h2>
            <Separator className="mb-4 w-full" />
            <div className="flex flex-col items-center space-y-4">
              <div className="flex items-center space-x-4">
                <label className="cursor-pointer inline-flex items-center bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
                  <PlusIcon className="mr-2" /> Chọn ảnh
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarChange}
                  />
                </label>
                <BadgeSelectionButton canSelectedBadgeList={profile.ownedBadges ?? []} />
              </div>
              {showModalAvatar && (
                <div className="flex flex-col items-center space-y-4">
                  <div className="flex flex-col items-center mb-5">
                    {selectedBadge?.badgeCode === "DEFAULT" && (
                      <Avatar className="h-40 w-40 mb-4">
                        <AvatarImage
                          src={avatarPreview ?? profile.avatarUrl ?? "https://github.com/shadcn.png"}
                        />
                        <AvatarFallback className="text-5xl font-bold">{profile.fullName?.charAt(0)}</AvatarFallback>
                      </Avatar>
                    )}
                    {selectedBadge?.badgeCode === "PIONEER_001" && (
                      <FirstParticipantAvatar
                        avatarUrl={avatarPreview ?? profile.avatarUrl ?? ""}
                        className="mb-3"
                      />
                    )}
                    {selectedBadge?.badgeCode === "TOP1" && (
                      <>
                        {/* <TopContributorBadge
                          avatarUrl={profile.avatarUrl ?? ""}
                          rank={1}
                          contributionCount={42}
                        /> */}
                      </>
                    )}
                    {selectedBadge?.badgeCode === "TOP2" && (
                      <>
                        {/* <TopContributorBadge
                          avatarUrl={profile.avatarUrl ?? ""}
                          rank={2}
                          contributionCount={42}
                        /> */}
                      </>
                    )}
                    {selectedBadge?.badgeCode === "TOP3" && (
                      <>
                        {/* <TopContributorBadge
                          avatarUrl={profile.avatarUrl ?? ""}
                          rank={3}
                          contributionCount={42}
                        /> */}
                      </>
                    )}
                    {selectedBadge?.badgeCode === "MOST_ACTIVE" && (
                      <>
                        {/* <TopUserBadge
                          avatarUrl={profile.avatarUrl ?? ""}
                          type="mostActive"
                          value={1250}
                          className="mx-2"
                        /> */}
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
            <div className="flex justify-end space-x-2">
              <Button
                className="bg-blue-500 hover:bg-blue-600 text-white"
                onClick={handleSaveAvatar}
                disabled={isUploading}
              >
                {isUploading ? "Đang lưu..." : "Lưu"}
              </Button>
              <Button
                className="bg-gray-300 hover:bg-gray-400 text-black"
                onClick={() => {
                  setShowModalAvatar(false);
                  setAvatarPreview(null);
                  setAvatarFile(null);
                }}
                disabled={isUploading}
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

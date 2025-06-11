"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FrameIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "react-toastify";
import { FirstParticipantAvatar } from "../avatarBadge/FirstParticipantAvatar";
import { TopContributorBadge } from "../avatarBadge/TopContributorBadge";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store";
import { TopUserBadge } from "../avatarBadge/TopUserBadgeProps ";
import type { UserBadgeResponse } from "@/api/@types";
import { fetchBadgesRequested } from "../../badgeSlice";
import { Description } from "@radix-ui/react-dialog";
import { selectedNewBadgeRequest } from "@/features/userBadge/userBadgeSlice";

export function BadgeSelectionButton({ canSelectedBadgeList }: { canSelectedBadgeList: UserBadgeResponse[] }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedBadge, setSelectedBadge] = useState<string | null>(null);
    const badge = useSelector((state: RootState) => state.badge);
    const auth = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();

    // Lấy danh sách badge từ API
    useEffect(() => {
        dispatch(fetchBadgesRequested());
    }, [dispatch]);

    // Map badge type/id sang component
    const badgeComponentMap = {
        DEFAULT: (
            <Avatar className="h-32 w-32 sm:h-40 sm:w-40 md:h-44 md:w-44">
                <AvatarImage src={auth.user.avatarUrl || ""} />
                <AvatarFallback>{auth.user.fullName?.charAt(0)}</AvatarFallback>
            </Avatar>
        ),
        PIONEER_001: <FirstParticipantAvatar avatarUrl={auth.user.avatarUrl || ""} />,
        TOP1: <TopContributorBadge avatarUrl={auth.user.avatarUrl || ""} rank={1} contributionCount={100} />,
        TOP2: <TopContributorBadge avatarUrl={auth.user.avatarUrl || ""} rank={2} contributionCount={80} />,
        TOP3: <TopContributorBadge avatarUrl={auth.user.avatarUrl || ""} rank={3} contributionCount={60} />,
        MOST_LIKED: <TopUserBadge avatarUrl={auth.user.avatarUrl || ""} type="mostLiked" value={150} />,
        MOST_ACTIVE: <TopUserBadge avatarUrl={auth.user.avatarUrl || ""} type="mostActive" value={200} />,
        TOP_TRENDING: <TopUserBadge avatarUrl={auth.user.avatarUrl || ""} type="trending" value={50} />,
        // ... các badge khác
    };

    const handleSelectBadge = (badgeId: string) => {
        setSelectedBadge(badgeId);
    };

    const handleApplyBadge = () => {
        if (!selectedBadge) {
            toast.warning("Vui lòng chọn khung ảnh đại diện");
            return;
        }

        // Here you would call your API to update the user's badge
        if (!auth.user.userId) {
            toast.error("Không tìm thấy thông tin người dùng.");
            return;
        }
        dispatch(selectedNewBadgeRequest({ userId: auth.user.userId, badgeId: selectedBadge }));
        setIsOpen(false);
    };

    return (
        <>
            <Button
                className="cursor-pointer inline-flex items-center bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded"
                onClick={() => setIsOpen(true)}
            >
                <FrameIcon className="mr-2" /> Chọn khung
            </Button>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="sm:max-w-[900px]">
                    <DialogHeader>
                        <DialogTitle className="text-center font-bold">Chọn khung ảnh đại diện</DialogTitle>
                    </DialogHeader>
                    <Description />

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 py-4 justify-center items-center max-h-[80vh] overflow-y-auto">
                        {badge.badges.map((badge) => {
                            const isSelectable = canSelectedBadgeList.some(b => b.badgeCode === badge.code);
                            return (
                                <div
                                    key={badge.code}
                                    className={`flex justify-center items-center p-4 rounded-lg border-2 transition-all
                    ${isSelectable ? "cursor-pointer" : "opacity-50 cursor-not-allowed pointer-events-none"}
                    ${selectedBadge === badge.code && isSelectable ? "border-indigo-600 bg-indigo-50" : "border-gray-200 bg-white hover:border-indigo-400"}
                `}
                                    onClick={() => isSelectable && badge.id && handleSelectBadge(badge.id)}
                                >
                                    {badgeComponentMap[badge.code as keyof typeof badgeComponentMap] || <span>Chưa hỗ trợ</span>}
                                </div>
                            );
                        })}
                    </div>

                    <div className="flex justify-end gap-2 pt-4 border-t">
                        <Button variant="outline" onClick={() => setIsOpen(false)}>
                            Hủy bỏ
                        </Button>
                        <Button className="bg-violet-500" onClick={handleApplyBadge} disabled={!selectedBadge}>
                            Áp dụng khung
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
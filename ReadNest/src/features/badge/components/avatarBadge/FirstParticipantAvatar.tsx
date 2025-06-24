import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { StarIcon } from "lucide-react";
import { useState } from "react";

interface FirstParticipantAvatarProps {
    avatarUrl?: string;
    className?: string;
    avatarClassName?: string;
    badgePosClassName?: string; // Class for the badge position
    badgeClassName?: string;
    iconClassName?: string; // Class for the icon
    optionalDecorativeClassName1?: string; // Optional class for decorative elements
    optionalDecorativeClassName2?: string; // Optional class for decorative elements
}

export function FirstParticipantAvatar({
    avatarUrl,
    className = "",
    avatarClassName = "h-32 w-32 sm:h-40 sm:w-40 md:h-44 md:w-44", // Mặc định
    badgePosClassName = "top-0 right-0 transform translate-x -translate-y-1/4 z-10", // Class for the badge position
    badgeClassName = "text-xs sm:text-sm font-medium px-3 py-1", // Mặc định
    iconClassName = "h-5 w-5 sm:h-5 sm:w-5", // Class for the icon
    optionalDecorativeClassName1 = "h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8", // Optional class for decorative elements
    optionalDecorativeClassName2 = "h-5 w-5 sm:h-6 sm:w-6" // Optional class for decorative elements
}: FirstParticipantAvatarProps) {
    const [showTooltip, setShowTooltip] = useState(false);
    const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
    // Handler để lấy vị trí chuột
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        setTooltipPos({ x: e.clientX, y: e.clientY });
    };
    return (
        <div className={`relative ${className}`}>
            {/* Avatar container with responsive sizing */}
            {/* <div className="relative h-32 w-32 sm:h-40 sm:w-40 md:h-44 md:w-44 rounded-full p-1 bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-600 shadow-lg"> */}
            <div className={`relative ${avatarClassName} rounded-full p-1 bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-600 shadow-lg`}>
                {/* Inner glow effect */}
                <div className="absolute inset-0 rounded-full border-[3px] sm:border-4 border-white/30 pointer-events-none" />

                {/* Responsive avatar */}
                <Avatar className="h-full w-full border-[3px] sm:border-4 border-white">
                    <AvatarImage src={avatarUrl ?? "https://github.com/shadcn.png"} />
                    <AvatarFallback className="bg-amber-100 text-amber-800 font-bold">
                        FP
                    </AvatarFallback>
                </Avatar>
            </div>

            {/* First participant badge - responsive positioning and sizing */}
            <div className={`absolute ${badgePosClassName}`}
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                onMouseMove={handleMouseMove}
            >
                <div className={`flex items-center gap-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white ${badgeClassName} rounded-full shadow-lg whitespace-nowrap`}>
                    <StarIcon className={`${iconClassName} text-yellow-300 fill-yellow-300`} />
                    <span className="font-bold">Người Tiên Phong</span>
                </div>
            </div>

            {/* Optional decorative elements - responsive sizing */}
            <div className={`absolute -bottom-1 -left-1 ${optionalDecorativeClassName1} rounded-full bg-amber-400/30`} />
            <div className={`absolute -bottom-1 -right-1 ${optionalDecorativeClassName2} rounded-full bg-amber-400/20`} />

            {/* Tooltip */}
            {showTooltip && (
                <div
                    className="fixed z-50 px-4 py-2 bg-white text-gray-800 text-sm rounded-lg shadow-lg border border-gray-200 cursor-not-allowed"
                    style={{
                        left: tooltipPos.x + 12,
                        top: tooltipPos.y + 12,
                        maxWidth: 440,
                        width: "max-content",
                    }}
                >
                    Danh hiệu dành cho những người đăng ký phiên bản đầu tiên của nền tảng. <br />
                    <span className="font-bold text-center">Cảm ơn bạn đã đồng hành cùng ReadNest!</span>
                </div>
            )}
        </div>
    )
}
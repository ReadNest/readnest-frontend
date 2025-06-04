import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { StarIcon } from "lucide-react";

interface FirstParticipantAvatarProps {
    avatarUrl?: string;
    className?: string;
}

export function FirstParticipantAvatar({
    avatarUrl,
    className = ""
}: FirstParticipantAvatarProps) {
    return (
        <div className={`relative ${className}`}>
            {/* Avatar container with responsive sizing */}
            <div className="relative h-32 w-32 sm:h-40 sm:w-40 md:h-44 md:w-44 rounded-full p-1 bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-600 shadow-lg">
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
            <div className="absolute top-0 right-0 transform translate-x -translate-y-1/4 z-10">
                <div className="flex items-center gap-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs sm:text-sm font-medium px-3 py-1 rounded-full shadow-lg whitespace-nowrap">
                    <StarIcon className="h-5 w-5 sm:h-5 sm:w-5 text-yellow-300 fill-yellow-300" />
                    <span className="font-bold">Người Tiên Phong</span>
                </div>
            </div>

            {/* Optional decorative elements - responsive sizing */}
            <div className="absolute -bottom-1 -left-1 h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 rounded-full bg-amber-400/30" />
            <div className="absolute -bottom-1 -right-1 h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-amber-400/20" />
        </div>
    )
}
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { ZapIcon, TrendingUpIcon, HeartIcon } from "lucide-react" // You may need to import these

interface TopUserBadgeProps {
    avatarUrl?: string;
    className?: string;
    type: "mostLiked" | "mostActive" | "trending";
    value: number; // Can be likes count or activity points
}

export function TopUserBadge({
    avatarUrl,
    className = "",
    type,
    value
}: TopUserBadgeProps) {
    // Type-specific styling
    const badgeConfig = {
        mostLiked: {
            title: "Bài Viết Hot Nhất",
            gradient: "from-blue-400 via-cyan-500 to-sky-600",
            icon: <HeartIcon className="h-5 w-5 text-pink-400 fill-pink-400" />,
            border: "border-2 border-pink-400",
            glow: "shadow-lg shadow-blue-500/50",
            valueText: (
                <>
                    {value} <HeartIcon className="inline h-3 w-3 text-pink-400 fill-pink-400" />
                </>
            ),
        },
        mostActive: {
            title: "Thành Viên Tích Cực",
            gradient: "from-cyan-400 via-sky-500 to-blue-600",
            icon: <ZapIcon className="h-5 w-5 text-yellow-300 fill-yellow-300" />,
            border: "border-2 border-yellow-400",
            glow: "shadow-lg shadow-cyan-500/50",
            valueText: `${value} hoạt động`
        },
        trending: {
            title: "Đang Lên",
            gradient: "from-sky-400 via-blue-500 to-indigo-600",
            icon: <TrendingUpIcon className="h-5 w-5 text-green-400 fill-green-400" />,
            border: "border-2 border-green-400",
            glow: "shadow-lg shadow-sky-500/50",
            valueText: `+${value} tuần này`
        }
    };

    const { title, gradient, icon, border, glow, valueText } = badgeConfig[type];

    return (
        <div className={`relative ${className} group`}>
            {/* Avatar container with animated glow */}
            <div className={`relative h-32 w-32 sm:h-40 sm:w-40 rounded-full p-1 bg-gradient-to-br ${gradient} ${glow} transition-all duration-300 group-hover:shadow-xl group-hover:shadow-blue-500/70`}>
                {/* Inner glow effect */}
                <div className="absolute inset-0 rounded-full border-[3px] border-white/30 pointer-events-none" />

                {/* Avatar with animated scale */}
                <Avatar className={`h-full w-full ${border} transition-transform duration-300 group-hover:scale-105`}>
                    <AvatarImage src={avatarUrl ?? "https://github.com/shadcn.png"} />
                    <AvatarFallback className="bg-blue-100 text-blue-800 font-bold">
                        {type === "mostLiked" ? "MV" : type === "mostActive" ? "TV" : "TT"}
                    </AvatarFallback>
                </Avatar>
            </div>

            {/* Main badge with animation */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/4 z-10 transition-all duration-300 group-hover:-translate-y-1/3">
                <div className={`flex items-center gap-1 bg-gradient-to-r ${gradient} text-white text-xs sm:text-sm font-bold px-3 py-1 rounded-full ${glow} whitespace-nowrap backdrop-blur-sm`}>
                    {icon}
                    <span>{title}</span>
                </div>
            </div>

            {/* Value indicator with floating animation */}
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 z-10 transition-all duration-500 group-hover:-translate-y-1">
                <div className="bg-blue-800/90 text-blue-100 text-xs font-bold px-3 py-1 rounded-full shadow-md backdrop-blur-sm whitespace-nowrap">
                    {valueText}
                </div>
            </div>

            {/* Animated decorative elements */}
            <div className="absolute -bottom-1 -left-1 h-5 w-5 rounded-full bg-blue-400/30 transition-all duration-500 group-hover:h-6 group-hover:w-6" />
            <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-blue-400/20 transition-all duration-500 group-hover:h-5 group-hover:w-5" />

            {/* Optional animated rings */}
            <div className="absolute inset-0 rounded-full border-2 border-blue-400/20 pointer-events-none transition-all duration-700 group-hover:border-4 group-hover:border-blue-400/30 group-hover:scale-110" />
        </div>
    );
}
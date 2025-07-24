import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { ZapIcon, TrendingUpIcon, HeartIcon, CrownIcon } from "lucide-react"

interface TopUserBadgeProps {
    avatarUrl?: string;
    className?: string;
    type: "premiumUser" | "mostActive" | "trending";
    value: number;

    // Optional classNames for flexibility
    avatarClassName?: string;
    badgePosClassName?: string;
    badgeClassName?: string;
    badgeTitleClassName?: string;
    valueIndicatorClassName?: string;
    decorativeLeftClassName?: string;
    decorativeRightClassName?: string;
    ringClassName?: string;
}

export function TopUserBadge({
    avatarUrl,
    className = "",
    type,
    value,
    avatarClassName = "h-32 w-32 sm:h-40 sm:w-40",
    badgePosClassName = "top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/4",
    badgeClassName = "text-xs sm:text-sm font-bold px-3 py-1",
    badgeTitleClassName = "min-w-[120px]",
    valueIndicatorClassName = "text-xs font-bold px-3 py-1",
    decorativeLeftClassName = "h-5 w-5",
    decorativeRightClassName = "h-4 w-4",
    ringClassName = "border-2 group-hover:border-4"
}: TopUserBadgeProps) {
    const badgeConfig = {
        premiumUser: {
            title: "Người ủng hộ",
            gradient: "from-blue-400 via-cyan-500 to-sky-600",
            icon: <CrownIcon className="h-5 w-5 text-yellow-400 fill-yellow-400" />,
            border: "border-2 border-pink-400",
            glow: "shadow-lg shadow-blue-500/50",
            valueText: (
                <>
                    <HeartIcon className="inline h-3 w-3 text-pink-400 fill-pink-400" />
                    <HeartIcon className="inline h-3 w-3 text-pink-400 fill-pink-400" />
                    <HeartIcon className="inline h-3 w-3 text-pink-400 fill-pink-400" />
                </>
            ),
        },
        mostActive: {
            title: "Thành Viên Tích Cực",
            gradient: "from-cyan-400 via-sky-500 to-blue-600",
            icon: <ZapIcon className="h-5 w-5 text-yellow-300 fill-yellow-300" />,
            border: "border-2 border-yellow-400",
            glow: "shadow-lg shadow-cyan-500/50",
            valueText: `${value} hoạt động`,
        },
        trending: {
            title: "Đang Lên",
            gradient: "from-sky-400 via-blue-500 to-indigo-600",
            icon: <TrendingUpIcon className="h-5 w-5 text-green-400 fill-green-400" />,
            border: "border-2 border-green-400",
            glow: "shadow-lg shadow-sky-500/50",
            valueText: `+${value} tuần này`,
        }
    };

    const { title, gradient, icon, border, glow, valueText } = badgeConfig[type];

    return (
        <div className={`relative group ${className}`}>
            {/* Avatar Container */}
            <div className={`relative ${avatarClassName} rounded-full p-1 bg-gradient-to-br ${gradient} ${glow} transition-all duration-300 group-hover:shadow-xl`}>
                {/* Inner Glow */}
                <div className="absolute inset-0 rounded-full border-[3px] border-white/30 pointer-events-none" />

                {/* Avatar */}
                <Avatar className={`h-full w-full ${border} transition-transform duration-300 group-hover:scale-105`}>
                    <AvatarImage src={avatarUrl ?? "https://github.com/shadcn.png"} />
                    <AvatarFallback className="bg-blue-100 text-blue-800 font-bold">
                        {type === "premiumUser" ? "MV" : type === "mostActive" ? "TV" : "TT"}
                    </AvatarFallback>
                </Avatar>
            </div>

            {/* Badge */}
            <div className={`absolute z-10 ${badgePosClassName} transition-all duration-300 group-hover:-translate-y-1/3`}>
                <div className={`flex items-center bg-gradient-to-r ${gradient} text-white ${badgeClassName} rounded-full shadow-md backdrop-blur-sm`}>
                    {icon}
                    <span className={`${badgeTitleClassName} text-center`}>{title}</span>
                </div>
            </div>

            {/* Value Indicator */}
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 z-10 transition-all duration-500 group-hover:-translate-y-1">
                <div className={`bg-blue-800/90 text-blue-100 ${valueIndicatorClassName} ${glow} rounded-full shadow-md backdrop-blur-sm whitespace-nowrap`}>
                    {valueText}
                </div>
            </div>

            {/* Decorative elements */}
            <div className={`absolute -bottom-1 -left-1 ${decorativeLeftClassName} rounded-full bg-blue-400/30 transition-all duration-500 group-hover:scale-110`} />
            <div className={`absolute -bottom-1 -right-1 ${decorativeRightClassName} rounded-full bg-blue-400/20 transition-all duration-500 group-hover:scale-110`} />

            {/* Outer ring */}
            <div className={`absolute inset-0 rounded-full border-blue-400/20 pointer-events-none transition-all duration-700 group-hover:scale-110 ${ringClassName}`} />
        </div>
    );
}

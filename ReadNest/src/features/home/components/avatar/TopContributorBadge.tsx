import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { TrophyIcon, MedalIcon, AwardIcon } from "lucide-react" // You may need to import these icons

interface TopContributorBadgeProps {
    avatarUrl?: string;
    className?: string;
    rank: 1 | 2 | 3;
    contributionCount: number;
}

export function TopContributorBadge({
    avatarUrl,
    className = "",
    rank,
    contributionCount
}: TopContributorBadgeProps) {
    // Rank-specific styling
    const rankConfig = {
        1: {
            gradient: "from-purple-500 via-fuchsia-500 to-pink-500",
            icon: <TrophyIcon className="h-5 w-5 text-white-300 fill-yellow-300" />,
            border: "border-2 border-yellow-400",
            glow: "shadow-lg shadow-purple-500/50"
        },
        2: {
            gradient: "from-indigo-500 via-purple-500 to-violet-500",
            icon: <MedalIcon className="h-5 w-5 text-gray-400 fill-gray-300" />,
            border: "border-2 border-gray-300",
            glow: "shadow-lg shadow-indigo-500/50"
        },
        3: {
            gradient: "from-violet-500 via-purple-400 to-fuchsia-500",
            icon: <AwardIcon className="h-5 w-5 text-white-400 fill-amber-400" />,
            border: "border-2 border-amber-300",
            glow: "shadow-lg shadow-violet-500/50"
        }
    };

    const { gradient, icon, border, glow } = rankConfig[rank];

    return (
        <div className={`relative ${className}`}>
            {/* Avatar container with rank-specific styling */}
            <div className={`relative h-32 w-32 sm:h-40 sm:w-40 rounded-full p-1 bg-gradient-to-br ${gradient} ${glow}`}>
                {/* Inner glow effect */}
                <div className="absolute inset-0 rounded-full border-[3px] border-white/30 pointer-events-none" />

                {/* Avatar with rank border */}
                <Avatar className={`h-full w-full ${border}`}>
                    <AvatarImage src={avatarUrl ?? "https://github.com/shadcn.png"} />
                    <AvatarFallback className="bg-purple-100 text-purple-800 font-bold">
                        TC{rank}
                    </AvatarFallback>
                </Avatar>
            </div>

            {/* Rank badge */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/4 z-10">
                <div className={`flex items-center gap-1 bg-gradient-to-r ${gradient} text-white text-xs sm:text-sm font-bold px-3 py-1 rounded-full ${glow} whitespace-nowrap`}>
                    {icon}
                    <span>Top {rank}</span>
                </div>
            </div>

            {/* Contribution count */}
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 translate-y-1/4 z-10">
                <div className="bg-purple-800 text-purple-100 text-xs font-bold px-2 py-1 rounded-full shadow-md whitespace-nowrap">
                    {contributionCount} điểm đánh giá
                </div>
            </div>

            {/* Optional decorative elements */}
            <div className="absolute -bottom-1 -left-1 h-5 w-5 rounded-full bg-purple-400/30" />
            <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-purple-400/20" />
        </div>
    );
}
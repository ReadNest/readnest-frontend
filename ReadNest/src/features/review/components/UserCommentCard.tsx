import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import { Button } from "@/components/ui/button"
import { HeartIcon } from "lucide-react"
import { Card } from "@/components/ui/card"
import { formatTimeAgo } from "@/lib/utils"

interface UserCommentCardProps {
    avatarSrc?: string
    username: string
    createdAt: string
    comment: string
    likeCount: number
    onLikeClick?: () => void
}

export function UserCommentCard({
    avatarSrc,
    username,
    createdAt,
    comment,
    likeCount,
    onLikeClick,
}: UserCommentCardProps) {
    // Get initials for fallback avatar
    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map(part => part[0])
            .join('')
            .toUpperCase()
    }

    return (
        <Card className="p-4">
            <div className="flex gap-4">
                <div className="relative flex flex-col items-center text-center">
                    <Avatar className="h-10 w-10">
                        <AvatarImage src={avatarSrc} />
                        <AvatarFallback>{getInitials(username)}</AvatarFallback>
                    </Avatar>
                </div>
                <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                        <div>
                            <h3 className="font-semibold text-lg">{username}</h3>
                            <p className="text-gray-500 text-sm">{formatTimeAgo(createdAt)}</p>
                        </div>
                        <Button
                            variant="ghost"
                            className="text-gray-500 hover:bg-transparent"
                            onClick={onLikeClick}
                        >
                            <HeartIcon className="h-4 w-4 mr-1" />
                            <span>{likeCount}</span>
                        </Button>
                    </div>
                    <p className="text-gray-700">{comment}</p>
                </div>
            </div>
        </Card>
    )
}
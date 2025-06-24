import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { HeartIcon, BookmarkIcon, Share2Icon, EyeIcon } from "lucide-react";
import { formatTimeAgo } from "@/lib/utils";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface RelatedPostCard {
  postId: string;
  userName: string;
  authorName: string;
  avatarUrl?: string;
  avatarFallback: string;
  createdAt: string;
  title: string;
  content: ReactNode;
  likes: number;
  userLikes: string[];
  userId: string;
  onLikeClick: () => void;
  views: number;
}

export default function RelatedPostCard({
  postId,
  userName,
  authorName,
  avatarUrl,
  avatarFallback,
  createdAt,
  title,
  content,
  likes,
  userLikes,
  userId,
  onLikeClick,
  views,
}: RelatedPostCard) {
    const navigate = useNavigate();
    const isLiked = userLikes.includes(userId);
  return (
    <Card className="p-4 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
                <Avatar 
                className="h-10 w-10 border-2 border-white shadow flex-shrink-0 cursor-pointer"
                onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/profile/${userName}`);
                }}>
                    <AvatarImage src={avatarUrl} />
                    <AvatarFallback className="bg-gradient-to-r from-blue-400 to-purple-500 text-white">
                    {avatarFallback}
                    </AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                    <h3 
                        className="font-semibold text-gray-800 truncate cursor-pointer"
                        onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/profile/${userName}`);
                        }}
                    >
                        {authorName}
                    </h3>
                    <p className="text-gray-500 text-sm">{formatTimeAgo(createdAt)}</p>
                </div>
            </div>

            <div className="space-y-2">
                <h4
                    className="font-bold text-gray-900 text-xl line-clamp-1 cursor-pointer"
                    onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/post/${postId}`);
                    }}
                >
                    {title}
                </h4>
                <div className="text-gray-600 line-clamp-2 min-h-[50px] max-h-5">{content}</div>
            </div>

            <div className="flex justify-between items-center pt-2">
                <div className="flex gap-4">
                    <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-gray-500 hover:bg-gray-50 gap-1 whitespace-nowrap"
                        onClick={(e) => {
                            e.stopPropagation();
                            onLikeClick();
                        }}
                    >
                        <HeartIcon
                        className={`h-4 w-4 ${
                        isLiked ? "text-red-500 fill-red-500" : "text-gray-500 fill-transparent"
                        }`}
                        />
                        <span>{likes}</span>
                    </Button>
                    <div 
                        className="flex items-center text-gray-600"
                        
                    >
                        <EyeIcon className="h-4 w-4 mr-1 text-blue-500" />
                        <span>{views}</span>
                    </div>
                </div>
            
                <div className="flex gap-2">
                    <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-gray-500 hover:bg-gray-50 p-2"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <BookmarkIcon className="h-4 w-4" />
                    </Button>
                    <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-gray-500 hover:bg-gray-50 p-2"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Share2Icon className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    </Card>
  );
}
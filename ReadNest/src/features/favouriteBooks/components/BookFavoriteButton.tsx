import { Heart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavoriteStart } from "@/features/favouriteBooks/favoriteSlice";
import type { RootState } from "@/store";
import { cn } from "@/lib/utils"; // nếu bạn dùng clsx hoặc utils cho class

interface Props {
  bookId: string;
  className?: string;
}

export function BookFavoriteButton({ bookId, className }: Props) {
  const dispatch = useDispatch();
  const { favorites } = useSelector((state: RootState) => state.favorites);
  const { user } = useSelector((state: RootState) => state.auth);

  const isFavorite = favorites.some((item) => item.id === bookId);

  const handleToggle = () => {
    if (!user?.userId) return;
    dispatch(toggleFavoriteStart({ userId: user.userId, bookId }));
  };

  return (
    <div className="absolute top-2 right-2 bg-white/70 backdrop-blur-sm rounded-full p-1 shadow-md">
        <Heart
            onClick={handleToggle}
            className={cn(
            "h-5 w-5 cursor-pointer transition-all duration-200 ease-in-out",
            "hover:scale-110",
            isFavorite
                ? "text-red-500 fill-current animate-beat"
                : "text-gray-600 hover:text-red-400",
            className
            )}
        />
    </div>
  );
}

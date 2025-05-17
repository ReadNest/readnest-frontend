import { Star, StarHalf } from "lucide-react";

interface RatingStarsProps {
  rating: number; // Giá trị từ 0-5
  maxRating?: number; // Mặc định là 5
  showText?: boolean; // Có hiển thị text (x/y) không
}

export function RatingStars({ rating = 0, maxRating = 5, showText = true }: RatingStarsProps) {
  // Đảm bảo rating nằm trong khoảng 0-maxRating
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = maxRating - fullStars - (hasHalfStar ? 1 : 0);
  return (
    <div className="flex items-center mt-2 gap-1">
      {/* Hiển thị sao */}
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} className="w-4 h-4 text-yellow-500 fill-current" />
      ))}
      {hasHalfStar && (
        <StarHalf className="w-4 h-4 text-yellow-500 fill-current" />
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />
      ))}
      {/* Hiển thị rating */}
      {showText && (
        <span className="text-sm text-gray-500 ml-1">({rating.toFixed(1)})</span>
      )}
    </div>
  );
}
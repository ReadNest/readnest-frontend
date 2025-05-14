import { Star } from "lucide-react";

interface BookRatingProps {
  rating: number;
  maxRating?: number;
}

export const BookRating = ({ rating, maxRating = 5 }: BookRatingProps) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  return (
    <div className="flex items-center">
      {[...Array(maxRating)].map((_, i) => {
        if (i < fullStars) {
          return <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />;
        } else if (i === fullStars && hasHalfStar) {
          return <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />;
        } else {
          return <Star key={i} className="w-4 h-4 text-gray-300" />;
        }
      })}
      <span className="ml-1 text-sm text-gray-600">({rating.toFixed(1)})</span>
    </div>
  );
};
import { StarIcon } from "lucide-react";

interface BookRatingProps {
  rating: number;
}

export function BookRating({ rating }: BookRatingProps) {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <StarIcon
          key={i}
          className={`h-5 w-5 ${i < rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
        />
      ))}
      <span className="ml-2 text-gray-600">({rating.toFixed(1)})</span>
    </div>
  );
}
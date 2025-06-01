import { Button } from "@/components/ui/button";
import { RatingStars } from "./RatingStars";
import { BookFavoriteButton } from "@/features/favouriteBooks/components/BookFavoriteButton";

interface BookSearchResultProps {
  bookId: string;
  bookImage: string;
  bookName: string;
  bookAuthor: string;
  rating: number;
  isFavorite: boolean;
  onClick?: () => void;
}

export function BookSearchResult({
  bookId,
  bookImage,
  bookName,
  bookAuthor,
  rating,
  onClick,
}: BookSearchResultProps) {
  if (rating < 0) {
    rating = 0;
  }
  if (rating > 5) {
    rating = 5;
  }

  return (
    <div className="flex flex-col gap-4 p-4 border rounded-lg hover:shadow-md transition-shadow h-full">
      <div className="w-full relative bg-gray-100 rounded border">
        <img
          src={bookImage}
          alt={bookName}
          className="w-full h-48 object-contain rounded"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/default-book-cover.jpg";
          }}
        />
        <BookFavoriteButton bookId={bookId} />
      </div>

      <div className="">
        <h3 className="font-medium text-lg">{bookName}</h3>
        <p className="text-sm text-gray-600">bởi {bookAuthor}</p>
      </div>

      <RatingStars rating={rating} showText={true} />

      <Button
        onClick={onClick}
        variant="outline"
        size="sm"
        className="w-full py-2 rounded-md border border-indigo-600 text-indigo-600 font-medium hover:bg-indigo-600 hover:text-white transition"
      >
        Xem Thông Tin
      </Button>
    </div>
  );
}

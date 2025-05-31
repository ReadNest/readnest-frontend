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
  // Tính toán số sao để hiển thị
  if (rating < 0) {
    rating = 0;
  }
  if (rating > 5) {
    rating = 5;
  }

  return (
    <div className="flex flex-col gap-4 p-4 border rounded-lg hover:shadow-md transition-shadow h-full">
      {/* Ảnh bìa sách */}
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

      {/* Thông tin sách */}
      <div className="">
        <h3 className="font-medium text-lg">{bookName}</h3>
        <p className="text-sm text-gray-600">bởi {bookAuthor}</p>
      </div>

      {/* Đánh giá */}
      <RatingStars rating={rating} showText={true} />

      {/* Nút Xem Thông Tin */}
      <Button
        onClick={onClick}
        variant="outline"
        size="sm"
        className="mt-3 bg-blue-600 text-white hover:bg-blue-700"
      >
        Xem Thông Tin
      </Button>
    </div>
  );
}

import { BookRating } from "./BookRating";

interface BookCardProps {
  title: string;
  author: string;
  rating: number;
  image: string;
}

export const BookCard = ({ title, author, rating, image }: BookCardProps) => {
  return (
    <div className="w-full max-w-xs overflow-hidden rounded-lg border shadow-sm bg-white">
            <div
                className="h-48 w-full bg-cover bg-center"
                style={{ backgroundImage: `url(${image})` }}
            ></div>

            {/* Phần thông tin sách */}
            <div className="p-4 space-y-2">
                <div>
                    <h3 className="text-lg font-semibold">{title}</h3>
                    <p className="text-sm text-gray-600">{author}</p>
                </div>

            <BookRating rating={rating} />
            </div>
        </div>
  );
};
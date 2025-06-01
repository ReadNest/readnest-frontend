import { BookRating } from "./BookRating";

interface BookCardProps {
  title: string;
  author: string;
  rating: number;
  image: string;
  onClick?: () => void;
}

export const BookCard = ({ title, author, rating, image, onClick }: BookCardProps) => {
  return (
    <div
      onClick={onClick} 
      className="cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-200 ease-in-out rounded-lg border p-4">
            <div className="w-full relative bg-gray-100 rounded border">
              <img
                src={image}
                alt={title}
                className="w-full h-48 object-contain rounded"
                loading="lazy"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/default-book-cover.jpg";
                }}
              />
            </div>

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
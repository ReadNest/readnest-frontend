import { BookRating } from "./BookRating";

interface BookCardProps {
  title: string;
  author: string;
  rating: number;
}

export const BookCard = ({ title, author, rating }: BookCardProps) => {
  return (
    <div className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-gray-600 mb-2">{author}</p>
      <BookRating rating={rating} />
    </div>
  );
};
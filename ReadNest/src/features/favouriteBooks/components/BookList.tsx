import { BookCard } from "./BookCard";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface Book {
  title: string;
  author: string;
  rating: number;
}

interface BookListProps {
  books: Book[];
  totalBooks: number;
}

export const BookList = ({ books, totalBooks }: BookListProps) => {
  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Sách yêu thích của tôi</CardTitle>
        <p className="text-sm text-gray-500">Tổng cộng: {totalBooks} cuốn sách</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {books.map((book, index) => (
          <BookCard
            key={index}
            title={book.title}
            author={book.author}
            rating={book.rating}
          />
        ))}
      </CardContent>
    </Card>
  );
};
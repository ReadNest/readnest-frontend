import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Book {
  id: number;
  imageUrl: string;
  title: string;
  author: string;
  condition: string;
  owner: string;
  requestCount: number;
}

export default function TradingBookCard({ book }: { book: Book }) {
  return (
    <Card className="hover:shadow-md transition-shadow h-full flex flex-col">
      {/* Book Cover Image */}
      <div className="w-full relative bg-gray-100 rounded border">
        <img
            src={book.imageUrl}
            alt={book.title}
            className="w-full h-48 object-contain rounded"
            loading="lazy"
            onError={(e) => {
                (e.target as HTMLImageElement).src = "/default-book-cover.jpg";
            }}
        />
      </div>

      <CardHeader className="pb-2 px-4">
        <CardTitle className="text-lg line-clamp-2">{book.title}</CardTitle>
        <p className="text-sm text-gray-600">{book.author}</p>
      </CardHeader>

      <CardContent className="px-4 py-2 flex-grow">
        <Badge variant={book.condition === "Như mới" ? "default" : "secondary"}>
          {book.condition}
        </Badge>
        <div className="mt-2 text-sm">
          <span className="text-gray-700">Chủ sách: </span>
          <span className="font-medium">{book.owner}</span>
        </div>
        {book.requestCount > 0 && (
          <div className="text-sm mt-1">
            <span className="text-orange-500 font-medium">
              {book.requestCount} yêu cầu trao đổi
            </span>
          </div>
        )}
      </CardContent>

      <CardFooter className="px-4 pb-4 pt-0">
        <Button
          variant="outline"
          className="w-full border-orange-500 text-orange-500 hover:bg-orange-50 hover:text-orange-600"
        >
          Yêu cầu trao đổi
        </Button>
      </CardFooter>
    </Card>
  );
}

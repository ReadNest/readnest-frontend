import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { GetBookTradingPostV2Response } from "@/api/@types";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function TradingBookCard({
  book,
  onRequestExchange,
  disableExchange,
  currentUserName,
}: {
  book: GetBookTradingPostV2Response;
  onRequestExchange?: (bookId: string) => void;
  disableExchange?: boolean;
  currentUserName?: string;
}) {
  const [showConfirm, setShowConfirm] = useState(false);
  const isOwner = currentUserName === book.userName;

  return (
    <Card className="hover:shadow-md transition-shadow h-full flex flex-col">
      {/* Book Cover Image */}
      <div className="w-full relative bg-gray-100 rounded border">
        <img
          src={book.imageUrl ?? ""}
          alt={book.title ?? "Book Cover"}
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
          {isOwner ? (
            <Link
              to={`/profile/${book.userName}`}
              className="font-medium text-orange-600 hover:underline"
            >
              Bạn
            </Link>
          ) : (
            <Link
              to={`/profile/${book.userName}`}
              className="font-medium text-blue-600 hover:underline"
            >
              {book.ownerName ?? "Người dùng"}
            </Link>
          )}
        </div>
        {(book.numberOfTradingRequests ?? 0) >= 0 && (
          <div className="text-sm mt-1">
            <span className="text-orange-500 font-medium">
              {book.numberOfTradingRequests} yêu cầu trao đổi
            </span>
          </div>
        )}
      </CardContent>

      <CardFooter className="px-4 pb-4 pt-0">
        <Button
          variant="outline"
          className="w-full border-orange-500 text-orange-500 hover:bg-orange-50 hover:text-orange-600"
          onClick={() => setShowConfirm(true)}
          disabled={disableExchange}
        >
          Yêu cầu trao đổi
        </Button>
      </CardFooter>

      {/* Modal xác nhận */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white rounded shadow-lg p-6 w-80">
            <div className="mb-4 text-lg font-semibold text-gray-800">
              Xác nhận trao đổi
            </div>
            <div className="mb-6 text-gray-600">
              Bạn có chắc chắn muốn gửi yêu cầu trao đổi cho sách này không?
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="ghost" onClick={() => setShowConfirm(false)}>
                Hủy
              </Button>
              <Button
                variant="outline"
                className="border-orange-500 text-orange-500 hover:bg-orange-50 hover:text-orange-600"
                onClick={() => {
                  setShowConfirm(false);
                  if (typeof book.id === "string") onRequestExchange?.(book.id);
                }}
              >
                Xác nhận
              </Button>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}

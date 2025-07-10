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
import parse from "html-react-parser";
import { toast } from "react-toastify";

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
  const [showDetail, setShowDetail] = useState(false);
  const [detailImageIdx, setDetailImageIdx] = useState(0);
  const isOwner = currentUserName === book.userName;

  return (
    <Card className="hover:shadow-md transition-shadow h-full flex flex-col">
      {/* Book Cover Image */}
      <div
        className="w-full relative bg-gray-100 rounded border group cursor-pointer"
        onClick={() => setShowDetail(true)}
      >
        <img
          src={book.imageUrl ?? ""}
          alt={book.title ?? "Book Cover"}
          className="w-full h-48 object-contain rounded transition-transform group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/default-book-cover.jpg";
          }}
        />
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
          <span className="text-white text-base font-medium">Xem chi tiết</span>
        </div>
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
          onClick={() => {
            if (!currentUserName) {
              toast.info("Vui lòng đăng nhập để thực hiện trao đổi.");
              return;
            }
            setShowConfirm(true);
          }}
          disabled={disableExchange}
        >
          Yêu cầu trao đổi
        </Button>
      </CardFooter>

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

      {showDetail && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60"
          onClick={() => setShowDetail(false)}
        >
          <div
            className="bg-white rounded-lg shadow-lg max-w-3xl w-full p-0 relative animate-fade-in flex overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-2xl font-bold z-20"
              onClick={() => setShowDetail(false)}
              aria-label="Đóng"
            >
              ×
            </button>
            <div className="relative bg-gray-100 flex items-center justify-center w-full md:w-[380px] h-[480px]">
              {(book.images && book.images.length > 0
                ? book.images
                : [{ imageUrl: book.imageUrl }]
              ).map((img, idx) => (
                <div
                  key={img.id || idx}
                  className={`absolute left-0 top-0 w-full h-full ${
                    detailImageIdx === idx
                      ? "opacity-100 z-10"
                      : "opacity-0 z-0"
                  } transition-opacity duration-300 flex flex-col`}
                  style={{
                    pointerEvents: detailImageIdx === idx ? "auto" : "none",
                  }}
                >
                  <img
                    src={
                      img.imageUrl || book.imageUrl || "/default-book-cover.jpg"
                    }
                    alt={`Ảnh ${idx + 1}`}
                    className="w-full h-full object-contain rounded flex-1"
                  />
                  <div className="w-full text-center bg-black/70 text-white text-xs px-3 py-1 rounded-b select-none pointer-events-none">
                    Hình ảnh hiện trạng của cuốn sách
                  </div>
                </div>
              ))}

              {((book.images && book.images.length > 1) || false) && (
                <>
                  <button
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 text-white rounded-full w-8 h-8 flex items-center justify-center z-20 hover:bg-black/70"
                    onClick={(e) => {
                      e.stopPropagation();
                      setDetailImageIdx((idx) =>
                        idx === 0 ? (book.images?.length ?? 1) - 1 : idx - 1
                      );
                    }}
                    disabled={book.images.length <= 1}
                  >
                    &#8592;
                  </button>
                  <button
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 text-white rounded-full w-8 h-8 flex items-center justify-center z-20 hover:bg-black/70"
                    onClick={(e) => {
                      e.stopPropagation();
                      setDetailImageIdx((idx) =>
                        idx === (book.images?.length ?? 0) - 1 ? 0 : idx + 1
                      );
                    }}
                    disabled={book.images.length <= 1}
                  >
                    &#8594;
                  </button>
                </>
              )}
            </div>

            <div className="flex-1 flex flex-col gap-2 p-6 min-w-[260px] max-w-[420px] overflow-y-auto">
              <h2 className="text-2xl font-bold mb-1">{book.title}</h2>
              <div className="text-sm text-gray-500 mb-2">
                Tác giả: {book.author}
              </div>
              <div className="flex items-center gap-2 mb-2">
                <Badge
                  variant={
                    book.condition === "Như mới" ? "default" : "secondary"
                  }
                >
                  {book.condition}
                </Badge>
              </div>
              <div className="text-sm text-gray-700 mb-2">
                <span className="font-medium">Chủ sách: </span>
                <Link
                  to={`/profile/${book.userName}`}
                  className={
                    isOwner
                      ? "text-orange-600 font-semibold hover:underline"
                      : "text-blue-600 font-medium hover:underline"
                  }
                >
                  {isOwner ? "Bạn" : book.ownerName ?? "Người dùng"}
                </Link>
              </div>
              <div className="text-sm text-gray-700 mb-2">
                <span className="font-medium">Mô tả về cuốn sách này: </span>
                {book.shortDesc ? (
                  <div className="prose prose-sm max-w-none">
                    {parse(book.shortDesc)}
                  </div>
                ) : (
                  "Không có mô tả"
                )}
              </div>
              <div className="text-sm text-gray-700 mb-2">
                <span className="font-medium">
                  Lời nhắn tới người muốn nhận sách:{" "}
                </span>
                {book.messageToRequester || "Không có"}
              </div>
              {book.images && book.images.length > 1 && (
                <div className="flex gap-2 mt-2 items-center">
                  {book.images.length > 5 ? (
                    <>
                      <img
                        key={book.images[0].id || 0}
                        src={book.images[0].imageUrl ?? ""}
                        alt="Ảnh 1"
                        className={`w-10 h-12 object-cover rounded border cursor-pointer ${
                          detailImageIdx === 0
                            ? "ring-2 ring-orange-500"
                            : "opacity-70 hover:opacity-100"
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setDetailImageIdx(0);
                        }}
                      />
                      <div className="w-10 h-12 flex items-center justify-center rounded border bg-gray-100 text-gray-600 text-xs font-medium select-none">
                        +{book.images.length - 1} ảnh
                      </div>
                    </>
                  ) : (
                    book.images.map((img, idx) => (
                      <img
                        key={img.id || idx}
                        src={img.imageUrl ?? ""}
                        alt={`Ảnh ${idx + 1}`}
                        className={`w-10 h-12 object-cover rounded border cursor-pointer ${
                          detailImageIdx === idx
                            ? "ring-2 ring-orange-500"
                            : "opacity-70 hover:opacity-100"
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setDetailImageIdx(idx);
                        }}
                      />
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}

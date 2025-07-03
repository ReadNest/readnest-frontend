import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import BookRequestsModal from "@/features/bookExchange/components/BookRequestsModal";
import type { GetUserRequestResponse } from "@/api/@types";
import { useDispatch } from "react-redux";
import { openChatWithUsername } from "@/features/chat/chatUiSlice";
import client from "@/lib/api/axiosClient";
import { toast } from "react-toastify";

interface MyBookCardProps {
  book: {
    id: string;
    imageUrl: string;
    title: string;
    author: string;
    condition: string;
    owner: string;
    requestCount: number;
    requests?: GetUserRequestResponse[];
  };
  onShowRequests?: (bookId: string) => void;
  onEdit?: (bookId: string) => void;
  onDelete?: (bookId: string) => void;
}

export default function MyBookCard({
  book,
  onShowRequests,
  onEdit,
  onDelete,
}: MyBookCardProps) {
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const dispatch = useDispatch();
  const handleContact = (username: string) => {
    if (username) {
      dispatch(openChatWithUsername(username));
    }
  };

  const handleComplete = (tradingRequestId: string, tradingPostId: string) => {
    client.api.v1.trading_posts
      ._tradingPostId(tradingPostId)
      .trading_requests._tradingRequestId(tradingRequestId)
      .$patch({
        body: {
          status: "COMPLETED",
        },
      })
      .then(() => {
        toast.success("Yêu cầu trao đổi đã được hoàn thành!");
      })
      .catch((error) => {
        console.error("Error completing request:", error);
      });
  };

  const requests = book.requests;

  return (
    <>
      <div className="relative bg-white rounded-lg shadow hover:shadow-lg transition p-4 flex flex-col items-center group">
        <img
          src={book.imageUrl}
          alt={book.title}
          className="w-28 h-40 object-cover rounded mb-3 border"
        />
        <div className="text-center mb-2">
          <h3 className="font-semibold text-base line-clamp-2 mb-1">
            {book.title}
          </h3>
          <p className="text-xs text-gray-500 mb-1">{book.author}</p>
          <p className="text-xs text-gray-400">Tình trạng: {book.condition}</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="w-full hover:text-[#5a4bff] hover:border-[#5a4bff]"
          onClick={() => {
            setShowModal(true);
            onShowRequests?.(book.id);
          }}
        >
          Xem yêu cầu trao đổi ({book.requestCount})
        </Button>

        <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-500 hover:text-[#5a4bff]"
            onClick={() => onEdit?.(book.id)}
            title="Chỉnh sửa"
          >
            <Pencil className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-400 hover:text-red-500"
            onClick={() => setShowDeleteModal(true)}
            title="Xóa sách"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
      <BookRequestsModal
        open={showModal}
        onClose={() => setShowModal(false)}
        bookTitle={book.title}
        requests={requests ?? []}
        onContact={(username) => {
          handleContact(username);
          setShowModal(false);
        }}
        onComplete={(userId) => {
          const tradingRequestId =
            requests?.find((request) => request.userId === userId)
              ?.tradingRequestId ?? "";

          handleComplete(tradingRequestId, book.id);
          setShowModal(false);
        }}
      />

      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xs">
            <h2 className="text-lg font-semibold mb-2 text-red-600">
              Chắc chắn bạn muốn xóa?
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Sau khi xóa không thể phục hồi được dữ liệu đã bị xóa!
            </p>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setShowDeleteModal(false)}
              >
                Hủy
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  onDelete?.(book.id);
                  setShowDeleteModal(false);
                }}
              >
                Xóa
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

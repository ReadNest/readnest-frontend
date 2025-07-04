import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import BookRequestsModal from "@/features/bookExchange/components/BookRequestsModal";

interface MyBookCardProps {
  book: {
    id: number;
    imageUrl: string;
    title: string;
    author: string;
    condition: string;
    owner: string;
    requestCount: number;
    requests?: Array<{
      id: number;
      name: string;
      avatarUrl?: string;
      status: "pending" | "completed";
    }>;
    // ...other fields if needed
  };
  onShowRequests?: (bookId: number) => void;
  onEdit?: (bookId: number) => void;
  onDelete?: (bookId: number) => void;
}

export default function MyBookCard({
  book,
  // onShowRequests,
  onEdit,
  onDelete,
}: MyBookCardProps) {
  const [showModal, setShowModal] = useState(false);

  // Dummy data nếu chưa có requests thực tế
  const requests = book.requests || [
    {
      id: 1,
      name: "Nguyễn Văn A",
      avatarUrl: undefined,
      status: "pending" as const,
    },
    {
      id: 2,
      name: "Trần Thị B",
      avatarUrl: "https://randomuser.me/api/portraits/women/2.jpg",
      status: "completed" as const,
    },
  ];

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
          onClick={() => setShowModal(true)}
        >
          Xem yêu cầu trao đổi ({book.requestCount})
        </Button>
        <div className="flex gap-2 mt-3 w-full">
          <Button
            variant="outline"
            size="icon"
            className="flex-1 border-gray-300 text-gray-500 hover:text-[#5a4bff] hover:border-[#5a4bff]"
            onClick={() => onEdit?.(book.id)}
          >
            <Pencil className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="flex-1 border-gray-300 text-gray-500 hover:text-[#5a4bff] hover:border-[#5a4bff]"
            onClick={() => onDelete?.(book.id)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
      <BookRequestsModal
        open={showModal}
        onClose={() => setShowModal(false)}
        bookTitle={book.title}
        requests={requests}
        onContact={() => {
          // TODO: handle contact user
          setShowModal(false);
        }}
        onComplete={() => {
          // TODO: handle complete request
        }}
      />
    </>
  );
}

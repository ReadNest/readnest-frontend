import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { User as UserIcon, ArrowRightLeft } from "lucide-react";
interface RequestUser {
  id: number;
  name: string;
  username?: string;
  avatarUrl?: string;
  status: "pending" | "completed";
  theirBook?: {
    id: number;
    title: string;
    imageUrl?: string;
  };
}

interface BookRequestsModalProps {
  open: boolean;
  onClose: () => void;
  bookTitle: string;
  bookImage?: string;
  requests: RequestUser[];
  onContact: (username: string) => void;
  onComplete: (userId: number) => void;
}

export default function BookRequestsModal({
  open,
  onClose,
  bookTitle,
  bookImage,
  requests,
  onContact,
  onComplete,
}: BookRequestsModalProps) {

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold mb-2">
            Yêu cầu trao đổi cho "{bookTitle}"
          </DialogTitle>
        </DialogHeader>
        <div className="divide-y">
          {requests.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              Chưa có yêu cầu trao đổi nào.
            </div>
          ) : (
            requests.map((user) => (
              <div key={user.id} className="flex items-center gap-3 py-4">
                {/* Avatar */}
                {user.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover border"
                  />
                ) : (
                  <span className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-400">
                    <UserIcon className="w-6 h-6" />
                  </span>
                )}
                <div className="flex-1">
                  <div className="font-semibold flex items-center gap-2">
                    {user.name}
                    <ArrowRightLeft className="w-4 h-4 text-gray-400" />
                    {/* Sách đối phương muốn đổi */}
                    {user.theirBook ? (
                      <span className="inline-flex items-center gap-1">
                        {user.theirBook.imageUrl ? (
                          <img
                            src={user.theirBook.imageUrl}
                            alt={user.theirBook.title}
                            className="w-7 h-7 rounded object-cover border"
                          />
                        ) : null}
                        <span className="text-xs text-gray-600 font-normal">
                          {user.theirBook.title}
                        </span>
                      </span>
                    ) : (
                      <span className="text-xs text-gray-400">
                        (Chưa chọn sách đổi)
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-gray-500">
                    Trạng thái:{" "}
                    {user.status === "pending" ? "Đang chờ" : "Hoàn thành"}
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="hover:text-[#5a4bff] hover:border-[#5a4bff] mr-2"
                  onClick={() => onContact(user.username ?? "")}
                >
                  Liên hệ
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  disabled={user.status === "completed"}
                  onClick={() => onComplete(user.id)}
                >
                  Hoàn thành
                </Button>
              </div>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

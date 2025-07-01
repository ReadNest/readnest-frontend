import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { User as UserIcon } from "lucide-react";
import type { GetUserRequestResponse } from "@/api/@types";

interface BookRequestsModalProps {
  open: boolean;
  onClose: () => void;
  bookTitle: string;
  bookImage?: string;
  requests: GetUserRequestResponse[];
  onContact: (userId: string) => void;
  onComplete: (userId: string) => void;
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
              <div key={user.userId} className="flex items-center gap-3 py-4">
                {/* Avatar */}
                {user.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
                    alt={user.fullName ?? "Người dùng"}
                    className="w-10 h-10 rounded-full object-cover border"
                  />
                ) : (
                  <span className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-400">
                    <UserIcon className="w-6 h-6" />
                  </span>
                )}
                <div className="flex-1">
                  <div className="font-semibold flex items-center gap-2">
                    {user.fullName || "Người dùng"}{" "}
                  </div>
                  <div className="text-xs text-gray-500">
                    Trạng thái:{" "}
                    {user.status === "InProgress" ? "Đang chờ" : "Hoàn thành"}
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="hover:text-[#5a4bff] hover:border-[#5a4bff] mr-2"
                  onClick={() => onContact(user.userId ?? "")}
                >
                  Liên hệ
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  disabled={user.status === "completed"}
                  onClick={() => onComplete(user.userId ?? "")}
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

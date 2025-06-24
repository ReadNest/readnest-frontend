import { Button } from "@/components/ui/button";

interface MyTransactionCardProps {
  transaction: {
    id: number;
    imageUrl: string;
    title: string;
    author: string;
    condition: string;
    owner: string;
    requester: string;
    date: string;
    status: string;
    // ...other fields if needed
  };
  onContact?: (transactionId: number) => void;
}

export default function MyTransactionCard({
  transaction,
  onContact,
}: MyTransactionCardProps) {
  return (
    <div className="relative bg-white rounded-lg shadow hover:shadow-lg transition p-4 flex flex-col items-center">
      <img
        src={transaction.imageUrl}
        alt={transaction.title}
        className="w-28 h-40 object-cover rounded mb-3 border"
      />
      <div className="text-center mb-2">
        <h3 className="font-semibold text-base line-clamp-2 mb-1">
          {transaction.title}
        </h3>
        <p className="text-xs text-gray-500 mb-1">{transaction.author}</p>
        <p className="text-xs text-gray-400">
          Tình trạng: {transaction.condition}
        </p>
        <p className="text-xs text-gray-400">Chủ sách: {transaction.owner}</p>
        <p className="text-xs text-gray-400">Ngày: {transaction.date}</p>
      </div>
      <Button
        variant={transaction.status === "completed" ? "default" : "outline"}
        size="sm"
        className="w-full mb-2 cursor-not-allowed opacity-70"
        disabled
      >
        {transaction.status === "pending" ? "Đang chờ" : "Hoàn thành"}
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="w-full hover:text-[#5a4bff] hover:border-[#5a4bff]"
        onClick={() => onContact?.(transaction.id)}
      >
        Liên hệ
      </Button>
    </div>
  );
}

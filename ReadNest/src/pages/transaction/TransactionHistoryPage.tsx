import { useEffect, useState } from "react";
import { Paging } from "@/components/ui/paging";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import type { GetTransactionResponse } from "@/api/@types";
import { vi } from "date-fns/locale";
import client from "@/lib/api/axiosClient";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";

const TRANSACTION_STATUS = [
  { label: "Tất cả", value: "" },
  { label: "Thành công", value: "Success" },
  { label: "Đang xử lý", value: "Pending" },
  { label: "Đã hủy", value: "Cancelled" },
];

export default function TransactionHistoryPage() {
  const userId = useSelector((state: RootState) => state.auth.user.userId);
  const [transactions, setTransactions] = useState<GetTransactionResponse[]>(
    []
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize] = useState(10);
  const [statusFilter, setStatusFilter] = useState<string>("");

  const fetchTransactions = async (page: number, status: string) => {
    client.api.v1.users
      ._userId(userId ?? "")
      .transactions.$get({
        query: {
          PageIndex: page,
          PageSize: pageSize,
          Status: status,
        },
      })
      .then((response) => {
        const data = response.data;
        setTransactions(data?.items || []);
        setTotalPages(Math.ceil((data?.totalItems || 0) / pageSize));
      });
  };

  useEffect(() => {
    fetchTransactions(currentPage, statusFilter);
  }, [currentPage, statusFilter]);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    return format(new Date(dateString), "dd/MM/yyyy HH:mm", { locale: vi });
  };

  const getStatusLabel = (status?: string) => {
    switch (status) {
      case "Success":
        return "Thành công";
      case "Pending":
        return "Đang xử lý";
      case "Cancelled":
        return "Đã hủy";
      default:
        return "Không xác định";
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-semibold mb-4">Lịch sử giao dịch</h1>

      <div className="mb-4 flex items-center gap-2">
        {TRANSACTION_STATUS.map((s) => (
          <button
            key={s.value}
            onClick={() => {
              setStatusFilter(s.value);
              setCurrentPage(1);
            }}
            className={cn(
              "px-3 py-1 text-sm rounded-full border",
              statusFilter === s.value
                ? "bg-indigo-600 text-white border-indigo-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            )}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Bảng giao dịch */}
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full text-sm text-left border-collapse">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-2 font-medium text-gray-700">Mã đơn</th>
              <th className="px-4 py-2 font-medium text-gray-700">Gói</th>
              <th className="px-4 py-2 font-medium text-gray-700">Số tiền</th>
              <th className="px-4 py-2 font-medium text-gray-700">
                Phương thức
              </th>
              <th className="px-4 py-2 font-medium text-gray-700">
                Trạng thái
              </th>
              <th className="px-4 py-2 font-medium text-gray-700">Thời gian</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length > 0 ? (
              transactions.map((tx) => (
                <tr key={tx.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{tx.orderCode}</td>
                  <td className="px-4 py-2">{tx.packageName}</td>
                  <td className="px-4 py-2">
                    {tx.amount?.toLocaleString("vi-VN")} ₫
                  </td>
                  <td className="px-4 py-2">{tx.paymentMethod}</td>
                  <td
                    className={cn(
                      "px-4 py-2 font-medium",
                      tx.transactionStatus === "Success"
                        ? "text-green-600"
                        : tx.transactionStatus === "Pending"
                        ? "text-yellow-600"
                        : "text-red-600"
                    )}
                  >
                    {getStatusLabel(tx.transactionStatus ?? "")}
                  </td>
                  <td className="px-4 py-2">{formatDate(tx.updatedAt)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-gray-500">
                  Không có giao dịch nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Phân trang */}
      <div className="mt-4 flex justify-center">
        <Paging
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Paging } from "@/components/ui/paging";
import MyBookCard from "@/features/bookExchange/components/MyBookCard";
import MyTransactionCard from "@/features/bookExchange/components/MyTransactionCard";
import { Link } from "react-router-dom";
import { ROUTE_PATHS } from "@/constants/routePaths";

const myBooks = [
  {
    id: 1,
    imageUrl:
      "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-llk4ubz24f5if9",
    title: "Đắc Nhân Tâm",
    author: "Dale Carnegie",
    condition: "Như mới",
    owner: "Bạn",
    requestCount: 5,
    requester: "Nguyễn Văn A",
    date: "15/03/2025",
    status: "pending",
  },
  {
    id: 2,
    imageUrl:
      "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-llk4ubz24f5if9",
    title: "Nhà Giả Kim",
    author: "Paulo Coelho",
    condition: "Đồ qua sử dụng",
    owner: "Bạn",
    requestCount: 3,
    requester: "Trần Thị B",
    date: "12/03/2025",
    status: "completed",
  },
  {
    id: 3,
    imageUrl:
      "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-llk4ubz24f5if9",
    title: "Cây Cam Ngọt Của Tôi",
    author: "José Mauro de Vasconcelos",
    condition: "Như mới",
    owner: "Bạn",
    requestCount: 2,
    requester: "Lê Văn C",
    date: "10/03/2025",
    status: "completed",
  },
];

const myTransactions = [
  {
    id: 1,
    imageUrl:
      "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-llk4ubz24f5if9",
    title: "Đắc Nhân Tâm",
    author: "Dale Carnegie",
    condition: "Như mới",
    owner: "Bạn",
    requestCount: 5,
    requester: "Nguyễn Văn A",
    date: "15/03/2025",
    status: "pending",
  },
  {
    id: 2,
    imageUrl:
      "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-llk4ubz24f5if9",
    title: "Nhà Giả Kim",
    author: "Paulo Coelho",
    condition: "Đồ qua sử dụng",
    owner: "Bạn",
    requestCount: 3,
    requester: "Trần Thị B",
    date: "12/03/2025",
    status: "completed",
  },
  {
    id: 3,
    imageUrl:
      "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-llk4ubz24f5if9",
    title: "Cây Cam Ngọt Của Tôi",
    author: "José Mauro de Vasconcelos",
    condition: "Như mới",
    owner: "Bạn",
    requestCount: 2,
    requester: "Lê Văn C",
    date: "10/03/2025",
    status: "completed",
  },
];

function MyBooksPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 3; // Số trang, có thể tính động nếu cần
  const [activeTab, setActiveTab] = useState<"books" | "transactions">("books");

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header Section */}
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">SÁCH CỦA BẠN ĐANG TRAO ĐỔI</h1>
          <p className="text-gray-600 mt-1">({myBooks.length} sách)</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" className="border-gray-300">
            Lọc
          </Button>
          <Button variant="outline" className="border-gray-300">
            Sắp xếp
          </Button>
          <Button variant="outline" className="border-gray-300" asChild>
            <Link to={ROUTE_PATHS.MANAGE_TRADING_POST}>
              Thêm sách cần trao đổi
            </Link>
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b mb-6">
        <button
          className={`px-4 py-2 font-medium border-b-2 transition-colors ${
            activeTab === "books"
              ? "border-primary text-primary"
              : "border-transparent text-gray-500 hover:text-primary"
          }`}
          onClick={() => setActiveTab("books")}
        >
          Sách đang đăng
        </button>
        <button
          className={`px-4 py-2 font-medium border-b-2 transition-colors ${
            activeTab === "transactions"
              ? "border-primary text-primary"
              : "border-transparent text-gray-500 hover:text-primary"
          }`}
          onClick={() => setActiveTab("transactions")}
        >
          Giao dịch đang thực hiện
        </button>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 my-4"></div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <Input
          placeholder={
            activeTab === "books" ? "Tìm kiếm sách..." : "Tìm kiếm giao dịch..."
          }
          className="flex-1"
        />
        <Button variant="outline" className="whitespace-nowrap">
          Tất cả trạng thái
        </Button>
      </div>

      {activeTab === "books" && (
        <>
          {/* Book Grid - 4 columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
            {myBooks.map((book) => (
              <MyBookCard
                key={book.id}
                book={book}
                onShowRequests={() => {
                  /* TODO: show requests for this book */
                }}
              />
            ))}
          </div>
        </>
      )}

      {activeTab === "transactions" && (
        <>
          {/* Transaction Grid - 4 columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
            {myTransactions.map((transaction) => (
              <MyTransactionCard
                key={transaction.id}
                transaction={transaction}
                onContact={() => {
                  /* TODO: open chat UI */
                }}
              />
            ))}
          </div>
        </>
      )}

      {/* Pagination */}
      <Paging
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        className="justify-center mb-8"
      />
    </div>
  );
}

export default MyBooksPage;

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Paging } from "@/components/ui/paging";
import MyBookCard from "@/features/bookExchange/components/MyBookCard";
import { Link } from "react-router-dom";
import { ROUTE_PATHS } from "@/constants/routePaths";
import { useDispatch, useSelector } from "react-redux";
import { getTradingPostByUserIdStart } from "@/features/bookExchange/tradingPostSlice";
import type { RootState } from "@/store";

function MyBooksPage() {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;
  const { tradingPostByUserId, pagingInfo } = useSelector(
    (state: RootState) => state.tradingPost
  );
  const [activeTab, setActiveTab] = useState<"books" | "transactions">("books");

  useEffect(() => {
    dispatch(getTradingPostByUserIdStart({ pageIndex: currentPage, pageSize }));
  }, [dispatch, currentPage]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header Section */}
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">SÁCH CỦA BẠN ĐANG TRAO ĐỔI</h1>
          <p className="text-gray-600 mt-1">({pagingInfo.total} sách)</p>
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
            {tradingPostByUserId.map((book) => (
              <MyBookCard
                key={book.id}
                book={{
                  id: book.id ?? "",
                  imageUrl: book.imageUrl ?? "",
                  title: book.title ?? "",
                  author: book.author ?? "",
                  condition: book.condition ?? "",
                  owner: "Bạn",
                  requestCount: Array.isArray(book.tradingRequestIds)
                    ? book.tradingRequestIds.length
                    : 0,
                  // requests: ... nếu cần
                }}
                onShowRequests={() => {
                  /* TODO: show requests for this book */
                }}
              />
            ))}
          </div>
        </>
      )}

      {/* Tab giao dịch đang thực hiện: cần lấy động nếu muốn */}
      {/*
      {activeTab === "transactions" && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
            {myTransactions.map((transaction) => (
              <MyTransactionCard
                key={transaction.id}
                transaction={transaction}
                onContact={() => {
                  // TODO: open chat UI
                }}
              />
            ))}
          </div>
        </>
      )}
      */}

      {/* Pagination */}
      <Paging
        currentPage={pagingInfo.page}
        totalPages={Math.ceil((pagingInfo.total || 1) / pagingInfo.pageSize)}
        onPageChange={setCurrentPage}
        className="justify-center mb-8"
      />
    </div>
  );
}

export default MyBooksPage;

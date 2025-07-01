import type { GetBookTradingPostV2Response } from "@/api/@types";
import { Button } from "@/components/ui/button";
import { Paging } from "@/components/ui/paging";
import TradingBookCard from "@/features/bookExchange/components/TradingBookCard";
import client from "@/lib/api/axiosClient";
import type { RootState } from "@/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function BookExchangePage() {
  const userId = useSelector((state: RootState) => state.auth.user.userId);
  const userName = useSelector((state: RootState) => state.auth.user.userName);
  const [books, setBooks] = useState<GetBookTradingPostV2Response[]>([]);
  const [pagingInfo, setPagingInfo] = useState({
    page: 1,
    pageSize: 8,
    total: 0,
  });

  useEffect(() => {
    client.api.v1.trading_posts.v2
      .$get({
        query: {
          PageIndex: pagingInfo.page,
          PageSize: pagingInfo.pageSize,
        },
      })
      .then((response) => {
        if (response.data) {
          setBooks(response.data.items ?? []);
          setPagingInfo({
            page: response.data.pageIndex || 1,
            pageSize: response.data.pageSize || 8,
            total: response.data.totalItems || 0,
          });
        }
      });
  }, [pagingInfo.page, pagingInfo.pageSize]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header Section */}
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">SÁCH CÓ SẴN ĐỂ TRAO ĐỔI</h1>
          <p className="text-gray-600 mt-1">({pagingInfo.total}) sách</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" className="border-gray-300">
            Lọc
          </Button>
          <Button variant="outline" className="border-gray-300">
            Sắp xếp
          </Button>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 my-4"></div>

      {/* Book Grid - 4 columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
        {books.map((book) => (
          <TradingBookCard
            key={book.id}
            book={book}
            onRequestExchange={(id) => {
              client.api.v1.trading_requests
                .$post({
                  body: {
                    tradingPostId: id,
                    userId: userId ?? "",
                  },
                })
                .then((res) => {
                  if (res.success) {
                    toast.success("Yêu cầu trao đổi đã được gửi thành công!");
                  }
                });
            }}
            disableExchange={userName === book.userName}
            currentUserName={userName ?? undefined}
          />
        ))}
      </div>

      {/* Pagination */}
      <Paging
        className="flex justify-center mt-8"
        currentPage={pagingInfo.page}
        totalPages={Math.ceil((pagingInfo.total || 1) / pagingInfo.pageSize)}
        onPageChange={(page) => {
          setPagingInfo((prev) => ({ ...prev, page }));
        }}
      />
    </div>
  );
}

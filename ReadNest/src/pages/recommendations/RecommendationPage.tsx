import { Card } from "@/components/ui/card";
import { BookSearchResult } from "@/features/search/components/BookSearchResult";
import { useEffect, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import client from "@/lib/api/axiosClient";
import type { GetBookSearchResponse } from "@/api/@types";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { ROUTE_PATHS } from "@/constants/routePaths";

export default function RecommendationPage() {
  const navigate = useNavigate();
  const userId = useSelector((state: RootState) => state.auth.user?.userId);

  const [books, setBooks] = useState<GetBookSearchResponse[]>([]);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [pageSize] = useState<number>(6);
  const totalPages = Math.ceil(totalItems / pageSize);

  const fetchRecommendations = async (page: number) => {
    try {
      await client.api.v1.recommendations
        ._userId(userId ?? "")
        .get({ query: { PageIndex: page, PageSize: pageSize } })
        .then((response) => {
          const data = response.body.data;
          setBooks(data?.items ?? []);
          setTotalItems(data?.totalItems ?? 0);
          setPageIndex(page);
        });
    } catch (error) {
      console.error("Failed to fetch recommendations:", error);
    }
  };

  useEffect(() => {
    fetchRecommendations(pageIndex);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageIndex]);

  return (
    <div className="container mx-auto px-4 py-10 max-w-7xl">
      {/* Hero Section */}
      <motion.div
        className="flex flex-col items-center mb-12 bg-gradient-to-r from-indigo-50 to-purple-100 rounded-2xl shadow-xl p-10 border border-indigo-100"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-3 mb-3">
          <Star className="h-8 w-8 text-yellow-500" />
          <h2 className="text-4xl font-extrabold text-indigo-700 text-center">
            Gợi ý sách đặc biệt cho bạn
          </h2>
        </div>
        <p className="text-base text-gray-700 text-center max-w-2xl">
          Khám phá những cuốn sách được chọn lọc dựa trên sở thích và hành vi
          của bạn.{" "}
          <span className="font-semibold text-indigo-600">
            Đây là gợi ý từ hệ thống, chưa sử dụng AI cá nhân hóa.
          </span>
        </p>
        <button
          className="mt-4 px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-full shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-200"
          onClick={() => navigate(ROUTE_PATHS.RECOMMEND_DISCOVERY_SLIDER)}
        >
          Khám phá sách với AI
        </button>
      </motion.div>

      {/* Book Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.1 } },
        }}
      >
        {Array.isArray(books) && books.length === 0 ? (
          <div className="col-span-3 text-center text-gray-500 py-12 text-lg">
            <p>Không có gợi ý nào cho bạn lúc này.</p>
            <p className="mt-2 text-sm text-gray-400">
              Hãy thử tìm kiếm hoặc thêm sách yêu thích để hệ thống gợi ý nhiều
              hơn.
            </p>
          </div>
        ) : (
          (Array.isArray(books) ? books : []).map((book) => (
            <motion.div
              key={book.id}
              className="w-full"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="rounded-xl shadow-md border border-indigo-100 bg-white hover:shadow-2xl transition-shadow duration-300">
                <BookSearchResult
                  bookId={book.id ?? ""}
                  bookImage={book.imageUrl ?? ""}
                  bookName={book.title ?? ""}
                  bookAuthor={book.author ?? ""}
                  rating={book.averageRating ?? 0}
                  isFavorite={book.isFavorite ?? false}
                  needToShowFavorite={false}
                  onClick={() => navigate(`/book-detail/${book.id}`)}
                />
              </Card>
            </motion.div>
          ))
        )}
      </motion.div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-10 flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={() => {
                    if (pageIndex > 1) fetchRecommendations(pageIndex - 1);
                  }}
                  className={
                    pageIndex === 1 ? "pointer-events-none opacity-50" : ""
                  }
                />
              </PaginationItem>
              {(() => {
                const pages = [];
                const startPage = Math.max(2, pageIndex - 1);
                const endPage = Math.min(totalPages - 1, pageIndex + 1);
                pages.push(
                  <PaginationItem key={1}>
                    <PaginationLink
                      href="#"
                      isActive={pageIndex === 1}
                      onClick={() => fetchRecommendations(1)}
                    >
                      1
                    </PaginationLink>
                  </PaginationItem>
                );
                if (startPage > 2) {
                  pages.push(
                    <PaginationItem key="start-ellipsis">
                      <span className="px-2 text-muted-foreground">...</span>
                    </PaginationItem>
                  );
                }
                for (let i = startPage; i <= endPage; i++) {
                  pages.push(
                    <PaginationItem key={i}>
                      <PaginationLink
                        href="#"
                        isActive={pageIndex === i}
                        onClick={() => fetchRecommendations(i)}
                      >
                        {i}
                      </PaginationLink>
                    </PaginationItem>
                  );
                }
                if (endPage < totalPages - 1) {
                  pages.push(
                    <PaginationItem key="end-ellipsis">
                      <span className="px-2 text-muted-foreground">...</span>
                    </PaginationItem>
                  );
                }
                if (totalPages > 1) {
                  pages.push(
                    <PaginationItem key={totalPages}>
                      <PaginationLink
                        href="#"
                        isActive={pageIndex === totalPages}
                        onClick={() => fetchRecommendations(totalPages)}
                      >
                        {totalPages}
                      </PaginationLink>
                    </PaginationItem>
                  );
                }
                return pages;
              })()}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={() => {
                    if (pageIndex < totalPages)
                      fetchRecommendations(pageIndex + 1);
                  }}
                  className={
                    pageIndex === totalPages
                      ? "pointer-events-none opacity-50"
                      : ""
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}

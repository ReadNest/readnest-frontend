import { BookCard } from "@/features/favouriteBooks/components/BookCard";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState } from "@/store";
import {
  getFavoritesStart,
  setPagingInfo,
} from "@/features/favouriteBooks/favoriteSlice";
import { useCallback, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@radix-ui/react-dropdown-menu";

export default function FavouriteBooksPage() {
  const dispatch = useDispatch();
  const { favorites, pagingInfo } = useSelector((state: RootState) => state.favorites);
  const { user } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  const { pageIndex = 1, pageSize = 8, totalItems = 0 } = pagingInfo;

  useEffect(() => {
    if (user?.userId) {
      dispatch(
        getFavoritesStart({
          userId: user.userId,
          paging: { pageIndex, pageSize },
        })
      );
    }
  }, [dispatch, user?.userId, pageIndex, pageSize]);

  const handlePageChange = useCallback(
    (newPageIndex: number) => {
      dispatch(setPagingInfo({ ...pagingInfo, pageIndex: newPageIndex }));
    },
    [dispatch, pagingInfo]
  );

  const handlePageSizeChange = useCallback(
    (newPageSize: number) => {
      dispatch(
        setPagingInfo({
          ...pagingInfo,
          pageSize: newPageSize,
          pageIndex: 1,
        })
      );
    },
    [dispatch, pagingInfo]
  );

  const totalPages = Math.ceil(totalItems / (pageSize || 1));

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header Section */}
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">SÁCH YÊU THÍCH CỦA TÔI</h1>
          <p className="text-gray-600 mt-1">Tổng cộng: {totalItems} cuốn sách</p>
        </div>
        <div className="flex space-x-2">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Sách mỗi trang</span>
            <Select
              value={pageSize.toString()}
              onValueChange={(value) => handlePageSizeChange(Number(value))}
            >
              <SelectTrigger className="w-[100px] border-gray-300">
                <SelectValue placeholder={pageSize.toString()} />
              </SelectTrigger>
              <SelectContent>
                {[4, 8, 12, 16].map((opt) => (
                  <SelectItem key={opt} value={opt.toString()}>
                    {opt}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <Separator className="mb-10" />

      {/* Book Grid - 4 columns */}
      {favorites.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
          {favorites.map((book) => (
            <BookCard
              key={book.id}
              title={book.title ?? "Không có tiêu đề"}
              author={book.author ?? "Không rõ tác giả"}
              rating={book.averageRating ?? 0}
              image={book.imageUrl || ""}
              onClick={() => navigate(`/book-detail/${book.id}`)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center text-muted-foreground py-12">
          <p className="text-lg">Bạn chưa có cuốn sách yêu thích nào.</p>
          <p className="text-sm mt-2">Hãy khám phá và thêm một vài cuốn!</p>
        </div>
      )}

      {/* Pagination  */}
      <div className="flex justify-center mt-8">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(pageIndex - 1);
                }}
                className={pageIndex <= 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>

            {(() => {
              const pages: (number | "...")[] = [];
              const maxVisible = 5;

              if (totalPages <= maxVisible) {
                for (let i = 1; i <= totalPages; i++) pages.push(i);
              } else {
                pages.push(1);
                let start = Math.max(2, pageIndex - 1);
                let end = Math.min(totalPages - 1, pageIndex + 1);

                if (pageIndex <= 3) end = 4;
                else if (pageIndex >= totalPages - 2) start = totalPages - 3;

                if (start > 2) pages.push("...");
                for (let i = start; i <= end; i++) pages.push(i);
                if (end < totalPages - 1) pages.push("...");
                pages.push(totalPages);
              }

              return pages.map((p, idx) =>
                p === "..." ? (
                  <PaginationItem key={`ellipsis-${idx}`}>
                    <span className="px-2 text-gray-500">...</span>
                  </PaginationItem>
                ) : (
                  <PaginationItem key={p}>
                    <PaginationLink
                      href="#"
                      isActive={p === pageIndex}
                      onClick={(e) => {
                        e.preventDefault();
                        handlePageChange(p);
                      }}
                    >
                      {p}
                    </PaginationLink>
                  </PaginationItem>
                )
              );
            })()}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(pageIndex + 1);
                }}
                className={pageIndex >= totalPages ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
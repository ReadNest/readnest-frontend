import { Card, CardContent, CardHeader } from "@/components/ui/card";
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

export default function FavouriteBooksPage() {
  const dispatch = useDispatch();
  const { favorites, pagingInfo } = useSelector((state: RootState) => state.favorites);
  const { user } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  const { pageIndex = 1, pageSize = 4, totalItems = 0 } = pagingInfo;

  // Fetch favorites when component loads or when paging changes
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

  // Handle page change
  const handlePageChange = useCallback(
    (newPageIndex: number) => {
      dispatch(setPagingInfo({ ...pagingInfo, pageIndex: newPageIndex }));
    },
    [dispatch, pagingInfo]
  );

  // Handle page size change
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
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <Card className="p-6 mb-6">
        <CardHeader>
          <h1 className="text-3xl font-bold mb-2">Sách yêu thích của tôi</h1>
          <p className="text-gray-600">Tổng cộng: {totalItems} cuốn sách</p>
        </CardHeader>

        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
          <div className="relative w-full sm:w-64"></div>
            <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
              <div className="relative w-full sm:w-64"></div>

              {/* Thay vì Dropdown "Sắp xếp" và "Lọc", ta dùng page size selector */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground mr-2">Sách mỗi trang</span>
                <Select
                  value={pageSize.toString()}
                  onValueChange={(value) => handlePageSizeChange(Number(value))}
                >
                  <SelectTrigger className="w-[100px]">
                    <SelectValue placeholder="Chọn số" />
                  </SelectTrigger>
                  <SelectContent>
                    {[4, 8, 10, 20].map((opt) => (
                      <SelectItem key={opt} value={opt.toString()}>
                        {opt}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
        </div>

        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
        </CardContent>
      </Card>

      {/* Pagination controls */}
      <Pagination className="mt-8">
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
                  <span className="px-2 text-muted-foreground">...</span>
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
  );
}

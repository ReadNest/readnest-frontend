import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { BookSearchResult } from "@/features/search/components/BookSearchResult";
import type { GetBookSearchResponse } from "@/api/@types";
import { useEffect, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { searchBooksRequestV2 } from "@/features/search/bookSearchSlice";
import type { RootState } from "@/store";
import { getFavoritesStart } from "@/features/favouriteBooks/favoriteSlice";

type SearchResultData = {
  items: GetBookSearchResponse[];
  totalItems: number;
  pageIndex: number;
  pageSize: number;
};

type SearchPageProps = {
  searchResult?: SearchResultData;
};

export default function SearchPage({ searchResult }: SearchPageProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as {
    keyword?: string;
    initialResults?: GetBookSearchResponse[];
    page?: number;
    totalItems: number;
    hasMore?: boolean;
  };

  const bookSearch = useSelector((state: RootState) => state.bookSearch);
  const auth = useSelector((state: RootState) => state.auth);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [keyword, setKeyword] = useState<string>(state?.keyword || "");
  const [books, setBooks] = useState<GetBookSearchResponse[]>(
    state?.initialResults || searchResult?.items || []
  );
  const [totalItems, setTotalItems] = useState<number>(
    state?.totalItems || bookSearch?.totalItems || 0
  );
  const [pageIndex, setPageIndex] = useState<number>(state?.page || 1);
  const [pageSize] = useState<number>(6);

  const totalPages = Math.ceil(totalItems / pageSize);

  const fetchBooks = async (page: number) => {
    dispatch(
      searchBooksRequestV2({
        keyword: keyword,
        page: page,
      })
    );
  };

  useEffect(() => {
    if (!searchResult || !keyword) {
      fetchBooks(pageIndex);
    }
    dispatch(
      getFavoritesStart({
        userId: auth.user.userId ?? "",
        paging: { pageIndex: 1, pageSize: 100 },
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageIndex, keyword]);

  useEffect(() => {
    setBooks(bookSearch.results ?? []);
    setTotalItems(bookSearch.totalItems);
    setPageIndex(bookSearch?.page ?? 1);
  }, [bookSearch]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filter Sidebar */}
        <div className="w-full md:w-1/4 space-y-8">
          <Card className="p-4">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Bộ lọc</h2>

              {/* Thể loại */}
              <div className="ml-2">
                <h3 className="font-medium mb-2">Thể loại</h3>
                <div className="space-y-2">
                  {[
                    "Tiểu thuyết",
                    "Trinh thám",
                    "Phát triển bản thân",
                    "Lịch sử",
                  ].map((genre) => (
                    <div key={genre} className="flex items-center space-x-2">
                      <Checkbox
                        className="data-[state=checked]:bg-indigo-600"
                        id={genre}
                      />
                      <label htmlFor={genre} className="text-sm">
                        {genre}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Ngôn ngữ */}
              <div className="ml-2">
                <h3 className="font-medium mb-2">Ngôn ngữ</h3>
                <div className="space-y-2">
                  {["Tiếng Việt", "Tiếng Anh", "Tiếng Nhật"].map((language) => (
                    <div key={language} className="flex items-center space-x-2">
                      <Checkbox
                        className="data-[state=checked]:bg-indigo-600"
                        id={language}
                      />
                      <label htmlFor={language} className="text-sm">
                        {language}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Book Results */}
        <div className="w-full md:w-3/4">
          <p className="text-sm text-gray-600 mb-4">
            {totalItems > 0
              ? `Tìm thấy ${totalItems} kết quả`
              : "Không tìm thấy kết quả nào"}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {books.map((book) => (
              <Card key={book.id}>
                <BookSearchResult
                  bookId={book.id ?? ""}
                  bookImage={book.imageUrl ?? ""}
                  bookName={book.title ?? ""}
                  bookAuthor={book.author ?? ""}
                  rating={book.averageRating ?? 0}
                  isFavorite={book.isFavorite ?? false}
                  onClick={() => navigate(`/book-detail/${book.id}`)}
                />
              </Card>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8 flex justify-center">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={() => {
                        if (pageIndex > 1) fetchBooks(pageIndex - 1);
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

                    // Always show first page
                    pages.push(
                      <PaginationItem key={1}>
                        <PaginationLink
                          href="#"
                          isActive={pageIndex === 1}
                          onClick={() => fetchBooks(1)}
                        >
                          1
                        </PaginationLink>
                      </PaginationItem>
                    );

                    if (startPage > 2) {
                      pages.push(
                        <PaginationItem key="start-ellipsis">
                          <span className="px-2 text-muted-foreground">
                            ...
                          </span>
                        </PaginationItem>
                      );
                    }

                    for (let i = startPage; i <= endPage; i++) {
                      pages.push(
                        <PaginationItem key={i}>
                          <PaginationLink
                            href="#"
                            isActive={pageIndex === i}
                            onClick={() => fetchBooks(i)}
                          >
                            {i}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    }

                    if (endPage < totalPages - 1) {
                      pages.push(
                        <PaginationItem key="end-ellipsis">
                          <span className="px-2 text-muted-foreground">
                            ...
                          </span>
                        </PaginationItem>
                      );
                    }

                    if (totalPages > 1) {
                      pages.push(
                        <PaginationItem key={totalPages}>
                          <PaginationLink
                            href="#"
                            isActive={pageIndex === totalPages}
                            onClick={() => fetchBooks(totalPages)}
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
                        if (pageIndex < totalPages) fetchBooks(pageIndex + 1);
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
      </div>
    </div>
  );
}

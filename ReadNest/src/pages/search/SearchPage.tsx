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
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store";
import {
  fetchBooksStart,
  filterBooksStart,
} from "@/features/search/bookSearchPageSlice";
import { FilterSidebar } from "@/features/search/components/FilterSidebar";
import { fetchCategoriesRequest } from "@/features/search/categoryFilterSlice";
import { getFavoritesStart } from "@/features/favouriteBooks/favoriteSlice";
import { motion } from "framer-motion";

type SearchResultData = {
  items: GetBookSearchResponse[];
  totalItems: number;
  pageIndex: number;
  pageSize: number;
};

type SearchPageProps = {
  searchResult?: SearchResultData;
};

const languagesFromApi = [
  { id: "vi", name: "Tiếng Việt" },
  { id: "en", name: "Tiếng Anh" },
  { id: "jp", name: "Tiếng Nhật" },
  { id: "fr", name: "Tiếng Pháp" },
  { id: "zh", name: "Tiếng Trung" },
  { id: "ko", name: "Tiếng Hàn" },
];

export default function SearchPage({ searchResult }: SearchPageProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") ?? "";

  const bookSearch = useSelector((state: RootState) => state.bookSearchPage);
  const { results } = useSelector((state: RootState) => state.categoryFilter);
  const auth = useSelector((state: RootState) => state.auth);

  const [books, setBooks] = useState<GetBookSearchResponse[]>(
    searchResult?.items || []
  );
  const [totalItems, setTotalItems] = useState<number>(
    bookSearch?.totalItems || 0
  );
  const [pageIndex, setPageIndex] = useState<number>(bookSearch?.page || 1);
  const [pageSize] = useState<number>(12);

  const totalPages = Math.ceil(totalItems / pageSize);

  const fetchBooks = async (page: number) => {
    dispatch(
      fetchBooksStart({
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

  useEffect(() => {
    dispatch(fetchCategoriesRequest());
  }, [dispatch]);

  const handleOnChange = (filters: {
    genres: string[];
    languages: string[];
  }) => {
    dispatch(
      filterBooksStart({
        categoryIds: filters.genres,
        keyword: keyword,
        languageIds: filters.languages,
        page: pageIndex,
      })
    );
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <motion.div
        className="flex flex-col md:flex-row gap-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Filter Sidebar */}
        <motion.div
          className="w-full md:w-1/4 space-y-8"
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="p-4 shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Bộ lọc</h2>
              <FilterSidebar
                genres={results}
                languages={languagesFromApi}
                onFilterChange={handleOnChange}
              />
            </div>
          </Card>
        </motion.div>

        {/* Book Results */}
        <div className="w-full md:w-3/4">
          <p className="text-sm text-gray-600 mb-4">
            {totalItems > 0
              ? `Tìm thấy ${totalItems} kết quả`
              : "Không tìm thấy kết quả nào"}
          </p>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {books.map((book) => (
              <motion.div
                key={book.id}
                variants={cardVariants}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="shadow-sm border border-indigo-50 hover:shadow-xl transition-shadow duration-300">
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
              </motion.div>
            ))}
          </motion.div>

          {/* Pagination */}
          {totalPages > 1 && (
            <motion.div
              className="mt-8 flex justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
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
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

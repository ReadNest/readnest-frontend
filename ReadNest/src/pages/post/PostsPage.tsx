import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { PostCard } from "@/features/post/components/PostCard";
import SkeletonPostCardList from "@/features/post/components/SkeletonPostCardList";
import {
  fetchPostsStart,
  filterPostsStart,
  setPagingInfo,
} from "@/features/post/postSlice";
import {
  clearResults,
  searchBooksRequest,
} from "@/features/search/bookSearchSlice";
import type { RootState } from "@/store";
import type { FilterPostRequest } from "@/api/@types";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import parse from "html-react-parser";
import { ChevronDown, Filter, Search, X } from "lucide-react";

export default function PostsPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux states
  const posts = useSelector((state: RootState) => state.post.posts);
  const pagingInfo = useSelector((state: RootState) => state.post.pagingInfo);
  const isLoading = useSelector((state: RootState) => state.post.loading);
  const { results } = useSelector((state: RootState) => state.bookSearch);

  const pageIndex = pagingInfo.pageIndex ?? 1;
  const pageSize = pagingInfo.pageSize ?? 6;
  const totalItems = pagingInfo.totalItems ?? 0;
  const totalPages = Math.ceil(totalItems / (pageSize || 1));

  // Filter states
  const [filters, setFilters] = useState<FilterPostRequest>({
    keyword: null,
    bookId: null,
    sortBy: "newest",
  });
  const [keywordInput, setKeywordInput] = useState("");
  const [bookName, setBookName] = useState("");

  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(
    null
  );

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const sortOptions = [
    { label: "Mới nhất", value: "newest" },
    { label: "Cũ nhất", value: "oldest" },
    { label: "Lượt xem", value: "views" },
    { label: "Lượt thích", value: "likes" },
  ];

  // Init page info
  useEffect(() => {
    dispatch(setPagingInfo({ pageIndex: 1, pageSize: 6 }));
  }, [dispatch]);

  // Handle filtering and fetching posts
  useEffect(() => {
    if (pageIndex > totalPages && totalPages > 0) {
      dispatch(setPagingInfo({ pageIndex: 1, pageSize }));
      return;
    }
  
    const hasFilter = filters.keyword || filters.bookId || filters.sortBy;
    if (hasFilter) {
      dispatch(filterPostsStart({ ...filters, pageIndex, pageSize }));
    } else {
      dispatch(fetchPostsStart({ pageIndex, pageSize }));
    }
  }, [filters.keyword, filters.bookId, filters.sortBy, pageIndex, pageSize, totalPages, dispatch]);

  // Debounce keyword input
  useEffect(() => {
    if (searchTimeout) clearTimeout(searchTimeout);

    const timeout = setTimeout(() => {
      const trimmed = keywordInput.trim();
      setFilters((prev) => ({
        ...prev,
        keyword: trimmed === "" ? null : trimmed,
      }));
    }, 500);

    setSearchTimeout(timeout);
    return () => clearTimeout(timeout);
  }, [keywordInput]);

  // Handle bookName reset
  useEffect(() => {
    if (bookName.trim() === "") {
      setFilters((prev) => ({
        ...prev,
        bookId: null,
      }));
    }
  }, [bookName]);

  // Handle pagination
  const handlePageChange = useCallback(
    (newPageIndex: number) => {
      if (
        newPageIndex < 1 ||
        newPageIndex > totalPages ||
        newPageIndex === pageIndex
      )
        return;

      dispatch(setPagingInfo({ pageIndex: newPageIndex, pageSize }));
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [dispatch, pageIndex, pageSize, totalPages]
  );

  // Handle book search
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setBookName(value);

    if (searchTimeout) clearTimeout(searchTimeout);

    const timeout = setTimeout(() => {
      if (value.trim()) {
        dispatch(searchBooksRequest({ keyword: value.trim(), page: 1 }));
      }
    }, 500);

    setSearchTimeout(timeout);
  };

  // Handle select book
  const handleSelectBook = (id: string, name: string) => {
    setFilters((prev) => ({
      ...prev,
      bookId: id,
    }));
    setBookName(name);
    dispatch(clearResults());
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getDate()} tháng ${date.getMonth() + 1}, ${date.getFullYear()}`;
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header & Filters */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Bài viết đánh giá</h1>
          <p className="text-muted-foreground mt-2">
            Khám phá những đánh giá chi tiết về các cuốn sách hay ({totalItems} kết quả tìm kiếm)
          </p>
        </div>

        {/* Dropdown Filter */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
          >
            <Filter size={18} className="text-gray-700" />
            <span className="text-gray-700">Bộ lọc</span>
            {Object.values(filters).some(Boolean) && (
              <span className="inline-flex items-center justify-center w-5 h-5 text-xs bg-indigo-600 text-white rounded-full">
                {Object.values(filters).filter(Boolean).length}
              </span>
            )}
            <ChevronDown
              size={16}
              className={`ml-1 text-gray-500 transition-transform ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Dropdown Content */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-4 space-y-4">
              {/* Keyword Search */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Tìm kiếm bài viết
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Nhập từ khóa..."
                    value={keywordInput}
                    onChange={(e) => setKeywordInput(e.target.value)}
                    className="w-full py-2 pl-3 pr-8 border border-gray-300 rounded-md focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                  />
                  <Search className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
              </div>

              {/* Book Search */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Tìm sách
                </label>
                <div className="relative">
                  <input
                    placeholder="Nhập tên sách..."
                    value={bookName}
                    onChange={handleSearchChange}
                    className="w-full py-2 pl-3 pr-8 border border-gray-300 rounded-md focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                  />
                  {bookName ? (
                    <button
                      onClick={() => setBookName("")}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  ) : (
                    <Search className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  )}
                </div>
                {/* Book dropdown */}
                {bookName && results.length > 0 && (
                  <div className="mt-1 bg-white border border-gray-200 rounded-md shadow-md max-h-48 overflow-auto text-sm">
                    {results.map((book) => (
                      <div
                        key={book.id}
                        className="p-2 hover:bg-gray-50 cursor-pointer flex items-center gap-2 border-b border-gray-100 last:border-b-0"
                        onClick={() => {
                          handleSelectBook(book.id ?? "", book.title ?? "");
                          setIsDropdownOpen(false);
                        }}
                      >
                        <img
                          src={book.imageUrl ?? "/book-placeholder.png"}
                          className="w-8 h-10 object-cover rounded-sm"
                          alt={book.title ?? ""}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 truncate">
                            {book.title}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {book.author}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Sort Options */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Sắp xếp theo
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {sortOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => {
                        setFilters((prev) => ({ ...prev, sortBy: opt.value }));
                        setIsDropdownOpen(false);
                      }}
                      className={`py-1.5 px-3 text-xs rounded-md transition-colors ${
                        filters.sortBy === opt.value
                          ? "bg-indigo-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between pt-2">
                <button
                  onClick={() => {
                    setFilters({ keyword: null, bookId: null, sortBy: "newest" });
                    setKeywordInput("");
                    setBookName("");
                  }}
                  className="text-xs text-indigo-600 hover:text-indigo-800"
                >
                  Đặt lại
                </button>
                <button
                  onClick={() => setIsDropdownOpen(false)}
                  className="text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-md"
                >
                  Áp dụng
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Post List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
            <SkeletonPostCardList count={6} />
          ) : posts.length === 0 ? (
            <div className="col-span-full text-center text-gray-500 text-lg py-12">
              Không tìm thấy bài viết nào phù hợp với bộ lọc hiện tại.
            </div>
          ) : (
          posts.map((post) => (
            <PostCard
              key={post.id}
              bookImageUrl={post.book?.imageUrl ?? ""}
              creator={post.creator?.fullName ?? ""}
              creatorAvatarUrl={post.creator?.avatarUrl ?? ""}
              date={formatDate(post.createdAt ?? "")}
              title={post.title ?? ""}
              content={parse(post.content ?? "")}
              rating={post.book?.avarageRating ?? 0}
              views={post.views ?? 0}
              likes={post.likesCount ?? 0}
              onClick={() => navigate(`/post/${post.id}`)}
            />
          ))
        )}
      </div>

      {/* Pagination */}
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

import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import type { RootState } from "@/store";
import { clearResults, searchBooksRequest } from "../bookSearchSlice";

interface SearchDropdownProps {
  searchText: string;
}

const SearchDropdown = ({ searchText }: SearchDropdownProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const dispatch = useDispatch();
  const { results, loading, hasMore, page } = useSelector(
    (state: RootState) => state.bookSearch
  );

  useEffect(() => {
    if (searchText) {
      dispatch(searchBooksRequest({ keyword: searchText, page: 1 }));
      setShowDropdown(true);
    } else {
      dispatch(clearResults());
      setShowDropdown(false);
    }
  }, [searchText, dispatch]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLoadMore = () => {
    dispatch(searchBooksRequest({ keyword: searchText, page: page + 1 }));
  };

  if (!showDropdown || results.length === 0) return null;

  return (
    <div
      ref={containerRef}
      className="absolute mt-2 w-full bg-white border rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto"
    >
      {results.map((book) => (
        <Link
          to={`/book-detail/${book.id}`}
          key={book.id}
          className="flex items-start gap-2 p-2 hover:bg-gray-100"
          onClick={() => setShowDropdown(false)}
        >
          <img
            src={book.imageUrl ?? ""}
            alt={book.title ?? "Error"}
            className="w-10 h-14 object-cover rounded"
          />
          <div>
            <p className="text-sm font-semibold">{book.title}</p>
            <p className="text-xs text-gray-500">{book.author}</p>
          </div>
        </Link>
      ))}
      {hasMore && (
        <button
          className="w-full text-sm text-indigo-600 font-medium py-2 border-t hover:bg-indigo-50"
          onClick={handleLoadMore}
          disabled={loading}
        >
          {loading ? "Đang tải..." : "Xem thêm"}
        </button>
      )}
    </div>
  );
};

export default SearchDropdown;

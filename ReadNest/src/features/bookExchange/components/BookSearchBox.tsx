import type { GetBookTradingPostResponse } from "@/api/@types";
import client from "@/lib/api/axiosClient";
import { useState, useRef, useEffect, type ChangeEvent } from "react";

interface BookSearchBoxProps {
  value: string;
  onChange: (id: string) => void;
  placeholder?: string;
}

export default function BookSearchBox({
  value,
  onChange,
  placeholder,
}: BookSearchBoxProps) {
  const [searchText, setSearchText] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [books, setBooks] = useState<GetBookTradingPostResponse[]>([]);
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const selectedBook = books.find((b) => b.id === value);
  const filtered =
    searchText.trim() === "" || searchText === (selectedBook?.title ?? "")
      ? books
      : books.filter((b) =>
          b.title?.toLowerCase().includes(searchText.toLowerCase())
        );

  useEffect(() => {
    client.api.v1.books.all.$get().then((r) => {
      setBooks(r.data ?? []);
    });
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (!rootRef.current?.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    }
    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [showDropdown]);

  // Reset searchText when value changes (clear or select)
  useEffect(() => {
    if (selectedBook) setSearchText(selectedBook.title ?? "");
    else setSearchText("");
  }, [selectedBook]);

  // Reset searchText khi value hoặc books thay đổi (đảm bảo fill đúng khi load xong)
  useEffect(() => {
    if (value && books.length > 0) {
      const found = books.find((b) => b.id === value);
      if (found) setSearchText(found.title ?? "");
    }
  }, [value, books]);

  return (
    <div className="relative" ref={rootRef}>
      <div className="flex items-center border rounded px-3 py-2 bg-white focus-within:ring-2 focus-within:ring-indigo-400">
        <svg
          className="w-5 h-5 text-gray-400 mr-2"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          ref={inputRef}
          type="text"
          className="flex-1 outline-none bg-transparent text-base"
          value={selectedBook ? selectedBook.title ?? "" : searchText}
          placeholder={placeholder || "Tìm kiếm sách..."}
          onFocus={() => setShowDropdown(true)}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setSearchText(e.target.value);
            setShowDropdown(true);
            if (!e.target.value) onChange("");
          }}
          autoComplete="off"
        />
        {selectedBook && (
          <button
            type="button"
            className="ml-2 text-gray-400 hover:text-gray-600"
            onClick={() => {
              onChange("");
              setSearchText("");
              setShowDropdown(false);
              inputRef.current?.focus();
            }}
            tabIndex={-1}
          >
            ×
          </button>
        )}
      </div>
      {showDropdown && (
        <div className="absolute z-10 bg-white border w-full rounded shadow mt-1 max-h-60 overflow-auto">
          {filtered.length === 0 ? (
            <div className="p-2 text-indigo-500 text-sm font-medium bg-indigo-50 text-center">
              Không tìm thấy sách phù hợp
            </div>
          ) : (
            filtered.map((b) => (
              <div
                key={b.id}
                className={`flex items-center gap-3 p-2 cursor-pointer hover:bg-indigo-50 ${
                  value === b.id ? "bg-indigo-100" : ""
                }`}
                onClick={() => {
                  onChange(b.id ?? "");
                  setSearchText(b.title ?? "");
                  setShowDropdown(false);
                }}
              >
                <img
                  src={b.imageUrl ?? ""}
                  alt={b.title ?? ""}
                  className="w-10 h-14 object-cover rounded border"
                  loading="lazy"
                />
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-base truncate">
                    {b.title}
                  </div>
                  {b.author && (
                    <div className="text-xs text-gray-500 line-clamp-2">
                      {b.author}
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

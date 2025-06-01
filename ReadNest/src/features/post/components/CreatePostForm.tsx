"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PostEditor from "./PostEditor";
import PostPreview from "./PostPreview";
import {
  createPostRequested,
  resetPostStatus,
} from "@/features/post/postSlice";
import type { RootState } from "@/store";
import {
  clearResults,
  searchBooksRequest,
} from "@/features/search/bookSearchSlice";
import { useNavigate } from "react-router-dom";

export default function CreatePostForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);
  const postState = useSelector((state: RootState) => state.post);
  const { results } = useSelector((state: RootState) => state.bookSearch);

  const [bookName, setBookName] = useState("");
  const [bookId, setBookId] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);

  useEffect(() => {
    if (postState.isSuccess) {
      navigate("/posts");
      dispatch(resetPostStatus());
    }
  }, [postState.isSuccess, navigate, dispatch]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setBookName(value);
    dispatch(searchBooksRequest({ keyword: value, page: 1 }));
  };

  const handleSelectBook = (id: string, name: string) => {
    setBookId(id);
    setBookName(name);
    dispatch(clearResults());
  };

  const handleSubmit = () => {
    console.log("data: ", bookId, ", ", title, ", ", content, ", ", bookName);
    if (!title.trim() || !content.trim() || !bookId) {
      alert("Vui lòng điền đầy đủ tiêu đề, nội dung và chọn sách.");
      return;
    }

    dispatch(
      createPostRequested({
        title,
        content,
        bookId,
        userId: user?.userId,
      })
    );
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6 relative">
      <h1 className="text-2xl font-bold">Tạo bài viết đánh giá sách</h1>

      {/* Book Selection */}
      <div className="space-y-2 relative">
        <h2 className="font-semibold">Chọn sách</h2>
        <Input
          placeholder="Tìm kiếm sách..."
          value={bookName}
          onChange={handleSearchChange}
        />
        {bookName && (
          <div className="absolute w-full z-50">
            {results.length > 0 && (
              <div className="mt-1 bg-white border rounded-lg shadow-lg max-h-80 overflow-y-auto">
                {results.map((book) => (
                  <div
                    key={book.id}
                    className="flex items-start gap-2 p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() =>
                      handleSelectBook(book.id ?? "", book.title ?? "")
                    }
                  >
                    <img
                      src={book.imageUrl ?? ""}
                      alt={book.title ?? ""}
                      className="w-10 h-14 object-cover rounded"
                    />
                    <div>
                      <p className="text-sm font-semibold">{book.title}</p>
                      <p className="text-xs text-gray-500">{book.author}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Post Title */}
      <div className="space-y-2">
        <h2 className="font-semibold">Tiêu đề</h2>
        <Input
          placeholder="Nhập tiêu đề bài viết..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      {/* Post Editor */}
      <PostEditor onContentChange={setContent} />

      {/* Actions */}
      <div className="flex justify-between">
        <PostPreview
          open={previewOpen}
          onOpenChange={setPreviewOpen}
          bookName={bookName}
          title={title}
          content={content}
          authorName={user?.fullName ?? ""}
          avatarUrl={user?.avatarUrl ?? ""}
        />
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => window.history.back()}>
            Hủy
          </Button>
          <Button onClick={handleSubmit} disabled={postState.isLoading}>
            {postState.isLoading ? "Đang đăng..." : "Đăng bài"}
          </Button>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PostEditor from "./PostEditor";
import PostPreview from "./PostPreview";
import {
  createPostStart,
} from "@/features/post/postSlice";
import type { RootState } from "@/store";
import {
  clearResults,
  searchBooksRequest,
} from "@/features/search/bookSearchSlice";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

export default function CreatePostForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);
  const postState = useSelector((state: RootState) => state.post);
  const { results, loading: isSearching } = useSelector((state: RootState) => state.bookSearch);

  const [bookName, setBookName] = useState("");
  const [bookId, setBookId] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);

  const hasNavigatedRef = useRef(false);

  useEffect(() => {
    if (postState.createPostSuccess && !hasNavigatedRef.current) {
      hasNavigatedRef.current = true;
      navigate("/my-posts");
    }
  }, [postState.createPostSuccess]);
  

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
    if (!title.trim() || !content.trim() || !bookId) {
      alert("Vui lòng điền đầy đủ tiêu đề, nội dung và chọn sách.");
      return;
    }

    dispatch(
      createPostStart({
        title,
        content,
        bookId,
        userId: user?.userId,
      })
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-primary">
            Tạo bài viết đánh giá sách
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Book Selection */}
          <div className="space-y-3 relative">
            <Label htmlFor="book-search" className="text-sm font-medium text-gray-700">
              Chọn sách
            </Label>
            <div className="relative">
              <Input
                id="book-search"
                placeholder="Tìm kiếm sách..."
                value={bookName}
                onChange={handleSearchChange}
                className="pl-10 pr-4 py-3"
              />
              <div className="absolute left-3 top-3 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                </svg>
              </div>
              
              {isSearching && (
                <div className="absolute right-3 top-3">
                  <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
                </div>
              )}
            </div>
            
            {bookName && results.length > 0 && (
              <div className="absolute w-full z-50 mt-1">
                <div className="bg-white border border-gray-200 rounded-lg shadow-lg max-h-80 overflow-y-auto">
                  {results.map((book) => (
                    <div
                      key={book.id}
                      className="flex items-start gap-3 p-3 hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-100 last:border-b-0"
                      onClick={() => handleSelectBook(book.id ?? "", book.title ?? "")}
                    >
                      <img
                        src={book.imageUrl ?? "/book-placeholder.png"}
                        alt={book.title ?? ""}
                        className="w-12 h-16 object-cover rounded-md shadow-sm"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/book-placeholder.png";
                        }}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{book.title}</p>
                        <p className="text-xs text-gray-500 truncate">{book.author}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {bookId && (
              <div className="mt-2 flex items-center gap-2 p-2 bg-green-50 rounded-md border border-green-100">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
                  <path d="M20 6L9 17l-5-5"></path>
                </svg>
                <span className="text-sm text-green-700">Đã chọn: {bookName}</span>
              </div>
            )}
          </div>

          {/* Post Title */}
          <div className="space-y-3">
            <Label htmlFor="post-title" className="text-sm font-medium text-gray-700">
              Tiêu đề bài viết
            </Label>
            <Input
              id="post-title"
              placeholder="Ví dụ: 'Hành trình khám phá bản thân'"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="py-3"
            />
          </div>

          {/* Post Editor */}
          <div className="space-y-3">
            <PostEditor onContentChange={setContent} />
          </div>

          {/* Actions */}
          <div className="flex justify-between pt-4 border-t border-gray-100">
            <Button 
                variant="outline" 
                onClick={() => window.history.back()}
                className="flex-1 sm:flex-none"
              >
                Hủy bỏ
            </Button>
            <div className="flex gap-2">
              <PostPreview
                open={previewOpen}
                onOpenChange={setPreviewOpen}
                bookName={bookName}
                title={title}
                content={content}
                authorName={user?.fullName ?? ""}
                avatarUrl={user?.avatarUrl ?? ""}
              />
              <Button 
              onClick={handleSubmit} 
              disabled={postState.loading}
              className="flex-1 sm:flex-none"
            >
              {postState.loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Đang đăng...
                </>
              ) : (
                "Đăng bài"
              )}
            </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
"use client";

import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PostEditor from "./PostEditor";
import PostPreview from "./PostPreview";
import { getPostByIdStart, updatePostStart } from "@/features/post/postSlice";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import type { RootState } from "@/store";

export default function UpdatePostForm() {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);
  const postState = useSelector((state: RootState) => state.post);

  const [bookName, setBookName] = useState("");
  const [bookId, setBookId] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);
  const hasNavigatedRef = useRef(false);

  useEffect(() => {
    if (postId) {
      dispatch(getPostByIdStart(postId));
    }
  }, [postId]);

  useEffect(() => {
    if (postState.selectedPost) {
      setBookName(postState.selectedPost.book?.title ?? "");
      setBookId(postState.selectedPost.bookId ?? "");
      setTitle(postState.selectedPost.title ?? "");
      setContent(postState.selectedPost.content ?? "");
    }
  }, [postState.selectedPost]);

  const handleUpdate = () => {
    if (!title.trim() || !content.trim() || !bookId) {
      alert("Vui lòng điền đầy đủ tiêu đề, nội dung và chọn sách.");
      return;
    }

    dispatch(
      updatePostStart({
        id: postId,
        title,
        content,
        bookId,
        userId: user?.userId,
      })
    );
  };

  useEffect(() => {
    if (postState.updatePostSuccess && !hasNavigatedRef.current) {
      hasNavigatedRef.current = true;
      navigate("/my-posts");
    }
  }, [postState.updatePostSuccess]);

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-primary">
            Cập nhật bài viết
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Book (hiển thị tĩnh nếu bạn không muốn sửa) */}
          <div className="space-y-2">
            <Label>Sách đang đánh giá</Label>
            <Input value={bookName} disabled className="bg-gray-100" />
          </div>

          {/* Title */}
          <div className="space-y-2">
            <Label>Tiêu đề bài viết</Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Content */}
          <div className="space-y-2">
            <PostEditor onContentChange={setContent} initialContent={content} />
          </div>

          {/* Actions */}
          <div className="flex justify-between pt-4 border-t border-gray-100">
            <Button variant="outline" onClick={() => navigate(-1)}>
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
              <Button onClick={handleUpdate} disabled={postState.loading}>
                {postState.loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Đang cập nhật...
                  </>
                ) : (
                  "Cập nhật bài viết"
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

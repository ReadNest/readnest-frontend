import { PostCard } from "@/features/post/components/PostCard";
import { Button } from "@/components/ui/button";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store";
import { deletePostRequest, fetchPostsByUserIdStart, setPagingInfo } from "@/features/post/postSlice";
import { useCallback, useEffect } from "react";
import parse from "html-react-parser";

export default function UserPostsPage() {
  const dispatch = useDispatch();
  const posts = useSelector((state: RootState) => state.post.posts);
  const pagingInfo = useSelector((state: RootState) => state.post.pagingInfo);
  const auth = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  const pageIndex = pagingInfo.pageIndex ?? 1;
  const pageSize = pagingInfo.pageSize ?? 10;
  const totalItems = pagingInfo.totalItems ?? 0;

  const totalPages = Math.ceil(totalItems / (pageSize || 1))

  useEffect(() => {
    if (auth.user?.userId) {
      dispatch(fetchPostsByUserIdStart({ 
        userId: auth.user.userId, 
        paging: { 
          pageIndex: pagingInfo.pageIndex ?? 1, 
          pageSize: pagingInfo.pageSize ?? 6 } 
      }));
    }
  }, [auth.user?.userId, dispatch]);

  const handlePageChange = useCallback(
    (newPageIndex: number) => {
      if (newPageIndex < 1 || newPageIndex > totalPages) return;
      dispatch(setPagingInfo({ pageIndex: newPageIndex, pageSize }));
    },
    [dispatch, pageSize, totalPages]
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getDate()} tháng ${date.getMonth() + 1}, ${date.getFullYear()}`;
  };

  const handleDelete = (postId: string) => {
    if (window.confirm("Bạn có chắc muốn xóa bài viết này không?")) {
      dispatch(deletePostRequest(postId));
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Bài viết của bạn</h1>
          <p className="text-muted-foreground mt-2">
            Tổng cộng: {totalItems} bài viết
          </p>
        </div>
        
        <Link to="/create-post">
            <Button
                variant="default"
                className="w-full rounded-full bg-indigo-600 hover:bg-indigo-700 text-white text-lg font-semibold"
            >
                <Plus className="h-4 w-4" />
                Thêm bài viết mới
            </Button>
        </Link>
      </div>

      {/* Danh sách bài đăng */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div key={post.id} className="relative group">
            <PostCard  
              key={post.id }
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
            
            {/* Action buttons */}
            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => navigate(`/edit-post/${post.id}`)}
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => handleDelete(post.id ?? "")}
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          </div>
        ))}
      </div>

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
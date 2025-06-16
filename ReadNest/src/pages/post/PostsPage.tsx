import { Badge } from "@/components/ui/badge";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { PostCard } from "@/features/post/components/PostCard";
import { fetchPostsStart, setPagingInfo, setPostsV1 } from "@/features/post/postSlice";
import type { RootState } from "@/store";
import { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import parse from "html-react-parser";
import { useNavigate } from "react-router-dom";
import SkeletonPostCardList from "@/features/post/components/SkeletonPostCardList";

export default function PostsPage() {
    const dispatch = useDispatch();
    const posts = useSelector((state: RootState) => state.post.posts);
    const pagingInfo = useSelector((state: RootState) => state.post.pagingInfo);
    const isLoading = useSelector((state: RootState) => state.post.loading);
    const navigate = useNavigate();

    const pageIndex = pagingInfo.pageIndex ?? 1;
    const pageSize = pagingInfo.pageSize ?? 6;
    const totalItems = pagingInfo.totalItems ?? 0;

    const totalPages = Math.ceil(totalItems / (pageSize || 1))

    const initialized = useRef(false);

    useEffect(() => {
      if (!initialized.current) {
        dispatch(setPagingInfo({ pageIndex: 1, pageSize: 6 }));
        initialized.current = true;
      }
    }, [dispatch]);
    
    useEffect(() => {
      dispatch(setPostsV1([])); // reset posts khi chuyển trang
      dispatch(fetchPostsStart({ pageIndex, pageSize }));
    }, [dispatch, pageIndex, pageSize]);

    const handlePageChange = useCallback(
      (newPageIndex: number) => {
        if (
          newPageIndex < 1 ||
          newPageIndex > totalPages ||
          newPageIndex === pageIndex
        ) {
          return;
        }
        dispatch(setPagingInfo({ pageIndex: newPageIndex, pageSize }));
        window.scrollTo({ top: 0, behavior: "smooth" }); // tùy chọn
      },
      [dispatch, pageIndex, pageSize, totalPages]
    );
  

    const formatDate = (dateString: string) => {
      const date = new Date(dateString);
      return `${date.getDate()} tháng ${date.getMonth() + 1}, ${date.getFullYear()}`;
    };
    
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Bài viết đánh giá</h1>
          <p className="text-muted-foreground mt-2">
            Khám phá những đánh giá chi tiết về các cuốn sách hay
          </p>
        </div>
        
        <div className="flex gap-4 mt-4 md:mt-0">
          <Badge variant="secondary" className="cursor-pointer">
            Mới nhất
          </Badge>
          <Badge variant="outline" className="cursor-pointer">
            Tất cả thể loại
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          <SkeletonPostCardList count={6} />
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
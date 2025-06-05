import { PostCard } from "@/features/post/components/PostCard";
import { Button } from "@/components/ui/button";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Link } from "react-router-dom";

export default function UserPostsPage() {
  // Giả sử đây là danh sách bài đăng của user hiện tại
  const userPosts = [
    {
      id: 1,
      bookImageUrl: "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-llk4ubz24f5if9",
      creator: "Bạn",
      creatorAvatarUrl: "https://github.com/shadcn.png",
      date: "23 tháng 2, 2025",
      title: "Đắc Nhân Tâm – Nghệ thuật thu phục lòng người",
      content: "Bài đánh giá của bạn về cuốn sách này...",
      rating: 4.0,
      views: 356,
      likes: 124,
    },
    // Thêm các bài đăng khác
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Bài viết của bạn</h1>
          <p className="text-muted-foreground mt-2">
            Tổng cộng: 5 bài viết
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
        {userPosts.map((post) => (
          <div key={post.id} className="relative group">
            <PostCard {...post} />
            
            {/* Action buttons */}
            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button variant="outline" size="icon" className="h-8 w-8">
                <Pencil className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="h-8 w-8">
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
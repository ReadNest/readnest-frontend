import { Badge } from "@/components/ui/badge";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { PostCard } from "@/features/post/components/PostCard";

export default function PostsPage() {
    const reviews = [
        {
          id: 1,
          bookImageUrl: "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-llk4ubz24f5if9",
          creator: "Nguyễn Thị Anh",
          creatorAvatarUrl: "https://github.com/shadcn.png",
          date: "23 tháng 2, 2025",
          title: "Đắc Nhân Tâm – Nghệ thuật thu phục lòng người",
          content: "Một cuốn sách tuyệt vời về nghệ thuật giao tiếp và xây dựng các mối quan hệ. Cuốn sách giúp bạn hiểu rõ hơn về tâm lý con người và cách ứng xử khôn ngoan.",
          rating: 4.0,
          views: 356,
          likes: 124
        },
        {
          id: 2,
          bookImageUrl: "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-llk4ubz24f5if9",
          creator: "Trần Văn Minh",
          creatorAvatarUrl: "https://github.com/shadcn.png",
          date: "21 tháng 2, 2025",
          title: "Nhà Giả Kim – Hành trình khám phá bản thân",
          content: "Câu chuyện về hành trình theo đuổi ước mơ và khám phá ý nghĩa cuộc sống. Một tác phẩm truyền cảm hứng mạnh mẽ về việc lắng nghe trái tim mình.",
          rating: 5.0,
          views: 289,
          likes: 89
        },
        {
          id: 3,
          bookImageUrl: "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-llk4ubz24f5if9",
          creator: "Lê Thu Hồ",
          creatorAvatarUrl: "https://github.com/shadcn.png",
          date: "20 tháng 2, 2025",
          title: "Cà Phê Cùng Tony – Trò chuyện về khởi nghiệp",
          content: "Những bài học quý giá về khởi nghiệp và phát triển bản thân. Tony chia sẻ những kinh nghiệm thực tế với giọng văn gần gũi, hài hước.",
          rating: 4.0,
          views: 512,
          likes: 156
        },
        // Thêm các review khác nếu cần
      ];

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
        {reviews.map((review) => (
          <PostCard
            key={review.id}
            bookImageUrl={review.bookImageUrl}
            creator={review.creator}
            creatorAvatarUrl={review.creatorAvatarUrl}
            date={review.date}
            title={review.title}
            content={review.content}
            rating={review.rating}
            views={review.views}
            likes={review.likes}
          />
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
              <PaginationLink href="#">3</PaginationLink>
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
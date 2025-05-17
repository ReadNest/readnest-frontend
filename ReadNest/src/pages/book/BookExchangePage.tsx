import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

const books = [
  {
    id: 1,
    imageUrl: "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-llk4ubz24f5if9",
    title: "Đắc Nhân Tâm",
    author: "Dale Carnegie",
    condition: "Như mới",
    owner: "Nguyễn Văn A",
    requestCount: 5
  },
  {
    id: 2,
    imageUrl: "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-llk4ubz24f5if9",
    title: "Nhà Giả Kim",
    author: "Paulo Coelho",
    condition: "Đồ qua sử dụng",
    owner: "Trần Thị B",
    requestCount: 3
  },
  {
    id: 3,
    imageUrl: "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-llk4ubz24f5if9",
    title: "Tuổi Trẻ Đáng Giá Bao Nhiêu",
    author: "Rosie Nguyễn",
    condition: "Như mới",
    owner: "Lê Văn C",
    requestCount: 2
  },
  {
    id: 4,
    imageUrl: "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-llk4ubz24f5if9",
    title: "Tư Duy Phản Biện",
    author: "Richard Paul",
    condition: "Đồ qua sử dụng",
    owner: "Phạm Thị D",
    requestCount: 0
  },
  {
    id: 5,
    imageUrl: "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-llk4ubz24f5if9",
    title: "Dune",
    author: "Frank Herbert",
    condition: "Đồ qua sử dụng",
    owner: "Nguyễn A",
    requestCount: 1
  },
  {
    id: 6,
    imageUrl: "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-llk4ubz24f5if9",
    title: "The Silent Echo",
    author: "Sarah Mitchell",
    condition: "Như mới",
    owner: "Phạm Thị D",
    requestCount: 0
  },
  {
    id: 7,
    imageUrl: "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-llk4ubz24f5if9",
    title: "Garden Of Memories",
    author: "Emma Roberts",
    condition: "Đồ qua sử dụng",
    owner: "Phạm Thị D",
    requestCount: 4
  },
  {
    id: 8,
    imageUrl: "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-llk4ubz24f5if9",
    title: "7 Thói Quen Của Người Thành Đạt",
    author: "Stephen R. Covey",
    condition: "Như mới",
    owner: "Hoàng Văn E",
    requestCount: 2
  }
];

export default function BookExchangePage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header Section */}
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">SÁCH CÓ SẴN ĐỂ TRAO ĐỔI</h1>
          <p className="text-gray-600 mt-1">(234 sách)</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" className="border-gray-300">Lọc</Button>
          <Button variant="outline" className="border-gray-300">Sắp xếp</Button>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 my-4"></div>

      {/* Book Grid - 4 columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
        {books.map((book) => (
          <Card key={book.id} className="hover:shadow-md transition-shadow h-full flex flex-col">
            {/* Book Cover Image */}
            <div className="relative h-48 w-full"
            style={{ backgroundImage: `url(${book.imageUrl})` }}
            >
              
            </div>
            
            <CardHeader className="pb-2 px-4">
              <CardTitle className="text-lg line-clamp-2">{book.title}</CardTitle>
              <p className="text-sm text-gray-600">{book.author}</p>
            </CardHeader>
            
            <CardContent className="px-4 py-2 flex-grow">
              <Badge variant={book.condition === "Như mới" ? "default" : "secondary"}>
                {book.condition}
              </Badge>
              <div className="mt-2 text-sm">
                <span className="text-gray-700">Chủ sách: </span>
                <span className="font-medium">{book.owner}</span>
              </div>
              {book.requestCount > 0 && (
                <div className="text-sm mt-1">
                  <span className="text-orange-500 font-medium">
                    {book.requestCount} yêu cầu trao đổi
                  </span>
                </div>
              )}
            </CardContent>
            
            <CardFooter className="px-4 pb-4 pt-0">
              <Button 
                variant="outline" 
                className="w-full border-orange-500 text-orange-500 hover:bg-orange-50 hover:text-orange-600"
              >
                Yêu cầu trao đổi
              </Button>
            </CardFooter>
          </Card>
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
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { BookCard } from "@/features/favouriteBooks/components/BookCard";
// import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronDownIcon } from "lucide-react";

const books = [
  {
    id: 1,
    title: "Nhà Giả Kim",
    author: "Paulo Coelho",
    rating: 4,
    coverImage: "https://m.media-amazon.com/images/I/71aFt4+OTOL._AC_UF1000,1000_QL80_.jpg",
  },
  {
    id: 2,
    title: "Tôi Thấy Hoa Vàng Trên Cỏ Xanh",
    author: "Nguyễn Nhật Ánh",
    rating: 5,
    coverImage: "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-llk4ubz24f5if9",
  },
  // Thêm nhiều sách khác ở đây...
];

// Component Dropdown đơn giản chỉ để hiển thị
const DropdownUI = ({ label }: { label: string }) => {
  return (
    <div className="relative inline-block">
      <Button variant="outline" className="flex items-center gap-1">
        {label} <ChevronDownIcon className="h-4 w-4" />
      </Button>
      <div className="hidden absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border">
        <div className="py-1">
          <div className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Item 1</div>
          <div className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Item 2</div>
          <div className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Item 3</div>
        </div>
      </div>
    </div>
  );
};

// Component Pagination đơn giản chỉ để hiển thị
const PaginationUI = () => {
  return (
    <div className="flex items-center justify-center space-x-2 mt-8">
      <Button variant="outline" className="px-3 py-1">
        Trước
      </Button>
      <Button variant="outline" disabled className="px-3 py-1">
        1
      </Button>
      <Button variant="outline" className="px-3 py-1">
        Sau
      </Button>
    </div>
  );
};

export default function FavouriteBooksPage() {
  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <Card className="p-6 mb-6">
        <CardHeader>
          <h1 className="text-3xl font-bold mb-2">Sách yêu thích của tôi</h1>
          <p className="text-gray-600">Tổng cộng: {books.length} cuốn sách</p>
        </CardHeader>

        {/* Filter and Search Section - Chỉ UI không có chức năng */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
          <div className="relative w-full sm:w-64">
          </div>
          <div className="flex gap-2">
            <DropdownUI label="Sắp xếp" />
            <DropdownUI label="Lọc" />
          </div>
        </div>

        {/* Books List */}
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {books.map((book) => (
              <BookCard
                key={book.id}
                title={book.title}
                author={book.author}
                rating={book.rating}
                image={book.coverImage}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Pagination - Chỉ UI không có chức năng */}
      <PaginationUI />
    </div>
  );
}
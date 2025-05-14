import { BookList } from "@/features/favouriteBooks/components/BookList";

export default function FavoriteBooksPage() {
  const books = [
    {
      title: "Nhà Giả Kim",
      author: "Paulo Coelho",
      rating: 4.0,
    },
    {
      title: "Tôi Thấy Hoa Vàng Trên Cỏ Xanh",
      author: "Nguyễn Nhật Ánh",
      rating: 5.0,
    },
    // Thêm các sách khác vào đây
  ];

  return (
    <div className="container py-8">
      <BookList books={books} totalBooks={books.length} />
    </div>
  );
}
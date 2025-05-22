import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BookRating } from "@/features/favouriteBooks/components/BookRating";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Separator } from "@radix-ui/react-separator";
import { HeartIcon, StarIcon } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import type { RootState } from "@/store";
import { getBookByIdStart } from "@/features/book/bookSlice";

export default function BookDetailPage() {
  const dispatch = useDispatch();
  const { bookId } = useParams(); // URL dạng /books/:bookId
  const book = useSelector((state: RootState) => state.book.selectedBook);
  const loading = useSelector((state: RootState) => state.book.loading);

  useEffect(() => {
    if (bookId) {
      dispatch(getBookByIdStart(bookId));
    }
  }, [dispatch, bookId]);

  if (loading || !book) {
    return <div className="text-center py-10">Đang tải dữ liệu sách...</div>;
  }

  return (
    <div className="container mx-auto py-8 px-10">
      {/* Book Header Section */}
      <Card className="p-4">
        <div className="flex items-center space-x-4 mb-1">
          {/* Book Cover */}
          <div className="w-full md:w-1/3 lg:w-1/4">
            <img
              src={book.imageUrl || "/placeholder.jpg"}
              alt="image"
              className="rounded-lg h-96 w-full object-cover"
            />
          </div>

          {/* Book Info */}
          <div className="w-full md:w-2/3 lg:w-3/4">
            <h1 className="text-3xl font-bold mb-4">{book.title}</h1>
            <BookRating rating={book.averageRating || 0} />

            <p className="text-lg mb-4 mt-4">
              Tác giả: {" "}
              <span className="font-medium">{book.author}</span>
            </p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p>
                  Thể loại:{" "}
                  {book.categories && book.categories.length > 0 ? (
                    book.categories.map((cat, index) => (
                      <span key={cat.id} className="font-medium">
                        {cat.name}
                        {index < book.categories!.length - 1 && ", "}
                      </span>
                    ))
                  ) : (
                    <span>Chưa có thể loại</span>
                  )}
                </p>
              </div>
            </div>

            <div className="flex gap-4 mb-8">
              <Button className="bg-blue-600 hover:bg-blue-700">Mua sách</Button>
              <Button variant="outline">Phát tài liệu</Button>
              <Button variant="outline">Lưu yêu thích</Button>
            </div>
          </div>
        </div>
      </Card>

      <Separator className="mb-10" />

      {/* Book Description Section */}
      <Card className="p-4">
        <div className="mb-12">
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Nội dung chính</h3>
            <div
              className="text-gray-700"
              dangerouslySetInnerHTML={{ __html: book.description ?? "" }}
            />
          </div>

          {/* Tuỳ biến hoặc render thêm phần ưu điểm/nhược điểm nếu có trong dữ liệu */}
        </div>
      </Card>

      <Separator className="mb-10" />

      <Card className="p-4">
        {/* Reviews Section */}
        <div className="mb-12">
          {/* Header with title and write review button */}
          
          <h2 className="text-2xl font-bold">Đánh giá sản phẩm</h2>
          
          
          {/* Rating Summary */}
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/3">
              <div className="text-4xl font-bold mb-2">4.2<span className="text-2xl text-gray-500">/5</span></div>
              <div className="flex mb-2">
                {[...Array(5)].map((_, i) => (
                  <StarIcon 
                    key={i}
                    className={`h-5 w-5 ${i < 4 ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
                  />
                ))}
              </div>
            </div>
            
            <div className="w-full md:w-3/3">
              <div className="space-y-3">
                {[5, 4, 3, 2, 1].map((star) => (
                  <div key={star} className="flex items-center">
                    <span className="w-16">{star} sao</span>
                    <div className="flex-1 mx-2 h-4 bg-gray-200 rounded-full">
                      <div 
                        className="h-full bg-yellow-500 rounded-full" 
                        style={{ 
                          width: 
                            star === 5 ? '40%' : 
                            star === 4 ? '40%' : 
                            star === 3 ? '20%' : 
                            '0%' 
                        }}
                      ></div>
                    </div>
                    <span className="w-12 text-gray-600">
                      {star === 5 ? '40%' : 
                      star === 4 ? '40%' : 
                      star === 3 ? '20%' : 
                      '0%'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          <div className="flex justify-between items-center mb-6">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded">
              Viết đánh giá
            </button>
          </div>
          </div>
        </div>
      </Card>

      <Separator className="mb-10" />

      {/* User Comments Section */}
    <div className="space-y-4">
      {/* Comment 1 */}
      <Card className="p-4">
        <div className="flex gap-4">
          <div className="relative flex flex-col items-center text-center">
            <Avatar className="h-10 w-10">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>QL</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-semibold text-lg">Quang Long</h3>
                <p className="text-gray-500 text-sm">3 giờ trước</p>
              </div>
              <Button variant="ghost" className="text-gray-500 hover:bg-transparent">
                <HeartIcon className="h-4 w-4 mr-1" />
                <span>245</span>
              </Button>
            </div>
            <p className="text-gray-700">
              Cuốn sách thật sự rất hay. Nó làm tôi nhớ về cội nguồn cuộc sống, nơi tôi chìm đắm trong sự thơ mộng của nghệ thuật.
            </p>
          </div>
        </div>
      </Card>

      {/* Comment 2 */}
      <Card className="p-4">
        <div className="flex gap-4">
          <div className="relative flex flex-col items-center text-center">
            <Avatar className="h-10 w-10">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>DH</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-semibold text-lg">Đạt Huỳnh</h3>
                <p className="text-gray-500 text-sm">2 giờ trước</p>
              </div>
              <Button variant="ghost" className="text-gray-500 hover:bg-transparent">
                <HeartIcon className="h-4 w-4 mr-1" />
                <span>140</span>
              </Button>
            </div>
            <p className="text-gray-700">Mọi người nên mua cuốn sách này.</p>
          </div>
        </div>
      </Card>
    </div>

    {/* Related Articles Section */}
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-6">Các bài viết liên quan</h2>
      
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Article 1 */}
          <Card className="p-4">
            <div className="flex gap-4">
              <div className="relative flex flex-col items-center text-center">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>LL</AvatarFallback>
                </Avatar>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-lg">Long Lê</h3>
                    <p className="text-gray-500 text-sm">2 ngày trước</p>
                  </div>
                  <Button variant="ghost" className="text-gray-500 hover:bg-transparent">
                    <HeartIcon className="h-4 w-4 mr-1" />
                    <span>245</span>
                  </Button>
                </div>
                <h4 className="font-bold mb-2">Sự thở của nghệ thuật tối giản</h4>
                <p className="text-gray-700">
                  Có thể nói nghệ thuật là một phần của cuộc sống...
                </p>
              </div>
            </div>
          </Card>

          {/* Article 2 */}
          <Card className="p-4">
            <div className="flex gap-4">
              <div className="relative flex flex-col items-center text-center">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>NA</AvatarFallback>
                </Avatar>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-lg">Nhật Anh</h3>
                    <p className="text-gray-500 text-sm">5 ngày trước</p>
                  </div>
                  <Button variant="ghost" className="text-gray-500 hover:bg-transparent">
                    <HeartIcon className="h-4 w-4 mr-1" />
                    <span>145</span>
                  </Button>
                </div>
                <h4 className="font-bold mb-2">Nghệ thuật tối giản là gì?</h4>
                <p className="text-gray-700">
                  Một trong nghệ thuật trừu tượng nhất đó là...
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
      
    </div>
  );
}
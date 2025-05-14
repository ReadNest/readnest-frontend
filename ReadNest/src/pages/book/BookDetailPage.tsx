import { Button } from "@/components/ui/button";
import { StarIcon } from "lucide-react";

export default function BookDetailPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      {/* Book Header Section */}
      <div className="flex flex-col md:flex-row gap-8 mb-12">
        {/* Book Cover */}
        <div className="w-full md:w-1/3 lg:w-1/4">
          <div className="bg-gray-200 rounded-lg h-96 w-full"></div>
        </div>

        {/* Book Info */}
        <div className="w-full md:w-2/3 lg:w-3/4">
          <h1 className="text-3xl font-bold mb-2">Nghệ Thuật Tối Giản</h1>
          <p className="text-lg text-gray-600 mb-4">Tác giả: Nguyễn Văn A</p>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-gray-500">Nhà xuất bản:</p>
              <p className="font-medium">NXB Trẻ</p>
            </div>
            <div>
              <p className="text-gray-500">Năm xuất bản:</p>
              <p className="font-medium">2025</p>
            </div>
            <div>
              <p className="text-gray-500">Thể loại:</p>
              <p className="font-medium">Phát triển bản thân</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mb-8">
            <Button variant="default" className="bg-blue-600 hover:bg-blue-700">
              Mua sách
            </Button>
            <Button variant="outline">
              Phát tài liệu
            </Button>
            <Button variant="outline">
              Lưu yêu thích
            </Button>
          </div>

          {/* Rating */}
          <div className="flex items-center mb-2">
            <div className="flex mr-2">
              {[...Array(5)].map((_, i) => (
                <StarIcon 
                  key={i}
                  className={`h-5 w-5 ${i < 4 ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
                />
              ))}
            </div>
            <span className="text-gray-600">4.2/5</span>
          </div>
        </div>
      </div>

      {/* Book Description Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Mô tả sách</h2>
        
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Nội dung chính</h3>
          <p className="text-gray-700">
            Cuốn sách được chia thành ba phần chính, mỗi phần đề cập đến khía cạnh khác nhau của nghệ thuật sống tối giản. Phần đầu tiên tập trung vào
            việc tối giản hóa không gian sống với những phương pháp cụ thể về cách sắp xếp và loại bỏ những đồ đạc không cần thiết.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Ưu điểm</h3>
            <ul className="list-disc pl-5 text-gray-700 space-y-2">
              <li>Cách viết dễ hiểu, logic</li>
              <li>Nhiều ví dụ thực tế, dễ áp dụng</li>
              <li>Hình ảnh minh họa chất lượng cao</li>
              <li>Có các bài tập thực hành cuối mỗi chương</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Nhược điểm</h3>
            <ul className="list-disc pl-5 text-gray-700 space-y-2">
              <li>Một số nội dung có thể khó áp dụng trong văn hóa Việt Nam</li>
              <li>Một số chương lặp lại nội dung</li>
            </ul>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Kết luận</h3>
          <p className="text-gray-700">
            "Nghệ Thuật Tối Giản" là một cuốn sách đáng đọc cho những ai muốn bắt đầu hành trình thay đổi lối sống của mình. Mặc dù có một số điểm hạn chế
            nhưng nhìn chung, đây là một tài liệu hữu ích có giá trị cho việc xây dựng lối sống tối giản.
          </p>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Đánh giá sản phẩm</h2>
        
        {/* Rating Summary */}
        <div className="flex flex-col md:flex-row gap-8 mb-8">
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
            <p className="text-gray-600">12 đánh giá</p>
          </div>
          
          <div className="w-full md:w-2/3">
            <div className="space-y-3">
              {[5, 4, 3, 2, 1].map((star) => (
                <div key={star} className="flex items-center">
                  <span className="w-8">{star} sao</span>
                  <div className="flex-1 mx-2 h-4 bg-gray-200 rounded-full">
                    <div 
                      className="h-full bg-yellow-500 rounded-full" 
                      style={{ width: `${star === 5 ? '80%' : star === 4 ? '15%' : '5%'}` }}
                    ></div>
                  </div>
                  <span className="w-8 text-gray-600">
                    {star === 5 ? '80%' : star === 4 ? '15%' : '5%'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* User Reviews */}
        <div className="space-y-6">
          <div className="border-b pb-6">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="font-semibold">Quang Long</h4>
                <p className="text-gray-500 text-sm">3 giờ trước</p>
              </div>
              <div className="flex">
                {[...Array(4)].map((_, i) => (
                  <StarIcon 
                    key={i}
                    className="h-4 w-4 text-yellow-500 fill-yellow-500"
                  />
                ))}
                <StarIcon className="h-4 w-4 text-gray-300" />
              </div>
            </div>
            <p className="text-gray-700">
              Cuốn sách mang đến cái nhìn tổng quan về lối sống tối giản. Nội dung tập trung vào các khía cạnh quan trọng của cuộc sống, đặc biệt là tài chính và không gian sống.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
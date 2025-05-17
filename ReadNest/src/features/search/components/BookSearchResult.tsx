import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RatingStars } from './RatingStars';

interface BookSearchResultProps {
    bookImage: string;
    bookName: string;
    bookAuthor: string;
    rating: number;
    isFavorite: boolean;
}

export function BookSearchResult({
    bookImage,
    bookName,
    bookAuthor,
    rating,
    isFavorite,
}: BookSearchResultProps) {
    // Tính toán số sao để hiển thị
    if (rating < 0) {
        rating = 0;
    }
    if (rating > 5) {
        rating = 5;
    }


    return (
        <div className="flex flex-col gap-4 p-4 border rounded-lg hover:shadow-md transition-shadow h-full">
            {/* Ảnh bìa sách */}
            <div className="w-full relative bg-gray-100 rounded border">
                <img
                    src={bookImage}
                    alt={bookName}
                    className="w-full h-48 object-contain rounded"
                    loading="lazy"
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = '/default-book-cover.jpg';
                    }}
                />
                <Heart
                    className={`h-5 w-5 absolute top-2 right-2 ${isFavorite ? 'text-red-500 fill-current' : 'text-gray-300'}`}
                />
            </div>

            {/* Thông tin sách */}
            <div className="">
                <h3 className="font-medium text-lg">{bookName}</h3>
                <p className="text-sm text-gray-600">bởi {bookAuthor}</p>
            </div>

            {/* Đánh giá */}
            <RatingStars rating={rating} showText={true} />

            {/* Nút Xem Thông Tin */}
            <Button variant="outline" size="sm" className="mt-3 bg-blue-600 text-white hover:bg-blue-700">
                Xem Thông Tin
            </Button>
        </div>
    );
}
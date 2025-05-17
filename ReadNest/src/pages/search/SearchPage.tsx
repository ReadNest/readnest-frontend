import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { BookSearchResult } from "@/features/search/components/BookSearchResult";

export default function SearchPage() {
    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Filter Sidebar */}
                <div className="w-full md:w-1/4 space-y-8">
                    <Card className="p-4">
                        <div className="space-y-4">
                            <h2 className="text-lg font-semibold">Bộ lọc</h2>

                            {/* Thể loại */}
                            <div className="ml-2">
                                <h3 className="font-medium mb-2">Thể loại</h3>
                                <div className="space-y-2">
                                    {['Tiểu thuyết', 'Trinh thám', 'Phát triển bản thân', 'Lịch sử'].map((genre) => (
                                        <div key={genre} className="flex items-center space-x-2">
                                            <Checkbox  className="data-[state=checked]:bg-indigo-600" id={genre} />
                                            <label htmlFor={genre} className="text-sm">{genre}</label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Ngôn ngữ */}
                            <div className="ml-2">
                                <h3 className="font-medium mb-2">Ngôn ngữ</h3>
                                <div className="space-y-2">
                                    {['Tiếng Việt', 'Tiếng Anh', 'Tiếng Nhật'].map((language) => (
                                        <div key={language} className="flex items-center space-x-2">
                                            <Checkbox className="data-[state=checked]:bg-indigo-600" id={language} />
                                            <label htmlFor={language} className="text-sm">{language}</label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Book Results */}
                <div className="w-full md:w-3/4">
                    <p className="text-sm text-gray-600 mb-4">Tìm thấy XX kết quả</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Book Card 1 */}
                        <Card>
                            <BookSearchResult
                                bookImage="https://cdn1.fahasa.com/media/catalog/product/n/g/nghe_thuat_toi_gian___co_it_di__song_nhieu_hon_tai_ban_2018_1_2018_11_16_17_46_26.jpg"
                                bookName="Nghệ Thuật Tối Giản"
                                bookAuthor="Nguyễn Văn A"
                                rating={4.2}
                                isFavorite={false}
                            />
                        </Card>
                        {/* Book Card 2 */}
                        <Card>
                            <BookSearchResult
                                bookImage="https://bizweb.dktcdn.net/thumb/grande/100/197/269/products/462558750-1083111936819329-1957541486232979466-n.png?v=1730363480047"
                                bookName="Tư Duy Nhanh và Chậm"
                                bookAuthor="Nguyễn Văn B"
                                rating={4.5}
                                isFavorite={true}
                            />
                        </Card>
                        {/* Book Card 3 */}
                        <Card>
                            <BookSearchResult
                                bookImage=""
                                bookName="Đắc Nhân Tâm"
                                bookAuthor="Nguyễn Văn C"
                                rating={4.8}
                                isFavorite={false}
                            />
                        </Card>
                        {/* Book Card 4 */}
                        <Card>
                            <BookSearchResult
                                bookImage=""
                                bookName="Sức Mạnh Của Thói Quen "
                                bookAuthor="Nguyễn Văn D"
                                rating={4.3}
                                isFavorite={true}
                            />
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function CommunityRanking() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 py-8">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Main Title Section */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">Bảng Xếp Hạng Cộng Đồng</h1>
          <p className="mt-2 text-gray-600">
            Vinh danh những người dùng tích cực nhất tại ReadNest với những đóng góp xuất sắc cho cộng đồng đọc sách.
          </p>
        </div>

        <div className="border-t my-6"></div>

        {/* Top 3 Users with Avatars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {/* Top 2 */}
          <div className="flex flex-col items-center">
            <div className="relative mb-4">
              <Avatar className="w-24 h-24 border-4 border-silver">
                <AvatarImage src="/avatars/tranthia.png" />
                <AvatarFallback>TA</AvatarFallback>
              </Avatar>
              <div className="absolute -top-2 -left-2 bg-yellow-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">
                2
              </div>
            </div>
            <h3 className="font-bold text-lg">Trần Thị A</h3>
            <p className="text-2xl font-bold text-amber-500">3.521 điểm</p>
          </div>

          {/* Top 1 */}
          <div className="flex flex-col items-center">
            <div className="relative mb-4">
              <Avatar className="w-32 h-32 border-4 border-gold">
                <AvatarImage src="/avatars/nguyenvanb.png" />
                <AvatarFallback>NB</AvatarFallback>
              </Avatar>
              <div className="absolute -top-2 -left-2 bg-yellow-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">
                1
              </div>
            </div>
            <h3 className="font-bold text-lg">Nguyễn Văn B</h3>
            <p className="text-3xl font-bold text-yellow-500">2.845 điểm</p>
          </div>

          {/* Top 3 */}
          <div className="flex flex-col items-center">
            <div className="relative mb-4">
              <Avatar className="w-20 h-20 border-4 border-bronze">
                <AvatarImage src="/avatars/levanc.png" />
                <AvatarFallback>LC</AvatarFallback>
              </Avatar>
              <div className="absolute -top-2 -left-2 bg-yellow-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">
                3
              </div>
            </div>
            <h3 className="font-bold text-lg">Lê Văn C</h3>
            <p className="text-xl font-bold text-amber-700">2.456 điểm</p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t my-6"></div>

        {/* Ranking Table for Top 4-5 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Bảng Xếp Hạng Chi Tiết</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[60px] text-center">Hạng</TableHead>
                  <TableHead>Người dùng</TableHead>
                  <TableHead className="text-right">Đánh giá</TableHead>
                  <TableHead className="text-right">Bình luận</TableHead>
                  <TableHead className="text-right">Tương tác</TableHead>
                  <TableHead className="text-right">Tổng điểm</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="text-center font-medium">4</TableCell>
                  <TableCell className="font-medium">Phạm Thị D</TableCell>
                  <TableCell className="text-right">156</TableCell>
                  <TableCell className="text-right">342</TableCell>
                  <TableCell className="text-right">1,245</TableCell>
                  <TableCell className="text-right font-bold">2,156</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-center font-medium">5</TableCell>
                  <TableCell className="font-medium">Hoàng Văn E</TableCell>
                  <TableCell className="text-right">132</TableCell>
                  <TableCell className="text-right">287</TableCell>
                  <TableCell className="text-right">1,089</TableCell>
                  <TableCell className="text-right font-bold">1,987</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
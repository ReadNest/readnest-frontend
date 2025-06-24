import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCurrentEventStart,
  fetchEventsStart,
  setSelectedEventId,
} from "@/features/event/eventSlice";
import {
  fetchTopLeaderboardStart,
} from "@/features/leaderboard/leaderboardSlice";
import type { RootState } from "@/store";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function CommunityRanking() {
  const dispatch = useDispatch();
  const { currentEvent, events } = useSelector((state: RootState) => state.event);
  const { leaderboards, loading } = useSelector((state: RootState) => state.leaderboard);

  useEffect(() => {
    dispatch(fetchCurrentEventStart());
    dispatch(fetchEventsStart());
  }, [dispatch]);

  useEffect(() => {
    if (currentEvent?.id) {
      dispatch(fetchTopLeaderboardStart({ eventId: currentEvent.id, top: 5 }));
    }
  }, [currentEvent, dispatch]);

  const top3Sorted = [leaderboards[1], leaderboards[0], leaderboards[2]].filter(Boolean); // Top 2 - 1 - 3
  const top45 = leaderboards.slice(3, 5);

  if (!currentEvent || events.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        Không tìm thấy sự kiện hoặc dữ liệu bảng xếp hạng.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 py-8">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">Bảng Xếp Hạng Cộng Đồng</h1>
          <p className="mt-2 text-gray-600">
            Vinh danh những người dùng tích cực nhất tại ReadNest với những đóng góp xuất sắc cho cộng đồng đọc sách.
          </p>
        </div>

        <div className="border-t my-6"></div>

        {/* TOP 1-3 */}
        {loading ? (
          <p className="text-center">Đang tải bảng xếp hạng...</p>
        ) : (
          <div className="grid grid-cols-3 gap-6 mb-10 place-items-center">
            {top3Sorted.map((user, index) => {
              const trueRank = index === 0 ? 2 : index === 1 ? 1 : 3;
              const isTop1 = trueRank === 1;

              const sizeClass = isTop1
                ? "w-32 h-32 border-gold"
                : trueRank === 2
                ? "w-24 h-24 border-silver"
                : "w-20 h-20 border-bronze";

              return (
                <div className="flex flex-col items-center" key={user.userId}>
                  <div className="relative mb-4">
                    {/* Huy hiệu thứ hạng */}
                    <div className="absolute -top-2 -left-2 z-10 bg-yellow-500 text-white rounded-full w-9 h-9 flex items-center justify-center font-bold shadow-md">
                      {trueRank}
                    </div>

                    {/* Avatar */}
                    <Avatar
                      className={`bg-white border-4 ${sizeClass} rounded-full shadow-lg`}
                    >
                      <AvatarImage src={user.user?.avatarUrl || "/default-avatar.png"} />
                      <AvatarFallback>{user.user?.fullName?.charAt(0) || "?"}</AvatarFallback>
                    </Avatar>
                  </div>

                  <h3 className="font-bold text-lg text-center">
                    {isTop1 && <span className="text-2xl">👑</span>} {user.user?.fullName}
                  </h3>
                  <p
                    className={`font-bold ${
                      isTop1
                        ? "text-3xl text-yellow-600"
                        : trueRank === 2
                        ? "text-2xl text-amber-500"
                        : "text-xl text-amber-700"
                    }`}
                  >
                    {user.score?.toLocaleString()} điểm
                  </p>
                </div>
              );
            })}
          </div>
        )}

        <div className="border-t my-6"></div>

        {/* TOP 4-5 */}
        {top45.length > 0 && (
          <Card>
            <CardHeader>
              <div className="w-full flex items-center justify-between">
                <h2 className="text-xl font-semibold">Bảng Xếp Hạng Chi Tiết</h2>
                <div className="flex items-center space-x-2">
                  <label htmlFor="eventSelect" className="text-sm text-gray-600">
                    Sự kiện:
                  </label>
                  <select
                    id="eventSelect"
                    className="border border-gray-300 rounded px-2 py-1 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-amber-400"
                    value={currentEvent?.id}
                    onChange={(e) => {
                      dispatch(setSelectedEventId(e.target.value));
                    }}
                  >
                    {events.map((ev) => (
                      <option key={ev.id} value={ev.id}>
                        {ev.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[60px] text-center">Hạng</TableHead>
                    <TableHead>Người dùng</TableHead>
                    <TableHead className="text-right">Bài viết</TableHead>
                    <TableHead className="text-right">Lượt thích</TableHead>
                    <TableHead className="text-right">Lượt xem</TableHead>
                    <TableHead className="text-right">Tổng điểm</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {top45.map((user, index) => (
                    <TableRow key={user.userId}>
                      <TableCell className="text-center font-medium">{index + 4}</TableCell>
                      <TableCell className="font-medium">{user.user?.fullName}</TableCell>
                      <TableCell className="text-right">{user.totalPosts}</TableCell>
                      <TableCell className="text-right">{user.totalLikes}</TableCell>
                      <TableCell className="text-right">{user.totalViews}</TableCell>
                      <TableCell className="text-right font-bold">
                        {user.score?.toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

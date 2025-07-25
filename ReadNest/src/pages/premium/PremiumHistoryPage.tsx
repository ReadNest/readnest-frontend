import { useEffect, useState } from "react";
import { Crown } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PremiumHistoryPage() {
  // Giả lập dữ liệu, sau này bạn call API để lấy
  const [currentPackage, setCurrentPackage] = useState<"premium" | "free">(
    "premium"
  );
  const [history, setHistory] = useState([
    {
      id: 1,
      packageName: "Premium",
      status: "Thành công",
      date: "2025-07-10",
      price: "21.000đ",
    },
    // ...các giao dịch khác
  ]);

  // useEffect(() => { // Call API ở đây sau này }, []);

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Crown className="text-indigo-500" /> Lịch sử giao dịch & Gói hiện tại
      </h1>
      <div className="mb-8 p-4 rounded-xl bg-gradient-to-r from-indigo-100 to-purple-100 flex items-center justify-between">
        <div>
          <div className="font-semibold text-lg">
            Gói hiện tại:{" "}
            <span className="text-indigo-600">
              {currentPackage === "premium" ? "Premium" : "Miễn phí"}
            </span>
          </div>
          {currentPackage === "premium" && (
            <div className="text-green-600 mt-1 font-medium">
              Bạn đang sử dụng gói Premium!
            </div>
          )}
        </div>
        {currentPackage === "premium" && (
          <Button disabled variant="outline" className="cursor-not-allowed">
            Đang sử dụng
          </Button>
        )}
      </div>
      <h2 className="font-semibold mb-3">Lịch sử giao dịch</h2>
      <div className="bg-white rounded-xl shadow p-4">
        <table className="w-full text-left">
          <thead>
            <tr>
              <th className="py-2">Ngày</th>
              <th>Gói</th>
              <th>Giá</th>
              <th>Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {history.map((item) => (
              <tr key={item.id} className="border-t">
                <td className="py-2">{item.date}</td>
                <td>{item.packageName}</td>
                <td>{item.price}</td>
                <td>
                  <span className="text-green-600">{item.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

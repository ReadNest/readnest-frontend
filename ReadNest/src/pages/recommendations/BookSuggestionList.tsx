import type { BookSuggestion } from "@/api/@types";
import { motion } from "framer-motion";
import Lottie from "react-lottie-player";
import sadAnimation from "@/assets/sad-empty.json";
import defaultBookImage from "@/assets/default_image.jpg";
import { toast } from "react-toastify";

export default function BookSuggestionList({
  books,
}: {
  books: BookSuggestion[];
}) {
  if (!books || books.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
        <Lottie
          loop
          animationData={sadAnimation}
          play
          style={{ width: 200, height: 200 }}
        />
        <motion.h3
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-xl font-semibold text-gray-700 mt-6 mb-2"
        >
          Hệ thống chưa tìm thấy sách phù hợp
        </motion.h3>
        <p className="text-gray-500 text-sm max-w-md">
          Có thể hệ thống đang bị quá tải hoặc dữ liệu chưa đủ để đưa ra gợi ý.
          <br />
          Hãy thử lại sau{" "}
          <span className="font-medium text-indigo-500">5-10 phút</span> nhé!
        </p>
      </div>
    );
  }

  const handleViewDetail = (bookTitle: string, link?: string) => {
    if (!link) {
      toast.info(
        `Hiện tại không có link chi tiết. Bạn có thể search Google: "${bookTitle}"`
      );
      return;
    }
    window.open(link, "_blank");
  };

  return (
    <div className="flex flex-col items-center relative px-4 py-10">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-500 mb-4 text-center drop-shadow-sm"
      >
        Gợi ý sách dành riêng cho bạn
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="text-sm text-gray-500 italic mb-10 text-center max-w-2xl"
      >
        Lưu ý: Hiện tại hệ thống chưa thể lưu các gợi ý sách của bạn vào cơ sở
        dữ liệu. Hãy ghi chú lại những cuốn sách mà bạn cảm thấy phù hợp nhé!
      </motion.p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        {books.map((book, idx) => (
          <motion.div
            key={book.title ?? "" + idx}
            className="relative group bg-gradient-to-br from-white to-indigo-50 rounded-2xl shadow-lg border border-indigo-100 p-5 flex flex-col items-center hover:shadow-2xl transition-all duration-300"
            whileHover={{ scale: 1.03 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
          >
            <div className="relative w-36 h-52 mb-4 overflow-hidden rounded-lg shadow-lg group-hover:shadow-xl transition-shadow duration-300">
              <motion.img
                src={book.image ?? defaultBookImage}
                alt={book.title ?? ""}
                className="w-full h-full object-cover rounded-lg transform group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
            </div>

            <div className="font-bold text-lg text-indigo-700 text-center mb-1 line-clamp-2">
              {book.title ?? ""}
            </div>

            <div className="text-sm text-gray-600 mb-1 italic">
              {book.author ?? ""}
            </div>

            <motion.div
              className="text-xs font-medium text-purple-600 bg-purple-100 px-3 py-1 rounded-full mb-2 shadow-sm"
              whileHover={{ scale: 1.1 }}
            >
              {book.genre ?? ""}
            </motion.div>

            <div className="text-xs text-gray-500 mb-3 text-center line-clamp-3 italic">
              {book.reason ?? "Không có mô tả"}
            </div>

            <motion.button
              onClick={() =>
                handleViewDetail(book.title ?? "Sách", book.infoLink ?? "")
              }
              className="mt-auto px-5 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm font-semibold shadow-md hover:shadow-xl hover:from-indigo-600 hover:to-purple-600 transition-all duration-300"
              whileTap={{ scale: 0.95 }}
            >
              Xem chi tiết
            </motion.button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

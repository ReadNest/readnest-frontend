import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import client from "@/lib/api/axiosClient";
import type { RootState } from "@/store";
import { ROUTE_PATHS } from "@/constants/routePaths";
import Lottie from "react-lottie-player";
import catAnimation from "@/assets/black-cat.json";
import Confetti from "react-confetti";
import { useWindowSize } from "@react-hook/window-size";

const questions = [
  {
    id: "genre",
    type: "multi-select",
    question: "Bạn thích thể loại sách nào?",
    hint: "Bạn có biết? Việc chọn đúng thể loại giúp hệ thống hiểu sở thích của bạn rõ hơn.",
    optionsApi: "/api/categories",
    maxSelect: 3,
    options: [
      "Khoa học",
      "Văn học",
      "Lịch sử",
      "Triết học",
      "Kinh doanh",
      "Tự truyện",
      "Khác",
    ],
  },
  {
    id: "reading_time",
    type: "single-select",
    question: "Bạn thường dành bao nhiêu thời gian đọc sách mỗi tuần?",
    hint: "Thông tin này giúp chúng tôi đưa ra gợi ý với độ dài phù hợp.",
    options: ["< 1 giờ", "1 - 3 giờ", "3 - 5 giờ", "5 - 10 giờ", "10+ giờ"],
  },
  {
    id: "preferred_author",
    type: "text",
    question: "Tác giả nào khiến bạn ấn tượng nhất?",
    hint: "Tên tác giả sẽ giúp hệ thống đề xuất các tác phẩm liên quan.",
  },
  {
    id: "favorite_book",
    type: "text",
    question: "Cuốn sách yêu thích gần đây của bạn là gì?",
    hint: "Chúng tôi sẽ dựa trên sách này để tìm những cuốn tương tự.",
  },
  {
    id: "language_preference",
    type: "single-select",
    question: "Bạn thường đọc sách bằng ngôn ngữ nào?",
    hint: "Việc này giúp gợi ý sách đúng ngôn ngữ bạn dễ tiếp cận.",
    options: ["Tiếng Việt", "Tiếng Anh", "Song ngữ", "Khác"],
  },
  {
    id: "book_length",
    type: "single-select",
    question: "Bạn thích độ dài của sách như thế nào?",
    hint: "Độ dài sách giúp chúng tôi tối ưu trải nghiệm đọc.",
    options: [
      "Dưới 200 trang",
      "200 - 400 trang",
      "400 - 600 trang",
      "Trên 600 trang",
    ],
  },
  {
    id: "reading_format",
    type: "multi-select",
    question: "Bạn thích định dạng đọc nào?",
    hint: "Sách giấy, Ebook hay Audiobook - bạn thích dạng nào?",
    options: ["Sách giấy", "Ebook", "Audiobook"],
    maxSelect: 2,
  },
  {
    id: "motivation",
    type: "single-select",
    question: "Mục đích chính khi bạn đọc sách là gì?",
    hint: "Để giải trí hay nghiên cứu? Câu trả lời sẽ định hình gợi ý.",
    options: [
      "Giải trí",
      "Học tập và nghiên cứu",
      "Truyền cảm hứng",
      "Cải thiện kỹ năng sống",
      "Khác",
    ],
  },
  {
    id: "reading_time_of_day",
    type: "single-select",
    question: "Bạn thường đọc sách vào thời điểm nào?",
    hint: "Thời điểm đọc sách có thể ảnh hưởng tới gợi ý thời gian.",
    options: ["Buổi sáng", "Buổi trưa", "Buổi tối", "Không cố định"],
  },
  {
    id: "ai_recommendation_interest",
    type: "single-select",
    question: "Bạn có muốn nhận gợi ý sách từ AI mỗi tuần không?",
    hint: "Nhận gợi ý AI giúp bạn khám phá nhiều sách mới hơn.",
    options: ["Có", "Không"],
  },
];

export default function RecommendDiscoverySliderGamified() {
  const [width, height] = useWindowSize();
  const [current, setCurrent] = useState(-1);
  const [answers, setAnswers] = useState<{ [key: string]: string | string[] }>(
    {}
  );
  const [genreOptions, setGenreOptions] = useState<string[]>([]);
  const [showPremiumPopup, setShowPremiumPopup] = useState(false);
  const navigate = useNavigate();
  const hasPremium = useSelector(
    (state: RootState) => state.auth?.user.hasPurchasedPremium ?? false
  );

  useEffect(() => {
    const genreQ = questions.find((q) => q.id === "genre");
    if (genreQ?.optionsApi) {
      client.api.v1.categories.all.get().then((res) => {
        const data = res.body.data;
        setGenreOptions(
          (data?.map((cat) => cat.name) ?? []).filter(
            (name): name is string => typeof name === "string"
          )
        );
      });
    }
  }, []);

  const handleSelect = (id: string, value: string | string[]) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const next = () => {
    if (!hasPremium && current === 3) {
      setShowPremiumPopup(true);
      return;
    }
    if (current < questions.length - 1) setCurrent(current + 1);
  };

  const prev = () => current > 0 && setCurrent(current - 1);

  const renderQuestion = (q: (typeof questions)[number]) => {
    if (q.type === "multi-select") {
      const options = q.id === "genre" ? genreOptions : q.options;
      const selected: string[] = Array.isArray(answers[q.id])
        ? (answers[q.id] as string[])
        : [];
      return (
        <div className="grid grid-cols-2 gap-3 w-full">
          {options?.map((opt) => (
            <button
              key={opt}
              className={`px-4 py-2 rounded-xl border text-sm font-medium shadow-md transition-all duration-200 truncate ${
                selected.includes(opt)
                  ? "bg-indigo-500 text-white scale-105"
                  : "bg-white text-indigo-700 hover:bg-indigo-50"
              }`}
              onClick={() => {
                const newSelected = selected.includes(opt)
                  ? selected.filter((o) => o !== opt)
                  : [...selected, opt];
                if (newSelected.length > (q.maxSelect || 99)) return;
                handleSelect(q.id, newSelected);
              }}
            >
              {opt}
            </button>
          ))}
        </div>
      );
    }

    if (q.type === "single-select") {
      return (
        <div className="grid grid-cols-2 gap-3 w-full">
          {(q.options ?? []).map((opt) => (
            <button
              key={opt}
              className={`px-4 py-2 rounded-xl border text-sm font-medium shadow-md transition-all duration-200 truncate ${
                answers[q.id] === opt
                  ? "bg-purple-500 text-white scale-105"
                  : "bg-white text-purple-700 hover:bg-purple-50"
              }`}
              onClick={() => handleSelect(q.id, opt)}
            >
              {opt}
            </button>
          ))}
        </div>
      );
    }

    if (q.type === "text") {
      return (
        <input
          type="text"
          className="w-full max-w-md px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm"
          value={answers[q.id] || ""}
          onChange={(e) => handleSelect(q.id, e.target.value)}
          placeholder="Nhập câu trả lời..."
        />
      );
    }
    return null;
  };

  const progress = current >= 0 ? ((current + 1) / questions.length) * 100 : 0;

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-indigo-50 to-purple-200 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={`cloud-${i}`}
            className="absolute bg-blue-100/60 rounded-full shadow-md"
            style={{
              width: 180 + Math.random() * 120,
              height: 70 + Math.random() * 50,
              top: `${Math.random() * 80}%`,
              left: `${Math.random() * 80}%`,
              filter: "blur(30px)",
            }}
            animate={{ x: [0, 60, 0] }}
            transition={{
              duration: 25 + i * 5,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Cat with books */}
      <div className="absolute bottom-4 left-4 w-40 h-40">
        <Lottie
          loop
          animationData={catAnimation}
          play
          style={{ width: 150, height: 150 }}
        />
      </div>

      {/* Quiz Card */}
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl p-8 backdrop-blur-sm z-10 border border-indigo-100">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center"
          >
            {current === -1 ? (
              <>
                <h2 className="text-3xl font-bold text-indigo-700 mb-4 text-center">
                  Khám phá sở thích đọc sách
                </h2>
                <p className="text-gray-600 text-center mb-6">
                  Trả lời vài câu hỏi để nhận gợi ý sách được cá nhân hóa.
                </p>
                <button
                  className="px-8 py-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold shadow-lg hover:scale-105 transition-transform duration-200"
                  onClick={() => setCurrent(0)}
                >
                  Bắt đầu
                </button>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-indigo-700 mb-4 text-center">
                  {questions[current].question}
                </h2>
                <p className="text-sm text-gray-500 italic mb-4">
                  {questions[current].hint}
                </p>

                {renderQuestion(questions[current])}

                {current >= 7 && (
                  <Confetti
                    width={width}
                    height={height + 300}
                    numberOfPieces={150}
                    gravity={0.18}
                    recycle={false}
                    colors={["#c7d2fe", "#fbcfe8", "#fde68a", "#bbf7d0"]}
                  />
                )}

                <div className="flex gap-4 mt-8">
                  <button
                    className="px-6 py-2 rounded-full bg-gray-200 text-gray-700 font-semibold shadow hover:bg-gray-300"
                    onClick={prev}
                    disabled={current === 0}
                  >
                    Quay lại
                  </button>
                  {current < questions.length - 1 ? (
                    <button
                      className="px-6 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold shadow hover:scale-105 transition-transform duration-200"
                      onClick={next}
                      disabled={
                        !answers[questions[current].id] ||
                        (Array.isArray(answers[questions[current].id]) &&
                          answers[questions[current].id].length === 0)
                      }
                    >
                      Tiếp tục
                    </button>
                  ) : (
                    <button
                      className="px-6 py-2 rounded-full bg-green-500 text-white font-semibold shadow hover:scale-105 transition-transform duration-200"
                      onClick={() => navigate("/recommendations")}
                    >
                      Hoàn tất
                    </button>
                  )}
                </div>

                {/* Progress bar */}
                <div className="w-full mt-6 bg-gray-200 rounded-full h-2 overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                    style={{ width: `${progress}%` }}
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
                <div className="mt-2 text-sm text-gray-400">
                  Câu hỏi {current + 1} / {questions.length}
                </div>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Popup Premium */}
      {showPremiumPopup && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setShowPremiumPopup(false)}
        >
          <div
            className="bg-white rounded-xl shadow-lg p-6 max-w-sm text-center relative"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold text-indigo-600 mb-4">
              Nâng cấp để tiếp tục quiz!
            </h3>
            <p className="text-gray-600 mb-4">
              Bạn đã trả lời 4 câu hỏi. Hãy nâng cấp để trải nghiệm đầy đủ.
            </p>
            <div className="flex justify-center gap-4">
              <button
                className="px-4 py-2 rounded-lg bg-indigo-500 text-white hover:bg-indigo-600"
                onClick={() => navigate(ROUTE_PATHS.PREMIUM)}
              >
                Nâng cấp
              </button>
              <button
                className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300"
                onClick={() => {
                  setShowPremiumPopup(false);
                  setCurrent(current + 1);
                }}
              >
                Tiếp tục với giới hạn
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

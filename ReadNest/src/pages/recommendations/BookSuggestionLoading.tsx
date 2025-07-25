import Lottie from "react-lottie-player";
import aiAnimation from "@/assets/ai-thinking.json";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function BookSuggestionLoading({
  onDone,
  isApiDone,
}: {
  onDone: () => void;
  isApiDone: boolean;
}) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const totalDuration = 20000;
    const intervalTime = 400;
    const stepsTo95 = totalDuration / intervalTime;
    const stepIncrement = 95 / stepsTo95;

    const interval = setInterval(() => {
      setProgress((p) => {
        if (isApiDone) {
          if (p >= 100) {
            clearInterval(interval);
            setTimeout(onDone, 400);
            return 100;
          }
          return Math.min(p + 20, 100);
        }

        if (p >= 95) return 95;
        return Math.min(p + stepIncrement, 95);
      });
    }, intervalTime);

    return () => clearInterval(interval);
  }, [onDone, isApiDone]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-10">
      <Lottie
        loop
        animationData={aiAnimation}
        play
        style={{ width: 180, height: 180 }}
      />
      <h2 className="text-2xl font-bold text-indigo-700 mt-6 mb-2 text-center">
        AI đang phân tích sở thích của bạn...
      </h2>
      <p className="text-gray-500 text-center mb-6">
        Đang tìm kiếm những cuốn sách phù hợp nhất cho bạn
      </p>
      <p className="text-xs text-gray-400 italic mb-6 text-center">
        Quá trình này có thể mất khoảng 30 giây đến 1 phút, vui lòng kiên nhẫn
        chờ đợi.
      </p>

      <div className="w-full max-w-md bg-gray-200 rounded-full h-3 overflow-hidden mb-2">
        <motion.div
          className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
          style={{ width: `${progress}%` }}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>
      {progress >= 80 && progress < 95 && (
        <p className="text-xs text-gray-400 mt-2">
          Quá trình sắp hoàn tất, vui lòng đợi thêm...
        </p>
      )}
      <div className="text-sm text-gray-400">{Math.round(progress)}%</div>
    </div>
  );
}

import { Heart } from "lucide-react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ReviewCard({ avatar, name, book, desc, time, likes }: any) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 w-full max-w-sm">
      <div className="flex items-center gap-3 mb-4">
        <img
          src={avatar}
          alt={name}
          className="w-10 h-10 rounded-full object-cover"
        />
        <p className="font-medium text-gray-800">{name}</p>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{book}</h3>
      <p className="text-sm text-gray-600 mb-4">{desc}</p>
      <div className="flex justify-between text-sm text-gray-500 items-center">
        <span>{time}</span>
        <span className="flex items-center gap-1">
          <Heart size={16} className="text-gray-400" />
          {likes}
        </span>
      </div>
    </div>
  );
}

export default ReviewCard;

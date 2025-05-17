import { Button } from "@/components/ui/button";

import ReviewCard from "@/features/home/components/ReviewCard";

function HomePage() {
  return (
    <div className="bg-[#f5f6ff]">
      {/* Hero Section */}
      <section className="py-24">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          {/* Left */}
          <div>
            <h1 className="text-5xl font-extrabold text-gray-900 leading-tight mb-6">
              Your Next Great <br /> Read Awaits
            </h1>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              Tham gia cộng đồng những người yêu sách của chúng tôi. <br />
              Khám phá, đánh giá và trao đổi sách với những người đọc khác.
            </p>
            <div className="flex gap-4">
              <Button className="bg-[#5a4bff] text-white hover:bg-[#4739e6] px-6 py-3 text-base font-medium rounded-full shadow-md">
                Khám phá ngay
              </Button>
              <Button
                variant="outline"
                className="px-6 py-3 text-base font-medium rounded-full border-2 border-[#5a4bff] text-[#5a4bff] hover:bg-[#eee]"
              >
                Sách hay
              </Button>
            </div>
          </div>

          {/* Right Image */}
          <div className="flex justify-center">
            <img
              src="/image_home.png"
              alt="Magical Stack of Books"
              className="rounded-2xl shadow-2xl max-w-md"
            />
          </div>
        </div>
      </section>

      {/* Popular Reviews */}
      <section className="bg-white py-16 px-6">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Đánh giá phổ biến
          </h2>
          <div className="flex flex-wrap gap-6 justify-between">
            <ReviewCard
              avatar={1}
              name="Vũ Đạt"
              book="Project Hail Mary"
              desc="A masterpiece of science fiction that combines hard science with heart..."
              time="2 giờ trước"
              likes="124"
            />
            <ReviewCard
              avatar={1}
              name="Quang Long"
              book="Tomorrow, and Tomorrow..."
              desc="An emotional journey through time and memory that leaves you..."
              time="5 giờ trước"
              likes="89"
            />
            <ReviewCard
              avatar={1}
              name="Nhật Anh"
              book="The Midnight Library"
              desc="A philosophical take on life's infinite possibilities and the choices..."
              time="1 ngày trước"
              likes="156"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
export default HomePage;

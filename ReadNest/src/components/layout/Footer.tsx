import { Link } from "react-router-dom";
import readnestLogo from "@/assets/readnest_logo.svg";
import facebookIcon from "@/assets/facebook-color-svgrepo-com.svg";
import tiktokIcon from "@/assets/tiktok-logo-logo-svgrepo-com.svg";

export default function Footer() {
  return (
    <footer className="bg-[#0F172A] text-gray-400 py-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Logo + Mô tả */}
        <div>
          <div className="flex items-center mb-4">
            <img
              src={readnestLogo}
              alt="ReadNest Icon"
              className="w-6 h-6 mr-2 rounded-full bg-white p-1"
            />
            <span className="text-white text-lg font-semibold">ReadNest</span>
          </div>
          <p className="text-sm leading-relaxed">
            Kết nối độc giả trên toàn thế giới thông qua những câu chuyện và
            trải nghiệm được chia sẻ.
          </p>
        </div>

        {/* Truy cập nhanh */}
        <div>
          <h3 className="text-white font-semibold mb-4">Truy cập nhanh</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/about" className="hover:text-white transition">
                Giới thiệu
              </Link>
            </li>
            <li>
              <Link to="/blog" className="hover:text-white transition">
                Blog
              </Link>
            </li>
            <li>
              <Link to="/careers" className="hover:text-white transition">
                Cơ hội nghề nghiệp
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-white transition">
                Liên hệ
              </Link>
            </li>
          </ul>
        </div>

        {/* Pháp lý */}
        <div>
          <h3 className="text-white font-semibold mb-4">Pháp lý</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                to="/privacy-policy"
                className="hover:text-white transition"
              >
                Chính sách quyền riêng tư
              </Link>
            </li>
            <li>
              <Link
                to="/terms-of-service"
                className="hover:text-white transition"
              >
                Điều khoản dịch vụ
              </Link>
            </li>
            <li>
              <Link to="/cookie-policy" className="hover:text-white transition">
                Chính sách cookie
              </Link>
            </li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-white font-semibold mb-4 text-lg">
            Theo dõi chúng tôi
          </h3>
          <div className="flex items-center space-x-4">
            <a
              href="https://www.facebook.com/profile.php?id=61576737382029"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform duration-200"
            >
              <img src={facebookIcon} alt="Facebook" className="w-6 h-6" />
            </a>
            <a
              href="https://vt.tiktok.com/ZSkNLoE8x/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform duration-200"
            >
              <img src={tiktokIcon} alt="TikTok" className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 sm:px-12 mt-12 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
        © 2025 ReadNest. All rights reserved.
      </div>
    </footer>
  );
}

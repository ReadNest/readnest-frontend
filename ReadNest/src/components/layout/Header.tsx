import bookIcon from "@/assets/book-svgrepo-com.svg";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import { Button, buttonVariants } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";
import type { VariantProps } from "class-variance-authority";

interface HeaderProps {
  isAuthenticated: boolean;
  isLoginForm: boolean;
  user?: {
    name: string;
    avatar?: string;
  };
}

type ButtonVariant = VariantProps<typeof buttonVariants>["variant"];
type ButtonType = "login" | "register";

const getButtonProps = (
  type: ButtonType,
  isLoginForm?: boolean
): { variant: ButtonVariant; className: string } => {
  const isActive =
    (type === "login" && isLoginForm) || (type === "register" && !isLoginForm);

  return {
    variant: isActive ? "default" : "outline",
    className: isActive
      ? "w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold"
      : "w-full font-semibold",
  };
};

export const Header = ({ isAuthenticated, user, isLoginForm }: HeaderProps) => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="w-full px-6 py-4 shadow-md bg-white flex items-center justify-between">
      <div className="flex items-center gap-2">
        <img src={bookIcon} alt="Logo" className="w-8 h-8" />
        <span className="text-xl font-bold">ReadNest</span>
      </div>

      <nav className="hidden md:flex gap-6 text-sm font-medium">
        <Link to="/" className="hover:text-indigo-600 transition-colors">
          Trang chủ
        </Link>
        <Link to="/" className="hover:text-indigo-600 transition-colors">
          Khám phá
        </Link>
        <Link to="/" className="hover:text-indigo-600 transition-colors">
          Trao đổi
        </Link>
        <Link to="/" className="hover:text-indigo-600 transition-colors">
          Cộng đồng
        </Link>
      </nav>

      <button
        className="md:hidden flex items-center justify-center p-2 text-indigo-600"
        onClick={toggleMobileMenu}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {isMobileMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-lg p-4 flex flex-col md:hidden z-10">
          <Link
            to="/"
            className="text-sm font-medium py-2 hover:text-indigo-600"
            onClick={toggleMobileMenu}
          >
            Trang chủ
          </Link>
          <Link
            to="/"
            className="text-sm font-medium py-2 hover:text-indigo-600"
            onClick={toggleMobileMenu}
          >
            Khám phá
          </Link>
          <Link
            to="/"
            className="text-sm font-medium py-2 hover:text-indigo-600"
            onClick={toggleMobileMenu}
          >
            Trao đổi
          </Link>
          <Link
            to="/"
            className="text-sm font-medium py-2 hover:text-indigo-600"
            onClick={toggleMobileMenu}
          >
            Cộng đồng
          </Link>
        </div>
      )}

      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm sách..."
            className="pl-8 pr-2 py-2 w-40 md:w-60"
          />
        </div>
        {!isAuthenticated ? (
          <>
            <Link to="/login">
              <Button {...getButtonProps("login", isLoginForm)}>
                Đăng nhập
              </Button>
            </Link>
            <Link to="/register">
              <Button {...getButtonProps("register", isLoginForm)}>
                Đăng ký
              </Button>
            </Link>
          </>
        ) : (
          <></>
        )}
      </div>
    </header>
  );
};

import readnestLogo from "@/assets/readnest_logo.svg";
import { Search } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button, buttonVariants } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";
import type { VariantProps } from "class-variance-authority";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "@/features/auth/authSlice";
import UserDropDown from "../ui/user-dropdown";

interface HeaderProps {
  isAuthenticated: boolean;
  user?: {
    fullName: string;
    avatarUrl?: string;
  };
}

type ButtonVariant = VariantProps<typeof buttonVariants>["variant"];
type ButtonType = "login" | "register";

const getButtonProps = (
  type: ButtonType,
  currentPath: string
): { variant: ButtonVariant; className: string } => {
  let isActive;

  if (currentPath === "/login") {
    isActive = type === "login";
  } else if (currentPath === "/register") {
    isActive = type === "register";
  } else {
    isActive = false;
  }

  return {
    variant: isActive ? "default" : "outline",
    className: isActive
      ? "w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-full"
      : "w-full font-semibold rounded-full",
  };
};

export const Header = ({ isAuthenticated, user }: HeaderProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const onLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <header className="w-full px-6 py-4 shadow-md bg-white flex items-center justify-between z-10">
      <div className="flex items-center gap-2">
        <img src={readnestLogo} alt="Logo" className="w-8 h-8" />
        <span className="text-xl font-bold">ReadNest</span>
      </div>

      <nav className="hidden md:flex gap-6 text-sm font-medium">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-indigo-700" : "text-gray-600"
          }
        >
          Trang chủ
        </NavLink>
        <NavLink
          to="/explore"
          className={({ isActive }) =>
            isActive ? "text-indigo-700" : "text-gray-600"
          }
        >
          Khám phá
        </NavLink>

        <NavLink
          to="/trade"
          className={({ isActive }) =>
            isActive ? "text-indigo-700" : "text-gray-600"
          }
        >
          Trao đổi
        </NavLink>
        <NavLink
          to="/community"
          className={({ isActive }) =>
            isActive ? "text-indigo-700" : "text-gray-600"
          }
        >
          Cộng đồng
        </NavLink>
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
              <Button {...getButtonProps("login", location.pathname)}>
                Đăng nhập
              </Button>
            </Link>
            <Link to="/register">
              <Button {...getButtonProps("register", location.pathname)}>
                Đăng ký
              </Button>
            </Link>
          </>
        ) : (
          <>
            <UserDropDown
              fullName={user?.fullName ?? ""}
              avatarUrl={user?.avatarUrl}
              onClickLogout={onLogout}
            />
          </>
        )}
      </div>
    </header>
  );
};

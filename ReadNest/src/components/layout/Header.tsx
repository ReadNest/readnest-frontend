import readnestLogo from "@/assets/readnest_logo.svg";
import { Bell, Home, Compass, Repeat, Users } from "lucide-react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Button, buttonVariants } from "../ui/button";
import { useState } from "react";
import type { VariantProps } from "class-variance-authority";
import { useDispatch } from "react-redux";
import { logout } from "@/features/auth/authSlice";
import UserDropDown from "../ui/user-dropdown";
import { clearErrors } from "@/store/error/errorSlice";
import { toast } from "react-toastify";
import SearchContainer from "@/features/search/components/SearchContainer";

interface HeaderProps {
  isAuthenticated: boolean;
  user?: {
    username: string;
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
    setMobileMenuOpen((prev) => !prev);
  };

  const onLogout = async () => {
    dispatch(logout());
    dispatch(clearErrors());
    toast.success("Logout successfully!");
    navigate("/");
  };

  const navItems = [
    { to: "/", label: "Trang chủ", icon: <Home className="w-5 h-5" /> },
    {
      to: "/posts",
      label: "Khám phá",
      icon: <Compass className="w-5 h-5" />,
    },
    { to: "/trade", label: "Trao đổi", icon: <Repeat className="w-5 h-5" /> },
    {
      to: "/community",
      label: "Cộng đồng",
      icon: <Users className="w-5 h-5" />,
    },
  ];

  return (
    <header className="w-full px-6 py-4 shadow-md bg-white flex items-center justify-between z-20 relative">
      <div
        className="flex items-center gap-2 hover:cursor-pointer"
        onClick={() => {
          navigate("/");
        }}
      >
        <img src={readnestLogo} alt="Logo" className="w-8 h-8" />
        <span className="text-xl font-bold">ReadNest</span>
      </div>
      <nav className="hidden md:flex gap-8 text-sm font-medium mr-auto ml-20">
        {navItems.map(({ to, label, icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-1 ${
                isActive
                  ? "text-indigo-700"
                  : "text-gray-600 hover:text-indigo-600"
              }`
            }
          >
            {icon}
            {label}
          </NavLink>
        ))}
      </nav>
      <button
        className="md:hidden flex items-center justify-center p-2 text-indigo-600 focus:outline-none"
        aria-label="Toggle menu"
        onClick={toggleMobileMenu}
      >
        {isMobileMenuOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        )}
      </button>
      {isMobileMenuOpen && (
        <div
          className="fixed top-16 left-0 w-full h-[calc(100vh-4rem)] bg-white shadow-lg p-6 flex flex-col gap-6 md:hidden overflow-y-auto z-30"
          // top-16 = 64px (header height)
        >
          {navItems.map(({ to, label, icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 text-xl font-semibold px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? "bg-indigo-100 text-indigo-700"
                    : "text-gray-800 hover:bg-indigo-50"
                }`
              }
              onClick={() => setMobileMenuOpen(false)}
            >
              {icon}
              {label}
            </NavLink>
          ))}

          <div className="mt-auto flex flex-col gap-3 px-4">
            {!isAuthenticated ? (
              <>
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button
                    variant={
                      location.pathname === "/login" ? "default" : "outline"
                    }
                    className="w-full rounded-full text-lg font-semibold"
                  >
                    Đăng nhập
                  </Button>
                </Link>
                <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                  <Button
                    variant={
                      location.pathname === "/register" ? "default" : "outline"
                    }
                    className="w-full rounded-full text-lg font-semibold"
                  >
                    Đăng ký
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/create-post" onClick={() => setMobileMenuOpen(false)}>
                  <Button
                    variant="default"
                    className="w-full rounded-full bg-indigo-600 hover:bg-indigo-700 text-white text-lg font-semibold"
                  >
                    Tạo bài viết
                  </Button>
                </Link>
                <Link
                  to="/notifications"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex justify-center"
                >
                  <Bell className="h-6 w-6 text-indigo-600 hover:animate-shake transition-transform cursor-pointer" />
                </Link>
                <div className="mt-3">
                  <UserDropDown
                    username={user?.username ?? ""}
                    fullName={user?.fullName ?? ""}
                    avatarUrl={user?.avatarUrl}
                    onClickLogout={() => {
                      onLogout();
                      setMobileMenuOpen(false);
                    }}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      )}
      {/* Right side: search + user actions */}
      <div className="flex items-center gap-4 ml-4">
        <SearchContainer />

        {!isAuthenticated ? (
          <>
            <Link to="/login" className="w-24">
              <Button {...getButtonProps("login", location.pathname)}>
                Đăng nhập
              </Button>
            </Link>
            <Link to="/register" className="w-24">
              <Button {...getButtonProps("register", location.pathname)}>
                Đăng ký
              </Button>
            </Link>
          </>
        ) : (
          <>
            <Link to="/create-post">
              <Button
                variant="default"
                className="w-full font-semibold rounded-full bg-indigo-600 hover:bg-indigo-700 text-white hover:text-white"
              >
                Tạo bài viết
              </Button>
            </Link>
            <Link to="/notifications">
              <Bell className="h-5 w-5 hover:animate-shake transition-transform cursor-pointer" />
            </Link>
            <UserDropDown
              username={user?.username ?? ""}
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

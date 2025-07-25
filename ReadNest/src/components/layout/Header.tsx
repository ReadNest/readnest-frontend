import readnestLogo from "@/assets/readnest_logo.svg";
import { Bell, Home, Compass, Repeat, Trophy, Search } from "lucide-react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Button, buttonVariants } from "../ui/button";
import { useState } from "react";
import type { VariantProps } from "class-variance-authority";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/features/auth/authSlice";
import UserDropDown from "../ui/user-dropdown";
import { clearErrors } from "@/store/error/errorSlice";
import { toast } from "react-toastify";
import SearchContainer from "@/features/search/components/SearchContainer";
import { ROUTE_PATHS } from "@/constants/routePaths";
import type { RootState } from "@/store";
import { RoleEnum } from "@/constants/enum";

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
  const isAdmin = useSelector(
    (state: RootState) => state.auth.user.roleName === RoleEnum.ADMIN
  );
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const onLogout = async () => {
    dispatch(logout());
    dispatch(clearErrors());
    toast.success("Logout successfully!");
    navigate(ROUTE_PATHS.DEFAULT);
  };

  const navItems = [
    {
      to: ROUTE_PATHS.DEFAULT,
      label: "Trang chủ",
      icon: <Home className="w-5 h-5" />,
    },
    {
      to: ROUTE_PATHS.POSTS,
      label: "Khám phá",
      icon: <Compass className="w-5 h-5" />,
    },
    {
      to: ROUTE_PATHS.BOOK_EXCHANGE,
      label: "Trao đổi",
      icon: <Repeat className="w-5 h-5" />,
    },
    {
      to: ROUTE_PATHS.RANK,
      label: "Bảng xếp hạng",
      icon: <Trophy className="w-5 h-5" />,
    },
  ];

  return (
    <header className="w-full px-4 sm:px-6 py-4 shadow-md bg-white flex items-center justify-between z-20 relative">
      {!isAdmin && (
        <>
          <div
            className="flex items-center gap-2 hover:cursor-pointer"
            onClick={() => {
              navigate(ROUTE_PATHS.DEFAULT);
            }}
          >
            <img src={readnestLogo} alt="Logo" className="w-8 h-8" />
            <span className="text-xl font-bold hidden sm:block">ReadNest</span>
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
        </>
      )}

      {/* Search for desktop */}
      {!isAdmin && (
        <div className="hidden md:block ml-auto mr-4">
          <SearchContainer />
        </div>
      )}

      {/* Mobile menu button */}
      <div className="flex items-center gap-2 md:gap-4 ml-auto">
        {!isAdmin && (
          <>
            {/* Mobile search button */}
            <button
              className="md:hidden flex items-center justify-center p-2 text-indigo-600 focus:outline-none"
              onClick={() => setShowMobileSearch(!showMobileSearch)}
            >
              <Search className="w-5 h-5" />
            </button>
          </>
        )}

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

        {/* Desktop buttons (hidden on mobile) */}
        {isAdmin ? (
          isAuthenticated && (
            <>
              <button
                type="button"
                className="hidden md:flex justify-center"
                onClick={() => toast.info("Tính năng đang được phát triển!")}
              >
                <Bell className="h-5 w-5 hover:animate-shake transition-transform cursor-pointer text-indigo-600" />
              </button>
              <div className="hidden md:block">
                <UserDropDown
                  username={user?.username ?? ""}
                  fullName={user?.fullName ?? ""}
                  avatarUrl={user?.avatarUrl}
                  onClickLogout={onLogout}
                  onlyLogout
                />
              </div>
            </>
          )
        ) : !isAuthenticated ? (
          <>
            <Link to="/login" className="hidden md:block w-24">
              <Button {...getButtonProps("login", location.pathname)}>
                Đăng nhập
              </Button>
            </Link>
            <Link to="/register" className="hidden md:block w-24">
              <Button {...getButtonProps("register", location.pathname)}>
                Đăng ký
              </Button>
            </Link>
          </>
        ) : (
          <>
            <Link to="/create-post" className="hidden md:block">
              <Button
                variant="default"
                className="font-semibold rounded-full bg-indigo-600 hover:bg-indigo-700 text-white hover:text-white"
              >
                Tạo bài viết
              </Button>
            </Link>
            <button
              type="button"
              className="hidden md:flex justify-center"
              onClick={() => toast.info("Tính năng đang được phát triển!")}
            >
              <Bell className="h-5 w-5 hover:animate-shake transition-transform cursor-pointer text-indigo-600" />
            </button>
            <div className="hidden md:block">
              <UserDropDown
                username={user?.username ?? ""}
                fullName={user?.fullName ?? ""}
                avatarUrl={user?.avatarUrl}
                onClickLogout={onLogout}
              />
            </div>
          </>
        )}
      </div>

      {/* Mobile search */}
      {showMobileSearch && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white p-4 shadow-md z-10">
          <SearchContainer />
        </div>
      )}

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="fixed top-16 left-0 w-full h-[calc(100vh-4rem)] bg-white shadow-lg p-6 flex flex-col gap-6 md:hidden overflow-y-auto z-30">
          {/* Nav items hidden for admin */}
          {!isAdmin &&
            navItems.map(({ to, label, icon }) => (
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
            {isAdmin ? (
              isAuthenticated && (
                <div className="mt-3">
                  <UserDropDown
                    username={user?.username ?? ""}
                    fullName={user?.fullName ?? ""}
                    avatarUrl={user?.avatarUrl}
                    onClickLogout={() => {
                      onLogout();
                      setMobileMenuOpen(false);
                    }}
                    onlyLogout
                  />
                </div>
              )
            ) : !isAuthenticated ? (
              <>
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button {...getButtonProps("login", location.pathname)}>
                    Đăng nhập
                  </Button>
                </Link>
                <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                  <Button {...getButtonProps("register", location.pathname)}>
                    Đăng ký
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/create-post"
                  onClick={() => setMobileMenuOpen(false)}
                >
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
                  className="flex items-center gap-3 text-xl font-semibold px-4 py-3 rounded-lg transition-colors text-gray-800 hover:bg-indigo-50"
                >
                  <Bell className="h-6 w-6" />
                  Thông báo
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
    </header>
  );
};

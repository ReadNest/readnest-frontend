// components/layout/Header.tsx
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

interface HeaderProps {
  isLoggedIn: boolean;
  user?: {
    name: string;
    avatar?: string;
  };
}

export const Header = ({ isLoggedIn, user }: HeaderProps) => {
  return (
    <header className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center gap-2">
        <Link to="/" className="text-xl font-bold">
          ReadNest
        </Link>
      </div>

      <nav className="flex items-center gap-4">
        {isLoggedIn ? (
          <>
            <Link to="/dashboard" className="hover:text-primary">
              Dashboard
            </Link>
            <div className="flex items-center gap-2">
              {user?.avatar && (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-8 h-8 rounded-full"
                />
              )}
              <span>{user?.name}</span>
            </div>
          </>
        ) : (
          <>
            <Link to="/login">
              <Button variant="ghost">Đăng nhập</Button>
            </Link>
            <Link to="/register">
              <Button>Đăng ký</Button>
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

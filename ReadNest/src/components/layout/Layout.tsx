// components/layout/Layout.tsx
import { Header } from "./Header";
import Sidebar from "./Sidebar";

interface LayoutProps {
  children: React.ReactNode;
  isLoggedIn: boolean;
  showSidebar?: boolean;
}

export const Layout = ({
  children,
  isLoggedIn,
  showSidebar = false,
}: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header isLoggedIn={isLoggedIn} />

      <div className="flex flex-1">
        {showSidebar && <Sidebar />}

        <main className="flex-1 p-4">{children}</main>
      </div>
    </div>
  );
};

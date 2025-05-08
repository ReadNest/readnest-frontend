// components/layout/Layout.tsx
import { Header } from "./Header";
import Sidebar from "./Sidebar";

interface LayoutProps {
  children: React.ReactNode;
  isAuthenticated: boolean;
  isLoginForm: boolean;
  showSidebar?: boolean;
}

export const Layout = ({
  children,
  isAuthenticated = false,
  isLoginForm = true,
  showSidebar = false,
}: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header isAuthenticated={isAuthenticated} isLoginForm={isLoginForm} />

      <div className="flex flex-1">
        {showSidebar && <Sidebar />}

        <main className={`flex-1 ${!showSidebar ? "w-full" : "p-4"}`}>
          {children}
        </main>
      </div>
    </div>
  );
};

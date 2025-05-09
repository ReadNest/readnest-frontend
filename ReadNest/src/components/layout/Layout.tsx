// components/layout/Layout.tsx
type LayoutOptions = {
  header: boolean;
  sidebar: boolean;
  footer: boolean;
};

interface LayoutProps {
  options: LayoutOptions;
  header?: React.ReactNode;
  sidebar?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
  isAuthenticated: boolean;
  isLoginForm: boolean;
  showSidebar?: boolean;
}

export const Layout = ({
  options,
  header,
  footer,
  sidebar,
  children,
  isAuthenticated = false,
  isLoginForm = true,
}: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      {options.header && header}

      <div className="flex flex-1">
        {options.sidebar && (
          <aside className="w-64 bg-gray-100 p-4 hidden md:block">
            {sidebar}
          </aside>
        )}

        <main className="flex-1">{children}</main>
      </div>

      {options.footer && footer}
    </div>
  );
};

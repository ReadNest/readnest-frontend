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
  showSidebar?: boolean;
}

export const Layout = ({ ...props }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      {props.options.header && props.header}

      <div className="flex flex-1">
        {props.options.sidebar && (
          <aside className="w-64 bg-gray-100 p-4 hidden md:block">
            {props.sidebar}
          </aside>
        )}

        <main className="flex-1">{props.children}</main>
      </div>

      {props.options.footer && props.footer}
    </div>
  );
};

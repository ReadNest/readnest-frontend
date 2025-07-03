import { ChatWidget } from "@/pages/chat/ChatWidget";

type LayoutOptions = {
  header: boolean;
  sidebar: boolean;
  footer: boolean;
  sidebarFullHeight?: boolean;
  showChat?: boolean;
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
  const { header, sidebar, footer } = props;
  const {
    header: showHeader,
    sidebar: showSidebar,
    footer: showFooter,
    sidebarFullHeight,
    showChat = true,
  } = props.options;

  if (sidebarFullHeight) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        {showSidebar && (
          <aside className="w-64 hidden md:block border-r border-gray-200">
            {sidebar}
          </aside>
        )}

        <div className="flex flex-col flex-1">
          {showHeader && (
            <div className="sticky top-0 z-50 bg-white shadow-sm">{header}</div>
          )}
          <main className="flex-1 overflow-y-auto p-4 bg-white">
            {props.children}
          </main>
          {showFooter && footer}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {showHeader && (
        <div className="sticky top-0 z-50 bg-white shadow-sm">{header}</div>
      )}

      <div className="flex flex-1 min-h-0">
        {showSidebar && (
          <aside className="w-64 hidden md:block border-r border-gray-200">
            {sidebar}
          </aside>
        )}

        <main className="flex-1 overflow-y-auto bg-white">
          {props.children}
          {showChat && props.isAuthenticated && <ChatWidget />}
        </main>
      </div>

      {showFooter && footer}
    </div>
  );
};

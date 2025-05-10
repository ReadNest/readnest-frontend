import Footer from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Layout } from "@/components/layout/Layout";
import Sidebar from "@/components/layout/Sidebar";
import { ProtectedRoute } from "@/components/routes/ProtectedRoute";
import { PublicRoute } from "@/components/routes/PublicRoute";
import { ROUTE_PATHS } from "@/constants/routePaths";
import LoginPage from "@/pages/LoginPage";

const defaultLayout = {
  options: {
    header: true,
    sidebar: false,
    footer: true,
  },
  header: <Header isAuthenticated={false} isLoginForm={true} />,
  footer: <Footer />,
  sidebar: <Sidebar />,
};

const routeConfigs = [
  {
    path: ROUTE_PATHS.HOME,
    isPrivate: false,
    element: <LoginPage />,
    layout: defaultLayout,
  },
  //   {
  //     path: ROUTE_PATHS.PROFILE,
  //     isPrivate: true,
  //     allowedRoles: ["user", "admin"],
  //     element: <Profile />,
  //     layout: defaultLayout,
  //   },
  //   {
  //     path: ROUTE_PATHS.ADMIN,
  //     isPrivate: true,
  //     allowedRoles: ["admin"],
  //     element: <AdminDashboard />,
  //     layout: defaultLayout,
  //   },
  {
    path: ROUTE_PATHS.LOGIN,
    isPrivate: false,
    publicOnly: true,
    element: <LoginPage />,
    layout: defaultLayout,
    allowedRoles: [],
  },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const appRoutes = (user: any) =>
  routeConfigs.map(
    ({ path, element, layout, isPrivate, allowedRoles, publicOnly }) => {
      const content = layout ? (
        <Layout {...layout} isAuthenticated={!!user}>
          {element}
        </Layout>
      ) : (
        element
      );

      const wrappedElement = isPrivate ? (
        <ProtectedRoute user={user} allowedRoles={allowedRoles}>
          {content}
        </ProtectedRoute>
      ) : publicOnly ? (
        <PublicRoute user={user}>{content}</PublicRoute>
      ) : (
        content
      );

      return {
        path,
        element: wrappedElement,
      };
    }
  );

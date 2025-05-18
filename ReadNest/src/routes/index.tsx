import type { GetUserResponse } from "@/api/@types";
import Footer from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Layout } from "@/components/layout/Layout";
import Sidebar from "@/components/layout/Sidebar";
import { ProtectedRoute } from "@/components/routes/ProtectedRoute";
import { PublicRoute } from "@/components/routes/PublicRoute";
import { RoleEnum } from "@/constants/enum";
import { ROUTE_PATHS } from "@/constants/routePaths";
import LoginPage from "@/pages/auth/LoginPage";
import RegisterPage from "@/pages/auth/RegisterPage";
import BookDetailPage from "@/pages/book/BookDetailPage";
import BookPage from "@/pages/book/BookPage";
import BookExchangePage from "@/pages/book/BookExchangePage";
import FavoriteBooksPage from "@/pages/favouriteBooks/FavouriteBooksPage";
import HomePage from "@/pages/home/HomePage";
import ProfilePage from "@/pages/profile/ProfilePage";
import CommunityRanking from "@/pages/rank/CommunityRanking";
import SearchPage from "@/pages/search/SearchPage";
import CreateBookPage from "@/pages/book/CreateBookPage";

export const appRoutes = (user: GetUserResponse, isAuthenticated: boolean) => {
  const defaultLayout = {
    options: {
      header: true,
      sidebar: false,
      footer: true,
    },
    header: (
      <Header
        isAuthenticated={isAuthenticated}
        user={{
          fullName: user.fullName ?? "",
          avatarUrl: user.avatarUrl ?? "",
        }}
      />
    ),
    footer: <Footer />,
    sidebar: <Sidebar roleName={user.roleName ?? ""} />,
  };

  const adminLayout = {
    options: {
      header: true,
      sidebar: true,
      footer: false,
      sidebarFullHeight: true,
    },
    header: (
      <Header
        isAuthenticated={isAuthenticated}
        user={{
          fullName: user.fullName ?? "",
          avatarUrl: user.avatarUrl ?? "",
        }}
      />
    ),
    footer: <Footer />,
    sidebar: <Sidebar roleName={user.roleName ?? ""} />,
  };

  const routeConfigs = [
    {
      path: ROUTE_PATHS.DEFAULT,
      isPrivate: false,
      element: <HomePage />,
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
    {
      path: ROUTE_PATHS.REGISTER,
      isPrivate: false,
      publicOnly: true,
      element: <RegisterPage />,
      layout: defaultLayout,
      allowedRoles: [],
    },
    {
      path: ROUTE_PATHS.PROFILE,
      isPrivate: true,
      allowedRoles: [RoleEnum.ADMIN, RoleEnum.USER],
      element: <ProfilePage />,
      layout: defaultLayout,
    },
    {
      path: ROUTE_PATHS.SEARCH,
      isPrivate: true,
      // allowedRoles: ["user", "admin"],
      element: <SearchPage />,
      layout: defaultLayout,
    },
    {
      path: ROUTE_PATHS.FAVOURITE,
      isPrivate: true,
      // allowedRoles: ["user", "admin"],
      element: <FavoriteBooksPage />,
      layout: defaultLayout,
    },
    {
      path: ROUTE_PATHS.BOOK_DETAIL,
      isPrivate: true,
      // allowedRoles: ["user", "admin"],
      element: <BookDetailPage />,
      layout: defaultLayout,
    },
    {
      path: ROUTE_PATHS.RANK,
      isPrivate: true,
      // allowedRoles: ["user", "admin"],
      element: <CommunityRanking />,
      layout: defaultLayout,
    },
    {
      path: ROUTE_PATHS.BOOK_EXCHANGE,
      isPrivate: true,
      // allowedRoles: ["user", "admin"],
      element: <BookExchangePage />,
      layout: defaultLayout,
    },
    {
      path: ROUTE_PATHS.BOOK,
      isPrivate: true,
      // allowedRoles: ["user", "admin"],
      element: <BookPage />,
      layout: adminLayout,
    },
    {
      path: ROUTE_PATHS.MANAGE_BOOK,
      isPrivate: true,
      // allowedRoles: ["user", "admin"],
      element: <CreateBookPage />,
      layout: adminLayout,
    },
  ];

  return routeConfigs.map(
    ({ path, element, layout, isPrivate, allowedRoles, publicOnly }) => {
      const content = layout ? (
        <Layout {...layout} isAuthenticated={!!user}>
          {element}
        </Layout>
      ) : (
        element
      );

      const wrappedElement = isPrivate ? (
        <ProtectedRoute
          isAuthenticated={isAuthenticated}
          user={user}
          allowedRoles={allowedRoles}
        >
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
};

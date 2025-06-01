import type { GetUserResponse } from "@/api/@types";
import Footer from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Layout } from "@/components/layout/Layout";
import Sidebar from "@/components/layout/Sidebar";
import { ProtectedRoute } from "@/components/routes/ProtectedRoute";
import { PublicRoute } from "@/components/routes/PublicRoute";
import { RoleEnum } from "@/constants/enum";
import { ROUTE_PATHS } from "@/constants/routePaths";
import NotFoundPage from "@/pages/404/NotFoundPage";
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
import CreateBookAffiliateLinks from "@/pages/affliate/CreateBookAffiliateLinks";
import CategoryPage from "@/pages/category/CategoryPage";
import CreateCategoryPage from "@/pages/category/CreateCategoryPage";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearErrors } from "@/store/error/errorSlice";
import CreatePostPage from "@/pages/post/CreatePostPage";
import CommentReportsPage from "@/pages/commentReport/CommentReportsPage";

export const AppRoutes = (user: GetUserResponse, isAuthenticated: boolean) => {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearErrors());
  }, [location.pathname, dispatch]);

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
          username: user.userName ?? "",
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
          username: user.userName ?? "",
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
      isPrivate: false,
      allowedRoles: [RoleEnum.USER, RoleEnum.ADMIN],
      element: <SearchPage />,
      layout: defaultLayout,
    },
    {
      path: ROUTE_PATHS.FAVOURITE,
      isPrivate: true,
      allowedRoles: [RoleEnum.USER, RoleEnum.ADMIN],
      element: <FavoriteBooksPage />,
      layout: defaultLayout,
    },
    {
      path: ROUTE_PATHS.BOOK_DETAIL,
      isPrivate: false,
      allowedRoles: [RoleEnum.USER, RoleEnum.ADMIN],
      element: <BookDetailPage />,
      layout: defaultLayout,
    },
    {
      path: ROUTE_PATHS.RANK,
      isPrivate: true,
      allowedRoles: [RoleEnum.USER, RoleEnum.ADMIN],
      element: <CommunityRanking />,
      layout: defaultLayout,
    },
    {
      path: ROUTE_PATHS.BOOK_EXCHANGE,
      isPrivate: true,
      allowedRoles: [RoleEnum.USER, RoleEnum.ADMIN],
      element: <BookExchangePage />,
      layout: defaultLayout,
    },
    {
      path: ROUTE_PATHS.BOOK,
      isPrivate: false,
      allowedRoles: [RoleEnum.ADMIN],
      element: <BookPage />,
      layout: adminLayout,
    },
    {
      path: ROUTE_PATHS.MANAGE_BOOK,
      isPrivate: true,
      allowedRoles: [RoleEnum.ADMIN],
      element: <CreateBookPage />,
      layout: adminLayout,
    },
    {
      path: ROUTE_PATHS.AFFILIATE,
      isPrivate: true,
      allowedRoles: [RoleEnum.ADMIN],
      element: <BookPage />,
      layout: adminLayout,
    },
    {
      path: ROUTE_PATHS.MANAGE_AFFILIATE,
      isPrivate: true,
      allowedRoles: [RoleEnum.ADMIN],
      element: <CreateBookAffiliateLinks />,
      layout: adminLayout,
    },
    {
      path: ROUTE_PATHS.CATEGORY,
      isPrivate: true,
      allowedRoles: [RoleEnum.ADMIN],
      element: <CategoryPage />,
      layout: adminLayout,
    },
    {
      path: ROUTE_PATHS.CREATE_CATEGORY,
      isPrivate: true,
      allowedRoles: [RoleEnum.ADMIN],
      element: <CreateCategoryPage />,
      layout: adminLayout,
    },
    {
      path: ROUTE_PATHS.NOT_FOUND,
      isPrivate: false,
      publicOnly: true,
      element: <NotFoundPage />,
    },
    {
      path: ROUTE_PATHS.CREATE_POST,
      isPrivate: false,
      allowedRoles: [RoleEnum.USER, RoleEnum.ADMIN],
      element: <CreatePostPage />,
      layout: defaultLayout,
    },
    {
      path: ROUTE_PATHS.COMMENT_REPORT,
      isPrivate: true,
      allowedRoles: [RoleEnum.ADMIN],
      element: <CommentReportsPage />,
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

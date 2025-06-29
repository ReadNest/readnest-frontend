import React, { lazy, Suspense, useEffect } from "react";
import { useLocation } from "react-router-dom";
import type { GetUserResponse } from "@/api/@types";
import Footer from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Layout } from "@/components/layout/Layout";
import Sidebar from "@/components/layout/Sidebar";
import { ProtectedRoute } from "@/components/routes/ProtectedRoute";
import { PublicRoute } from "@/components/routes/PublicRoute";
import { RoleEnum } from "@/constants/enum";
import { ROUTE_PATHS } from "@/constants/routePaths";
import { clearErrors } from "@/store/error/errorSlice";
import { useDispatch } from "react-redux";
import DetailPostPage from "@/pages/post/DetailPostPage";
import PostsPage from "@/pages/post/PostsPage";
import UserPostsPage from "@/pages/post/UserPostsPage";
import EditBookPage from "@/pages/book/UpdateBookPage";
import UpdatePostPage from "@/pages/post/UpdatePostPage";
import EventPage from "@/pages/event/EventPage";
import MyBooksPage from "@/pages/bookExchange/MyBooksPage";
import CreateTradingPostPage from "@/pages/bookExchange/CreateTradingPostPage";

// Dùng lazy import cho các page
const NotFoundPage = lazy(() => import("@/pages/404/NotFoundPage"));
const LoginPage = lazy(() => import("@/pages/auth/LoginPage"));
const RegisterPage = lazy(() => import("@/pages/auth/RegisterPage"));
const BookDetailPage = lazy(() => import("@/pages/book/BookDetailPage"));
const BookPage = lazy(() => import("@/pages/book/BookPage"));
const BookExchangePage = lazy(() => import("@/pages/book/BookExchangePage"));
const FavoriteBooksPage = lazy(
  () => import("@/pages/favouriteBooks/FavouriteBooksPage")
);
const HomePage = lazy(() => import("@/pages/home/HomePage"));
const ProfilePage = lazy(() => import("@/pages/profile/ProfilePage"));
const CommunityRanking = lazy(() => import("@/pages/rank/CommunityRanking"));
const SearchPage = lazy(() => import("@/pages/search/SearchPage"));
const CreateBookPage = lazy(() => import("@/pages/book/CreateBookPage"));
const CreateBookAffiliateLinks = lazy(
  () => import("@/pages/affliate/CreateBookAffiliateLinks")
);
const CategoryPage = lazy(() => import("@/pages/category/CategoryPage"));
const CreateCategoryPage = lazy(
  () => import("@/pages/category/CreateCategoryPage")
);
const CreatePostPage = lazy(() => import("@/pages/post/CreatePostPage"));
const CommentReportsPage = lazy(
  () => import("@/pages/commentReport/CommentReportsPage")
);

const SuspenseWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <Suspense
    fallback={
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
        <div className="w-16 h-16 border-4 border-gray-300 border-t-indigo-600 rounded-full animate-spin" />
      </div>
    }
  >
    {children}
  </Suspense>
);

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
      showChat: false, // Không hiển thị chat trong layout admin
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
      isPrivate: true,
      allowedRoles: [RoleEnum.ADMIN, RoleEnum.USER],
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
      isPrivate: true,
      allowedRoles: [RoleEnum.USER, RoleEnum.ADMIN],
      element: <CreatePostPage />,
      layout: defaultLayout,
    },
    {
      path: ROUTE_PATHS.UPDATE_POST,
      isPrivate: true,
      allowedRoles: [RoleEnum.USER, RoleEnum.ADMIN],
      element: <UpdatePostPage />,
      layout: defaultLayout,
    },
    {
      path: ROUTE_PATHS.COMMENT_REPORT,
      isPrivate: true,
      allowedRoles: [RoleEnum.ADMIN],
      element: <CommentReportsPage />,
      layout: adminLayout,
    },
    {
      path: ROUTE_PATHS.DETAIL_POST,
      isPrivate: false,
      allowedRoles: [RoleEnum.USER, RoleEnum.ADMIN],
      element: <DetailPostPage />,
      layout: defaultLayout,
    },
    {
      path: ROUTE_PATHS.POSTS,
      isPrivate: false,
      allowedRoles: [RoleEnum.USER, RoleEnum.ADMIN],
      element: <PostsPage />,
      layout: defaultLayout,
    },
    {
      path: ROUTE_PATHS.MY_POSTS,
      isPrivate: false,
      allowedRoles: [RoleEnum.USER, RoleEnum.ADMIN],
      element: <UserPostsPage />,
      layout: defaultLayout,
    },
    {
      path: ROUTE_PATHS.UPDATE_BOOK,
      isPrivate: true,
      allowedRoles: [RoleEnum.ADMIN],
      element: <EditBookPage />,
      layout: adminLayout,
    },
    {
      path: ROUTE_PATHS.MY_BOOKS,
      isPrivate: true,
      allowedRoles: [RoleEnum.USER],
      element: <MyBooksPage />,
      layout: defaultLayout,
    },
    {
      path: ROUTE_PATHS.EVENT,
      isPrivate: true,
      allowedRoles: [RoleEnum.ADMIN],
      element: <EventPage />,
      layout: adminLayout,
    },
    {
      path: ROUTE_PATHS.MANAGE_TRADING_POST,
      isPrivate: true,
      allowedRoles: [RoleEnum.USER],
      element: <CreateTradingPostPage />,
      layout: defaultLayout,
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
        element: <SuspenseWrapper>{wrappedElement}</SuspenseWrapper>,
      };
    }
  );
};

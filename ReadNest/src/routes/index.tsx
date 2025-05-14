import Footer from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Layout } from "@/components/layout/Layout";
import Sidebar from "@/components/layout/Sidebar";
import { ProtectedRoute } from "@/components/routes/ProtectedRoute";
import { PublicRoute } from "@/components/routes/PublicRoute";
import { ROUTE_PATHS } from "@/constants/routePaths";
import LoginPage from "@/pages/auth/LoginPage";
import RegisterPage from "@/pages/auth/RegisterPage";
import BookDetailPage from "@/pages/book/bookDetailPage";
import FavoriteBooksPage from "@/pages/favouriteBooks/FavouriteBooksPage";
import ProfilePage from "@/pages/profile/ProfilePage";
import SearchPage from "@/pages/search/SearchPage";

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
    // allowedRoles: ["user", "admin"],
    element: <ProfilePage />,
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
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const appRoutes = (user: any) => {
  const defaultLayout = {
    options: {
      header: true,
      sidebar: false,
      footer: true,
    },
    header: (
      <Header
        isAuthenticated={user.isAuthenticated}
        user={{ name: user.fullName }}
        isLoginForm={true}
      />
    ),
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
      // allowedRoles: ["user", "admin"],
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
};

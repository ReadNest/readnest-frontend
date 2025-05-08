import { Toaster } from "sonner";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import "./App.css";

import { Layout } from "./components/layout/Layout";

function App() {
  return (
    <>
      <Routes>
        {/* Public routes */}
        <Route
          path="/"
          element={
            <Layout
              isAuthenticated={false}
              isLoginForm={true}
              children={<LoginPage />}
            />
          }
        />
        <Route path="/login" element={<LoginPage />} />
        {/* <Route path="/register" element={<RegisterPage />} /> */}

        {/* Private routes */}
        {/* <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<DashboardPage />} />
        </Route> */}
      </Routes>

      <Toaster position="top-right" duration={4000} />
    </>
  );

  const PrivateRoute = () => {
    const isAuthenticated = true;
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
  };

  const RoleBasedRoute = ({ roles }: { roles: string[] }) => {
    const user = null;

    if (!user || !roles.includes(user.role || "user")) {
      return <Navigate to="/" />;
    }

    return <Outlet />;
  };
}

export default App;

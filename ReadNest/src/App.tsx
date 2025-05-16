import { Toaster } from "sonner";
import { Route, Routes } from "react-router-dom";
import "./App.css";

import { appRoutes } from "./routes";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "./store";
import { fetchUserLoginStart } from "./features/auth/authSlice";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (auth.isAuthenticated && !auth.user?.fullName) {
      const accessToken = localStorage.getItem("access_token");
      dispatch(fetchUserLoginStart(accessToken ?? ""));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.isAuthenticated]);

  const routes = appRoutes(auth.user, auth.isAuthenticated);

  return (
    <>
      <Routes>
        {routes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>

      <Toaster position="top-right" duration={4000} />
    </>
  );
}

export default App;

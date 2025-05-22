import { Route, Routes } from "react-router-dom";
import "./App.css";

import { appRoutes } from "./routes";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "./store";
import { fetchUserLoginStart } from "./features/auth/authSlice";
import { useEffect } from "react";
import { UserLoader } from "./components/ui/user-loader";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { selectGlobalLoading } from "./store/selectors";

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);
  const loading = useSelector(selectGlobalLoading);

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
      <UserLoader loading={loading}>
        <Routes>
          {routes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Routes>
      </UserLoader>
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default App;

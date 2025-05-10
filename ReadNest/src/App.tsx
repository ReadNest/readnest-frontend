import { Toaster } from "sonner";
import { Route, Routes } from "react-router-dom";
import "./App.css";

import { appRoutes } from "./routes";
import { useSelector } from "react-redux";
import type { RootState } from "./store";

function App() {
  const user = useSelector((state: RootState) => state.auth);

  const routes = appRoutes(user);
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

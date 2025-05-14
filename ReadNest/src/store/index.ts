import createSagaMiddleware from "redux-saga";
import rootReducer from "./rootReducer";
import rootSaga from "./rootSaga";
import { configureStore } from "@reduxjs/toolkit";
import { isTokenValid } from "@/lib/utils";
import { jwtDecode } from "jwt-decode";
import { initialState as authInitialState } from "@/features/auth/authSlice";

const sagaMiddleware = createSagaMiddleware();

const accessToken = localStorage.getItem("access_token");

let preloadedState;

if (accessToken && isTokenValid(accessToken)) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const decoded: any = jwtDecode(accessToken);

  preloadedState = {
    auth: {
      ...authInitialState,
      isAuthenticated: true,
      user: {
        id: decoded[
          "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
        ],
        role: decoded[
          "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
        ],
      },
    },
  };
} else {
  preloadedState = undefined;
}

export const store = configureStore({
  reducer: rootReducer,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
  preloadedState,
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

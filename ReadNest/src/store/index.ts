import createSagaMiddleware from "redux-saga";
import rootReducer from "./rootReducer";
import rootSaga from "./rootSaga";
import { configureStore } from "@reduxjs/toolkit";
import { isTokenValid } from "@/lib/utils";
import { initialState as authInitialState } from "@/features/auth/authSlice";

const sagaMiddleware = createSagaMiddleware();

const accessToken = localStorage.getItem("access_token");

let preloadedState;

if (accessToken && isTokenValid(accessToken)) {
  preloadedState = {
    auth: {
      ...authInitialState,
      isAuthenticated: true,
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

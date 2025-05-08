import type { LoginRequest, TokenResponse } from "@/api/@types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  loading: false,
  userName: "",
  password: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    loginStart: (_state, _action: PayloadAction<LoginRequest>) => {},
    loginRequest: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action: PayloadAction<TokenResponse>) => {
      state.isAuthenticated = true;
      state.loading = false;
      localStorage.setItem("token", JSON.stringify(action.payload));
    },
    loginFailure: (state) => {
      state.loading = false;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      localStorage.removeItem("token");
    },
    setInitialState: (state, action: PayloadAction<LoginRequest>) => {
      state.userName = action.payload.userName ?? "";
      state.password = action.payload.password ?? "";
    },
  },
});

export const {
  loginStart,
  loginRequest,
  loginSuccess,
  loginFailure,
  logout,
  setInitialState,
} = authSlice.actions;

export default authSlice.reducer;

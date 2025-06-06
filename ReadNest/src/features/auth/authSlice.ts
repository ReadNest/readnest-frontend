import type {
  GetUserResponse,
  LoginRequest,
  RegisterRequest,
  TokenResponse,
} from "@/api/@types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export const initialState: {
  isAuthenticated: boolean;
  isRegisterSuccess: boolean;
  loading: boolean;
  userName: string;
  password: string;
  user: GetUserResponse;
} = {
  isAuthenticated: false,
  isRegisterSuccess: false,
  loading: false,
  userName: "",
  password: "",
  user: {},
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    loginStart: (_state, _action: PayloadAction<LoginRequest>) => {},
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    registerStart: (_state, _action: PayloadAction<RegisterRequest>) => {},
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    fetchUserLoginStart: (_state, _action: PayloadAction<string>) => {},
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    loginRequest: (_state) => {},
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    registerRequest: (_state) => {},
    loginSuccess: (state, action: PayloadAction<TokenResponse>) => {
      state.isAuthenticated = true;
      localStorage.setItem("access_token", action.payload.accessToken ?? "");
      localStorage.setItem("refresh_token", action.payload.refreshToken ?? "");
    },
    loginFailure: (state) => {
      state.loading = false;
    },
    registerSuccess: (state) => {
      state.isRegisterSuccess = true;
    },
    registerFailure: (state) => {
      state.loading = false;
      state.isRegisterSuccess = false;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      localStorage.clear();
    },
    resetInitialRegisterState(state) {
      state.isRegisterSuccess = false;
    },
    setInitialState: (state, action: PayloadAction<LoginRequest>) => {
      state.userName = action.payload.userName ?? "";
      state.password = action.payload.password ?? "";
    },
    setUser: (state, action: PayloadAction<GetUserResponse>) => {
      state.user = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setAvatarUrl: (state, action: PayloadAction<string>) => {
      state.user.avatarUrl = action.payload;
    },
  },
});

export const {
  loginStart,
  registerStart,
  fetchUserLoginStart,
  loginRequest,
  registerRequest,
  loginSuccess,
  loginFailure,
  registerSuccess,
  registerFailure,
  logout,
  setInitialState,
  resetInitialRegisterState,
  setUser,
  setLoading,
  setAvatarUrl,
} = authSlice.actions;

export default authSlice.reducer;

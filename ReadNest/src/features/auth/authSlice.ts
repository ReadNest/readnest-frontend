import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  errorState: {},
  initState: {},
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.loading = true;
      state.errorState = {};
    },
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.errorState = action.payload.errors;
    },
    setInitState: (state, action) => {
      state.initState = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  setInitState,
  logout,
} = authSlice.actions;

export default authSlice.reducer;

import { combineReducers } from "@reduxjs/toolkit";
import errorReducer from "@/store/error/errorSlice";
import authReducer from "@/features/auth/authSlice";

const rootReducer = combineReducers({
  error: errorReducer,
  auth: authReducer,
});

export default rootReducer;

import { combineReducers } from "@reduxjs/toolkit";
import errorReducer from "@/store/error/errorSlice";
import authReducer from "@/features/auth/authSlice";
import profileReducer from "@/features/profile/profileSlice";
const rootReducer = combineReducers({
  error: errorReducer,
  auth: authReducer,
  profile: profileReducer,
});

export default rootReducer;

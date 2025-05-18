import { combineReducers } from "@reduxjs/toolkit";
import errorReducer from "@/store/error/errorSlice";
import authReducer from "@/features/auth/authSlice";
import profileReducer from "@/features/profile/profileSlice";
import bookReducer from "@/features/book/bookSlice";
import affiliateReducer from "@/features/affiliate/affiliateSlice";

const rootReducer = combineReducers({
  error: errorReducer,
  auth: authReducer,
  profile: profileReducer,
  book: bookReducer,
  affiliate: affiliateReducer,
});

export default rootReducer;

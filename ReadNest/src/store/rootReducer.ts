import { combineReducers } from "@reduxjs/toolkit";
import errorReducer from "@/store/error/errorSlice";
import authReducer from "@/features/auth/authSlice";
import bookReducer from "@/features/book/bookSlice";
import affiliateReducer from "@/features/affiliate/affiliateSlice";

const rootReducer = combineReducers({
  error: errorReducer,
  auth: authReducer,
  book: bookReducer,
  affiliate: affiliateReducer,
});

export default rootReducer;

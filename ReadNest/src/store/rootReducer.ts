import { combineReducers } from "@reduxjs/toolkit";
import errorReducer from "@/store/error/errorSlice";
import authReducer from "@/features/auth/authSlice";
import profileReducer from "@/features/profile/profileSlice";
import bookReducer from "@/features/book/bookSlice";
import affiliateReducer from "@/features/affiliate/affiliateSlice";
import categoryReducer from "@/features/category/categorySlice";
import favoriteReducer from "@/features/favouriteBooks/favoriteSlice";
import commentReducer from "@/features/review/commentSlice";

const rootReducer = combineReducers({
  error: errorReducer,
  auth: authReducer,
  profile: profileReducer,
  comment: commentReducer,
  book: bookReducer,
  affiliate: affiliateReducer,
  categories: categoryReducer,
  favorites: favoriteReducer,
});

export default rootReducer;

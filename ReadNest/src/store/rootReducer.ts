import { combineReducers } from "@reduxjs/toolkit";
import { logout } from "@/features/auth/authSlice";

import errorReducer from "@/store/error/errorSlice";
import authReducer from "@/features/auth/authSlice";
import profileReducer from "@/features/profile/profileSlice";
import bookReducer from "@/features/book/bookSlice";
import affiliateReducer from "@/features/affiliate/affiliateSlice";
import categoryReducer from "@/features/category/categorySlice";
import favoriteReducer from "@/features/favouriteBooks/favoriteSlice";
import bookSearchReducer from "@/features/search/bookSearchSlice";
import commentReducer from "@/features/review/commentSlice";
import commentReportReducer from "@/features/commentReport/commentReportSlice";
import postReducer from "@/features/post/postSlice";
import bookDropdownReducer from "@/features/search/bookDropdownSlice";
import bookSearchPageReducer from "@/features/search/bookSearchPageSlice";
import categoryFilterReducer from "@/features/search/categoryFilterSlice";
import badgeReducer from "@/features/badge/badgeSlice";
import userBadgeReducer from "@/features/userBadge/userBadgeSlice";
import eventReducer from "@/features/event/eventSlice";
import leaderboardReducer from "@/features/leaderboard/leaderboardSlice";
import tradingPostReducer from "@/features/bookExchange/tradingPostSlice";
import chatMessageReducer from "@/features/chat/chatMessageSlice";
import chatUiReducer from "@/features/chat/chatUiSlice";

const appReducer = combineReducers({
  error: errorReducer,
  auth: authReducer,
  profile: profileReducer,
  comment: commentReducer,
  book: bookReducer,
  affiliate: affiliateReducer,
  categories: categoryReducer,
  favorites: favoriteReducer,
  commentReports: commentReportReducer,
  bookSearch: bookSearchReducer,
  post: postReducer,
  bookDropdown: bookDropdownReducer,
  bookSearchPage: bookSearchPageReducer,
  categoryFilter: categoryFilterReducer,
  badge: badgeReducer,
  userBadge: userBadgeReducer,
  event: eventReducer,
  leaderboard: leaderboardReducer,
  tradingPost: tradingPostReducer,
  chatMessage: chatMessageReducer,
  chatUi: chatUiReducer,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const rootReducer = (state: any, action: any) => {
  if (action.type === logout.type) {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;

import affiliateSaga from "@/features/affiliate/affiliateSaga";
import authSaga from "@/features/auth/authSaga";
import bookSaga from "@/features/book/bookSaga";
import categorySaga from "@/features/category/categorySaga";
import commentReportSaga from "@/features/commentReport/commentReportSaga";
import favoriteSaga from "@/features/favouriteBooks/favoriteSaga";
import profileSaga from "@/features/profile/profileSaga";
import { bookSearchSaga } from "@/features/search/bookSearchSaga";
import commentSaga from "@/features/review/commentSaga";
import { all, call } from "redux-saga/effects";
import postSaga from "@/features/post/postSaga";
import { bookDropdownSaga } from "@/features/search/bookDropdownSaga";
import { bookSearchPageSaga } from "@/features/search/bookSearchPageSaga";
import { categoryFilterSaga } from "@/features/search/categoryFilterSaga";
import badgeSaga from "@/features/badge/badgeSaga";
import userBadgeSaga from "@/features/userBadge/userBadgeSaga";
import eventSaga from "@/features/event/eventSaga";
import leaderboardSaga from "@/features/leaderboard/leaderboardSaga";
import tradingPostSaga from "@/features/bookExchange/tradingPostSaga";

export default function* rootSaga() {
  yield all([
    call(authSaga),
    call(profileSaga),
    call(bookSaga),
    call(affiliateSaga),
    call(categorySaga),
    call(favoriteSaga),
    call(bookSearchSaga),
    call(commentSaga),
    call(commentReportSaga),
    call(postSaga),
    call(bookDropdownSaga),
    call(bookSearchPageSaga),
    call(categoryFilterSaga),
    call(badgeSaga),
    call(userBadgeSaga),
    call(eventSaga),
    call(leaderboardSaga),
    call(tradingPostSaga),
  ]);
}

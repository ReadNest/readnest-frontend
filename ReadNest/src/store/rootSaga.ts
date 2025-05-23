import affiliateSaga from "@/features/affiliate/affiliateSaga";
import authSaga from "@/features/auth/authSaga";
import bookSaga from "@/features/book/bookSaga";
import categorySaga from "@/features/category/categorySaga";
import profileSaga from "@/features/profile/profileSaga";
import { all, call } from "redux-saga/effects";

export default function* rootSaga() {
  yield all([
    call(authSaga),
    call(profileSaga),
    call(bookSaga),
    call(affiliateSaga),
    call(categorySaga),
  ]);
}

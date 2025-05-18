import affiliateSaga from "@/features/affiliate/affiliateSaga";
import authSaga from "@/features/auth/authSaga";
import bookSaga from "@/features/book/bookSaga";
import { all, call } from "redux-saga/effects";

export default function* rootSaga() {
  yield all([call(authSaga), call(bookSaga), call(affiliateSaga)]);
}

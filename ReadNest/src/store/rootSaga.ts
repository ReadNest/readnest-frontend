import authSaga from "@/features/auth/authSaga";
import profileSaga from "@/features/profile/profileSaga";
import { all, call } from "redux-saga/effects";

export default function* rootSaga() {
  yield all([
    call(authSaga),
    call(profileSaga),
  ]);
}

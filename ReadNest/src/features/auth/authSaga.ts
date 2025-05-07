import { call, put, takeLatest } from "redux-saga/effects";
import { loginFailure, loginRequest, loginSuccess } from "./authSlice";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { LoginRequest, TokenResponseApiResponse } from "@/api/@types";
import client from "@/lib/api/axiosClient";
import { setDetailErrors, setMessage } from "@/store/error/errorSlice";

function* handleLogin(action: PayloadAction<LoginRequest>) {
  try {
    yield put(loginRequest());

    const res: TokenResponseApiResponse = yield call(() =>
      client.api.v1.auth.login
        .post({ body: action.payload })
        .then((r) => r.body)
    );

    yield put(setMessage(res.message ?? ""));

    if (res.success && res.data?.accessToken) {
      yield put(loginSuccess(res.data));
    } else {
      yield put(loginFailure());
      yield put(setDetailErrors(res.listDetailError ?? []));
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    yield put(setMessage(error.message));
  }
}

export default function* authSaga() {
  yield takeLatest(loginRequest.type, handleLogin);
}

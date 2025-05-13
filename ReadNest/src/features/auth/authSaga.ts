import { call, put, takeLatest } from "redux-saga/effects";
import {
  loginFailure,
  loginRequest,
  loginStart,
  loginSuccess,
  registerFailure,
  registerRequest,
  registerStart,
  registerSuccess,
  resetInitialRegisterState,
} from "./authSlice";
import type { PayloadAction } from "@reduxjs/toolkit";
import type {
  LoginRequest,
  RegisterRequest,
  StringApiResponse,
  TokenResponseApiResponse,
} from "@/api/@types";
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

    yield put(
      setMessage({ message: res.message ?? "", messageId: res.messageId ?? "" })
    );

    if (res.success && res.data?.accessToken) {
      yield put(loginSuccess(res.data));
      yield put(resetInitialRegisterState());
    } else {
      yield put(loginFailure());
      yield put(setDetailErrors(res.listDetailError ?? []));
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const errBody = error?.response.data || {};
    yield put(
      setMessage({
        message: errBody.message ?? "",
        messageId: errBody.messageId ?? "",
      })
    );
    yield put(setDetailErrors(errBody.listDetailError ?? []));
    yield put(loginFailure());
  }
}

function* handleRegister(action: PayloadAction<RegisterRequest>) {
  try {
    yield put(registerRequest());

    const res: StringApiResponse = yield call(async () => {
      const response = await client.api.v1.auth.register.post({
        body: action.payload,
      });

      return response.body;
    });

    yield put(
      setMessage({ message: res.message ?? "", messageId: res.messageId ?? "" })
    );

    if (res.success) {
      yield put(registerSuccess());
    } else {
      yield put(registerFailure());
      yield put(setDetailErrors(res.listDetailError ?? []));
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const errBody = error?.response?.data || {};
    yield put(
      setMessage({
        message: errBody.message ?? "",
        messageId: errBody.messageId ?? "",
      })
    );
    yield put(setDetailErrors(errBody.listDetailError ?? []));
    yield put(registerFailure());
  }
}

export default function* authSaga() {
  yield takeLatest(loginStart.type, handleLogin);
  yield takeLatest(registerStart.type, handleRegister);
}

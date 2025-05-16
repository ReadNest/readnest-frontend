import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchUserLoginStart,
  loginFailure,
  loginRequest,
  loginStart,
  loginSuccess,
  registerFailure,
  registerRequest,
  registerStart,
  registerSuccess,
  resetInitialRegisterState,
  setUser,
} from "./authSlice";
import type { PayloadAction } from "@reduxjs/toolkit";
import type {
  GetUserResponseApiResponse,
  LoginRequest,
  RegisterRequest,
  StringApiResponse,
  TokenResponseApiResponse,
} from "@/api/@types";
import client from "@/lib/api/axiosClient";
import { setDetailErrors, setMessage } from "@/store/error/errorSlice";
import { jwtDecode } from "jwt-decode";

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

      yield call(fetchUserLogin, {
        type: fetchUserLoginStart.type,
        payload: res.data.accessToken,
      });
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

function* fetchUserLogin(action: PayloadAction<string>) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const token: any = jwtDecode(action.payload);
    const nameIdentifier =
      token[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
      ];

    const profile: GetUserResponseApiResponse = yield call(() =>
      client.api.v1.users._userId(nameIdentifier ?? "").$get()
    );

    if (profile.success) {
      yield put(setUser(profile.data ?? {}));
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error(error);
  }
}

export default function* authSaga() {
  yield takeLatest(loginStart.type, handleLogin);
  yield takeLatest(registerStart.type, handleRegister);
  yield takeLatest(fetchUserLoginStart.type, fetchUserLogin);
}

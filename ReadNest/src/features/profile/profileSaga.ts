/* eslint-disable @typescript-eslint/no-explicit-any */
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  fetchUserProfileFailure,
  fetchUserProfileRequested,
  fetchUserProfileStart,
  fetchUserProfileSuccess,
  setIsLoading,
} from "./profileSlice";
import { call, put, takeLatest } from "redux-saga/effects";
import type { GetUserProfileResponseApiResponse } from "@/api/@types";
import client from "@/lib/api/axiosClient";
import { setDetailErrors, setMessage } from "@/store/error/errorSlice";
import {
  updateProfileFailure,
  updateProfileRequested,
  updateProfileStart,
  updateProfileSuccess,
} from "./profileSlice";
import type { UpdateUserRequest } from "@/api/@types";
import { toast } from "react-toastify";

function* fetchUserProfile(action: PayloadAction<string>) {
  try {
    const userName = action.payload;
    yield put(fetchUserProfileStart());
    const response: GetUserProfileResponseApiResponse = yield call(() =>
      client.api.v1.users.username._userName(userName).$get()
    );
    yield put(fetchUserProfileSuccess(response));
  } catch (error: any) {
    const errBody = error?.response.data || {};
    yield put(
      setMessage({
        message: errBody.message ?? "",
        messageId: errBody.messageId ?? "",
      })
    );
    yield put(setDetailErrors(errBody.listDetailError ?? []));
    yield put(fetchUserProfileFailure());
  }
}

function* updateProfile(action: PayloadAction<UpdateUserRequest>) {
  try {
    yield put(updateProfileStart());
    const response: { data: string; success: boolean } = yield call(() =>
      client.api.v1.users.profile.$put({ body: action.payload })
    );
    if (response.success) {
      console.log("response", action.payload);
      yield put(updateProfileSuccess(action.payload));
      if (action.payload?.avatarUrl) {
        toast.success("Cập nhật ảnh đại diện thành công!");
      } else {
        toast.success("Cập nhật hồ sơ thành công!");
      }
    }
  } catch (error: any) {
    const errBody = error?.response?.data || {};
    yield put(
      setMessage({
        message: errBody.message ?? "",
        messageId: errBody.messageId ?? "",
      })
    );
    yield put(setDetailErrors(errBody.listDetailError ?? []));
    yield put(updateProfileFailure());
  } finally {
    yield put(setIsLoading(false));
  }
}

export default function* profileSaga() {
  yield takeLatest(fetchUserProfileRequested.type, fetchUserProfile);
  yield takeLatest(updateProfileRequested.type, updateProfile);
}


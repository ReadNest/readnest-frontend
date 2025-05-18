import type { PayloadAction } from "@reduxjs/toolkit";
import { fetchUserProfileFailure, fetchUserProfileRequested, fetchUserProfileStart, fetchUserProfileSuccess } from "./profileSlice";
import { call, put, takeLatest } from "redux-saga/effects";
import type { GetUserProfileResponseApiResponse } from "@/api/@types";
import client from "@/lib/api/axiosClient";
import { setDetailErrors, setMessage } from "@/store/error/errorSlice";

function* fetchUserProfile(action: PayloadAction<string>) {
    try {
        const userName = action.payload;
        yield put(fetchUserProfileStart());
        const response: GetUserProfileResponseApiResponse = yield call(() =>
            client.api.v1.users.username._userName(userName).$get()
        );
                console.log("API response:", response); // Thêm dòng này
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

export default function* profileSaga() {
    yield takeLatest(fetchUserProfileRequested.type, fetchUserProfile);
}
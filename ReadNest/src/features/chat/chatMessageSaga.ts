import type { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import { fetchRecentChattersFailure, fetchRecentChattersRequested, fetchRecentChattersStart, fetchRecentChattersSuccess } from "./chatMessageSlice";
import type { RecentChatterResponse } from "@/api/@types";
import client from "@/lib/api/axiosClient";
import { setDetailErrors, setMessage } from "@/store/error/errorSlice";

function* fetchRecentChatters(action: PayloadAction<string>) {
    try {
        yield put(fetchRecentChattersStart());
        const response: { data: RecentChatterResponse[]; success: boolean } = yield call(() =>
            client.api.v1.ChatMessages.get_all_chatters_by_user_id._id(action.payload).$get()
        );
        if (response.success) {
            yield put(fetchRecentChattersSuccess(response.data));
            return;
        } else {
            yield put(fetchRecentChattersFailure());
        }
    } catch (error: any) {
        const errBody = error?.response.data || {};
        yield put(
            setMessage({
                message: errBody.message ?? "",
                messageId: errBody.messageId ?? "",
            })
        );
        yield put(setDetailErrors(errBody.listDetailError ?? []));
        yield put(fetchRecentChattersFailure());
    }
}

export default function* chatMessageSaga() {
  yield takeLatest(fetchRecentChattersRequested.type, fetchRecentChatters);
}
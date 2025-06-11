import { call, put, takeLatest } from "redux-saga/effects";
import { fetchBadgesFailure, fetchBadgesRequested, fetchBadgesStart, fetchBadgesSuccess } from "./badgeSlice";
import type { GetBadgeResponse } from "@/api/@types";
import client from "@/lib/api/axiosClient";
import { setDetailErrors, setMessage } from "@/store/error/errorSlice";

function* fetchAvailableBagdes() {
    try {
        yield put(fetchBadgesStart());
        const response: { data: GetBadgeResponse[], success: boolean } = yield call(() =>
            client.api.v1.Badge.$get()
        );
        if (response.success) {
            yield put(fetchBadgesSuccess(response.data));
        } else {
            yield put(fetchBadgesFailure());
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
        yield put(fetchBadgesFailure());
    }
}

export default function* badgeSaga() {
    yield takeLatest(fetchBadgesRequested.type, fetchAvailableBagdes);
}
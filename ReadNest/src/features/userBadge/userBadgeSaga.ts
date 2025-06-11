import { call, put, takeLatest } from "redux-saga/effects";
import client from "@/lib/api/axiosClient";
import { setDetailErrors, setMessage } from "@/store/error/errorSlice";
import { selectedNewBadgeFailure, selectedNewBadgeRequest, selectedNewBadgeStart, selectedNewBadgeSuccess } from "./userBadgeSlice";
import type { PayloadAction } from "@reduxjs/toolkit";
import { updateCurrentBadge } from "../profile/profileSlice";

function* selectNewBadge(action: PayloadAction<{ userId: string, badgeId: string }>) {
    try {
        yield put(selectedNewBadgeStart());
        // Giả sử bạn đã có userId và badgeId từ action payload hoặc state
        const { userId, badgeId } = action.payload;
        const response: { data: string, success: boolean } = yield call(() =>
            client.api.v1.UserBadges.select_user_badge.$post({
            query: { userId, badgeId }
            })
        );
        if (response.success) {
            yield put(selectedNewBadgeSuccess(badgeId));
            yield put (updateCurrentBadge(badgeId));
        } else {
            yield put(selectedNewBadgeFailure());
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
            yield put(selectedNewBadgeFailure());
    }
}

export default function* userBadgeSaga() {
    yield takeLatest(selectedNewBadgeRequest.type, selectNewBadge);
}
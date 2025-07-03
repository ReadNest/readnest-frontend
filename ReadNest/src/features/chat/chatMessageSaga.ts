import type { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import { fetchNewChatterByIdFailure, fetchNewChatterByIdRequested, fetchNewChatterByIdStart, fetchNewChatterByIdSuccess, fetchNewChatterRequested, fetchNewChatterStart, fetchNewChatterSuccess, fetchOldMessagesFailure, fetchOldMessagesRequested, fetchOldMessagesStart, fetchOldMessagesSuccess, fetchRecentChattersFailure, fetchRecentChattersRequested, fetchRecentChattersStart, fetchRecentChattersSuccess } from "./chatMessageSlice";
import type { ChatMessageCacheModel, RecentChatterResponse } from "@/api/@types";
import client from "@/lib/api/axiosClient";
import { setDetailErrors, setMessage } from "@/store/error/errorSlice";
import { toast } from "react-toastify";

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

function* fetchOldMessages(action: PayloadAction<{ userAId: string; userBId: string }>) {
    // Implement fetching old messages logic here
    try {
        yield put(fetchOldMessagesStart());
        const { userAId, userBId } = action.payload;
        const response: { data: ChatMessageCacheModel[]; success: boolean } = yield call(() =>
            client.api.v1.ChatMessages.get_full_conversation
                ._userAId(userAId)
                ._userBId(userBId)
                .$get()
        );
        if (response.success) {
            // Mặc định là lấy userAId làm CurrentUser (AuthUser)
            // Nếu userAId === userBId thì lấy userAId làm otherUserId (Tự mình trò chuyện với chính mình)
            // ...
            const otherUserId = userAId === userBId
                ? userAId // Trường hợp tự trò chuyện với chính mình
                : (
                    // Trường hợp nhắn tin với người khác
                    // Lấy message đầu tiên để xác định ai là OtherUser ai là CurrentUser (AuthUser)
                    response.data[0]?.senderId === userAId 
                        ? response.data[0]?.receiverId  //Nếu sender là userA thì otherUser là receiver
                        : response.data[0]?.senderId    // Nếu sender là userB thì otherUser là sender
                ) ?? userBId; // Dự phòng nếu không có message nào
            yield put(fetchOldMessagesSuccess({
                userId: otherUserId,
                messages: response.data,
            }));
            return;
        } else {
            yield put(fetchOldMessagesFailure());
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
        yield put(fetchOldMessagesFailure());
    }
}

function* fetchNewChatter(action: PayloadAction<string>) {
    try {
        yield put(fetchNewChatterStart());
        // console.log("Fetching new chatter for username:", action.payload);
        const response: { data: RecentChatterResponse; success: boolean } = yield call(() =>
            client.api.v1.ChatMessages.get_chatter_by_user_name._senderUserName(action.payload).$get()
        );
        if (response.success) {
            yield put(fetchNewChatterSuccess(response.data));
            return;
        } else {
            yield put(fetchRecentChattersFailure());
            toast.info("No user found with that username");
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

function* fetchNewChatterById(action: PayloadAction<string>) {
    try {
        yield put(fetchNewChatterByIdStart());
        // console.log("Fetching new chatter for username:", action.payload);
        const response: { data: RecentChatterResponse; success: boolean } = yield call(() =>
            client.api.v1.ChatMessages.get_chatter_by_user_id._senderId(action.payload).$get()
        );
        if (response.success) {
            yield put(fetchNewChatterByIdSuccess(response.data));
            return;
        } else {
            yield put(fetchNewChatterByIdFailure());
            toast.info("No user found with that username");
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
        yield put(fetchNewChatterByIdFailure());
    }
}

export default function* chatMessageSaga() {
    yield takeLatest(fetchRecentChattersRequested.type, fetchRecentChatters);
    yield takeLatest(fetchOldMessagesRequested.type, fetchOldMessages);
    yield takeLatest(fetchNewChatterRequested.type, fetchNewChatter);
    yield takeLatest(fetchNewChatterByIdRequested.type, fetchNewChatterById);
}
import { call, put, takeLatest } from "redux-saga/effects";
import { addCommentRequested, addCommentStart, addCommentSuccess, fetchCommentsRequested, fetchCommentsStart, fetchCommentsSuccess, likeCommentRequested, likeCommentStart, likeCommentSuccess, unlikeCommentSuccess } from "./commentSlice";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { CreateCommentLikeRequest, CreateCommentRequest, GetCommentResponse } from "@/api/@types";
import client from "@/lib/api/axiosClient";
import { setDetailErrors, setMessage } from "@/store/error/errorSlice";
import { fetchUserProfileFailure } from "../profile/profileSlice";
import { toast } from "react-toastify";

function* fetchComments(action: PayloadAction<string>) {
    try {
        yield put(fetchCommentsStart());
        const response: GetCommentResponse[] = yield call(() =>
            client.api.v1.Comment._bookId(action.payload).$get()
        );
        yield put(fetchCommentsSuccess(response));
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

function* addComment(action: PayloadAction<CreateCommentRequest>) {
    try {
        yield put(addCommentStart());
        const response: { data: GetCommentResponse; success: boolean } = yield call(() =>
            client.api.v1.Comment.$post({ body: action.payload })
        );
        // console.log("Add comment request response:", response);
        if (response.success) {
            yield put(addCommentSuccess(response.data));
            toast.success("Bạn đã bình luận thành công!");
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
        yield put(fetchUserProfileFailure());
    }
}

function* likeComment(action: PayloadAction<CreateCommentLikeRequest>) {
    try {
        yield put(likeCommentStart());
        const response: { success: boolean; data?: string } = yield call(() =>
            client.api.v1.Comment.like.$post({ body: action.payload })
        );
        // console.log("Like comment request response:", response);
        if (response.success) {
            // Update the comment's like count in the state
            if (response.data === "Like successfully") {
                yield put(likeCommentSuccess({ commentId: action.payload.commentId, userId: action.payload.userId }));
                toast.success("Bạn đã thích bình luận này!");
            }
            else if (response.data === "Unlike successfully") {
                yield put(unlikeCommentSuccess({ commentId: action.payload.commentId, userId: action.payload.userId }));
                toast.success("Bạn đã bỏ thích bình luận này!");
            }
        }

    }
    catch (error: any) {
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


export default function* commentSaga() {
    yield takeLatest(fetchCommentsRequested.type, fetchComments);
    yield takeLatest(addCommentRequested.type, addComment);
    yield takeLatest(likeCommentRequested.type, likeComment);
}
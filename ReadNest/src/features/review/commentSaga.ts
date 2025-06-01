import { call, put, takeLatest } from "redux-saga/effects";
import { addCommentRequested, addCommentStart, addCommentSuccess, deleteCommentRequested, deleteCommentStart, deleteCommentSuccess, fetchCommentsRequested, fetchCommentsStart, fetchCommentsSuccess, fetchTop3MostLikedCommentsRequested, fetchTop3MostLikedCommentsStart, fetchTop3MostLikedCommentsSuccess, fetchTop3RecentCommentsFailure, fetchTop3RecentCommentsRequested, fetchTop3RecentCommentsStart, fetchTop3RecentCommentsSuccess, likeCommentRequested, likeCommentStart, likeCommentSuccess, reportCommentFailure, reportCommentRequested, reportCommentStart, reportCommentSuccess, unlikeCommentSuccess, updateCommentRequested, updateCommentStart, updateCommentSuccess } from "./commentSlice";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { CreateCommentLikeRequest, CreateCommentReportRequest, CreateCommentRequest, GetCommentResponse, UpdateCommentRequest } from "@/api/@types";
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

function* updateComment(action: PayloadAction<UpdateCommentRequest>) {
    try {
        yield put(updateCommentStart());
        const response: { data: string; success: boolean } = yield call(() =>
            client.api.v1.Comment.$put({ body: action.payload })
        );
        console.log("Update comment request response:", response);
        if (response.success) {
            yield put(updateCommentSuccess({ commentId: action.payload.commentId, content: action.payload.content }));
            toast.success("Bạn đã cập nhật bình luận thành công!");
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

function* deleteComment(action: PayloadAction<string>) {
    try {
        yield put(deleteCommentStart());
        const response: { success: boolean } = yield call(() =>
            client.api.v1.Comment._commentId(action.payload).$delete()
        );
        // console.log("Delete comment request response:", response);
        if (response.success) {
            yield put(deleteCommentSuccess({ commentId: action.payload }));
            toast.success("Bạn đã xóa bình luận thành công!");
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

function* reportComment(action: PayloadAction<CreateCommentReportRequest>) {
    try {
        yield put(reportCommentStart());
        const response: { success: boolean } = yield call(() =>
            client.api.v1.CommentReport.$post({ body: action.payload })
        );
        if (response.success) {
            yield put(reportCommentSuccess());
            toast.success("Bạn đã báo cáo bình luận thành công! Admin sẽ xem xét và xử lý trong thời gian sớm nhất.");
        } else {
            yield put(reportCommentFailure());
            toast.error("Báo cáo bình luận không thành công. Vui lòng thử lại sau.");
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

function* fetchTop3RecentCommentsByUser(action: PayloadAction<string>) {
    try {
        yield put(fetchTop3RecentCommentsStart());
        const response: { data: GetCommentResponse[]; success: boolean } = yield call(() =>
            client.api.v1.Comment.top_3_recent_comments._userName(action.payload).$get()
        );
        if (response.success) {
            yield put(fetchTop3RecentCommentsSuccess(response.data));
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
        yield put(fetchTop3RecentCommentsFailure());
    }
}

function* fetchTop3MostLikedComments() {
    try {
        yield put(fetchTop3MostLikedCommentsStart());
        const response: { data: GetCommentResponse[]; success: boolean } = yield call(() =>
            client.api.v1.Comment.top_3_most_liked_comments.$get()
        );
        if (response.success) {
            yield put(fetchTop3MostLikedCommentsSuccess(response.data));
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
        yield put(fetchTop3RecentCommentsFailure());
    }
}

export default function* commentSaga() {
    yield takeLatest(fetchCommentsRequested.type, fetchComments);
    yield takeLatest(addCommentRequested.type, addComment);
    yield takeLatest(likeCommentRequested.type, likeComment);
    yield takeLatest(updateCommentRequested.type, updateComment);
    yield takeLatest(deleteCommentRequested.type, deleteComment);
    yield takeLatest(reportCommentRequested.type, reportComment);
    yield takeLatest(fetchTop3RecentCommentsRequested.type, fetchTop3RecentCommentsByUser);
    yield takeLatest(fetchTop3MostLikedCommentsRequested.type, fetchTop3MostLikedComments);
}
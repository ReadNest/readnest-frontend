import { call, put, takeLatest } from "redux-saga/effects";
import {
  banCommentFailure,
  banCommentRequested,
  banCommentStart,
  banCommentSuccess,
  fetchReportedCommentsFailure,
  fetchReportedCommentsRequested,
  fetchReportedCommentsStart,
  fetchReportedCommentsSuccess,
  ignoreCommentFailure,
  ignoreCommentRequested,
  ignoreCommentStart,
  ignoreCommentSuccess,
} from "./commentReportSlice";
import type { GetReportedCommentsResponse } from "@/api/@types";
import client from "@/lib/api/axiosClient";
import { setDetailErrors, setMessage } from "@/store/error/errorSlice";
import type { PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

function* fetchReportedComments() {
  try {
    yield put(fetchReportedCommentsStart());
    const response: { data: GetReportedCommentsResponse[]; success: boolean } =
      yield call(() => client.api.v1.Comment.pending_reported_comments.$get());
    if (response.success) {
      yield put(fetchReportedCommentsSuccess(response.data));
    } else {
      yield put(fetchReportedCommentsFailure());
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
    yield put(fetchReportedCommentsFailure());
  }
}

function* banComment(action: PayloadAction<string>) {
  try {
    yield put(banCommentStart());
    const response: { success: boolean } = yield call(() =>
      client.api.v1.CommentReport.approve._commentId(action.payload).$post()
    );
    if (response.success) {
      yield put(banCommentSuccess(action.payload));
      toast.success("Bình luận đã bị cấm thành công!");
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
    yield put(banCommentFailure());
  }
}

function* ignoreComment(action: PayloadAction<string>) {
  try {
    yield put(ignoreCommentStart());
    const response: { success: boolean } = yield call(() =>
      client.api.v1.CommentReport.reject._commentId(action.payload).$post()
    );
    if (response.success) {
      yield put(ignoreCommentSuccess(action.payload));
      toast.success("Bình luận đã được bỏ qua thành công!");
    } else {
      yield put(ignoreCommentFailure());
      toast.error("Đã xảy ra lỗi! Vui lòng thử lại sau.");
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
    yield put(ignoreCommentFailure());
  }
}

export default function* commentReportSaga() {
  yield takeLatest(fetchReportedCommentsRequested.type, fetchReportedComments);
  yield takeLatest(banCommentRequested.type, banComment);
  yield takeLatest(ignoreCommentRequested.type, ignoreComment);
}

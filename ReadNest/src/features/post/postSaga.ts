import { call, put, takeLatest } from "redux-saga/effects";
import {
    fetchPostsRequested,
    fetchPostsStart,
    fetchPostsSuccess,
    fetchPostsFailure,
    fetchPostsByUserIdRequested,
    fetchPostsByUserIdStart,
    fetchPostsByUserIdSuccess,
    fetchPostsByUserIdFailure,
    fetchPostsByBookIdRequested,
    fetchPostsByBookIdStart,
    fetchPostsByBookIdSuccess,
    fetchPostsByBookIdFailure,
    fetchTopLikedPostsRequested,
    fetchTopLikedPostsStart,
    fetchTopLikedPostsSuccess,
    fetchTopLikedPostsFailure,
    fetchTopViewedPostsRequested,
    fetchTopViewedPostsStart,
    fetchTopViewedPostsSuccess,
    fetchTopViewedPostsFailure,
    searchPostsByTitleRequested,
    searchPostsByTitleStart,
    searchPostsByTitleSuccess,
    searchPostsByTitleFailure,
    createPostRequested,
    createPostStart,
    createPostSuccess,
    createPostFailure,
    likePostRequested,
    likePostStart,
    likePostSuccess,
    unlikePostSuccess,
    likePostFailure,
} from "./postSlice";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { CreatePostRequest, GetPostResponse, LikePostRequest } from "@/api/@types";
import client from "@/lib/api/axiosClient";
import { toast } from "react-toastify";
import { setMessage, setDetailErrors } from "@/store/error/errorSlice";

function* fetchPosts() {
    try {
        yield put(fetchPostsStart());
        const response: GetPostResponse[] = yield call(() => client.api.v1.posts.$get());
        yield put(fetchPostsSuccess(response));
    } catch (error: any) {
        const errBody = error?.response?.data || {};
        yield put(setMessage({ message: errBody.message ?? "", messageId: errBody.messageId ?? "" }));
        yield put(setDetailErrors(errBody.listDetailError ?? []));
        yield put(fetchPostsFailure());
    }
}

function* fetchPostsByUserId(action: PayloadAction<string>) {
    try {
        yield put(fetchPostsByUserIdStart());
        const response: GetPostResponse[] = yield call(() =>
            client.api.v1.posts.user._userId(action.payload).$get()
        );
        yield put(fetchPostsByUserIdSuccess(response));
    } catch (error: any) {
        const errBody = error?.response?.data || {};
        yield put(setMessage({ message: errBody.message ?? "", messageId: errBody.messageId ?? "" }));
        yield put(setDetailErrors(errBody.listDetailError ?? []));
        yield put(fetchPostsByUserIdFailure());
    }
}

function* fetchPostsByBookId(action: PayloadAction<string>) {
    try {
        yield put(fetchPostsByBookIdStart());
        const response: GetPostResponse[] = yield call(() =>
            client.api.v1.posts.book._bookId(action.payload).$get()
        );
        yield put(fetchPostsByBookIdSuccess(response));
    } catch (error: any) {
        const errBody = error?.response?.data || {};
        yield put(setMessage({ message: errBody.message ?? "", messageId: errBody.messageId ?? "" }));
        yield put(setDetailErrors(errBody.listDetailError ?? []));
        yield put(fetchPostsByBookIdFailure());
    }
}

function* fetchTopLikedPosts(action: PayloadAction<number>) {
    try {
        yield put(fetchTopLikedPostsStart());
        const response: GetPostResponse[] = yield call(() =>
            client.api.v1.posts.top_liked._count(action.payload).$get()
        );
        yield put(fetchTopLikedPostsSuccess(response));
    } catch (error: any) {
        const errBody = error?.response?.data || {};
        yield put(setMessage({ message: errBody.message ?? "", messageId: errBody.messageId ?? "" }));
        yield put(setDetailErrors(errBody.listDetailError ?? []));
        yield put(fetchTopLikedPostsFailure());
    }
}

function* fetchTopViewedPosts(action: PayloadAction<number>) {
    try {
        yield put(fetchTopViewedPostsStart());
        const response: GetPostResponse[] = yield call(() =>
            client.api.v1.posts.top_viewed._count(action.payload).$get()
        );
        yield put(fetchTopViewedPostsSuccess(response));
    } catch (error: any) {
        const errBody = error?.response?.data || {};
        yield put(setMessage({ message: errBody.message ?? "", messageId: errBody.messageId ?? "" }));
        yield put(setDetailErrors(errBody.listDetailError ?? []));
        yield put(fetchTopViewedPostsFailure());
    }
}

function* searchPostsByTitle(action: PayloadAction<string>) {
    try {
        yield put(searchPostsByTitleStart());

        const response: GetPostResponse[] = yield call(() =>
            client.api.v1.posts.search.$get({ query: { keyword: action.payload } })
        );

        yield put(searchPostsByTitleSuccess(response));
    } catch (error: any) {
        const errBody = error?.response?.data || {};
        yield put(setMessage({ message: errBody.message ?? "", messageId: errBody.messageId ?? "" }));
        yield put(setDetailErrors(errBody.listDetailError ?? []));
        yield put(searchPostsByTitleFailure());
    }
}

function* createPost(action: PayloadAction<CreatePostRequest>) {
    try {
        yield put(createPostStart());
        const response: GetPostResponse = yield call(() => client.api.v1.posts.$post({ body: action.payload }));
        toast.success("Đăng bài thành công!");
        yield put(createPostSuccess(response));
    } catch (error: any) {
        const errBody = error?.response?.data || {};
        yield put(setMessage({ message: errBody.message ?? "", messageId: errBody.messageId ?? "" }));
        yield put(setDetailErrors(errBody.listDetailError ?? []));
        yield put(createPostFailure());
    }
}

function* likePost(action: PayloadAction<LikePostRequest>) {
    try {
        yield put(likePostStart());
        const response: boolean = yield call(() => client.api.v1.posts.like.$post({ body: action.payload }));
        if (response) {
            yield put(likePostSuccess({ postId: action.payload.postId ?? "", userId: action.payload.userId ?? ""}));
        } else {
            yield put(unlikePostSuccess({ postId: action.payload.postId ?? "", userId: action.payload.userId ?? ""}));
        }
    } catch (error: any) {
        const errBody = error?.response?.data || {};
        yield put(setMessage({ message: errBody.message ?? "", messageId: errBody.messageId ?? "" }));
        yield put(setDetailErrors(errBody.listDetailError ?? []));
        yield put(likePostFailure());
    }
}

export default function* postSaga() {
    yield takeLatest(fetchPostsRequested.type, fetchPosts);
    yield takeLatest(fetchPostsByUserIdRequested.type, fetchPostsByUserId);
    yield takeLatest(fetchPostsByBookIdRequested.type, fetchPostsByBookId);
    yield takeLatest(fetchTopLikedPostsRequested.type, fetchTopLikedPosts);
    yield takeLatest(fetchTopViewedPostsRequested.type, fetchTopViewedPosts);
    yield takeLatest(searchPostsByTitleRequested.type, searchPostsByTitle);
    yield takeLatest(createPostRequested.type, createPost);
    yield takeLatest(likePostRequested.type, likePost);
}

 

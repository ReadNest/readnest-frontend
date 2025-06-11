import { call, put, takeLatest } from "redux-saga/effects";
import client from "@/lib/api/axiosClient";
import type {
  CreatePostRequest,
  GetPostResponseApiResponse,
  GetPostResponsePagingResponseApiResponse,
  StringApiResponse,
  LikePostRequest,
  UpdatePostRequest,
} from "@/api/@types";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { PagingRequest } from "@/lib/api/base/types";

import {
  createPostStart,
  likePostStart,
  fetchPostsStart,
  fetchPostsByUserIdStart,
  fetchPostsByBookIdStart,
  fetchTopLikedPostsStart,
  searchPostsByTitleStart,
  getPostByIdStart,
  setLoading,
  setSuccess,
  setPosts,
  setPostsV1,
  addPost,
  setPagingInfo,
  setSelectedPost,
  likePost,
  unlikePost,
  updatePost,
  deletePost,
  updatePostStart,
  deletePostRequest,
  setCreatePostSuccess,
  setUpdatePostSuccess,
  setDeletePostSuccess,
} from "./postSlice";

import { setMessage, setDetailErrors } from "@/store/error/errorSlice";
import { toast } from "react-toastify";

// CREATE POST
function* handleCreatePost(action: PayloadAction<CreatePostRequest>) {
  try {
    yield put(setLoading(true));

    const res: GetPostResponseApiResponse = yield call(() =>
      client.api.v1.posts.post({ body: action.payload }).then((r) => r.body)
    );

    yield put(
      setMessage({ message: res.message ?? "", messageId: res.messageId ?? "" })
    );

    if (res.success && res.data) {
      yield put(addPost(res.data));
      yield put(setCreatePostSuccess(true));
      toast.success("Tạo bài viết thành công!");
    } else {
      yield put(setCreatePostSuccess(false));
      yield put(setDetailErrors(res.listDetailError ?? []));
      toast.error("Tạo bài viết thất bại!");
    }
  } catch (error: any) {
    const errBody = error?.response?.data || {};
    yield put(setSuccess(false));
    yield put(
      setMessage({
        message: errBody.message ?? "Đã xảy ra lỗi",
        messageId: errBody.messageId ?? "",
      })
    );
    yield put(setDetailErrors(errBody.listDetailError ?? []));
    toast.error("Đã xảy ra lỗi khi tạo bài viết");
  } finally {
    yield put(setLoading(false));
  }
}

// LIKE POST
function* handleLikePost(action: PayloadAction<LikePostRequest>) {
    try {
      const res: StringApiResponse = yield call(() =>
        client.api.v1.posts.like.post({ body: action.payload }).then(r => r.body)
      );
  
      if (res.success) {
        if (res.data === "Like successfully") {
          yield put(likePost(action.payload));
        } else if (res.data === "Unlike successfully") {
          yield put(unlikePost(action.payload));
        }
      }
    } catch (error) {
      console.error(error);
    }
  }
  

// FETCH POSTS
function* fetchPosts(action: PayloadAction<PagingRequest>) {
  try {
    yield put(setLoading(true));

    const res: GetPostResponsePagingResponseApiResponse = yield call(() =>
      client.api.v1.posts
        .get({
          query: {
            PageIndex: action.payload.pageIndex,
            PageSize: action.payload.pageSize,
          },
        })
        .then((r) => r.body)
    );

    if (res.success && res.data) {
      yield put(setPosts(res.data.items ?? []));
      yield put(
        setPagingInfo({
          totalItems: res.data.totalItems,
          pageIndex: res.data.pageIndex,
          pageSize: res.data.pageSize,
        })
      );
      yield put(setSuccess(true));
    } else {
      yield put(setSuccess(false));
    }
  } catch (error) {
    console.error(error);
  } finally {
    yield put(setLoading(false));
  }
}

// FETCH BY USER
function* fetchPostsByUserId(action: PayloadAction<{ userId: any; paging: PagingRequest}>) {
  try {
    yield put(setLoading(true));
    const { userId, paging } = action.payload;

    const res: GetPostResponsePagingResponseApiResponse = yield call(() =>
        client.api.v1.posts.user._userId(userId)
            .get({
            query: {
                PageIndex: paging.pageIndex,
                PageSize: paging.pageSize,
            },
        }).then(r => r.body)
      );

    if (res.success && res.data) {
      yield put(setPostsV1(res.data.items ?? []));
      yield put(
        setPagingInfo({
          totalItems: res.data.totalItems,
          pageIndex: res.data.pageIndex,
          pageSize: res.data.pageSize,
        })
      );
      yield put(setSuccess(true));
    } else {
      yield put(setSuccess(false));
    }
  } catch (error) {
    console.error(error);
  } finally {
    yield put(setLoading(false));
  }
}

// FETCH BY BOOK ID
function* fetchPostsByBookId(action: PayloadAction<string>) {
  try {
    yield put(setLoading(true));
    const res: GetPostResponseApiResponse = yield call(() =>
      client.api.v1.posts.book._bookId(action.payload).get().then((r) => r.body)
    );

    if (res.success && res.data) {
      yield put(setPostsV1(Array.isArray(res.data) ? res.data : []));
      yield put(setSuccess(true));
    } else {
      yield put(setSuccess(false));
    }
  } catch (error) {
    console.error(error);
  } finally {
    yield put(setLoading(false));
  }
}

// SEARCH BY TITLE
function* searchPostsByTitle(action: PayloadAction<string>) {
  try {
    yield put(setLoading(true));
    const res: GetPostResponsePagingResponseApiResponse = yield call(() =>
      client.api.v1.posts.search.get({ query: { keyword: action.payload } }).then((r) => r.body)
    );

    if (res.success && res.data) {
      yield put(setPostsV1(res.data.items ?? []));
      yield put(setSuccess(true));
    } else {
      yield put(setSuccess(false));
    }
  } catch (error) {
    console.error(error);
  } finally {
    yield put(setLoading(false));
  }
}

// FETCH TOP LIKED POSTS
function* fetchTopLikedPosts(action: PayloadAction<number>) {
  try {
    yield put(setLoading(true));
    const count = action.payload;

    const res: GetPostResponsePagingResponseApiResponse = yield call(() =>
    client.api.v1.posts.top_liked._count(count).get().then(r => r.body)
    );

    if (res.success && res.data) {
      yield put(setPostsV1(res.data.items ?? []));
      yield put(setSuccess(true));
    } else {
      yield put(setSuccess(false));
    }
  } catch (error) {
    console.error(error);
  } finally {
    yield put(setLoading(false));
  }
}

// FETCH POST BY ID
function* getPostById(action: PayloadAction<string>) {
  try {
    yield put(setLoading(true));
    const res: GetPostResponseApiResponse = yield call(() =>
      client.api.v1.posts._postId(action.payload).get().then((r) => r.body)
    );

    if (res.success && res.data) {
      yield put(setSelectedPost(res.data));
      yield put(setSuccess(true));
    } else {
      yield put(setSelectedPost(null));
      yield put(setSuccess(false));
    }
  } catch (error) {
    yield put(setSelectedPost(null));
    console.error(error);
  } finally {
    yield put(setLoading(false));
  }
}

function* handleUpdatePost(action: PayloadAction<UpdatePostRequest>) {
    try {
      yield put(setLoading(true));
      const res: GetPostResponseApiResponse = yield call(() =>
        client.api.v1.posts.put({ body: action.payload }).then(r => r.body)
      );
  
      if (res.success && res.data) {
        yield put(updatePost(res.data));
        yield put(setUpdatePostSuccess(true));
        toast.success("Cập nhật bài viết thành công!");
      } else {
        yield put(setSuccess(false));
        toast.error("Cập nhật bài viết thất bại!");
      }
    } catch (error) {
      console.error(error);
      yield put(setUpdatePostSuccess(false));
      toast.error("Đã xảy ra lỗi khi cập nhật bài viết");
    } finally {
      yield put(setLoading(false));
    }
  }
  
  // DELETE POST
  function* handleDeletePost(action: PayloadAction<string>) {
    try {
      yield put(setLoading(true));
      const postId = action.payload;
      const res: StringApiResponse = yield call(() =>
        client.api.v1.posts._postId(postId).delete().then(r => r.body)
      );
  
      if (res.success) {
        yield put(deletePost(postId));
        yield put(setDeletePostSuccess(true));
        toast.success("Xóa bài viết thành công!");
      } else {
        yield put(setDeletePostSuccess(false));
        toast.error("Xóa bài viết thất bại!");
      }
    } catch (error) {
      console.error(error);
      yield put(setSuccess(false));
      toast.error("Đã xảy ra lỗi khi xóa bài viết");
    } finally {
      yield put(setLoading(false));
    }
  }

// ROOT SAGA
export default function* postSaga() {
  yield takeLatest(createPostStart.type, handleCreatePost);
  yield takeLatest(likePostStart.type, handleLikePost);
  yield takeLatest(fetchPostsStart.type, fetchPosts);
  yield takeLatest(fetchPostsByUserIdStart.type, fetchPostsByUserId);
  yield takeLatest(fetchPostsByBookIdStart.type, fetchPostsByBookId);
  yield takeLatest(searchPostsByTitleStart.type, searchPostsByTitle);
  yield takeLatest(fetchTopLikedPostsStart.type, fetchTopLikedPosts);
  yield takeLatest(getPostByIdStart.type, getPostById);
  yield takeLatest(updatePostStart.type, handleUpdatePost);
  yield takeLatest(deletePostRequest.type, handleDeletePost);
}

import { call, put, takeLatest } from "redux-saga/effects";
import type {
  ToggleFavoriteBookRequest,
  ToggleFavoriteBookResponseApiResponse,
  GetBookResponsePagingResponseApiResponse,
} from "@/api/@types";
import {
  getFavoritesStart,
  setFavorites,
  setLoading,
  setPagingInfo,
  setSuccess,
  toggleFavoriteStart,
} from "./favoriteSlice";
import client from "@/lib/api/axiosClient";
import { setDetailErrors, setMessage } from "@/store/error/errorSlice";
import type { PayloadAction } from "@reduxjs/toolkit";

function* toggleFavoriteSaga(action: PayloadAction<ToggleFavoriteBookRequest>) {
  try {
    yield put(setLoading(true));

    const res: ToggleFavoriteBookResponseApiResponse = yield call(() =>
      client.api.v1.favoriteBooks.toggle.post({ body: action.payload }).then((r) => r.body)
    );

    yield put(
      setMessage({
        message: res.message ?? "",
        messageId: res.messageId ?? "",
      })
    );

    if (res.success) {
      yield put(setSuccess(true));
    } else {
      yield put(setSuccess(false));
      yield put(setDetailErrors(res.listDetailError ?? []));
    }
  } catch (error: any) {
    const errBody = error?.response?.data || {};
    yield put(
      setMessage({
        message: errBody.message ?? "",
        messageId: errBody.messageId ?? "",
      })
    );
    yield put(setDetailErrors(errBody.listDetailError ?? []));
  } finally {
    yield put(setLoading(false));
  }
}

function* getFavoritesSaga(
  action: PayloadAction<{ userId: string; paging: { pageIndex: number; pageSize: number } }>
) {
  try {
    yield put(setLoading(true));

    const { userId, paging } = action.payload;

    const res: GetBookResponsePagingResponseApiResponse = yield call(() =>
      client.api.v1.favoriteBooks
        .favorites._userId(userId)
        .get({
          query: {
            PageIndex: paging.pageIndex,
            PageSize: paging.pageSize,
          },
        })
        .then((r) => r.body)
    );

    if (res.success && res.data) {
      yield put(setFavorites(res.data.items ?? []));
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
    console.error("Get favorites failed:", error);
  } finally {
    yield put(setLoading(false));
  }
}

export default function* favoriteSaga() {
  yield takeLatest(toggleFavoriteStart.type, toggleFavoriteSaga);
  yield takeLatest(getFavoritesStart.type, getFavoritesSaga);
}

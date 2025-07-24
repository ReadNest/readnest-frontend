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
  toggleFavoriteOptimistic,
  toggleFavoriteStart,
} from "./favoriteSlice";
import client from "@/lib/api/axiosClient";
import { setDetailErrors, setMessage } from "@/store/error/errorSlice";
import type { PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

function* toggleFavoriteSaga(action: PayloadAction<ToggleFavoriteBookRequest>) {
  try {
    // 1. Gọi optimistic update trước
    yield put(toggleFavoriteOptimistic({ bookId: action.payload.bookId ?? "" }));

    // 2. Sau đó mới gọi API
    yield put(setLoading(true));
    yield put(setSuccess(false));

    const res: ToggleFavoriteBookResponseApiResponse = yield call(() =>
      client.api.v1.favoriteBooks.toggle.post({ body: action.payload }).then((r) => r.body)
    );

    // 3. Xử lý response
    yield put(setMessage({ message: res.message ?? "Thao tác thành công", messageId: res.messageId ?? "" }));

    if (res.success && action.payload.userId) {
      yield put(getFavoritesStart({ userId: action.payload.userId, paging: { pageIndex: 1, pageSize: 100 } }));
      toast.success("Đã cập nhật yêu thích thành công!");
    } else {
      yield put(setSuccess(false));
      yield put(setDetailErrors(res.listDetailError ?? []));
      if (res.message == "Cannot add more favorite book.") {
        toast.info("Mua gói Premium để lưu yêu thích nhiều sách hơn.");
      }
      // Optional: rollback optimistic nếu lỗi
    }
  } catch (error: any) {
    yield put(setSuccess(false));
    const errBody = error?.response?.data || {};
    yield put(setMessage({ message: errBody.message ?? "Có lỗi xảy ra", messageId: errBody.messageId ?? "" }));
    yield put(setDetailErrors(errBody.listDetailError ?? []));
    toast.error(errBody.message || "Có lỗi xảy ra khi thực hiện thao tác");

    // Optional: rollback optimistic nếu cần
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

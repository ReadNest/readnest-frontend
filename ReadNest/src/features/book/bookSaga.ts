import type {
  CreateBookRequest,
  GetBookResponseApiResponse,
  GetBookResponsePagingResponseApiResponse,
  StringApiResponse,
} from "@/api/@types";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  createBookStart,
  fetchBooksStart,
  setBooks,
  setLoading,
  setPagingInfo,
  setSuccess,
  getBookByIdStart,
  setSelectedBook,
  fetchBooksStartV1,
  setBooksV1,
  deleteBookRequest,
  deleteBook,
} from "./bookSlice";
import { call, put, takeLatest } from "redux-saga/effects";
import client from "@/lib/api/axiosClient";
import { setDetailErrors, setMessage } from "@/store/error/errorSlice";
import type { PagingRequest } from "@/lib/api/base/types";

function* handleCreateBook(action: PayloadAction<CreateBookRequest>) {
  try {
    yield put(setLoading(true));

    const res: GetBookResponseApiResponse = yield call(() =>
      client.api.v1.books.post({ body: action.payload }).then((r) => r.body)
    );

    yield put(
      setMessage({ message: res.message ?? "", messageId: res.messageId ?? "" })
    );

    if (res.success && res.data) {
      yield put(setSuccess(true));
    } else {
      yield put(setSuccess(false));
      yield put(setDetailErrors(res.listDetailError ?? []));
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
  } finally {
    yield put(setLoading(false));
  }
}

function* fetchBooks(action: PayloadAction<PagingRequest>) {
  try {
    yield put(setLoading(true));

    const res: GetBookResponsePagingResponseApiResponse = yield call(() =>
      client.api.v1.books
        .get({
          query: {
            PageIndex: action.payload.pageIndex,
            PageSize: action.payload.pageSize,
          },
        })
        .then((r) => r.body)
    );

    if (res.success && res.data) {
      yield put(setSuccess(true));
      yield put(setBooks(res.data.items ?? []));
      yield put(
        setPagingInfo({
          totalItems: res.data.totalItems,
          pageIndex: res.data.pageIndex,
          pageSize: res.data.pageSize,
        })
      );
    } else {
      yield put(setSuccess(false));
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error(error);
  } finally {
    yield put(setLoading(false));
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function* getBookById(action: PayloadAction<any>) {
  try {
    yield put(setLoading(true));

    const res: GetBookResponseApiResponse = yield call(() =>
      client.api.v1.books
        ._bookId(action.payload)
        .get()
        .then((r) => r.body)
    );

    if (res.success && res.data) {
      yield put(setSelectedBook(res.data));
      yield put(setSuccess(true));
    } else {
      yield put(setSelectedBook(null));
      yield put(setSuccess(false));
      yield put(setDetailErrors(res.listDetailError ?? []));
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const errBody = error?.response?.data || {};
    yield put(setSelectedBook(null));
    yield put(setSuccess(false));
    yield put(
      setMessage({
        message: errBody.message ?? "Đã xảy ra lỗi",
        messageId: errBody.messageId ?? "",
      })
    );
    yield put(setDetailErrors(errBody.listDetailError ?? []));
  } finally {
    yield put(setLoading(false));
  }
}

function* fetchBooksV1(action: PayloadAction<PagingRequest>) {
  try {
    yield put(setLoading(true));

    const res: GetBookResponsePagingResponseApiResponse = yield call(() =>
      client.api.v1.books
        .get({
          query: {
            PageIndex: action.payload.pageIndex,
            PageSize: action.payload.pageSize,
          },
        })
        .then((r) => r.body)
    );

    if (res.success && res.data) {
      yield put(setSuccess(true));
      yield put(setBooksV1(res.data.items ?? []));
      yield put(
        setPagingInfo({
          totalItems: res.data.totalItems,
          pageIndex: res.data.pageIndex,
          pageSize: res.data.pageSize,
        })
      );
    } else {
      yield put(setSuccess(false));
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error(error);
  } finally {
    yield put(setLoading(false));
  }
}

function* handleDeleteBookById(action: ReturnType<typeof deleteBookRequest>) {
  try {
    yield put(setLoading(true));

    const res: StringApiResponse = yield call(() =>
      client.api.v1.books._id(action.payload).$delete()
    );

    if (res.success) {
      yield put(setSuccess(true));
      yield put(deleteBook(action.payload));
    } else {
      yield put(setSuccess(false));
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error(error);
  } finally {
    yield put(setLoading(false));
  }
}

export default function* bookSaga() {
  yield takeLatest(createBookStart.type, handleCreateBook);
  yield takeLatest(fetchBooksStart.type, fetchBooks);
  yield takeLatest(fetchBooksStartV1.type, fetchBooksV1);
  yield takeLatest(getBookByIdStart.type, getBookById);
  yield takeLatest(deleteBookRequest.type, handleDeleteBookById);
}

import client from "@/lib/api/axiosClient";
import { call, put, takeLatest } from "redux-saga/effects";
import {
  searchBooksFailure,
  searchBooksRequest,
  searchBooksRequestV2,
  searchBooksSuccess,
  searchBooksSuccessV2,
  setTotalItems,
} from "./bookSearchSlice";

function* handleSearchBooks(action: ReturnType<typeof searchBooksRequest>) {
  try {
    const { keyword, page } = action.payload;
    const { data } = yield call(() =>
      client.api.v1.books.search.$get({
        query: {
          keyword: keyword,
          PageIndex: page,
          PageSize: 3,
        },
      })
    );

    yield put(searchBooksSuccess(data?.items ?? []));
    yield put(setTotalItems(data?.totalItems ?? 0));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    yield put(searchBooksFailure(error.message || "Something went wrong"));
  }
}

function* handleSearchBooksV2(action: ReturnType<typeof searchBooksRequest>) {
  try {
    const { keyword, page } = action.payload;
    const { data } = yield call(() =>
      client.api.v1.books.search.$get({
        query: {
          keyword: keyword,
          PageIndex: page,
          PageSize: 6,
        },
      })
    );

    yield put(searchBooksSuccessV2(data?.items ?? []));
    yield put(setTotalItems(data?.totalItems ?? 0));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    yield put(searchBooksFailure(error.message || "Something went wrong"));
  }
}

export function* bookSearchSaga() {
  yield takeLatest(searchBooksRequest.type, handleSearchBooks);
  yield takeLatest(searchBooksRequestV2.type, handleSearchBooksV2);
}

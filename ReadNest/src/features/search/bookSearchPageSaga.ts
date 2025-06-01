// features/search/bookSearchPageSaga.ts
import client from "@/lib/api/axiosClient";
import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchBooksStart,
  fetchBooksSuccess,
  fetchBooksFailure,
  setTotalItems,
} from "./bookSearchPageSlice";

function* handleSearchBooks(action: ReturnType<typeof fetchBooksStart>) {
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

    yield put(fetchBooksSuccess(data?.items ?? []));
    yield put(setTotalItems(data?.totalItems ?? 0));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    yield put(fetchBooksFailure(error.message || "Something went wrong"));
  }
}

export function* bookSearchPageSaga() {
  yield takeLatest(fetchBooksStart.type, handleSearchBooks);
}

// features/search/bookSearchPageSaga.ts
import client from "@/lib/api/axiosClient";
import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchBooksStart,
  fetchBooksSuccess,
  fetchBooksFailure,
  setTotalItems,
  filterBooksStart,
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

function* handleFilterBooks(action: ReturnType<typeof filterBooksStart>) {
  try {
    const { data } = yield call(() =>
      client.api.v1.books.filter.$get({
        query: {
          CategoryIds: action.payload.categoryIds ?? [],
          Keyword: action.payload.keyword ?? "",
          LanguageIds: action.payload.languageIds ?? [],
          PageIndex: action.payload.page ?? 1,
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
  yield takeLatest(filterBooksStart.type, handleFilterBooks);
}

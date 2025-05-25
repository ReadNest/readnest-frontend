import { call, put, takeLatest } from "redux-saga/effects";
import {
  searchBooksRequest,
  searchBooksSuccess,
  searchBooksFailure,
} from "./bookSearchSlice";
import client from "@/lib/api/axiosClient";

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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    yield put(searchBooksFailure(error.message || "Something went wrong"));
  }
}

export function* bookSearchSaga() {
  yield takeLatest(searchBooksRequest.type, handleSearchBooks);
}

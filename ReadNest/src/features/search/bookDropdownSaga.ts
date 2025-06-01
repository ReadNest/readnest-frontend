// features/search/bookDropdownSaga.ts
import client from "@/lib/api/axiosClient";
import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchDropdownBooksStart,
  fetchDropdownBooksSuccess,
  fetchDropdownBooksFailure,
} from "./bookDropdownSlice";

function* handleFetchDropdownBooks(
  action: ReturnType<typeof fetchDropdownBooksStart>
) {
  try {
    const keyword = action.payload;
    const { data } = yield call(() =>
      client.api.v1.books.search.$get({
        query: {
          keyword: keyword,
          PageIndex: 1,
          PageSize: 6,
        },
      })
    );

    yield put(fetchDropdownBooksSuccess(data?.items ?? []));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    yield put(
      fetchDropdownBooksFailure(error.message || "Something went wrong")
    );
  }
}

export function* bookDropdownSaga() {
  yield takeLatest(fetchDropdownBooksStart.type, handleFetchDropdownBooks);
}

import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchCategoriesRequest,
  setCategories,
  setLoading,
} from "./categoryFilterSlice";
import client from "@/lib/api/axiosClient";
import type { GetCategoryResponseListApiResponse } from "@/api/@types";

function* handleFetchCategories() {
  try {
    yield put(setLoading(true));
    const response: GetCategoryResponseListApiResponse = yield call(() =>
      client.api.v1.categories.all.$get()
    );

    if (response.success) {
      yield put(setCategories(response.data ?? []));
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error("Error at categoryFilterSaga: " + err);
  } finally {
    yield put(setLoading(false));
  }
}

export function* categoryFilterSaga() {
  yield takeLatest(fetchCategoriesRequest.type, handleFetchCategories);
}

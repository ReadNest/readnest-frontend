import type {
  CreateCategoryRequest,
  UpdateCategoryRequest,
  GetCategoryResponseApiResponse,
  GetCategoryResponsePagingResponseApiResponse,
} from "@/api/@types";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  createCategoryStart,
  updateCategoryStart,
  fetchCategoriesStart,
  setCategories,
  setLoading,
  setPagingInfo,
  setSuccess,
  updateCategoryInList,
} from "./categorySlice";
import { call, put, takeLatest } from "redux-saga/effects";
import client from "@/lib/api/axiosClient";
import { setDetailErrors, setMessage } from "@/store/error/errorSlice";
import type { PagingRequest } from "@/lib/api/base/types";
import { toast } from "react-toastify";

function* handleCreateCategory(action: PayloadAction<CreateCategoryRequest>) {
  try {
    yield put(setLoading(true));

    const res: GetCategoryResponseApiResponse = yield call(() =>
      client.api.v1.categories.post({ body: action.payload }).then((r) => r.body)
    );

    yield put(
      setMessage({ message: res.message ?? "", messageId: res.messageId ?? "" })
    );

    if (res.success && res.data) {
      yield put(setSuccess(true));
      toast.success("Tạo mới thể loại thành công!");
    } else {
      yield put(setSuccess(false));
      yield put(setDetailErrors(res.listDetailError ?? []));
      toast.error(res.message);
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

function* fetchCategories(action: PayloadAction<PagingRequest>) {
  try {
    yield put(setLoading(true));

    const res: GetCategoryResponsePagingResponseApiResponse = yield call(() =>
      client.api.v1.categories
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
      yield put(setCategories(res.data.items ?? []));
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

function* handleUpdateCategory(action: PayloadAction<UpdateCategoryRequest>) {
  try {
    yield put(setLoading(true));

    const res: GetCategoryResponseApiResponse = yield call(() =>
      client.api.v1.categories
        .put({ body: action.payload })
        .then((r) => r.body)
    );

    yield put(setMessage({ message: res.message ?? "", messageId: res.messageId ?? "" }));

    if (res.success && res.data) {
      yield put(setSuccess(true));
      yield put(updateCategoryInList(res.data));
      toast.success("Cập nhật thể loại thành công!");
    } else {
      yield put(setSuccess(false));
      yield put(setDetailErrors(res.listDetailError ?? []));
      toast.error(res.message);
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

export default function* categorySaga() {
  yield takeLatest(createCategoryStart.type, handleCreateCategory);
  yield takeLatest(fetchCategoriesStart.type, fetchCategories);
  yield takeLatest(updateCategoryStart.type, handleUpdateCategory);
}

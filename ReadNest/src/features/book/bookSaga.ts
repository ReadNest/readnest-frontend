import type {
  CreateBookRequest,
  GetBookResponseApiResponse,
} from "@/api/@types";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createBookStart, setLoading, setSuccess } from "./bookSlice";
import { call, put, takeLatest } from "redux-saga/effects";
import client from "@/lib/api/axiosClient";
import { setDetailErrors, setMessage } from "@/store/error/errorSlice";

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

export default function* bookSaga() {
  yield takeLatest(createBookStart.type, handleCreateBook);
}

import type { StringApiResponse } from "@/api/@types";
import { call, put, select, takeLatest } from "redux-saga/effects";
import {
  createTradingPostStart,
  setLoading,
  setSuccess,
  setTradingPost,
} from "./tradingPostSlice";
import client from "@/lib/api/axiosClient";
import type { RootState } from "@/store";
import { toast } from "react-toastify";

function* handleCreateTradingPost(
  action: ReturnType<typeof createTradingPostStart>
) {
  try {
    yield put(setLoading(true));
    const userId: string = yield select(
      (state: RootState) => state.auth.user?.userId
    );

    const res: StringApiResponse = yield call(() =>
      client.api.v1.trading_posts
        .post({
          body: {
            userId: userId,
            ...action.payload,
          },
        })
        .then((r) => r.body)
    );

    if (res.success) {
      yield put(setSuccess(true));
      yield put(setTradingPost(action.payload));
      toast.success("Tạo bài đăng thành công!");
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

export default function* tradingPostSaga() {
  yield takeLatest(createTradingPostStart.type, handleCreateTradingPost);
}

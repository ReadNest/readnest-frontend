import type {
  GetBookTradingPostResponsePagingResponseApiResponse,
  StringApiResponse,
} from "@/api/@types";
import { call, put, select, takeLatest } from "redux-saga/effects";
import {
  createTradingPostStart,
  getTradingPostByUserIdStart,
  setLoading,
  setPagingInfo,
  setSuccess,
  setTradingPost,
  setTradingPostByUserId,
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

function* handleGetTradingPostByUserId(
  action: ReturnType<typeof getTradingPostByUserIdStart>
) {
  try {
    yield put(setLoading(true));
    const userId: string = yield select(
      (state: RootState) => state.auth.user?.userId
    );

    const res: GetBookTradingPostResponsePagingResponseApiResponse = yield call(
      () =>
        client.api.v1.trading_posts
          .get({
            query: {
              UserId: userId,
              PageIndex: action.payload.pageIndex ?? 1,
              PageSize: action.payload.pageSize ?? 6,
            },
          })
          .then((r) => r.body)
    );

    if (res.success) {
      yield put(setTradingPostByUserId(res.data?.items || []));
      yield put(
        setPagingInfo({
          total: res.data?.totalItems ?? 0,
          page: res.data?.pageIndex ?? 1,
          pageSize: res.data?.pageSize ?? 6,
        })
      );
    }
  } catch (error) {
    console.error(error);
  } finally {
    yield put(setLoading(false));
  }
}

export default function* tradingPostSaga() {
  yield takeLatest(createTradingPostStart.type, handleCreateTradingPost);
  yield takeLatest(
    getTradingPostByUserIdStart.type,
    handleGetTradingPostByUserId
  );
}

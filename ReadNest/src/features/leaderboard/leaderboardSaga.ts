import { call, put, takeLatest } from "redux-saga/effects";
import type { PayloadAction } from "@reduxjs/toolkit";
import type {
  LeaderboardResponseApiResponse,
  LeaderboardResponseIEnumerableApiResponse,
  LeaderboardRankResponseApiResponse,
} from "@/api/@types";

import {
  fetchTopLeaderboardStart,
  fetchUserLeaderboardStart,
  fetchUserRankStart,
  fetchTopByTimeRangeStart,
  setLeaderboards,
  setLoading,
  setSuccess,
  setUserLeaderboard,
  setUserRank,
} from "./leaderboardSlice";

import client from "@/lib/api/axiosClient";
import { toast } from "react-toastify";

// Top N in event
function* handleFetchTopLeaderboard(
  action: PayloadAction<{ eventId: string; top: number }>
) {
  try {
    yield put(setLoading(true));
    const res: LeaderboardResponseIEnumerableApiResponse = yield call(() =>
      client.api.v1.Leaderboard.top
        ._eventId(action.payload.eventId)
        ._top(action.payload.top)
        .get()
        .then((r) => r.body)
    );
    if (res.success && res.data) {
      yield put(setLeaderboards(res.data));
      yield put(setSuccess(true));
    } else {
      toast.error(res.message);
      yield put(setSuccess(false));
    }
  } catch (error: any) {
    toast.error("Lỗi khi lấy bảng xếp hạng");
  } finally {
    yield put(setLoading(false));
  }
}

// User's leaderboard
function* handleFetchUserLeaderboard(
    action: PayloadAction<{ eventId: string; userId: string }>
  ) {
    try {
      yield put(setLoading(true));
      const res: LeaderboardResponseApiResponse = yield call(() =>
        client.api.v1.Leaderboard.user
          ._eventId(action.payload.eventId)
          ._userId(action.payload.userId)
          .get()
          .then((r) => r.body)
      );
      if (res.success && res.data) {
        yield put(setUserLeaderboard(res.data));
        yield put(setSuccess(true));
      } else {
        toast.error(res.message);
        yield put(setSuccess(false));
      }
    } catch (error: any) {
      toast.error("Lỗi khi lấy leaderboard người dùng");
    } finally {
      yield put(setLoading(false));
    }
  }

// User rank
function* handleFetchUserRank(
    action: PayloadAction<{ eventId: string; userId: string }>
  ) {
    try {
      yield put(setLoading(true));
      const res: LeaderboardRankResponseApiResponse = yield call(() =>
        client.api.v1.Leaderboard.rank
          ._eventId(action.payload.eventId)
          ._userId(action.payload.userId)
          .get()
          .then((r) => r.body)
      );
      if (res.success && res.data) {
        yield put(setUserRank(res.data));
        yield put(setSuccess(true));
      } else {
        toast.error(res.message);
        yield put(setSuccess(false));
      }
    } catch (error: any) {
      toast.error("Lỗi khi lấy xếp hạng người dùng");
    } finally {
      yield put(setLoading(false));
    }
  }

// Top by time range
function* handleFetchTopByTimeRange(
  action: PayloadAction<{ from: string; to: string; top: number }>
) {
  try {
    yield put(setLoading(true));
    const res: LeaderboardResponseIEnumerableApiResponse = yield call(() =>
      client.api.v1.Leaderboard.top_by_time_range
        .get({
          query: {
            from: action.payload.from,
            to: action.payload.to,
            top: action.payload.top,
          },
        })
        .then((r) => r.body)
    );
    if (res.success && res.data) {
      yield put(setLeaderboards(res.data));
      yield put(setSuccess(true));
    } else {
      toast.error(res.message);
      yield put(setSuccess(false));
    }
  } catch (error: any) {
    toast.error("Lỗi khi lấy bảng xếp hạng theo thời gian");
  } finally {
    yield put(setLoading(false));
  }
}

export default function* leaderboardSaga() {
  yield takeLatest(fetchTopLeaderboardStart.type, handleFetchTopLeaderboard);
  yield takeLatest(fetchUserLeaderboardStart.type, handleFetchUserLeaderboard);
  yield takeLatest(fetchUserRankStart.type, handleFetchUserRank);
  yield takeLatest(fetchTopByTimeRangeStart.type, handleFetchTopByTimeRange);
}

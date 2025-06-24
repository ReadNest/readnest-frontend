import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
  LeaderboardResponse,
  LeaderboardRankResponse,
} from "@/api/@types";

export const initialState: {
  loading: boolean;
  isSuccess: boolean;
  leaderboards: LeaderboardResponse[];
  userLeaderboard?: LeaderboardResponse;
  userRank?: LeaderboardRankResponse;
} = {
  loading: false,
  isSuccess: false,
  leaderboards: [],
};

const leaderboardSlice = createSlice({
  name: "leaderboard",
  initialState,
  reducers: {
    fetchTopLeaderboardStart: (
      _state,
      _action: PayloadAction<{ eventId: string; top: number }>
    ) => {},
    fetchUserLeaderboardStart: (
      _state,
      _action: PayloadAction<{ eventId: string; userId: string }>
    ) => {},
    fetchUserRankStart: (
      _state,
      _action: PayloadAction<{ eventId: string; userId: string }>
    ) => {},
    fetchTopByTimeRangeStart: (
      _state,
      _action: PayloadAction<{ from: string; to: string; top: number }>
    ) => {},
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setSuccess: (state, action: PayloadAction<boolean>) => {
      state.isSuccess = action.payload;
    },
    setLeaderboards: (state, action: PayloadAction<LeaderboardResponse[]>) => {
      state.leaderboards = action.payload;
    },
    setUserLeaderboard: (
      state,
      action: PayloadAction<LeaderboardResponse>
    ) => {
      state.userLeaderboard = action.payload;
    },
    setUserRank: (state, action: PayloadAction<LeaderboardRankResponse>) => {
      state.userRank = action.payload;
    },
    resetLeaderboardState: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const {
  fetchTopLeaderboardStart,
  fetchUserLeaderboardStart,
  fetchUserRankStart,
  fetchTopByTimeRangeStart,
  setLoading,
  setSuccess,
  setLeaderboards,
  setUserLeaderboard,
  setUserRank,
  resetLeaderboardState,
} = leaderboardSlice.actions;

export default leaderboardSlice.reducer;

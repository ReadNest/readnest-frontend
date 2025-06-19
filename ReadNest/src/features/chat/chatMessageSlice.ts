import type { RecentChatterResponse } from "@/api/@types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export const initialState: {
    isLoading: boolean;
    recentChatters: RecentChatterResponse[];
} = {
    isLoading: false,
    recentChatters: [],
};

const chatMessageSlice = createSlice({
    name: "chatMessage",
    initialState,
    reducers: {
        // Action to request fetching recent chatters
        fetchRecentChattersRequested: (_state, _action: PayloadAction<string>) => {},
        fetchRecentChattersStart: (state) => {
            state.isLoading = true;
        },
        fetchRecentChattersSuccess: (state, action: PayloadAction<RecentChatterResponse[]>) => {
            state.isLoading = false;
            console.log("fetchRecentChattersSuccess", action.payload);
            state.recentChatters = action.payload;
            console.log("Recent chatters updated:", state.recentChatters);
        },
        fetchRecentChattersFailure: (state) => {
            state.isLoading = false;
        },
    },
});

export const {
    fetchRecentChattersRequested,
    fetchRecentChattersStart,
    fetchRecentChattersSuccess,
    fetchRecentChattersFailure,
} = chatMessageSlice.actions;
export default chatMessageSlice.reducer;
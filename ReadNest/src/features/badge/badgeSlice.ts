import type { GetBadgeResponse } from "@/api/@types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export const initialState: {
    isLoading: boolean;
    badges: GetBadgeResponse[];
} = {
    isLoading: false,
    badges: [],
};

const badgeSlice = createSlice({
    name: "badge",
    initialState,
    reducers: {
        fetchBadgesRequested: (_state) => {},
        fetchBadgesStart: (state) => {
            state.isLoading = true;
        },
        fetchBadgesSuccess: (state, action: PayloadAction<GetBadgeResponse[]>) => {
            state.isLoading = false;
            state.badges = action.payload;
        },
        fetchBadgesFailure: (state) => {
            state.isLoading = false;
        },
        setIsLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
    }
});

export const {
    fetchBadgesRequested,
    fetchBadgesStart,
    fetchBadgesSuccess,
    fetchBadgesFailure,
    setIsLoading,
} = badgeSlice.actions;

export default badgeSlice.reducer;

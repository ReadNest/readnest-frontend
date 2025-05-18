import type { GetUserProfileResponse } from "@/api/@types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";


export const initialState: {
    isLoading: boolean;
    profile: GetUserProfileResponse;
} = {
    isLoading: false,
    profile: {},
};

const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        fetchUserProfileRequested: (_state, _action: PayloadAction<string>) => {
        },
        fetchUserProfileStart: (state) => {
            state.isLoading = true;
        },
        fetchUserProfileSuccess: (state, action) => {
            state.isLoading = false;
            state.profile = action.payload.data;
        },
        fetchUserProfileFailure: (state) => {
            state.isLoading = false;
        },
    },
})
export const {
    fetchUserProfileRequested,
    fetchUserProfileStart,
    fetchUserProfileSuccess,
    fetchUserProfileFailure,
} = profileSlice.actions;

export default profileSlice.reducer;
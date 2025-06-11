import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export const initialState: {
    isLoading: boolean;
    newSelectedBadgeCode: string;
} = {
    isLoading: false,
    newSelectedBadgeCode: "",
};

const badgeSlice = createSlice({
    name: "userBadge",
    initialState,
    reducers: {
        selectedNewBadgeRequest: (_state, _action: PayloadAction<{ userId: string, badgeId: string }>) => { },
        selectedNewBadgeStart: (state) => {
            state.isLoading = true;
        },
        selectedNewBadgeSuccess: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.newSelectedBadgeCode = action.payload;
        },
        selectedNewBadgeFailure: (state) => {
            state.isLoading = false;
        },
        setIsLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
    }
});

export const {
    selectedNewBadgeRequest,
    selectedNewBadgeStart,
    selectedNewBadgeSuccess,
    selectedNewBadgeFailure,
    setIsLoading,
} = badgeSlice.actions;

export default badgeSlice.reducer;

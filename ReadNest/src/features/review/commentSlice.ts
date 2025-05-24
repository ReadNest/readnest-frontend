import type { CreateCommentRequest, GetCommentResponse } from "@/api/@types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export const initialState: {
    isLoading: boolean;
    comments: GetCommentResponse[];
} = {
    isLoading: false,
    comments: [],
};

const commentSlice = createSlice({
    name: "comment",
    initialState,
    reducers: {
        fetchCommentsRequested: (_state, _action: PayloadAction<string>) => { },
        fetchCommentsStart: (state) => {
            state.isLoading = true;
        },
        fetchCommentsSuccess: (state, action) => {
            state.isLoading = false;
            state.comments = action.payload.data;
        },
        fetchCommentsFailure: (state) => {
            state.isLoading = false;
        },

        addCommentRequested: (_state, _action: PayloadAction<CreateCommentRequest>) => { },
        addCommentStart: (state) => {
            state.isLoading = true;
        },
        addCommentSuccess: (state, action) => {
            state.isLoading = false;
            state.comments.unshift(action.payload); // Thêm vào đầu mảng
        },
        addCommentFailure: (state) => {
            state.isLoading = false;
        },
    },
});

export const {
    fetchCommentsRequested,
    fetchCommentsStart,
    fetchCommentsSuccess,
    fetchCommentsFailure,
    addCommentRequested,
    addCommentStart,
    addCommentSuccess,
    addCommentFailure,
} = commentSlice.actions;
export default commentSlice.reducer;
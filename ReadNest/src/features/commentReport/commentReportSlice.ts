import type { GetReportedCommentsResponse } from "@/api/@types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export const initialState: {
    isLoading: boolean;
    reportedComments: GetReportedCommentsResponse[];
} = {
    isLoading: false,
    reportedComments: [],
};

const commentReportSlice = createSlice({
    name: "commentReport",
    initialState,
    reducers: {
        // Action to fetching reported comments
        fetchReportedCommentsRequested: (_state) => { },
        fetchReportedCommentsStart: (state) => {
            state.isLoading = true;
        },
        fetchReportedCommentsSuccess: (state, action) => {
            state.isLoading = false;
            state.reportedComments = action.payload;
        },
        fetchReportedCommentsFailure: (state) => {
            state.isLoading = false;
        },

        // Action to ban a comment
        banCommentRequested: (_state, _action: PayloadAction<string>) => { },
        banCommentStart: (state) => {
            state.isLoading = true;
        },
        banCommentSuccess: (state, action) => {
            state.isLoading = false;
            // Remove the banned comment from the reported comments list
            state.reportedComments = state.reportedComments.filter(
                (comment) => comment.commentId !== action.payload
            );
        },
        banCommentFailure: (state) => {
            state.isLoading = false;
        },
        // Action to ignore a comment was reported
        ignoreCommentRequested: (_state, _action: PayloadAction<string>) => { },
        ignoreCommentStart: (state) => {
            state.isLoading = true;
        },
        ignoreCommentSuccess: (state, action) => {
            state.isLoading = false;
            // Remove the ignored comment from the reported comments list
            state.reportedComments = state.reportedComments.filter(
                (comment) => comment.commentId !== action.payload
            );
        },
        ignoreCommentFailure: (state) => {
            state.isLoading = false;
        },
    },
});
export const {
    fetchReportedCommentsRequested,
    fetchReportedCommentsStart,
    fetchReportedCommentsSuccess,
    fetchReportedCommentsFailure,

    banCommentRequested,
    banCommentStart,
    banCommentSuccess,
    banCommentFailure,

    ignoreCommentRequested,
    ignoreCommentStart,
    ignoreCommentSuccess,
    ignoreCommentFailure,
} = commentReportSlice.actions;
export default commentReportSlice.reducer;
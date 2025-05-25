import type { CreateCommentLikeRequest, CreateCommentRequest, GetCommentResponse } from "@/api/@types";
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
        // Action to request fetching comments
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

        // Action to request adding a comment
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

        // Action to request like a comment
        likeCommentRequested: (_state, _action: PayloadAction<CreateCommentLikeRequest>) => { },
        likeCommentStart: (state) => {
            state.isLoading = true;
        },
        likeCommentSuccess: (state, action) => {
            state.isLoading = false;
            const comment = state.comments.find(c => c.commentId === action.payload.commentId);
            if (comment) {
                comment.numberOfLikes = (comment.numberOfLikes ?? 0) + 1; // Tăng số lượng likes
                if (action.payload.userId && !comment.userLikes?.includes(action.payload.userId)) {
                    comment.userLikes?.push(action.payload.userId); // Thêm userId vào mảng userLikes nếu chưa có
                }
            }
        },
        unlikeCommentSuccess: (state, action) => {
            state.isLoading = false;
            const comment = state.comments.find(c => c.commentId === action.payload.commentId);
            if (comment) {
                comment.numberOfLikes = (comment.numberOfLikes ?? 1) - 1; // Giảm số lượng likes
                comment.userLikes = comment.userLikes?.filter(userId => userId !== action.payload.userId); // Loại bỏ userId khỏi mảng userLikes
            }
        },
        likeCommentFailure: (state) => {
            state.isLoading = false;
        },

    },
});

export const {
    // Actions for fetching comments
    fetchCommentsRequested,
    fetchCommentsStart,
    fetchCommentsSuccess,
    fetchCommentsFailure,
    // Actions for liking a comment
    addCommentRequested,
    addCommentStart,
    addCommentSuccess,
    addCommentFailure,
    // Actions for liking a comment
    likeCommentRequested,
    likeCommentStart,
    likeCommentSuccess,
    unlikeCommentSuccess,
    likeCommentFailure,
} = commentSlice.actions;
export default commentSlice.reducer;
/* eslint-disable @typescript-eslint/no-unused-vars */
import type {
  CreateCommentLikeRequest,
  CreateCommentReportRequest,
  CreateCommentRequest,
  GetCommentResponse,
  UpdateCommentRequest,
} from "@/api/@types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export const initialState: {
  isLoading: boolean;
  comments: GetCommentResponse[];
  top3RecentComments: GetCommentResponse[];
  top3MostLikedComments: GetCommentResponse[];
  isLoadingTop3: boolean;
} = {
  isLoading: false,
  comments: [],
  top3RecentComments: [],
  top3MostLikedComments: [],
  isLoadingTop3: false,
};

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    // Action to request fetching comments
    fetchCommentsRequested: (_state, _action: PayloadAction<string>) => {},
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
    addCommentRequested: (
      _state,
      _action: PayloadAction<CreateCommentRequest>
    ) => {},
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
    likeCommentRequested: (
      _state,
      _action: PayloadAction<CreateCommentLikeRequest>
    ) => {},
    likeCommentStart: (_state) => {},
    likeCommentSuccess: (state, action) => {
      // Cập nhật cho comments
      const updateLike = (arr: GetCommentResponse[] | undefined) => {
        if (!arr) return;
        const comment = arr.find(
          (c) => c.commentId === action.payload.commentId
        );
        if (comment) {
          comment.numberOfLikes = (comment.numberOfLikes ?? 0) + 1;
          if (
            action.payload.userId &&
            !comment.userLikes?.includes(action.payload.userId)
          ) {
            comment.userLikes?.push(action.payload.userId);
          }
        }
      };
      updateLike(state.comments);
      updateLike(state.top3RecentComments);
      updateLike(state.top3MostLikedComments);
    },
    unlikeCommentSuccess: (state, action) => {
      const updateUnlike = (arr: GetCommentResponse[] | undefined) => {
        if (!arr) return;
        const comment = arr.find(
          (c) => c.commentId === action.payload.commentId
        );
        if (comment) {
          comment.numberOfLikes = Math.max((comment.numberOfLikes ?? 1) - 1, 0); // Không để âm
          comment.userLikes = comment.userLikes?.filter(
            (userId) => userId !== action.payload.userId
          );
        }
      };
      updateUnlike(state.comments);
      updateUnlike(state.top3RecentComments);
      updateUnlike(state.top3MostLikedComments);
    },
    likeCommentFailure: (_state) => {},

    // Update comment
    updateCommentRequested: (
      _state,
      _action: PayloadAction<UpdateCommentRequest>
    ) => {},
    updateCommentStart: (state) => {
      state.isLoading = true;
    },
    updateCommentSuccess: (state, action) => {
      state.isLoading = false;
      console.log("action.payload:", action.payload);
      const index = state.comments.findIndex(
        (c) => c.commentId === action.payload.commentId
      );
      console.log("index:", index);
      if (index !== -1) {
        state.comments[index].content = action.payload.content; // Cập nhật nội dung bình luận
      }
    },
    updateCommentFailure: (state) => {
      state.isLoading = false;
    },

    // Delete comment
    deleteCommentRequested: (_state, _action: PayloadAction<string>) => {},
    deleteCommentStart: (state) => {
      state.isLoading = true;
    },
    deleteCommentSuccess: (state, action) => {
      state.isLoading = false;
      state.comments = state.comments.filter(
        (c) => c.commentId !== action.payload.commentId
      ); // Xóa bình luận theo commentId
    },
    deleteCommentFailure: (state) => {
      state.isLoading = false;
    },

    // Report comment
    reportCommentRequested: (
      _state,
      _action: PayloadAction<CreateCommentReportRequest>
    ) => {},
    reportCommentStart: (state) => {
      state.isLoading = true;
    },
    reportCommentSuccess: (state) => {
      state.isLoading = false;
      // Xử lý thành công báo cáo bình luận
    },
    reportCommentFailure: (state) => {
      state.isLoading = false;
      // Xử lý lỗi khi báo cáo bình luận
    },

    // Fetch top 3  recent comments by user
    fetchTop3RecentCommentsRequested: (
      _state,
      _action: PayloadAction<string>
    ) => {},
    fetchTop3RecentCommentsStart: (state) => {
      state.isLoadingTop3 = true;
    },
    fetchTop3RecentCommentsSuccess: (state, action) => {
      state.isLoadingTop3 = false;
      state.top3RecentComments = action.payload;
    },
    fetchTop3RecentCommentsFailure: (state) => {
      state.isLoadingTop3 = false;
    },

    // Fetch top 3 most liked comments
    fetchTop3MostLikedCommentsRequested: (_state, _action) => {},
    fetchTop3MostLikedCommentsStart: (state) => {
      state.isLoadingTop3 = true;
    },
    fetchTop3MostLikedCommentsSuccess: (state, action) => {
      state.isLoadingTop3 = false;
      state.top3MostLikedComments = action.payload;
    },
    fetchTop3MostLikedCommentsFailure: (state) => {
      state.isLoadingTop3 = false;
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
  // Actions for updating a comment
  updateCommentRequested,
  updateCommentStart,
  updateCommentSuccess,
  updateCommentFailure,
  // Actions for deleting a comment
  deleteCommentRequested,
  deleteCommentStart,
  deleteCommentSuccess,
  deleteCommentFailure,
  // Actions for reporting a comment
  reportCommentRequested,
  reportCommentStart,
  reportCommentSuccess,
  reportCommentFailure,
  // Actions for fetching top 3 recent comments
  fetchTop3RecentCommentsRequested,
  fetchTop3RecentCommentsStart,
  fetchTop3RecentCommentsSuccess,
  fetchTop3RecentCommentsFailure,
  // Actions for fetching top 3 most liked comments
  fetchTop3MostLikedCommentsRequested,
  fetchTop3MostLikedCommentsStart,
  fetchTop3MostLikedCommentsSuccess,
  fetchTop3MostLikedCommentsFailure,
} = commentSlice.actions;
export default commentSlice.reducer;

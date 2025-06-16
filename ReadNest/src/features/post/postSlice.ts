/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
  GetPostResponse,
  CreatePostRequest,
  LikePostRequest,
  UpdatePostRequest,
} from "@/api/@types";
import type { PagingRequest } from "@/lib/api/base/types";

export const initialState: {
  isSuccess: boolean;
  loading: boolean;
  posts: GetPostResponse[];
  selectedPost: GetPostResponse | null;
  pagingInfo: {
    totalItems?: number;
    pageIndex?: number;
    pageSize?: number;
  };
  createPostSuccess: boolean;
  updatePostSuccess: boolean;
  deletePostSuccess: boolean;
} = {
  isSuccess: false,
  loading: false,
  posts: [],
  selectedPost: null,
  pagingInfo: {
    totalItems: 0,
    pageIndex: 1,
    pageSize: 6,
  },
  createPostSuccess: false,
  updatePostSuccess: false,
  deletePostSuccess: false,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    // Action gọi API
    createPostStart: (_state, _action: PayloadAction<CreatePostRequest>) => {},
    likePostStart: (_state, _action: PayloadAction<LikePostRequest>) => {},
    fetchPostsStart: (_state, _action: PayloadAction<PagingRequest>) => {},
    fetchPostsByUserIdStart: (
      _state,
      _action: PayloadAction<{ userId: string; paging: PagingRequest }>
    ) => {},
    fetchPostsByBookIdStart: (_state, _action: PayloadAction<string>) => {},
    fetchTopLikedPostsStart: (_state, _action: PayloadAction<number>) => {},
    fetchTopViewedPostsStart: (_state, _action: PayloadAction<number>) => {},
    searchPostsByTitleStart: (_state, _action: PayloadAction<string>) => {},
    getPostByIdStart: (_state, _action: PayloadAction<string>) => {},
    updatePostStart: (_state, _action: PayloadAction<UpdatePostRequest>) => {},
    deletePostRequest: (_state, _action: PayloadAction<string>) => {},

    // Trạng thái
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setSuccess: (state, action: PayloadAction<boolean>) => {
      state.isSuccess = action.payload;
    },

    // CRUD đơn giản
    addPost: (state, action: PayloadAction<GetPostResponse>) => {
      state.posts.unshift(action.payload);
    },
    updatePost: (state, action: PayloadAction<GetPostResponse>) => {
      const index = state.posts.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.posts[index] = {
          ...state.posts[index],
          ...action.payload,
        };
        if (state.selectedPost?.id === action.payload.id) {
          state.selectedPost = {
            ...state.selectedPost,
            ...action.payload,
          };
        }
      }
    },
    deletePost: (state, action: PayloadAction<string>) => {
      state.posts = state.posts.filter((p) => p.id !== action.payload);
    },

    // Like / Unlike
    likePost: (state, action: PayloadAction<LikePostRequest>) => {
      const { postId, userId } = action.payload;
      if (!userId) return; // đảm bảo không thêm undefined

      const post = state.posts.find((p) => p.id === postId);
      if (post && !post.userLikes?.includes(userId)) {
        post.likesCount = (post.likesCount ?? 0) + 1;
        post.userLikes = [...(post.userLikes ?? []), userId];
      }
    },
    unlikePost: (state, action: PayloadAction<LikePostRequest>) => {
      const { postId, userId } = action.payload;
      if (!userId) return;

      const post = state.posts.find((p) => p.id === postId);
      if (post && post.likesCount && post.likesCount > 0) {
        post.likesCount -= 1;
        post.userLikes = post.userLikes?.filter((id) => id !== userId);
      }
    },

    // Setters
    setPosts: (state, action: PayloadAction<GetPostResponse[]>) => {
      state.posts = [...state.posts, ...action.payload];
    },
    setPostsV1: (state, action: PayloadAction<GetPostResponse[]>) => {
      state.posts = action.payload;
    },
    setSelectedPost: (state, action: PayloadAction<GetPostResponse | null>) => {
      state.selectedPost = action.payload;
    },
    setPagingInfo: (
      state,
      action: PayloadAction<{
        totalItems?: number;
        pageIndex?: number;
        pageSize?: number;
      }>
    ) => {
      state.pagingInfo = {
        ...state.pagingInfo,
        ...action.payload,
      };
    },

    // Reset
    resetState: (state) => {
      Object.assign(state, initialState);
    },

    // Set các flag riêng cho create/update/delete
    setCreatePostSuccess: (state, action: PayloadAction<boolean>) => {
      state.createPostSuccess = action.payload;
    },
    setUpdatePostSuccess: (state, action: PayloadAction<boolean>) => {
      state.updatePostSuccess = action.payload;
    },
    setDeletePostSuccess: (state, action: PayloadAction<boolean>) => {
      state.deletePostSuccess = action.payload;
    },

    // Có thể reset tất cả flag
    resetSuccessFlags: (state) => {
      state.createPostSuccess = false;
      state.updatePostSuccess = false;
      state.deletePostSuccess = false;
    },
  },
});

export const {
  createPostStart,
  likePostStart,
  fetchPostsStart,
  fetchPostsByUserIdStart,
  fetchPostsByBookIdStart,
  fetchTopLikedPostsStart,
  fetchTopViewedPostsStart,
  searchPostsByTitleStart,
  getPostByIdStart,
  updatePostStart,
  deletePostRequest,
  setLoading,
  setSuccess,
  addPost,
  updatePost,
  deletePost,
  likePost,
  unlikePost,
  setPosts,
  setPostsV1,
  setSelectedPost,
  setPagingInfo,
  resetState,
  setCreatePostSuccess,
  setUpdatePostSuccess,
  setDeletePostSuccess,
  resetSuccessFlags,
} = postSlice.actions;

export default postSlice.reducer;

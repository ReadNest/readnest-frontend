import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { GetPostResponse, CreatePostRequest, LikePostRequest } from "@/api/@types";

export const initialState: {
    isLoading: boolean;
    isSuccess: boolean;
    posts: GetPostResponse[];
} = {
    isLoading: false,
    isSuccess: false,
    posts: [],
};

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        // Fetch all posts
        fetchPostsRequested: (_state) => {},
        fetchPostsStart: (state) => {
            state.isLoading = true;
        },
        fetchPostsSuccess: (state, action: PayloadAction<GetPostResponse[]>) => {
            state.isLoading = false;
            state.posts = action.payload;
        },
        fetchPostsFailure: (state) => {
            state.isLoading = false;
        },

        // Fetch posts by userId
        fetchPostsByUserIdRequested: (_state, _action: PayloadAction<string>) => {},
        fetchPostsByUserIdStart: (state) => {
            state.isLoading = true;
        },
        fetchPostsByUserIdSuccess: (state, action: PayloadAction<GetPostResponse[]>) => {
            state.isLoading = false;
            state.posts = action.payload;
        },
        fetchPostsByUserIdFailure: (state) => {
            state.isLoading = false;
        },

        // Fetch posts by bookId
        fetchPostsByBookIdRequested: (_state, _action: PayloadAction<string>) => {},
        fetchPostsByBookIdStart: (state) => {
            state.isLoading = true;
        },
        fetchPostsByBookIdSuccess: (state, action: PayloadAction<GetPostResponse[]>) => {
            state.isLoading = false;
            state.posts = action.payload;
        },
        fetchPostsByBookIdFailure: (state) => {
            state.isLoading = false;
        },

        // Fetch top liked posts
        fetchTopLikedPostsRequested: (_state, _action: PayloadAction<number>) => {},
        fetchTopLikedPostsStart: (state) => {
            state.isLoading = true;
        },
        fetchTopLikedPostsSuccess: (state, action: PayloadAction<GetPostResponse[]>) => {
            state.isLoading = false;
            state.posts = action.payload;
        },
        fetchTopLikedPostsFailure: (state) => {
            state.isLoading = false;
        },

        // Fetch top viewed posts
        fetchTopViewedPostsRequested: (_state, _action: PayloadAction<number>) => {},
        fetchTopViewedPostsStart: (state) => {
            state.isLoading = true;
        },
        fetchTopViewedPostsSuccess: (state, action: PayloadAction<GetPostResponse[]>) => {
            state.isLoading = false;
            state.posts = action.payload;
        },
        fetchTopViewedPostsFailure: (state) => {
            state.isLoading = false;
        },

        // Search posts by title
        searchPostsByTitleRequested: (_state, _action: PayloadAction<string>) => {},
        searchPostsByTitleStart: (state) => {
            state.isLoading = true;
        },
        searchPostsByTitleSuccess: (state, action: PayloadAction<GetPostResponse[]>) => {
            state.isLoading = false;
            state.posts = action.payload;
        },
        searchPostsByTitleFailure: (state) => {
            state.isLoading = false;
        },

        // Create post
        createPostRequested: (_state, _action: PayloadAction<CreatePostRequest>) => {},
        createPostStart: (state) => {
            state.isLoading = true;
            state.isSuccess = false;
        },
        createPostSuccess: (state, action: PayloadAction<GetPostResponse>) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.posts.unshift(action.payload);
        },
        createPostFailure: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
        },

        // Like post
        likePostRequested: (_state, _action: PayloadAction<LikePostRequest>) => {},
        likePostStart: (state) => {
            state.isLoading = true;
        },
        likePostSuccess: (state, action: PayloadAction<{ postId: string; userId: string }>) => {
            state.isLoading = false;
            const post = state.posts.find(p => p.id === action.payload.postId);
            if (post) {
                post.likesCount = (post.likesCount ?? 0) + 1;
                post.userLikes?.push(action.payload.userId);
            }
        },
        unlikePostSuccess: (state, action: PayloadAction<{ postId: string; userId: string }>) => {
            state.isLoading = false;
            const post = state.posts.find(p => p.id === action.payload.postId);
            if (post && post.likesCount && post.likesCount > 0) {
                post.likesCount -= 1;
                post.userLikes = post.userLikes?.filter(id => id !== action.payload.userId);
            }
        },
        likePostFailure: (state) => {
            state.isLoading = false;
        },

        //reset
        resetPostStatus: (state) => {
            state.isSuccess = false;
            state.isLoading = false;
        },
    },
});

export const {
    fetchPostsRequested,
    fetchPostsStart,
    fetchPostsSuccess,
    fetchPostsFailure,
    fetchPostsByUserIdRequested,
    fetchPostsByUserIdStart,
    fetchPostsByUserIdSuccess,
    fetchPostsByUserIdFailure,
    fetchPostsByBookIdRequested,
    fetchPostsByBookIdStart,
    fetchPostsByBookIdSuccess,
    fetchPostsByBookIdFailure,
    fetchTopLikedPostsRequested,
    fetchTopLikedPostsStart,
    fetchTopLikedPostsSuccess,
    fetchTopLikedPostsFailure,
    fetchTopViewedPostsRequested,
    fetchTopViewedPostsStart,
    fetchTopViewedPostsSuccess,
    fetchTopViewedPostsFailure,
    searchPostsByTitleRequested,
    searchPostsByTitleStart,
    searchPostsByTitleSuccess,
    searchPostsByTitleFailure,
    createPostRequested,
    createPostStart,
    createPostSuccess,
    createPostFailure,
    likePostRequested,
    likePostStart,
    likePostSuccess,
    unlikePostSuccess,
    likePostFailure,
    resetPostStatus,
} = postSlice.actions;

export default postSlice.reducer;

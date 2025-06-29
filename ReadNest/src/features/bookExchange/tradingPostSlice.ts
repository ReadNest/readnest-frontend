/* eslint-disable @typescript-eslint/no-unused-vars */
import type {
  CreateTradingPostRequest,
  GetBookTradingPostResponse,
} from "@/api/@types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export const initialState: {
  isSuccess: boolean;
  loading: boolean;
  tradingPostValue: {
    title: string;
    bookId: string;
    condition: string;
    shortDescription: string;
    externalBookUrl: string;
    message: string;
    messageToRequester?: string;
    images: { imageUrl: string; order: number }[];
  };
  tradingPostByUserId: GetBookTradingPostResponse[];
  pagingInfo: {
    total: number;
    page: number;
    pageSize: number;
  };
} = {
  isSuccess: false,
  loading: false,
  tradingPostValue: {
    title: "",
    bookId: "",
    condition: "",
    shortDescription: "",
    externalBookUrl: "",
    message: "",
    messageToRequester: "",
    images: [],
  },
  tradingPostByUserId: [],
  pagingInfo: {
    total: 0,
    page: 1,
    pageSize: 6,
  },
};

const tradingPostSlice = createSlice({
  name: "tradingPost",
  initialState,
  reducers: {
    createTradingPostStart: (
      _state,
      _action: PayloadAction<CreateTradingPostRequest>
    ) => {},
    getTradingPostByUserIdStart: (
      _state,
      _action: PayloadAction<{ pageIndex: number; pageSize: number }>
    ) => {},
    setTradingPost: (
      state,
      action: PayloadAction<CreateTradingPostRequest>
    ) => {
      state.tradingPostValue = {
        title: action.payload.title ?? "",
        bookId: action.payload.bookId ?? "",
        condition: action.payload.condition ?? "",
        shortDescription: action.payload.shortDescription ?? "",
        externalBookUrl: action.payload.externalBookUrl ?? "",
        message: action.payload.message ?? "",
        messageToRequester: action.payload.messageToRequester ?? "",
        images:
          action.payload.images?.map((img, index) => ({
            imageUrl: img.imageUrl ?? "",
            order: index ?? 0,
          })) ?? [],
      };
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setSuccess: (state, action: PayloadAction<boolean>) => {
      state.isSuccess = action.payload;
    },
    setTradingPostByUserId: (
      state,
      action: PayloadAction<GetBookTradingPostResponse[]>
    ) => {
      state.tradingPostByUserId = action.payload.map((post) => ({
        ...post,
      }));
    },
    setPagingInfo: (
      state,
      action: PayloadAction<{
        total: number;
        page: number;
        pageSize: number;
      }>
    ) => {
      state.pagingInfo = {
        total: action.payload.total,
        page: action.payload.page,
        pageSize: action.payload.pageSize,
      };
    },
    resetState: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const {
  createTradingPostStart,
  setTradingPost,
  setLoading,
  setSuccess,
  getTradingPostByUserIdStart,
  setTradingPostByUserId,
  setPagingInfo,
  resetState,
} = tradingPostSlice.actions;

export default tradingPostSlice.reducer;

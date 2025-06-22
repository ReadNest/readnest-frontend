/* eslint-disable @typescript-eslint/no-unused-vars */
import type { CreateTradingPostRequest } from "@/api/@types";
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
};

const tradingPostSlice = createSlice({
  name: "tradingPost",
  initialState,
  reducers: {
    createTradingPostStart: (
      _state,
      _action: PayloadAction<CreateTradingPostRequest>
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
  },
});

export const {
  createTradingPostStart,
  setTradingPost,
  setLoading,
  setSuccess,
} = tradingPostSlice.actions;

export default tradingPostSlice.reducer;

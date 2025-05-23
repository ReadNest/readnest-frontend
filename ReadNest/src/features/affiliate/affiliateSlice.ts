import type { AffiliateLinkRequest } from "@/api/@types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export const initialState: {
  isSuccess: boolean;
  loading: boolean;
} = {
  isSuccess: false,
  loading: false,
};

const bookSlice = createSlice({
  name: "affiliate",
  initialState,
  reducers: {
    createAffiliateStart: (
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      _state,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      _action: PayloadAction<{
        bookId: string;
        affiliateLinks: AffiliateLinkRequest[];
      }>
    ) => {},
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setSuccess: (state, action: PayloadAction<boolean>) => {
      state.isSuccess = action.payload;
    },
    resetState: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const { createAffiliateStart, setLoading, setSuccess, resetState } =
  bookSlice.actions;

export default bookSlice.reducer;

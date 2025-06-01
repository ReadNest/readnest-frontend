// features/search/bookSearchPageSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { GetBookSearchResponse } from "@/api/@types";

interface BookSearchPageState {
  keyword: string;
  results: GetBookSearchResponse[];
  page: number;
  totalItems: number;
  loading: boolean;
  error: string | null;
}

const initialState: BookSearchPageState = {
  keyword: "",
  results: [],
  page: 1,
  totalItems: 0,
  loading: false,
  error: null,
};

const bookSearchPageSlice = createSlice({
  name: "bookSearchPage",
  initialState,
  reducers: {
    fetchBooksStart(
      state,
      action: PayloadAction<{ keyword: string; page: number }>
    ) {
      state.keyword = action.payload.keyword;
      state.page = action.payload.page;
      state.loading = true;
    },
    fetchBooksSuccess(state, action: PayloadAction<GetBookSearchResponse[]>) {
      state.results = action.payload;
      state.loading = false;
    },
    fetchBooksFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
    setTotalItems(state, action: PayloadAction<number>) {
      state.totalItems = action.payload;
    },
  },
});

export const {
  fetchBooksStart,
  fetchBooksSuccess,
  fetchBooksFailure,
  setTotalItems,
} = bookSearchPageSlice.actions;

export default bookSearchPageSlice.reducer;

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { GetBookSearchResponse } from "@/api/@types";

interface BookSearchState {
  keyword: string;
  results: GetBookSearchResponse[];
  page: number;
  hasMore: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: BookSearchState = {
  keyword: "",
  results: [],
  page: 1,
  hasMore: false,
  loading: false,
  error: null,
};

const bookSearchSlice = createSlice({
  name: "bookSearch",
  initialState,
  reducers: {
    searchBooksRequest(
      state,
      action: PayloadAction<{ keyword: string; page: number }>
    ) {
      state.loading = true;
      state.keyword = action.payload.keyword;
      state.page = action.payload.page;
    },
    searchBooksSuccess(state, action: PayloadAction<GetBookSearchResponse[]>) {
      if (state.page === 1) {
        state.results = action.payload;
      } else {
        state.results = [...state.results, ...action.payload];
      }
      state.hasMore = action.payload.length === 3;
      state.loading = false;
    },
    searchBooksFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
    clearResults(state) {
      state.results = [];
      state.page = 1;
      state.hasMore = false;
    },
  },
});

export const {
  searchBooksRequest,
  searchBooksSuccess,
  searchBooksFailure,
  clearResults,
} = bookSearchSlice.actions;

export default bookSearchSlice.reducer;

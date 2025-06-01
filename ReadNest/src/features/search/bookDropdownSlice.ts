// features/search/bookDropdownSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { GetBookSearchResponse } from "@/api/@types";

interface BookDropdownState {
  keyword: string;
  results: GetBookSearchResponse[];
  loading: boolean;
  error: string | null;
}

const initialState: BookDropdownState = {
  keyword: "",
  results: [],
  loading: false,
  error: null,
};

const bookDropdownSlice = createSlice({
  name: "bookDropdown",
  initialState,
  reducers: {
    fetchDropdownBooksStart(state, action: PayloadAction<string>) {
      state.loading = true;
      state.keyword = action.payload;
    },
    fetchDropdownBooksSuccess(
      state,
      action: PayloadAction<GetBookSearchResponse[]>
    ) {
      state.results = action.payload;
      state.loading = false;
    },
    fetchDropdownBooksFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
    clearDropdownResults(state) {
      state.results = [];
      state.keyword = "";
    },
  },
});

export const {
  fetchDropdownBooksStart,
  fetchDropdownBooksSuccess,
  fetchDropdownBooksFailure,
  clearDropdownResults,
} = bookDropdownSlice.actions;

export default bookDropdownSlice.reducer;

import type { CreateBookRequest, GetBookResponse } from "@/api/@types";
import type { PagingRequest } from "@/lib/api/base/types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export const initialState: {
  isSuccess: boolean;
  loading: boolean;
  books: GetBookResponse[];
  pagingInfo: {
    totalItems?: number;
    pageIndex?: number;
    pageSize?: number;
  };
} = {
  isSuccess: false,
  loading: false,
  books: [],
  pagingInfo: {
    totalItems: 0,
    pageIndex: 1,
    pageSize: 10,
  },
};

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    createBookStart: (_state, _action: PayloadAction<CreateBookRequest>) => {},
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    fetchBooksStart: (_state, _action: PayloadAction<PagingRequest>) => {},
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setSuccess: (state, action: PayloadAction<boolean>) => {
      state.isSuccess = action.payload;
    },
    addBook: (state, action: PayloadAction<GetBookResponse>) => {
      state.books.push(action.payload);
    },
    setBooks: (state, action: PayloadAction<GetBookResponse[]>) => {
      state.books = action.payload;
    },
    setPagingInfo: (
      state,
      action: PayloadAction<{
        totalItems?: number;
        pageIndex?: number;
        pageSize?: number;
      }>
    ) => {
      state.pagingInfo = action.payload;
    },
    resetState: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const {
  createBookStart,
  fetchBooksStart,
  setLoading,
  setSuccess,
  addBook,
  setBooks,
  setPagingInfo,
  resetState,
} = bookSlice.actions;

export default bookSlice.reducer;

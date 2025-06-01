import type { CreateBookRequest, GetBookResponse } from "@/api/@types";
import type { PagingRequest } from "@/lib/api/base/types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export const initialState: {
  isSuccess: boolean;
  loading: boolean;
  books: GetBookResponse[];
  selectedBook: GetBookResponse | null;
  pagingInfo: {
    totalItems?: number;
    pageIndex?: number;
    pageSize?: number;
  };
} = {
  isSuccess: false,
  loading: false,
  books: [],
  selectedBook: null,
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
    setBooksV1: (state, action: PayloadAction<GetBookResponse[]>) => {
      state.books = [...state.books, ...action.payload];
    },
    setBooks: (state, action: PayloadAction<GetBookResponse[]>) => {
      state.books = [...state.books, ...action.payload];
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
    getBookByIdStart: (_state, _action: PayloadAction<any>) => {},
    setSelectedBook: (state, action: PayloadAction<GetBookResponse | null>) => {
      // Lưu thông tin cuốn sách được chọn
      state.selectedBook = action.payload;
    },
  },
});

export const {
  createBookStart,
  fetchBooksStart,
  getBookByIdStart,
  setLoading,
  setSuccess,
  addBook,
  setBooksV1,
  setBooks,
  setSelectedBook,
  setPagingInfo,
  resetState,
} = bookSlice.actions;

export default bookSlice.reducer;

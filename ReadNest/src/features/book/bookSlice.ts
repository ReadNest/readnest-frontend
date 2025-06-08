import type {
  CreateBookRequest,
  GetBookResponse,
  UpdateBookRequest,
} from "@/api/@types";
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
    updateBookStart: (
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      _state,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      _action: PayloadAction<{ id: string; book: UpdateBookRequest }>
    ) => {},
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    deleteBookRequest: (_state, _action: PayloadAction<string>) => {},
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    fetchBooksStart: (_state, _action: PayloadAction<PagingRequest>) => {},
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    fetchBooksStartV1: (_state, _action: PayloadAction<PagingRequest>) => {},
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setSuccess: (state, action: PayloadAction<boolean>) => {
      state.isSuccess = action.payload;
    },
    addBook: (state, action: PayloadAction<GetBookResponse>) => {
      state.books.push(action.payload);
    },
    updateBook: (
      state,
      action: PayloadAction<{ id: string; book: UpdateBookRequest }>
    ) => {
      const index = state.books.findIndex((x) => x.id === action.payload.id);
      if (index !== -1) {
        state.books[index] = {
          ...state.books[index],
          ...action.payload.book,
        };
      }
    },
    deleteBook: (state, action: PayloadAction<string>) => {
      state.books = state.books.filter((x) => x.id !== action.payload);
    },
    setBooksV1: (state, action: PayloadAction<GetBookResponse[]>) => {
      state.books = action.payload;
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
  updateBookStart,
  deleteBookRequest,
  fetchBooksStart,
  fetchBooksStartV1,
  getBookByIdStart,
  setLoading,
  setSuccess,
  addBook,
  updateBook,
  setBooksV1,
  setBooks,
  setSelectedBook,
  setPagingInfo,
  deleteBook,
  resetState,
} = bookSlice.actions;

export default bookSlice.reducer;

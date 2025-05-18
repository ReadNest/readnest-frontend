import type { CreateBookRequest } from "@/api/@types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export const initialState: {
  isSuccess: boolean;
  loading: boolean;
} = {
  isSuccess: false,
  loading: false,
};

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    createBookStart: (_state, _action: PayloadAction<CreateBookRequest>) => {},
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setSuccess: (state, action: PayloadAction<boolean>) => {
      state.isSuccess = action.payload;
    },
  },
});

export const { createBookStart, setLoading, setSuccess } = bookSlice.actions;

export default bookSlice.reducer;

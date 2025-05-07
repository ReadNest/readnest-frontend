import type { DetailError } from "@/api/@types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface ErrorState {
  detailErrors: Record<string, string>;
  message: string | null;
}

const initialState: ErrorState = {
  detailErrors: {},
  message: null,
};

const errorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    setDetailErrors(state, action: PayloadAction<DetailError[]>) {
      state.detailErrors = action.payload.reduce((acc, { field, message }) => {
        if (field && message) acc[field] = message;
        return acc;
      }, {} as Record<string, string>);
    },
    setMessage(state, action: PayloadAction<string>) {
      state.message = action.payload;
    },
    clearErrors(state) {
      state.detailErrors = {};
      state.message = null;
    },
  },
});

export const { setDetailErrors, setMessage, clearErrors } = errorSlice.actions;
export default errorSlice.reducer;

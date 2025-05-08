import type { DetailError } from "@/api/@types";
import { normalizeFieldName } from "@/lib/utils";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface ErrorState {
  detailErrors: Record<string, string>;
  message: string | null;
  messageId: string;
}

const initialState: ErrorState = {
  detailErrors: {},
  message: null,
  messageId: "",
};

const errorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    setDetailErrors(state, action: PayloadAction<DetailError[]>) {
      state.detailErrors = action.payload.reduce((acc, { field, message }) => {
        if (field && message) acc[normalizeFieldName(field)] = message;
        return acc;
      }, {} as Record<string, string>);
    },
    setMessage(
      state,
      action: PayloadAction<{ message: string; messageId: string }>
    ) {
      state.message = action.payload.message;
      state.messageId = action.payload.messageId;
    },
    clearErrors(state) {
      state.detailErrors = {};
      state.message = null;
      state.messageId = "";
    },
  },
});

export const { setDetailErrors, setMessage, clearErrors } = errorSlice.actions;
export default errorSlice.reducer;

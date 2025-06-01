import type { GetCategoryResponse } from "@/api/@types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface CategoryFilterState {
  results: GetCategoryResponse[];
  loading: boolean;
}

const initialState: CategoryFilterState = {
  results: [],
  loading: false,
};

const categoryFilterSlice = createSlice({
  name: "categoryFilter",
  initialState,
  reducers: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    fetchCategoriesRequest(_state) {},
    setCategories(state, action: PayloadAction<GetCategoryResponse[]>) {
      state.results = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});

export const { fetchCategoriesRequest, setCategories, setLoading } =
  categoryFilterSlice.actions;

export default categoryFilterSlice.reducer;

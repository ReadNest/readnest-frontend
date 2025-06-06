/* eslint-disable @typescript-eslint/no-unused-vars */
import type {
  CreateCategoryRequest,
  GetCategoryResponse,
  UpdateCategoryRequest,
} from "@/api/@types";
import type { PagingRequest } from "@/lib/api/base/types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export const initialState: {
  isSuccess: boolean;
  loading: boolean;
  categories: GetCategoryResponse[];
  pagingInfo: {
    totalItems?: number;
    pageIndex?: number;
    pageSize?: number;
  };
} = {
  isSuccess: false,
  loading: false,
  categories: [],
  pagingInfo: {
    totalItems: 0,
    pageIndex: 1,
    pageSize: 10,
  },
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    createCategoryStart: (
      _state,
      _action: PayloadAction<CreateCategoryRequest>
    ) => {},
    updateCategoryStart: (
      _state,
      _action: PayloadAction<UpdateCategoryRequest>
    ) => {},
    updateCategoryInList: (
      state,
      action: PayloadAction<GetCategoryResponse>
    ) => {
      const updated = action.payload;
      const index = state.categories.findIndex((cat) => cat.id === updated.id);
      if (index !== -1) {
        state.categories[index] = updated;
      }
    },
    fetchCategoriesStart: (_state, _action: PayloadAction<PagingRequest>) => {},
    fetchMoreCategoriesStart: (
      _state,
      _action: PayloadAction<PagingRequest>
    ) => {},
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setSuccess: (state, action: PayloadAction<boolean>) => {
      state.isSuccess = action.payload;
    },
    addCategory: (state, action: PayloadAction<GetCategoryResponse>) => {
      state.categories.push(action.payload);
    },
    setCategories: (state, action: PayloadAction<GetCategoryResponse[]>) => {
      state.categories = action.payload;
    },
    setFetchMoreCategories: (
      state,
      action: PayloadAction<GetCategoryResponse[]>
    ) => {
      state.categories = [...state.categories, ...action.payload];
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
  createCategoryStart,
  updateCategoryStart,
  updateCategoryInList,
  fetchCategoriesStart,
  fetchMoreCategoriesStart,
  setFetchMoreCategories,
  setLoading,
  setSuccess,
  addCategory,
  setCategories,
  setPagingInfo,
  resetState,
} = categorySlice.actions;

export default categorySlice.reducer;

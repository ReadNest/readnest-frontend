import type {
    GetBookResponse,
    ToggleFavoriteBookRequest,
  } from "@/api/@types";
  import type { PagingRequest } from "@/lib/api/base/types";
  import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
  
  export interface FavoriteState {
    favorites: GetBookResponse[];
    isSuccess: boolean;
    loading: boolean;
    pagingInfo: {
      totalItems?: number;
      pageIndex?: number;
      pageSize?: number;
    };
  }
  
  const initialState: FavoriteState = {
    favorites: [],
    isSuccess: false,
    loading: false,
    pagingInfo: {
      totalItems: 0,
      pageIndex: 1,
      pageSize: 4,
    },
  };
  
  const favoriteSlice = createSlice({
    name: "favorite",
    initialState,
    reducers: {
      toggleFavoriteStart: (_state, _action: PayloadAction<ToggleFavoriteBookRequest>) => {},
      getFavoritesStart: (_state, _action: PayloadAction<{ userId: string; paging: PagingRequest }>) => {},
      toggleFavoriteOptimistic: (state, action: PayloadAction<{ bookId: string; bookData?: GetBookResponse }>) => {
        const index = state.favorites.findIndex(fav => fav.id === action.payload.bookId);
        if (index >= 0) {
          state.favorites.splice(index, 1);
        } else if (action.payload.bookData) {
          state.favorites.push(action.payload.bookData);
        }
      },
      setLoading: (state, action: PayloadAction<boolean>) => {
        state.loading = action.payload;
      },
      setSuccess: (state, action: PayloadAction<boolean>) => {
        state.isSuccess = action.payload;
      },
      setFavorites: (state, action: PayloadAction<GetBookResponse[]>) => {
        state.favorites = action.payload;
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
      resetFavoriteState: () => initialState,
    },
  });
  
  export const {
    toggleFavoriteStart,
    getFavoritesStart,
    toggleFavoriteOptimistic,
    setLoading,
    setSuccess,
    setFavorites,
    setPagingInfo,
    resetFavoriteState,
  } = favoriteSlice.actions;
  
  export default favoriteSlice.reducer;
  
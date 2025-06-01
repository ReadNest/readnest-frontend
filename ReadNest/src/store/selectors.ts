import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from ".";

export const selectGlobalLoading = createSelector(
  [
    (state: RootState) => state.auth.loading,
    (state: RootState) => state.book.loading,
    (state: RootState) => state.affiliate.loading,

    (state: RootState) => state.categories.loading,
    (state: RootState) => state.profile.isLoading,
    (state: RootState) => state.favorites.loading,
  ],
  (authLoading, bookLoading, favoriteLoading /* ... */) => authLoading || bookLoading || favoriteLoading // || ...
);

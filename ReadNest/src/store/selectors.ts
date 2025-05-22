import type { RootState } from ".";

export const selectGlobalLoading = (state: RootState) => {
  return (
    state.auth.loading ||
    state.profile.isLoading ||
    state.affiliate.loading ||
    state.categories.loading ||
    state.book.loading ||
    false
  );
};

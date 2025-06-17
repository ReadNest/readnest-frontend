/* eslint-disable @typescript-eslint/no-unused-vars */
import type { GetUserProfileResponse, UpdateUserRequest } from "@/api/@types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export const initialState: {
  isLoading: boolean;
  profile: GetUserProfileResponse;
  isProfileNotFound: boolean;
} = {
  isLoading: false,
  profile: {},
  isProfileNotFound: false,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    fetchUserProfileRequested: (_state, _action: PayloadAction<string>) => {},
    fetchUserProfileStart: (state) => {
      state.isLoading = true;
      state.isProfileNotFound = false; // Reset khi bắt đầu fetch
    },
    fetchUserProfileSuccess: (state, action) => {
      state.isLoading = false;
      state.profile = action.payload.data;
    },
    fetchUserProfileFailure: (state) => {
      state.isLoading = false;
      state.isProfileNotFound = true;
    },

    updateProfileRequested: (
      _state,
      _action: PayloadAction<Partial<UpdateUserRequest>>
    ) => {},
    updateProfileStart: (state) => {
      state.isLoading = true;
    },
    updateProfileSuccess: (state, action: PayloadAction<UpdateUserRequest>) => {
      state.isLoading = false;
      // Map các trường từ UpdateUserRequest vào profile
      const { fullName, address, dateOfBirth, avatarUrl, bio } = action.payload;
      if (avatarUrl) {
        state.profile.avatarUrl = avatarUrl;
      } else {
        state.profile.fullName = fullName;
        state.profile.dateOfBirth = dateOfBirth ?? undefined;
        state.profile.bio = bio;
        state.profile.address = address;
      }
    },
    updateProfileFailure: (state) => {
      state.isLoading = false;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setIsProfileNotFound: (state, action: PayloadAction<boolean>) => {
      state.isProfileNotFound = action.payload;
    },

    updateCurrentBadge: (state, action: PayloadAction<string>) => {
      const badgeId = action.payload;
      // Cập nhật tất cả selected của badge thành false
      state.profile.ownedBadges = state.profile?.ownedBadges?.map((badge) => ({
        ...badge,
        isSelected: badge.badgeId === badgeId ? true : false,
      }));
    },
  },
});
export const {
  fetchUserProfileRequested,
  fetchUserProfileStart,
  fetchUserProfileSuccess,
  fetchUserProfileFailure,

  updateProfileRequested,
  updateProfileStart,
  updateProfileSuccess,
  updateProfileFailure,
  setIsLoading,
  setIsProfileNotFound,

  updateCurrentBadge,
} = profileSlice.actions;

export default profileSlice.reducer;

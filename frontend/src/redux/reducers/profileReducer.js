import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  message: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    updateProfileRequest: (state) => {
      state.loading = true;
    },
    updateProfileSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    updateProfileFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateProfileReset: (state) => {
      state.loading = false;
      state.error = null;
      state.message = null;
    },

    changePasswordRequest: (state) => {
      state.loading = true;
    },
    changePasswordSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    changePasswordFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    changePasswordReset: (state) => {
      state.loading = false;
      state.error = null;
      state.message = null;
    },

    updateProfilePictureRequest: (state) => {
      state.loading = true;
    },

    updateProfilePictureSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },

    updateProfilePictureFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateProfilePictureReset: (state) => {
      state.loading = false;
      state.error = null;
      state.message = null;
    },

    removeFromPlaylistRequest: (state) => {
      state.loading = true;
    },
    removeFromPlaylistSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    removeFromPlaylistFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    removeFromPlaylistReset: (state, action) => {
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  updateProfileRequest,
  updateProfileSuccess,
  updateProfileFail,
  updateProfileReset,
  changePasswordRequest,
  changePasswordSuccess,
  changePasswordFail,
  changePasswordReset,
  updateProfilePictureRequest,
  updateProfilePictureSuccess,
  updateProfilePictureFail,
  updateProfilePictureReset,
  removeFromPlaylistRequest,
  removeFromPlaylistSuccess,
  removeFromPlaylistFail,
  removeFromPlaylistReset,
  clearError,
  clearMessage,
} = profileSlice.actions;

export default profileSlice.reducer;

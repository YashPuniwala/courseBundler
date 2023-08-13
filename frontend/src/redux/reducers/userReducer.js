import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  isAuthenticated: false,
  user: null,
  message: null,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.message = action.payload.message;
      state.error = null; // clear any previous errors
    },
    loginFail: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
      state.user = null; // clear any previously authenticated user
      state.message = action.payload.message; // set the message state to the error message
    },

    loadUserRequest: (state) => {
      state.loading = true;
      state.isAuthenticated = false;
    },
    loadUserSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    loadUserFail: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload;
    },

    logoutRequest: (state) => {
      state.loading = true;
    },
    logoutSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.message = action.payload;
    },
    logoutFail: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.error = action.payload;
    },

    registerRequest: (state) => {
      state.loading = true;
    },
    registerSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.message = action.payload.message;
      state.error = null; // clear any previous errors
    },
    registerFail: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
      state.user = null; // clear any previously authenticated user
    },

    forgetPasswordRequest: (state) => {
      state.loading = true;
    },
    forgetPasswordSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload
    },
    forgetPasswordFail: (state, action) => {
      state.loading = false;
      state.error = action.payload
    },
    forgetPasswordReset: (state) => {
      state.loading = false;
      state.error = null;
      state.message = null;
    },

   resetPasswordRequest: (state) => {
      state.loading = true;
    },
   resetPasswordSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload
    },
   resetPasswordFail: (state, action) => {
      state.loading = false;
      state.error = action.payload
    },
    resetPasswordReset: (state) => {
      state.loading = false;
      state.error = null;
      state.message = null;
    },


   deleteMyProfileRequest: (state) => {
      state.loading = true;
    },
   deleteMyProfileSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload
    },
   deleteMyProfileFail: (state, action) => {
      state.loading = false;
      state.error = action.payload
    },
    deleteMyProfileReset: (state) => {
      state.loading = false;
      state.error = null;
      state.message = null;
    },

    clearError: (state) => {
      state.loading = false;
      state.error = null;
      state.message = null;
    },
    clearMessage: (state) => {
      state.loading = false;
      state.error = null;
      state.message = null;
    },
  },
});


export const {
  loginRequest,
  loginSuccess,
  loginFail,
  loadUserRequest,
  loadUserSuccess,
  loadUserFail,
  logoutRequest,
  logoutSuccess,
  logoutFail,
  registerRequest,
  registerSuccess,
  registerFail,
  forgetPasswordRequest,
  forgetPasswordSuccess,
  forgetPasswordFail,
  forgetPasswordReset,
  resetPasswordRequest,
  resetPasswordSuccess,
  resetPasswordFail,
  resetPasswordReset,
  deleteMyProfileRequest,
  deleteMyProfileSuccess,
  deleteMyProfileFail,
  deleteMyProfileReset,
  clearError,
  clearMessage,
} = userSlice.actions;

export default userSlice.reducer;

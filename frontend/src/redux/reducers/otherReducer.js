import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  message: null,
  error: null,
};

const otherSlice = createSlice({
  name: "other",
  initialState,
  reducers: {
    contactRequest: (state) => {
      state.loading = true;
    },
    contactSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    contactFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    contactReset: (state, action) => {
      state.loading = false;
      state.error = null;
      state.message = null;
    },

    requestCourseRequest: (state) => {
      state.loading = true;
    },
    requestCourseSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    requestCourseFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    requestCourseReset: (state, action) => {
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
  contactRequest,
  contactSuccess,
  contactFail,
  contactReset,
  requestCourseRequest,
  requestCourseSuccess,
  requestCourseFail,
  requestCourseReset,
  clearError,
  clearMessage,
} = otherSlice.actions;

export default otherSlice.reducer;

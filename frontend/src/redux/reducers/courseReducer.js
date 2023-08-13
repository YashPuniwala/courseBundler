import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  courses: [],
  lectures: [],
  course: [],
  message: null,
  error: null
};

const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    getAllCoursesRequest: (state) => {
      state.loading = true;
    },
    getAllCoursesSuccess: (state, action) => {
      state.loading = false;
      state.courses = action.payload;
    },
    getAllCoursesFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getAllCoursesReset: (state, action) => {
      state.loading = false;
      state.error = null;
    },


    getAllLecturesRequest: (state) => {
      state.loading = true;
    },
    getAllLecturesSuccess: (state, action) => {
      state.loading = false;
      state.lectures = action.payload;
    },
    getAllLecturesFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getAllLecturesReset: (state, action) => {
      state.loading = false;
      state.error = null;
    },


    getCourseDetailsRequest: (state) => {
      state.loading = true;
    },
    getCourseDetailsSuccess: (state, action) => {
      state.loading = false;
      state.course = action.payload;
    },
    getCourseDetailsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getCourseDetailsReset: (state, action) => {
      state.loading = false;
      state.error = null;
    },


    addToPlaylistRequest: (state) => {
      state.loading = true;
    },
    addToPlaylistSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    addToPlaylistFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addToPlaylistReset: (state, action) => {
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  getAllCoursesRequest,
  getAllCoursesSuccess,
  getAllCoursesFail,
  getAllCoursesReset,
  getAllLecturesRequest,
  getAllLecturesSuccess,
  getAllLecturesFail,
  getAllLecturesReset,
  getCourseDetailsRequest,
  getCourseDetailsSuccess,
  getCourseDetailsFail,
  getCourseDetailsReset,
  addToPlaylistRequest,
  addToPlaylistSuccess,
  addToPlaylistFail,
  addToPlaylistReset,
  clearError,
  clearMessage,
} = courseSlice.actions;

export default courseSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: null,
  error: null,
  message: null,
  users: []
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    getAdminStatsRequest: (state) => {
      state.loading = true;
    },
    getAdminStatsSuccess: (state, action) => {
      state.loading = false;
      state.stats = action.payload.stats;
      state.usersCount = action.payload.usersCount;
      state.subscriptionCount = action.payload.subscriptionCount;
      state.viewsCount = action.payload.viewsCount;
      state.subscriptionPercentage = action.payload.subscriptionPercentage;
      state.viewsPercentage = action.payload.viewsPercentage;
      state.usersPercentage = action.payload.usersPercentage;
      state.subscriptionProfit = action.payload.subscriptionProfit;
      state.viewsProfit = action.payload.viewsProfit;
      state.usersProfit = action.payload.usersProfit;
    },
    getAdminStatsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getAdminStatsReset: (state, action) => {
      state.loading = false;
      state.error = null;
      state.message = null;
    },
    getAllUsersRequest: (state) => {
      state.loading = true;
    },
    getAllUsersSuccess: (state, action) => {
      state.loading = false;
      state.users = action.payload;
    },
    getAllUsersFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getAllUsersReset: (state, action) => {
      state.loading = false;
      state.error = null;
      state.message = null;
    },

    updateUserRoleRequest: (state) => {
      state.loading = true;
    },
    updateUserRoleSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    updateUserRoleFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateUserRoleReset: (state, action) => {
      state.loading = false;
      state.error = null;
      state.message = null;
    },

    deleteUserRequest: (state) => {
      state.loading = true;
    },
    deleteUserSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    deleteUserFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteUserReset: (state, action) => {
      state.loading = false;
      state.error = null;
      state.message = null;
    },

    createCoursesRequest: (state) => {
      state.loading = true;
    },
    createCoursesSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    createCoursesFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    createCoursesReset: (state, action) => {
      state.loading = false;
      state.error = null;
      state.message = null;
    },

    updateCourseRequest: (state) => {
      state.loading = true;
    },
    updateCourseSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    updateCourseFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateCourseReset: (state, action) => {
      state.loading = false;
      state.error = null;
      state.message = null;
    },


    updateLectureRequest: (state) => {
      state.loading = true;
    },
    updateLectureSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    updateLectureFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateLectureReset: (state, action) => {
      state.loading = false;
      state.error = null;
      state.message = null;
    },

    deleteCoursesRequest: (state) => {
      state.loading = true;
    },
    deleteCoursesSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    deleteCoursesFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteCoursesReset: (state, action) => {
      state.loading = false;
      state.error = null;
      state.message = null;
    },


    addLectureRequest: (state) => {
      state.loading = true;
    },
    addLectureSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    addLectureFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addLectureReset: (state, action) => {
      state.loading = false;
      state.error = null;
      state.message = null;
    },

    deleteLectureRequest: (state) => {
      state.loading = true;
    },
    deleteLectureSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    deleteLectureFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteLectureReset: (state, action) => {
      state.loading = false;
      state.error = null;
      state.message = null;
    },
  },
});

export const {
  getAdminStatsRequest,
  getAdminStatsSuccess,
  getAdminStatsFail,
  getAdminStatsReset,
  getAllUsersRequest,
  getAllUsersSuccess,
  getAllUsersFail,
  getAllUsersReset,
  updateUserRoleRequest,
  updateUserRoleSuccess,
  updateUserRoleFail,
  updateUserRoleReset,
  deleteUserRequest,
  deleteUserSuccess,
  deleteUserFail,
  deleteUserReset,
  createCoursesRequest,
  createCoursesSuccess,
  createCoursesFail,
  createCoursesReset,
  updateCourseRequest,
  updateCourseSuccess,
  updateCourseFail,
  updateCourseReset,
  updateLectureRequest,
  updateLectureSuccess,
  updateLectureFail,
  updateLectureReset,
  deleteCoursesRequest,
  deleteCoursesSuccess,
  deleteCoursesFail,
  deleteCoursesReset,
  addLectureRequest,
  addLectureSuccess,
  addLectureFail,
  addLectureReset,
  deleteLectureRequest,
  deleteLectureSuccess,
  deleteLectureFail,
  deleteLectureReset,
} = adminSlice.actions;

export default adminSlice.reducer;

import {
  createCoursesRequest,
  createCoursesSuccess,
  createCoursesFail,
  deleteCoursesRequest,
  deleteCoursesSuccess,
  deleteCoursesFail,
  addLectureRequest,
  addLectureSuccess,
  addLectureFail,
  deleteLectureRequest,
  deleteLectureSuccess,
  deleteLectureFail,
  getAllUsersRequest,
  getAllUsersSuccess,
  getAllUsersFail,
  updateUserRoleRequest,
  updateUserRoleSuccess,
  updateUserRoleFail,
  deleteUserRequest,
  deleteUserSuccess,
  deleteUserFail,
  getAdminStatsRequest,
  getAdminStatsSuccess,
  getAdminStatsFail,
  updateCourseRequest,
  updateCourseSuccess,
  updateCourseFail,
  updateLectureRequest,
  updateLectureSuccess,
  updateLectureFail,
} from "../reducers/adminReducer";
import axios from "axios";

export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch(getAllUsersRequest());
    const { data } = await axios.get(`/api/v1/admin/users`, {
      withCredentials: true,
    });
    dispatch(getAllUsersSuccess(data.users));
    console.log(data.users);
  } catch (error) {
    dispatch(
      getAllUsersFail(
        error.response ? error.response.data.message : "Unknown error occurred"
      )
    );
  }
};

export const createCourse = (formData) => async (dispatch) => {
  try {
    dispatch(createCoursesRequest());
    const { data } = await axios.post(`/api/v1/createCourse`, formData, {
      response: {
        "Content-type": "multipart/form-data",
      },
      withCredentials: true,
    });
    dispatch(createCoursesSuccess(data.message));
  } catch (error) {
    dispatch(
      createCoursesFail(
        error.response ? error.response.data.message : "Unknown error occurred"
      )
    );
  }
};

export const deleteCourse = (id) => async (dispatch) => {
  try {
    dispatch(deleteCoursesRequest());
    const { data } = await axios.delete(
      `/api/v1/course/${id}`,
      { id },
      {
        withCredentials: true,
      }
    );
    dispatch(deleteCoursesSuccess(data.message));
  } catch (error) {
    dispatch(
      deleteCoursesFail(
        error.response ? error.response.data.message : "Unknown error occurred"
      )
    );
  }
};

export const updateCourse = (id, formData) => async (dispatch) => {
  try {
    dispatch(updateCourseRequest());
    const { data } = await axios.put(
      `/api/v1/admin/updateCourse/${id}`,
      formData,
      {
        response: {
          "Content-type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );
    dispatch(updateCourseSuccess(data.message));
  } catch (error) {
    dispatch(
      updateCourseFail(
        error.response ? error.response.data.message : "Unknown error occurred"
      )
    );
  }
};

export const updateLecture =
  (courseId, lectureId, formData) => async (dispatch) => {
    try {
      dispatch(updateLectureRequest());
      const { data } = await axios.put(
        `/api/v1/admin/updateLecture?courseId=${courseId}&lectureId=${lectureId}`,
        formData,
        {
          response: {
            "Content-type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      dispatch(updateLectureSuccess(data.message));
    } catch (error) {
      dispatch(
        updateLectureFail(
          error.response
            ? error.response.data.message
            : "Unknown error occurred"
        )
      );
    }
  };

export const addLecture = (id, formData) => async (dispatch) => {
  try {
    dispatch(addLectureRequest());
    const { data } = await axios.post(`/api/v1/course/${id}`, formData, {
      response: {
        "Content-type": "multipart/form-data",
      },
      withCredentials: true,
    });
    dispatch(addLectureSuccess(data.message));
    console.log(data.message);
  } catch (error) {
    dispatch(
      addLectureFail(
        error.response ? error.response.data.message : "Unknown error occurred"
      )
    );
  }
};

export const deleteLecture = (courseId, lectureId) => async (dispatch) => {
  try {
    dispatch(deleteLectureRequest());
    const { data } = await axios.delete(
      `/api/v1/lecture?courseId=${courseId}&lectureId=${lectureId}`,
      {
        withCredentials: true,
      }
    );
    dispatch(deleteLectureSuccess(data.message));
    console.log(data.message);
  } catch (error) {
    dispatch(
      deleteLectureFail(
        error.response ? error.response.data.message : "Unknown error occurred"
      )
    );
  }
};

export const updateUserRole = (id) => async (dispatch) => {
  try {
    dispatch(updateUserRoleRequest());
    const { data } = await axios.put(`/api/v1/admin/user/${id}`, {
      withCredentials: true,
    });
    dispatch(updateUserRoleSuccess(data.message));
    console.log(data.message);
  } catch (error) {
    dispatch(
      updateUserRoleFail(
        error.response ? error.response.data.message : "Unknown error occurred"
      )
    );
  }
};

export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch(deleteUserRequest());
    const { data } = await axios.delete(`/api/v1/admin/user/${id}`, {
      withCredentials: true,
    });
    dispatch(deleteUserSuccess(data.message));
    console.log(data.message);
  } catch (error) {
    console.log(error)
    dispatch(
      deleteUserFail(
        error.response ? error.response.data.message : "Unknown error occurred"
      )
    );
  }
};

export const getDashboardStats = () => async (dispatch) => {
  try {
    dispatch(getAdminStatsRequest());
    const { data } = await axios.get(`/api/v1/admin/stats`, {
      withCredentials: true,
    });
    dispatch(getAdminStatsSuccess(data));
    console.log(data);
  } catch (error) {
    dispatch(
      getAdminStatsFail(
        error.response ? error.response.data.message : "Unknown error occurred"
      )
    );
  }
};

import {
  addLectureFail,
  addLectureRequest,
  addLectureSuccess,
} from "../reducers/adminReducer";
import {
  getAllCoursesFail,
  getAllCoursesRequest,
  getAllCoursesSuccess,
  getAllLecturesFail,
  getAllLecturesRequest,
  getAllLecturesSuccess,
  getCourseDetailsFail,
  getCourseDetailsRequest,
  getCourseDetailsSuccess,
} from "../reducers/courseReducer";
import axios from "axios";

export const getAllCourses =
  (category, keyword, sortBy) => async (dispatch) => {
    try {
      dispatch(getAllCoursesRequest());
      const { data } = await axios.get(
        `/api/v1/courses?keyword=${keyword}&category=${category}&sortBy=${sortBy}`
      );
      dispatch(getAllCoursesSuccess(data.courses));
    } catch (error) {
      dispatch(
        getAllCoursesFail(
          error.response
            ? error.response.data.message
            : "Unknown error occurred"
        )
      );
    }
  };

export const getCourseDetails = (id) => async (dispatch) => {
  try {
    dispatch(getCourseDetailsRequest());
    const { data } = await axios.get(`/api/v1/getCourseDetails/${id}`);
    dispatch(getCourseDetailsSuccess(data.course));
  } catch (error) {
    dispatch(
      getCourseDetailsFail(
        error.response ? error.response.data.message : "Unknown error occurred"
      )
    );
  }
};

export const getAllAdminCourses = () => async (dispatch) => {
  try {
    dispatch(getAllCoursesRequest());
    const { data } = await axios.get(`/api/v1/courses`);
    dispatch(getAllCoursesSuccess(data.courses));
  } catch (error) {
    dispatch(
      getAllCoursesFail(
        error.response ? error.response.data.message : "Unknown error occurred"
      )
    );
  }
};

export const getAllLectures = (id) => async (dispatch) => {
  try {
    dispatch(getAllLecturesRequest());
    const { data } = await axios.get(`/api/v1/course/${id}`, {
      withCredentials: true,
    });
    dispatch(getAllLecturesSuccess(data.lectures));
  } catch (error) {
    dispatch(
      getAllLecturesFail(
        error.response ? error.response.data.message : "Unknown error occurred"
      )
    );
  }
};


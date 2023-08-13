import axios from "axios";
import {
  contactRequest,
  contactSuccess,
  contactFail,
  requestCourseRequest,
  requestCourseSuccess,
} from "../reducers/otherReducer";
import { requestCourseFail } from "../reducers/otherReducer";

export const contactUs = (name, email, message) => async (dispatch) => {
  try {
    dispatch(contactRequest());
    const { data } = await axios.post(
      `/api/v1/contact`,
      { name, email, message },
      {
        response: {
          "Content-type": "application/json",
        },
        withCredentials: true,
      }
    );
    dispatch(contactSuccess(data.message));
  } catch (error) {
    dispatch(
      contactFail(
        error.response ? error.response.data.message : "Unknown error occurred"
      )
    );
  }
};

export const requestCourse = (name, email, course) => async (dispatch) => {
  try {
    dispatch(requestCourseRequest());
    const { data } = await axios.post(
      `/api/v1/courseRequest`,
      { name, email, course },
      {
        response: {
          "Content-type": "application/json",
        },
        withCredentials: true,
      }
    );
    dispatch(requestCourseSuccess(data.message));
  } catch (error) {
    dispatch(
      requestCourseFail(
        error.response ? error.response.data.message : "Unknown error occurred"
      )
    );
  }
};

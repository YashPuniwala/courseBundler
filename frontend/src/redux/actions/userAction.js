import {
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
  resetPasswordRequest,
  resetPasswordSuccess,
  resetPasswordFail,
  deleteMyProfileRequest,
  deleteMyProfileSuccess,
  deleteMyProfileFail,
} from "../reducers/userReducer";
import axios from "axios";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch(loginRequest());
    const { data } = await axios.post(
      `/api/v1/login`,
      { email, password },
      {
        response: {
          "Content-type": "application/json",
        },
        withCredentials: true,
      }
    );
    dispatch(loginSuccess(data));
  } catch (error) {
    dispatch(
      loginFail(
        error.response ? error.response.data.message : "Unknown error occurred"
      )
    );
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    dispatch(loadUserRequest());
    const { data } = await axios.get(`api/v1/me`, {
      withCredentials: true,
    });
    dispatch(loadUserSuccess(data.user));
  } catch (error) {
    dispatch(
      loadUserFail(
        error.response ? error.response.data.message : "Unknown error occurred"
      )
    );
  }
};

export const logout = () => async (dispatch) => {
  try {
    dispatch(logoutRequest());
    const { data } = await axios.get(`api/v1/logout`);
    dispatch(logoutSuccess(data.message));
  } catch (error) {
    dispatch(
      logoutFail(
        error.response ? error.response.data.message : "Unknown error occurred"
      )
    );
  }
};

export const register = (formData) => async (dispatch) => {
  try {
    dispatch(registerRequest());
    const { data } = await axios.post(`api/v1/register`, formData, {
      response: {
        "Content-type": "multipart/form-data",
      },
      withCredentials: true,
    });
    dispatch(registerSuccess(data));
  } catch (error) {
    dispatch(
      registerFail(
        error.response ? error.response.data.message : "Unknown error occurred"
      )
    );
  }
};

export const forgetPassword = (email) => async (dispatch) => {
  try {
    dispatch(forgetPasswordRequest());
    const { data } = await axios.post(
      `api/v1/forgetPassword`,
      { email },
      {
        response: {
          "Content-type": "application/json",
        },
        withCredentials: true,
      }
    );
    dispatch(forgetPasswordSuccess(data));
  } catch (error) {
    dispatch(
      forgetPasswordFail(
        error.response ? error.response.data.message : "Unknown error occurred"
      )
    );
  }
};

export const resetPassword = (token, password) => async (dispatch) => {
  try {
    dispatch(resetPasswordRequest());
    const { data } = await axios.put(
      `/api/v1/resetPassword/${token}`,
      { password },
      {
        response: {
          "Content-type": "application/json",
        },
        withCredentials: true,
      }
    );
    dispatch(resetPasswordSuccess(data));
  } catch (error) {
    dispatch(
      resetPasswordFail(
        error.response ? error.response.data.message : "Unknown error occurred"
      )
    );
  }
};


export const deleteMyProfile = () => async (dispatch) => {
  try {
    dispatch(deleteMyProfileRequest());
    const { data } = await axios.delete(
      `/api/v1/me`,
      {
        response: {
          "Content-type": "application/json",
        },
        withCredentials: true,
      }
    );
    dispatch(deleteMyProfileSuccess(data.message));
  } catch (error) {
    dispatch(
      deleteMyProfileFail(
        error.response ? error.response.data.message : "Unknown error occurred"
      )
    );
  }
};

import {
  removeFromPlaylistFail,
  removeFromPlaylistRequest,
  removeFromPlaylistSuccess,
  changePasswordFail,
  changePasswordRequest,
  changePasswordSuccess,
  updateProfileFail,
  updateProfilePictureRequest,
  updateProfilePictureSuccess,
  updateProfileRequest,
  updateProfileSuccess,
} from "../reducers/profileReducer";
import {
  addToPlaylistFail,
  addToPlaylistRequest,
  addToPlaylistSuccess,
} from "../reducers/courseReducer";
import axios from "axios";

export const updateProfile = (name, email) => async (dispatch) => {
  try {
    dispatch(updateProfileRequest());
    const { data } = await axios.put(
      `/api/v1/updateProfile`,
      { name, email },
      {
        response: {
          "Content-type": "application/json",
        },
        withCredentials: true,
      }
    );
    dispatch(updateProfileSuccess(data.message));
    console.log(data.message);
  } catch (error) {
    dispatch(
      updateProfileFail(
        error.response ? error.response.data.message : "Unknown error occurred"
      )
    );
  }
};

export const changePassword =
  (oldPassword, newPassword, confirmPassword) => async (dispatch) => {
    try {
      dispatch(changePasswordRequest());
      const { data } = await axios.put(
        `/api/v1/changePassword`,
        { oldPassword, newPassword, confirmPassword },
        {
          response: {
            "Content-type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      dispatch(changePasswordSuccess(data.message));
      console.log(data.message);
    } catch (error) {
      dispatch(
        changePasswordFail(
          error.response
            ? error.response.data.message
            : "Unknown error occurred"
        )
      );
    }
  };

export const updateProfilePicture = (formData) => async (dispatch) => {
  try {
    dispatch(updateProfilePictureRequest());
    const { data } = await axios.put(`/api/v1/updateProfilePicture`, formData, {
      response: {
        "Content-type": "multipart/form-data",
      },
      withCredentials: true,
    });
    dispatch(updateProfileSuccess(data.message));
    console.log(data.message);
  } catch (error) {
    dispatch(
      updateProfilePictureSuccess(
        error.response ? error.response.data.message : "Unknown error occurred"
      )
    );
  }
};

export const addToPlaylist = (id) => async (dispatch) => {
  try {
    dispatch(addToPlaylistRequest());
    const { data } = await axios.post(
      `/api/v1/addToPlaylist`,
      { id },
      {
        response: {
          "Content-type": "application/json",
        },
        withCredentials: true,
      }
    );
    dispatch(addToPlaylistSuccess(data.message));
    console.log(data.message, "Addtoplatlist");
  } catch (error) {
    dispatch(
      addToPlaylistFail(
        error.response ? error.response.data.message : "Unknown error occurred"
      )
    );
  }
};

export const removeFromPlaylist = (id) => async (dispatch) => {
  try {
    dispatch(removeFromPlaylistRequest());
    const { data } = await axios.delete(
      `/api/v1/removeFromPlaylist/${id}`,
      { id },
      {
        response: {
          "Content-type": "application/json",
        },
        withCredentials: true,
      }
    );
    dispatch(removeFromPlaylistSuccess(data.message));
  } catch (error) {
    dispatch(
      removeFromPlaylistFail(
        error.response ? error.response.data.message : "Unknown error occurred"
      )
    );
  }
};

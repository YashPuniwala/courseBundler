import React, { useContext, useEffect, useState } from "react";
import { Box, Typography, Button, Stack } from "@mui/material";
import Sidebar from "../sidebar";
import { useDispatch, useSelector } from "react-redux";
import {
  updateLecture,
} from "../../../redux/actions/adminAction";
import { AlertContext } from "../../../App";
import Loader from "../../layout/loader/loader";
import {
  updateLectureReset,
} from "../../../redux/reducers/adminReducer";
import { useLocation } from "react-router-dom";

const EditCourseLecturePage = () => {
  const { showAlert } = useContext(AlertContext);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState("");
  const [videoPrev, setVideoPrev] = useState("");

  const dispatch = useDispatch();
  const { loading, error, message } = useSelector((state) => state.admin);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const courseId = searchParams.get("courseId");
  const lectureId = searchParams.get("lectureId");

  const onImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setVideoPrev(reader.result);
      setVideo(file);
    };
  };

  console.log(courseId, lectureId, "courseId, lectureId")

  const submitHandler = (e, courseId, lectureId) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.append("title", title);
    myForm.append("description", description);
    myForm.append("file", video);

    dispatch(updateLecture(courseId, lectureId, myForm));
    console.log("Clicked");
  };

  useEffect(() => {
    if (error) {
      showAlert("error", error);
      dispatch(updateLectureReset());
    }

    if (message) {
      showAlert("success", message);
      dispatch(updateLectureReset());
      setTitle("");
      setDescription("");
    }
  }, [dispatch, showAlert, error, message]);

  return loading ? (
    <Loader />
  ) : (
    <Box className="createCourse-container">
      <form>
        <Typography
          variant="h4"
          className="coursebundler"
          sx={{ marginBottom: "20px", color: "white" }}
        >
          Update Lecture
        </Typography>

        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            required
            className="createCourse-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <input
            type="text"
            required
            className="createCourse-input"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div>
          <Button
            variant="outlined"
            component="label"
            sx={{
              width: "100%",
              height: "100%",
              textTransform: "none",
              color: "purple",
              marginTop: "13px",
              fontSize: "15px",
              transition: "0.5s",
              borderColor: "white",
              ":hover": {
                color: "purple",
              },
              "&.MuiButtonBase-root:hover": {
                borderColor: "white",
                color: "purple",
                backgroundColor: "#212121",
              },
            }}
          >
            Choose File
            <input
              hidden
              accept="video/*"
              multiple
              type="file"
              onChange={onImageChange}
            />
          </Button>
        </div>

        {videoPrev && (
        <Stack
            direction="column"
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <video
              controlsList="nodownload"
              controls
              src={videoPrev}
              style={{
                objectFit: "contain",
                marginTop: "20px",
                border: "1px solid rgba(0, 0, 0, 0.18)",
                width: "100%",
                borderRadius: "5px",
                outline: "none",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.175)",
              }}
            ></video>
          </Stack>
        )}

        <Box
          className="form-group"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: { xs: "center", sm: "flex-start" },
          }}
        >
          <Button
            variant="contained"
            sx={{
              width: "100%",
              textTransform: "none",
              backgroundColor: "purple",
              color: "white",
              marginTop: "20px",
              fontSize: "15px",
              transition: "0.5s",
              ":hover": {
                backgroundColor: "purple",
              },
            }}
            onClick={(e) => submitHandler(e, courseId, lectureId)}
          >
            Create
          </Button>
        </Box>
      </form>

      <Sidebar />
    </Box>
  );
};

export default EditCourseLecturePage;

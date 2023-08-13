import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getCourseDetails,
} from "../../../redux/actions/courseAction";
import { addLecture } from "../../../redux/actions/adminAction";
import { useParams } from "react-router-dom";
import { Button, Stack, Typography } from "@mui/material";
import VideoCard from "./videoCard";

const GetCourseDetails = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState("");
  const [videoPrev, setVideoPrev] = useState("");

  const dispatch = useDispatch();
  const { id } = useParams();
  const { course, lectures, loading } = useSelector((state) => state.course);

  const onChangeVideoHandler = (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = () => {
    console.log("onloadend called");
    console.log(reader.result);
    console.log(file, "file")
    setVideoPrev(reader.result);
    setVideo(file);
  };
  reader.onerror = (err) => {
    console.error(err);
  }
};

const addLectureHandler = (e) => {
  e.preventDefault();
  const myForm = new FormData();
  myForm.append("title", title);
  myForm.append("description", description);
  myForm.append("file", video);
  dispatch(addLecture(course._id, myForm));
};

  useEffect(() => {
    dispatch(getCourseDetails(id));
  }, [dispatch, id]);

  return (
    <div>
      <div>
        <form encType="multipart/form-data">
          <Stack
            direction="column"
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography sx={{ textAlign: "center" }} variant="h5" mb={2}>
              Add Lecture
            </Typography>

            <h2>Course Title: {course.title}</h2>
            <h2>Course Id: {course._id}</h2>

            <input
              className="adminCourses-input"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <input
              className="adminCourses-input"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <Button
              variant="outlined"
              component="label"
              sx={{
                width: { xs: "90%", sm: "110%" },
                height: "100%",
                textTransform: "none",
                color: "purple",
                marginTop: "13px",
                fontSize: "15px",
                transition: "0.5s",
                borderColor: "white",
                "&.MuiButtonBase-root:hover": {
                  borderColor: "white",
                  color: "purple",
                  backgroundColor: "#212121",
                },
              }}
            >
              Choose File
              <input
              required
                hidden
                accept="video/mp4"
                multiple
                type="file"
                onChange={onChangeVideoHandler}
              />
            </Button>

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

            <Button
              variant="text"
              size="small"
              sx={{
                marginTop: "15px",
                width: { xs: "90%", sm: "110%" },
                textTransform: "none",
                backgroundColor: "purple",
                color: "white",
                fontSize: "15px",
                transition: "0.5s",
                ":hover": {
                  backgroundColor: "purple",
                },
              }}
              disabled={loading}
              onClick={addLectureHandler}
            >
              Upload
            </Button>
          </Stack>
        </form>

        {lectures &&
          lectures.map((lecture) => (
            <VideoCard
              title={lecture.title}
              description={lecture.description}
              num={1}
              lectureId={lecture._id}
              id={"ddasdas"}
              courseId={course._id}
              // deleteLectureButtonHandler={deleteLectureButtonHandler}
              addLectureHandler={addLectureHandler}
            />
          ))}
      </div>
    </div>
  );
};

export default GetCourseDetails;

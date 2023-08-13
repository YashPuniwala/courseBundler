import React, { useEffect, useContext, useState } from "react";
import VideoCard from "./videoCard";
import { Box, Grid, Stack, Typography, Button, Modal } from "@mui/material";
import Sidebar from "../sidebar";
import { useSelector, useDispatch } from "react-redux";
import "./coursesModal.css";
import { deleteLecture } from "../../../redux/actions/adminAction";
import { getAllLectures } from "../../../redux/actions/courseAction";

const CoursesModal = ({
  open,
  handleOpen,
  handleClose,
  courseId,
  courseTitle,
  addLectureHandler,
  loading,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState("");
  const [videoPrev, setVideoPrev] = useState("");

  const dispatch = useDispatch();
  const { lectures } = useSelector((state) => state.course);

  const deleteLectureButtonHandler = async (courseId, lectureId) => {
    await dispatch(deleteLecture(courseId, lectureId));
    dispatch(getAllLectures(courseId));
    console.log(courseId, "courseId");
    console.log(lectureId, "lectureId");
  };

  const onChangeVideoHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setVideoPrev(reader.result);
      setVideo(file);
    };
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          zindex: 1000,
          boxShadow: 24,
          backgroundColor: "#212121",
          maxHeight: "calc(100vh - 30px)", // adjust the value as needed
          height: "2000px",
          overflow: "auto",
          padding: 2,
        }}
      >
        <Button onClick={handleClose}>Cancel</Button>
        <Grid
          container
          sx={{ paddingX: { xs: 0, sm: 8 }, paddingY: 10, color: "white" }}
        >
          <Grid item xs={20} sm={9}>
            <Box
              sx={{ width: "100%", textAlign: { xs: "center", sm: "left" } }}
            >
              <Box>
                <Typography sx={{ textTransform: "none" }} variant="h4">
                  {courseTitle}
                </Typography>
                <Typography sx={{ fontSize: "15px", opacity: 0.4 }}>
                  id {courseId}
                </Typography>
              </Box>

              <Typography sx={{ textTransform: "none" }} variant="h5" mt={2}>
                Lectures
              </Typography>
              {lectures &&
                lectures.map((lecture) => (
                  <VideoCard
                    key={lecture._id}
                    title={lecture.title}
                    description={lecture.description}
                    num={1}
                    lectureId={lecture._id}
                    id={"ddasdas"}
                    loading={loading}
                    courseId={courseId}
                    deleteLectureButtonHandler={deleteLectureButtonHandler}
                  />
                ))}
            </Box>
          </Grid>

          <Grid
            item
            xs={15}
            sm={3}
            sx={{
              marginTop: {
                xs: "5rem",
                sm: "0",
              },
              height: { xs: "auto", sm: "500px" },
            }}
          >
            <form>
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
                  onClick={(e) =>
                    addLectureHandler(e, courseId, title, description, video)
                  }
                >
                  Upload
                </Button>
              </Stack>
            </form>
          </Grid>
        </Grid>
        <Sidebar />
      </Box>
    </Modal>
  );
};

export default CoursesModal;

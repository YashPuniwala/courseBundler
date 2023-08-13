import React, { useEffect, useState } from "react";
import Sidebar from "../../admin/sidebar";
import { Box, Button, Grid, Modal, Stack, Typography } from "@mui/material";

const UpdateCourseModal = ({
  updateCourseOpen,
  updateCourseHandleOpen,
  updateCourseHandleClose,
  updatedCourseButtonHandler,
  courseId,
  courseTitle,
  courseDescription,
  courseCategory,
  courseCreatedBy,
  courseImage,
  courseImagePrev,
}) => {
  const [title, setTitle] = useState(courseTitle);
  const [description, setDescription] = useState(courseDescription);
  const [category, setCategory] = useState(courseCategory);
  const [createdBy, setCreatedBy] = useState(courseCreatedBy);
  const [image, setImage] = useState(courseImage);
  const [imagePrev, setImagePrev] = useState(courseImagePrev);

  const categories = [
    "Web Development",
    "App Development",
    "Artificial Intelligence",
    "Data Structure And Algorithm",
    "Data Scientist",
    "Game Development",
  ];

  useEffect(() => {
    setTitle(courseTitle || "");
    setDescription(courseDescription || "");
    setCategory(courseCategory || "");
    setCreatedBy(courseCreatedBy || "");
    setImage(courseImage || "");
    setImagePrev(courseImagePrev || "");
  }, [
    updateCourseOpen,
    courseTitle,
    courseDescription,
    courseCategory,
    courseCreatedBy,
    courseImage,
    courseImagePrev,
  ]);

  const onChangeImageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImagePrev(reader.result);
      setImage(file);
    };
  };

  console.log(title, courseTitle);

  return (
    <Modal
      open={updateCourseOpen}
      onClose={updateCourseHandleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          backgroundColor: "#212121",
          overflow: "auto",
          padding: 2,
        }}
      >
        <Button onClick={updateCourseHandleClose}>Cancel</Button>
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

                <select
                style={{
                    fontSize: "17px",
                    padding: "6px",
                    width: "110%",
                    height: "40px",
                    backgroundColor: "white",
                    borderRadius: "4px",
                    border: "1px solid silver",
                    margin: "7px 0 18px 0",
                    boxSizing: "border-box",
                    webkitTransition: "0.5s",
                    transition: "0.5s",
                    outline: "none",
                }}
                  className="createCourse-input"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option key="" value="">
                    Select a category
                  </option>
                  {categories.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>

                <input
                  className="adminCourses-input"
                  placeholder="Created By"
                  value={createdBy}
                  onChange={(e) => setCreatedBy(e.target.value)}
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
                    multiple
                    type="file"
                    onChange={onChangeImageHandler}
                  />
                </Button>

                {imagePrev && (
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
                    <img
                      src={imagePrev}
                      alt="CourseImage"
                      style={{ width: "50px" }}
                    />
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
                  //   disabled={loading}
                  onClick={(e) =>
                    updatedCourseButtonHandler(
                      e,
                      courseId,
                      title,
                      description,
                      category,
                      createdBy,
                      image
                    )
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

export default UpdateCourseModal;

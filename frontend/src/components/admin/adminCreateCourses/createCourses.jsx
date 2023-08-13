import React, { useContext, useEffect, useState } from "react";
import { Space } from "antd";
import { Box, Typography, Button } from "@mui/material";
import Sidebar from "../sidebar";
import { useDispatch, useSelector } from "react-redux";
import { createCourse } from "../../../redux/actions/adminAction";
import { AlertContext } from "../../../App";
import "./createCourse.css";
import Loader from "../../layout/loader/loader";
import { createCoursesReset } from "../../../redux/reducers/adminReducer";
import { loadUser } from "../../../redux/actions/userAction";

const CreateCourses = () => {
  const { showAlert } = useContext(AlertContext);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [imagePrev, setImagePrev] = useState("");

  const dispatch = useDispatch();
  const { loading, error, message } = useSelector((state) => state.admin);

  const categories = [
    "Web Development",
    "App Development",
    "Artificial Intelligence",
    "Data Structure And Algorithm",
    "Data Scientist",
    "Game Development",
  ];

  const onImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImagePrev(reader.result);
      setImage(file);
    };
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.append("title", title);
    myForm.append("description", description);
    myForm.append("category", category);
    myForm.append("createdBy", createdBy);
    myForm.append("file", image);

    dispatch(createCourse(myForm));
    console.log("Clicked");
  };

  useEffect(() => {
    if (error) {
      showAlert("error", error);
      dispatch(createCoursesReset());
    }

    if (message) {
      showAlert("success", message);
      dispatch(createCoursesReset());
      setTitle("")
      setDescription("")
      setCategory("")
      setCreatedBy("")
      setImage("")
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
          Create Courses
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
        <div className="form-group">
          <label>Created By</label>
          <input
            type="text"
            required
            className="createCourse-input"
            value={createdBy}
            onChange={(e) => setCreatedBy(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Category</label>
          <select
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
              accept="image/*"
              multiple
              type="file"
              onChange={onImageChange}
            />
          </Button>
        </div>

        {imagePrev && (
          <Space
            direction="horizontal"
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img
              src={imagePrev}
              alt="CourseImage"
              style={{
                width: "200px",
                objectFit: "contain",
                marginTop: "30px",
              }}
            />
          </Space>
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
            onClick={submitHandler}
          >
            Create
          </Button>
        </Box>
      </form>

      <Sidebar />
    </Box>
  );
};

export default CreateCourses;

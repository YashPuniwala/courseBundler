import React, { useState, useEffect, useContext } from "react";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import { AudioOutlined } from "@ant-design/icons";
import { Input, Space } from "antd";
import CourseCard from "../courses/courseCard";
import { useDispatch, useSelector } from "react-redux";
import { AlertContext } from "../../App";
import { getAllCourses } from "../../redux/actions/courseAction";
import { addToPlaylist } from "../../redux/actions/profileAction";
import { getAllCoursesReset } from "../../redux/reducers/courseReducer";
import { addToPlaylistReset } from "../../redux/reducers/courseReducer";
import "./courses.css";
import { loadUser } from "../../redux/actions/userAction";

const { Search } = Input;

const Courses = () => {
  const { showAlert } = useContext(AlertContext);

  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");
  const [sortBy, setSortBy] = useState("");

  const dispatch = useDispatch();
  const { loading, error, message, courses } = useSelector((state) => state.course);

  const categories = [
    "Web Development",
    "App Development",
    "Artificial Intelligence",
    "Data Structure And Algorithm",
    "Data Scientist",
    "Game Development",
  ];

  const addToPlaylistHandler = async(id) => {
    await dispatch(addToPlaylist(id));
    dispatch(loadUser())
  };

  const handleSortByChange = (event) => {
    setSortBy(event.target.value);
  };

  useEffect(() => {
    dispatch(getAllCourses(category, keyword, sortBy));

    if (error) {
      showAlert("error", error);
      dispatch(getAllCoursesReset());
    }

    if (message) {
      showAlert("success", message);
      dispatch(addToPlaylistReset());
    }
  }, [dispatch, category, keyword, sortBy, showAlert, error, message]);

  return (
    <Box
      sx={{
        minHeight: "110vh",
        padding: "2vmax 8vmax 0vmax 8vmax",
        backgroundColor: "#212121",
      }}
    >
      <Box sx={{ marginTop: { xs: "10px", sm: "0px" } }}>
        <Typography
          sx={{
            margin: "15px",
            textAlign: { xs: "center", sm: "left" },
            color: "white",
          }}
          variant="h4"
        >
          All Courses
        </Typography>

        <Search
          className="input"
          placeholder="Search a course....."
          enterButton="Search"
          size="large"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </Box>

      <Box
        className="sort-by"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: "10px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{ color: "white", marginRight: "10px" }}
            variant="body1"
          >
            Sort by:
          </Typography>
          <select
            value={sortBy}
            onChange={handleSortByChange}
            style={{
              backgroundColor: "#413F42",
              color: "white",
              padding: "8px 12px",
              borderRadius: "4px",
              border: "none",
              fontSize: "14px",
              cursor: "pointer",
              boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.2)",
              "&:hover": {
                backgroundColor: "#2B2B2B",
              },
              "&:focus": {
                outline: "none",
                boxShadow: "0px 0px 0px 2px #FFF, 0px 0px 0px 4px #007FFF",
              },
            }}
          >
            <option value="createdAt,title,views">Default</option>
            <option value="-createdAt">Newest First</option>
            <option value="title">Title A-Z</option>
            <option value="views">Most Popular</option>
          </select>
        </div>

        <div
          style={{
            dispaly: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button
            sx={{
              fontSize: "14px",
              textTransform: "none",
              backgroundColor: "#413F42",
              color: "white",
              ":hover": {
                backgroundColor: "#2B2B2B",
              },
            }}
            variant="contained"
            onClick={() => {
              setCategory("");
              setSortBy("");
            }}
          >
            Clear Filters
          </Button>
        </div>
      </Box>

      <Box
        sx={{
          display: "flex",
          overflowY: "auto",
          padding: "15px 15px 15px 0px",
          "&::-webkit-scrollBar": {
            display: "none",
          },
        }}
      >
        {categories.map((item, index) => (
          <div key={index}>
            <Button
              sx={{
                fontSize: "14px",
                minWidth: "15rem",
                marginRight: "9px",
                textTransform: "none",
                backgroundColor: "#413F42",
                color: "white",
                ":hover": {
                  backgroundColor: "#2B2B2B",
                },
              }}
              variant="contained"
              onClick={() => setCategory(item)}
            >
              {item}
            </Button>
          </div>
        ))}
      </Box>

      <Grid
        container
        spacing={2}
        mt={2}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        {courses.length > 0 ? (
          courses.map((course) => (
            <Grid item xs={12} sm={6} md={4} key={course._id}>
              <CourseCard
                title={course.title}
                description={course.description}
                views={course.views}
                imageSrc={course.poster.url}
                id={course._id}
                creator={course.createdBy}
                lectureCount={course.numOfVideos}
                loading={loading}
                addToPlaylistHandler={addToPlaylistHandler}
              />
            </Grid>
          ))
        ) : (
          <Typography variant="h5" sx={{ color: "white" }}>
            No Courses Available
          </Typography>
        )}
      </Grid>
    </Box>
  );
};

export default Courses;

import React, { useContext, useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Paper from "@mui/material/Paper";
import Sidebar from "../sidebar";
import Loader from "../../layout/loader/loader";
import CoursesModal from "./coursesModal";
import UpdateCourseModal from "./updateCourseModal";
import { styled } from "@mui/material/styles";
import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllAdminCourses,
  getAllLectures,
} from "../../../redux/actions/courseAction";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { AlertContext } from "../../../App";
import {
  addLectureReset,
} from "../../../redux/reducers/adminReducer";
import { deleteCourse, updateCourse } from "../../../redux/actions/adminAction";
import { addLecture } from "../../../redux/actions/adminAction";

export default function AdminCourses() {
  const [open, setOpen] = useState(false);
  const [updateCourseOpen, setUpdateCourseOpen] = useState(false)
  const [courseId, setCourseId] = useState("");
  const [courseTitle, setCourseTitle] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [courseCategory, setCourseCategory] = useState("");
  const [courseCreatedBy, setCourseCreatedBy] = useState("");
  const [courseImage, setCourseImage] = useState("")
  const [courseImagePrev, setCourseImagePrev] = useState("")
  const [image, setImage] = useState("");
  const [imagePrev, setImagePrev] = useState("");

  const dispatch = useDispatch();
  const { showAlert } = useContext(AlertContext);
  const { courses } = useSelector((state) => state.course);
  const { loading, error, message } = useSelector((state) => state.admin);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#212121",
      color: "white",
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const updateCourseHandleOpen = () => setUpdateCourseOpen(true);
  const updateCourseHandleClose = () => setUpdateCourseOpen(false);

  const addLectureHandler = async (e, courseId, title, description, video) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.append("title", title);
    myForm.append("description", description);
    myForm.append("file", video);

    await dispatch(addLecture(courseId, myForm));
    dispatch(getAllLectures(courseId));
  };

  const viewLectureButton = (courseId, courseTitle) => {
    dispatch(getAllLectures(courseId));
    setOpen(true);
    setCourseId(courseId);
    setCourseTitle(courseTitle);
  };

  const deleteButtonHandler = (courseId) => {
    dispatch(deleteCourse(courseId));
  };

  const updateCourseButtonHandler = async (
    e,
    courseId,
    title,
    description,
    category,
    createdBy,
    image
  ) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.append("title", title);
    myForm.append("description", description);
    myForm.append("category", category);
    myForm.append("createdBy", createdBy);
    myForm.append("file", image);

    await dispatch(updateCourse(courseId, myForm));
  };

  const viewCourseButton = (
    courseId,
    courseTitle,
    courseDescription,
    courseCategory,
    courseCreatedBy,
    courseImage
  ) => {
    setUpdateCourseOpen(true);
    setCourseId(courseId);
    setCourseTitle(courseTitle);
    setCourseDescription(courseDescription);
    setCourseCategory(courseCategory);
    setCourseCreatedBy(courseCreatedBy);
    setCourseImage(courseImage)
    setCourseImagePrev(courseImagePrev)
  };

  useEffect(() => {
    if (error) {
      showAlert("error", error);
      dispatch(addLectureReset());
    }

    if (message) {
      showAlert("success", message);
      dispatch(addLectureReset());
    }

    dispatch(getAllAdminCourses());
  }, [dispatch, error, message, showAlert]);

  return loading ? (
    <Loader />
  ) : (
    <Box
      sx={{
        backgroundColor: "#212121",
        height: "auto",
        overFlowX: "auto",
        paddingX: { xs: 1, sm: 10 },
        paddingY: { xs: 9, sm: 15 },
      }}
    >
      <Typography
        sx={{
          width: "100%",
          textTransform: "none",
          color: "white",
          marginBottom: "40px",
          textAlign: { xs: "center", sm: "left" },
        }}
        variant="h4"
      >
        All Courses
      </Typography>
      <TableContainer component={Paper} sx={{ backgroundColor: "#212121" }}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow sx={{ borderBottom: "2px solid grey" }}>
              <StyledTableCell sx={{ backgroundColor: "#212121" }}>
                #ID
              </StyledTableCell>
              <StyledTableCell align="left">POSTER</StyledTableCell>
              <StyledTableCell align="left">TITLE</StyledTableCell>
              <StyledTableCell align="left">CATEGORY</StyledTableCell>
              <StyledTableCell align="left">CREATOR</StyledTableCell>
              <StyledTableCell align="right">VIEWS</StyledTableCell>
              <StyledTableCell align="right">LECTURES</StyledTableCell>
              <StyledTableCell align="right">ACTION</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courses.map((course) => (
              <StyledTableRow
                key={course._id}
                sx={{ borderBottom: "2px solid grey" }}
              >
                <StyledTableCell
                  component="th"
                  scope="row"
                  sx={{ color: "white" }}
                >
                  {course._id}
                </StyledTableCell>
                <StyledTableCell sx={{ color: "white" }} align="left">
                  <img
                    src={course.poster.url}
                    style={{ width: "100px" }}
                    alt="adminCourseImage"
                  />
                </StyledTableCell>
                <StyledTableCell sx={{ color: "white" }} align="left">
                  {course.title}
                </StyledTableCell>
                <StyledTableCell
                  sx={{ color: "white", textTransform: "uppercase" }}
                  align="left"
                >
                  {course.category}
                </StyledTableCell>
                <StyledTableCell sx={{ color: "white" }} align="left">
                  {course.createdBy}
                </StyledTableCell>
                <StyledTableCell sx={{ color: "white" }} align="left">
                  {course.views}
                </StyledTableCell>
                <StyledTableCell sx={{ color: "white" }} align="left">
                  {course.numOfVideos}
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Stack direction="row" justifyContent="right">
                    <Button
                      variant="text"
                      size="small"
                      sx={{
                        width: "120px",
                        textTransform: "none",
                        backgroundColor: "purple",
                        color: "white",
                        fontSize: "15px",
                        transition: "0.5s",
                        ":hover": {
                          backgroundColor: "purple",
                        },
                      }}
                      onClick={() =>
                        viewLectureButton(course._id, course.title)
                      }
                    >
                      View Lectures
                    </Button>
                    <IconButton
                      sx={{
                        width: "40px",
                        marginLeft: "15px",
                        borderRadius: "20%",
                      }}
                      disabled={loading}
                      onClick={() =>
                        viewCourseButton(
                          course._id,
                          course.title,
                          course.description,
                          course.category,
                          course.createdBy,
                          course.poster.url[0]
                        )
                      }
                    >
                      <EditIcon fontSize="medium" sx={{ color: "white" }} />
                    </IconButton>
                    <IconButton
                      sx={{
                        width: "40px",
                        marginLeft: "15px",
                        borderRadius: "20%",
                      }}
                      disabled={loading}
                      onClick={() => deleteButtonHandler(course._id)}
                    >
                      <DeleteIcon fontSize="medium" sx={{ color: "white" }} />
                    </IconButton>
                  </Stack>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography
        sx={{
          textTransform: "none",
          color: "grey",
          width: "100%",
          textAlign: "center",
          marginTop: "40px",
        }}
      >
        All available user in database
      </Typography>

      <CoursesModal
        handleOpen={handleOpen}
        handleClose={handleClose}
        open={open}
        courses={courses}
        courseId={courseId}
        courseTitle={courseTitle}
        addLectureHandler={addLectureHandler}
        loading={loading}
      />

      <UpdateCourseModal
        updateCourseOpen={updateCourseOpen}
        updateCourseHandleOpen={updateCourseHandleOpen}
        updateCourseHandleClose={updateCourseHandleClose}
        updatedCourseButtonHandler={updateCourseButtonHandler} // add this line
        courseId={courseId}
        courseTitle={courseTitle}
        courseDescription={courseDescription}
        courseCategory={courseCategory}
        courseCreatedBy={courseCreatedBy}
        courseImage={courseImage}
        courseImagePrev={courseImagePrev}
      />

      <Sidebar />
    </Box>
  );
}

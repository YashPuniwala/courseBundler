import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AlertContext } from "../../App";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Stack, Typography } from "@mui/material";
import { requestCourse } from "../../redux/actions/otherAction";
import { requestCourseReset } from "../../redux/reducers/otherReducer";
import "./request.css";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("");

  const dispatch = useDispatch();
  const { showAlert } = useContext(AlertContext);
  const { loading, error, message } = useSelector((state) => state.other);

  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(requestCourse(name, email, course));
    setName("");
    setEmail("");
    setCourse("");
  };

  useEffect(() => {
    if (error) {
      showAlert("error", error);
      dispatch(requestCourseReset());
    }

    if (message) {
      showAlert("success", message);
      dispatch(requestCourseReset());
    }
  }, [dispatch, showAlert, error, message]);

  return (
    <Box className="request-box">
      <form className="request-form">
        <Typography
          variant="h4"
          className="coursebundler"
          sx={{ marginBottom: "20px", color: "white" }}
        >
          Request New Course
        </Typography>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            required
            className="request-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Email Address</label>
          <input
            type="email"
            required
            className="request-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Course</label>
          <textarea
            className="request-input-message"
            rows="5"
            cols="50"
            name="comment"
            placeholder="Explain the course..."
            value={course}
            onChange={(e) => setCourse(e.target.value)}
          />
        </div>

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
              textTransform: "none",
              backgroundColor: "#FFEA20",
              color: "black",
              marginTop: "10px",
              fontSize: "15px",
              transition: "0.5s",
              ":hover": {
                backgroundColor: "#FFE600",
              },
            }}
            disabled={loading}
            onClick={submitHandler}
          >
            Send Mail
          </Button>
        </Box>
        <Stack
          className="form-group"
          sx={{
            marginTop: "13px",
            marginBottom: "0",
            display: "flex",
            flexDirection: "row",
            justifyContent: { xs: "center", sm: "flex-start" },
          }}
        >
          <Typography sx={{ marginTop: "10px", color: "white" }}>
            See Available Courses!
          </Typography>
          <Link to="/courses" style={{ textDecoration: "none" }}>
            <Button
              className="loginBtn"
              sx={{
                textTransform: "none",
                fontSize: "15px",
                marginTop: { xs: "3px", sm: "2px" },
                color: "#FFEA20",
              }}
              variant="text"
            >
              Click
            </Button>
          </Link>
          <Typography
            sx={{ marginTop: { xs: "9px", sm: "9px" }, color: "white" }}
          >
            here
          </Typography>
        </Stack>
      </form>
    </Box>
  );
};

export default Contact;

import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { AlertContext } from "../../App";
import "./contact.css";
import { contactUs } from "../../redux/actions/otherAction";
import { contactReset } from "../../redux/reducers/otherReducer";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const { showAlert } = useContext(AlertContext);
  const {
    loading,
    error,
    message: otherMessage,
  } = useSelector((state) => state.other);

  const submitHandler = async(e) => {
    e.preventDefault();
    await dispatch(contactUs(name, email, message));
    setName("")
    setEmail("")
    setMessage("")
  };

  useEffect(() => {
    if (error) {
      showAlert("error", error);
      dispatch(contactReset());
    }

    if (otherMessage) {
      showAlert("success", otherMessage);
      dispatch(contactReset());
    }
  }, [dispatch, showAlert, error, otherMessage]);

  return (
    <Box className="contact-box">
      <form className="contact-form">
        <Typography
          variant="h4"
          className="coursebundler"
          sx={{ marginBottom: "20px", color: "white" }}
        >
          Contact Us
        </Typography>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            required
            className="contact-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Email Address</label>
          <input
            type="email"
            required
            className="contact-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Message</label>
          <textarea
            rows="5"
            cols="50"
            name="comment"
            placeholder="Your Message..."
            className="contact-input-message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
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
            Request for a course?
          </Typography>
          <Link to="/request" style={{ textDecoration: "none" }}>
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

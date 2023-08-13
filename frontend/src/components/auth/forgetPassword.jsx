import React, { useEffect, useState, useContext } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { forgetPassword } from "../../redux/actions/userAction";
import { AlertContext } from "../../App";
import { forgetPasswordReset } from "../../redux/reducers/userReducer";
import "./forgetPassword.css";

const ForgetPassword = () => {
  const { showAlert } = useContext(AlertContext);

  const [email, setEmail] = useState("");

  const dispatch = useDispatch();
  const { loading, message, error } = useSelector((state) => state.user);

  const submitHandler = (e) => {
    e.preventDefault();
     dispatch(forgetPassword(email));
  };

  useEffect(() => {
    if (error) {
      showAlert("error", error);
      dispatch(forgetPasswordReset());
    }

    if (message && message.success) {
      showAlert("success", message.message);
      dispatch(forgetPasswordReset());
    }

    return () => {
      //  clear the state values when the component is unmounted
      setEmail("");
    };
  }, [dispatch, error, message, showAlert]);

  return (
    <Box className="boxContainer">
      <form>
        <Typography
          variant="h4"
          className="coursebundler"
          sx={{ marginBottom: "40px", color: "white" }}
        >
          Forget Password?
        </Typography>
        <div className="form-group">
          <label>Email Address</label>
          <input
            type="email"
            required
            className="form-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
              width: "100%",
              height: "100%",
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
            Send Reset Link
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default ForgetPassword;

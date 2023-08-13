import React, { useState, useEffect, useContext } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../../redux/actions/profileAction";
import { AlertContext } from "../../App";
import { loadUser } from "../../redux/actions/userAction";
import "./changePassword.css";
import { changePasswordReset } from "../../redux/reducers/profileReducer";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const { showAlert } = useContext(AlertContext);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { message, error, loading } = useSelector((state) => state.profile);

  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(changePassword(oldPassword, newPassword, confirmPassword));
    dispatch(loadUser());
  };

  useEffect(() => {
    if (error) {
      showAlert("error", error);
      dispatch(changePasswordReset());
    }

    if (message) {
      showAlert("success", message);
      dispatch(changePasswordReset());
      navigate("/profile");
    }

    return () => {
      // clear the state values when the component is unmounted
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    };
  }, [dispatch, error, message, showAlert, navigate]);

  return (
    <Box className="changePassword-container">
      <form className="changePassword-form">
        <Typography
          className="coursebundler"
          variant="h4"
          sx={{ marginBottom: "20px", color: "white" }}
        >
          Change Password
        </Typography>
        <div className="form-group">
          <label>Old Password</label>
          <input
            className="changePassword-input"
            placeholder="Old Password"
            type="password"
            required
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>New Password</label>
          <input
            placeholder="New Password"
            type="password"
            required
            className="changePassword-input"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Confirm Password</label>
          <input
            placeholder="Confirm Password"
            type="password"
            required
            className="changePassword-input"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
            Change
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default ChangePassword;

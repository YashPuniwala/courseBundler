import React, { useContext, useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AlertContext } from "../../App";
import { useParams } from "react-router-dom";
import "./resetPassword.css";
import { resetPassword } from "../../redux/actions/userAction";
import { resetPasswordReset } from "../../redux/reducers/userReducer";

const ResetPassword = () => {
  const { showAlert } = useContext(AlertContext);
  
  const [password, setPassword] = useState("");

  const params = useParams();
  const dispatch = useDispatch();
  const { loading, message, error } = useSelector((state) => state.user);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(resetPassword(params.token, password));
  };

  useEffect(() => {
    if (error) {
      showAlert("error", error);
      dispatch(resetPasswordReset());
    }

    if (message && message.success) {
      showAlert("success", message.message);
      dispatch(resetPasswordReset());
      // navigate("/profile")
    }
  }, [dispatch, error, message, showAlert]);
  return (
    <div className="div-container">
      <form>
        <Typography
          variant="h4"
          sx={{ marginBottom: "30px", textAlign: "center", color: "white" }}
        >
          Reset Password
        </Typography>

        <div>
          <label>Password</label>
          <input
            type="password"
            required
            className="div-form-input"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div
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
            Reset Password
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;

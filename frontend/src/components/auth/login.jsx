import React, { useState } from "react";
import { Link } from "react-router-dom";
import { login } from "../../redux/actions/userAction";
import { Box, Typography, Button, Stack } from "@mui/material";
import { useDispatch } from "react-redux";
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <Box className="containers">
      <form className="containers-form">
        <Typography
          variant="h4"
          className="coursebundler"
          sx={{ marginBottom: "20px", color: "white" }}
        >
          Welcome To CourseBundler
        </Typography>
        <div className="form-group">
          <label>Email Address</label>
          <input
            type="email"
            required
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            required
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
          <Link to="/forgetpassword" style={{ textDecoration: "none" }}>
            <Button
              className="forgotBtn"
              sx={{
                textTransform: "none",
                fontSize: "15px",
                marginLeft: "-7px",
                color: "white",
              }}
              variant="text"
            >
              Forget Password?
            </Button>
          </Link>
        </Box>

        <Box
          className="form-group"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: { xs: "center", sm: "flex-start" },
          }}
        >
          <Button
            onClick={submitHandler}
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
          >
            Login
          </Button>
          {/* <button>login</button> */}
        </Box>
        <Stack
          className="form-group"
          sx={{
            marginTop: "13px",
            display: "flex",
            flexDirection: "row",
            justifyContent: { xs: "center", sm: "flex-start" },
          }}
        >
          <Typography sx={{ marginTop: "10px", color: "white" }}>
            Already Signed Up?
          </Typography>
          <Link to="/register" style={{ textDecoration: "none" }}>
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
              Sign Up
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

export default Login;

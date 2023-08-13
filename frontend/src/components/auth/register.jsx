import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Space } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Box, Typography, Button, Stack, Avatar } from "@mui/material";
import { useDispatch } from "react-redux";
import "./register.css";
import { register } from "../../redux/actions/userAction";

const Login = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imagePrev, setImagePrev] = useState("");
  const [image, setImage] = useState(null);

  const dispatch = useDispatch();

  const onChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImagePrev(reader.result);
      setImage(file);
    };
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.append("name", name);
    myForm.append("email", email);
    myForm.append("password", password);
    myForm.append("file", image);

    dispatch(register(myForm));
  };

  return (
    <Box className="containers">
      <form>
        <Typography
          variant="h4"
          className="coursebundler"
          sx={{ marginBottom: "20px", color: "white" }}
        >
          Register
        </Typography>
        <Space
          direction="horizontal"
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Avatar
            src={typeof imagePrev === "string" ? imagePrev : <UserOutlined />}
            sx={{ width: 100, height: 100 }}
          />
          {/* <img src={imagePrev} style={{ width:"100px"}} className="circular--square"/> */}
        </Space>

        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            required
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
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

        <div>
          <Button
            variant="contained"
            component="label"
            sx={{
              width: "100%",
              height: "100%",
              textTransform: "none",
              backgroundColor: "#FFEA20",
              color: "black",
              marginTop: "13px",
              fontSize: "15px",
              transition: "0.5s",
              ":hover": {
                backgroundColor: "#FFE600",
              },
            }}
          >
            Choose An Avatar
            <input
              hidden
              accept="image/*"
              multiple
              type="file"
              onChange={onChange}
            />
          </Button>
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
            onClick={onSubmitHandler}
            variant="contained"
            sx={{
              textTransform: "none",
              backgroundColor: "#FFEA20",
              color: "black",
              marginTop: "20px",
              fontSize: "15px",
              transition: "0.5s",
              ":hover": {
                backgroundColor: "#FFE600",
              },
            }}
          >
            Sign Up
          </Button>
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
          <Link to="/login" style={{ textDecoration: "none" }}>
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
              Login
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

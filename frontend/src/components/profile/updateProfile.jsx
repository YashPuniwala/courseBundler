import React, { useEffect, useState, useContext } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AlertContext } from "../../App";
import { updateProfile } from "../../redux/actions/profileAction";
import "./updateProfile.css";
import { loadUser } from "../../redux/actions/userAction";
import { updateProfileReset } from "../../redux/reducers/profileReducer";
import { useNavigate } from "react-router-dom";

const UpdateProfile = ({user}) => {
  const { showAlert } = useContext(AlertContext);

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const { message, error, loading } = useSelector((state) => state.profile);

  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(updateProfile(name, email));
    dispatch(loadUser());
  };

  useEffect(() => {
    if (error) {
      showAlert("error", error);
      dispatch(updateProfileReset())
    }
    
    if (message) {
      showAlert("success", message);
      dispatch(updateProfileReset())
      navigate("/profile")
    }
  }, [dispatch, error, message, showAlert, navigate]);

  return (
    <Box className="updateProfile-container">
      <form className="updateProfile-form">
        <Typography
          className="coursebundler"
          variant="h4"
          sx={{ marginBottom: "20px", color: "white" }}
        >
          Update Profile
        </Typography>
        <div className="form-group">
          <label>Name</label>
          <input
            className="updateProfile-input"
            placeholder="Name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            placeholder="Email"
            type="email"
            required
            className="updateProfile-input"
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
            Update
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default UpdateProfile;

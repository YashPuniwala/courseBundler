import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  Grid,
  Stack,
  Typography,
  Modal,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ClearIcon from "@mui/icons-material/Clear";
import {
  removeFromPlaylist,
  updateProfilePicture,
} from "../../redux/actions/profileAction";
import { useDispatch, useSelector } from "react-redux";
import { deleteMyProfile, loadUser } from "../../redux/actions/userAction";
import { AlertContext } from "../../App";
import { updateProfilePictureReset } from "../../redux/reducers/profileReducer";
import { cancelSubscription } from "../../redux/actions/subscriptionAction";
import { cancelSubscriptionReset } from "../../redux/reducers/subscriptionReducer";

const Profile = ({ user }) => {
  const { showAlert } = useContext(AlertContext);

  const [open, setOpen] = React.useState(false);
  const [deleteProfileModalOpen, setDeleteProfileModalOpen] =
    React.useState(false);
  const [image, setImage] = useState("");
  const [imagePrev, setImagePrev] = useState("");

  const dispatch = useDispatch();

  const { message, error, loading } = useSelector((state) => state.profile);
  const {
    message: subscriptionMessage,
    error: subscriptionError,
    loading: subscriptionLoading,
  } = useSelector((state) => state.subscription);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setImage("");
    setImagePrev("");
  };

  const handleDeleteProfileModalOpen = () => setDeleteProfileModalOpen(true);
  const handleDeleteProfileModalClose = () => {
    setDeleteProfileModalOpen(false);
    setImage("");
    setImagePrev("");
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const removeFromPlaylistHandler = async (id) => {
    await dispatch(removeFromPlaylist(id));
    dispatch(loadUser());
  };

  const changeImageSubmitHandler = async (e, image) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.append("file", image);
    await dispatch(updateProfilePicture(myForm));
    dispatch(loadUser());
  };

  const changeImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImagePrev(reader.result);
      setImage(file);
    };
  };

  const handleDeleteMyProfile  = async() => {
    await dispatch(deleteMyProfile());
    dispatch(loadUser())
    console.log("Clicked");
  };

  const cancelSubscriptionHandler = async () => {
    await dispatch(cancelSubscription());
    dispatch(loadUser());
  };

  useEffect(() => {
    if (error) {
      showAlert("error", error);
      dispatch(updateProfilePictureReset());
    }

    if (message) {
      showAlert("success", message);
      dispatch(updateProfilePictureReset());
    }

    if (subscriptionError) {
      showAlert("error", subscriptionError);
      dispatch(cancelSubscriptionReset());
    }

    if (subscriptionMessage) {
      showAlert("success", subscriptionMessage);
      dispatch(cancelSubscriptionReset());
    }
  }, [
    dispatch,
    error,
    message,
    showAlert,
    subscriptionMessage,
    subscriptionError,
  ]);

  return (
    <Box
      sx={{
        // height: { xs: "120vh", sm: "auto" },
        backgroundColor: "#212121",
        height: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "3rem",
        color: "white",
      }}
    >
      <Typography variant="h4">Profile</Typography>
      <p>userid: {user._id}</p>

      <Stack
        direction={{ xs: "column", sm: "row" }}
        mt={5}
        sx={{ justifyContent: "center" }}
        spacing={[7, 10]}
      >
        <Stack direction="column">
          <Avatar
            src={user.avatar.url}
            sx={{ width: 170, height: 170, margin: "auto" }}
          />
          <Button
            className="profile-btn"
            variant="text"
            size="large"
            sx={{ color: "#FFEA20", marginTop: "10px", textTransform: "none" }}
            onClick={handleOpen}
          >
            Change Photo
          </Button>
        </Stack>

        <Stack
          direction="column"
          spacing={2}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: { xs: "center", sm: "flex-start" },
            justifyContent: "center",
            width: "200px",
          }}
        >
          <Stack direction="row">
            <Typography sx={{ fontFamily: "bold", fontSize: "20px" }}>
              Name:{" "}
            </Typography>
            <Typography
              variant="body1"
              sx={{ marginTop: "5px", marginLeft: "8px", fontSize: "15px" }}
            >
              {user.name}
            </Typography>
          </Stack>
          <Stack direction="row">
            <Typography sx={{ fontFamily: "bold", fontSize: "20px" }}>
              Email:{" "}
            </Typography>
            <Typography
              variant="body1"
              sx={{ marginTop: "5px", marginLeft: "8px", fontSize: "15px" }}
            >
              {user.email}
            </Typography>
          </Stack>
          <Stack direction="row">
            <Typography sx={{ fontFamily: "bold", fontSize: "20px" }}>
              CreatedAt:{" "}
            </Typography>
            <Typography
              variant="body1"
              sx={{ marginTop: "5px", marginLeft: "8px", fontSize: "15px" }}
            >
              {user.createdAt.split("T")[0]}
            </Typography>
          </Stack>

          {user.role !== "admin" && (
            <Stack direction="row">
              <Typography sx={{ fontFamily: "bold", fontSize: "20px" }}>
                Subscription:
              </Typography>
              {user.subscription && user.subscription.status === "active" ? (
                <Button
                  className="profile-btn"
                  sx={{
                    color: "#FFEA20",
                    width: "200px",
                    marginLeft: "8px",
                    marginBottom: "10px",
                  }}
                  disabled={subscriptionLoading}
                  onClick={cancelSubscriptionHandler}
                >
                  Cancel Subscription
                </Button>
              ) : (
                <Link to="/subscribe" style={{ textDecoration: "none" }}>
                  <Button
                    sx={{
                      marginLeft: "8px",
                      width: "100px",
                      backgroundColor: "#FFEA20",
                      color: "black",
                      textTransform: "none",
                      ":hover": {
                        backgroundColor: "#FFE600",
                      },
                    }}
                  >
                    Subscribe
                  </Button>
                </Link>
              )}
            </Stack>
          )}

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Link to="/updateProfile" style={{ textDecoration: "none" }}>
              <Button
                variant="contained"
                sx={{
                  minWidth: "160px",
                  backgroundColor: "#444444",
                  textTransform: "none",
                  ":hover": {
                    backgroundColor: "#444444",
                  },
                }}
              >
                Update Profile
              </Button>
            </Link>
            <Link to="/changePassword" style={{ textDecoration: "none" }}>
              <Button
                variant="contained"
                sx={{
                  minWidth: "160px",
                  backgroundColor: "#444444",
                  textTransform: "none",
                  ":hover": {
                    backgroundColor: "#444444",
                  },
                }}
              >
                Change Password
              </Button>
            </Link>
            <Button
              variant="contained"
              sx={{
                minWidth: "160px",
                backgroundColor: "#444444",
                textTransform: "none",
                ":hover": {
                  backgroundColor: "#444444",
                },
              }}
              onClick={handleDeleteProfileModalOpen}
            >
              Delete Profile
            </Button>

            {/* Delete Profile Modal */}

            <Modal
              open={deleteProfileModalOpen}
              onClose={handleDeleteProfileModalClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Are you sure you want to delete this Profile?
                </Typography>
                <Button
                  sx={{ color: "black", textTransform: "none" }}
                  size="large"
                  onClick={handleDeleteMyProfile }
                  disabled={loading}
                >
                  Yes
                </Button>
                <Button
                  sx={{ color: "black", textTransform: "none" }}
                  size="large"
                  onClick={handleDeleteProfileModalClose}
                >
                  Cancel
                </Button>
              </Box>
            </Modal>
          </Stack>
        </Stack>
      </Stack>

      <Typography variant="h5" sx={{ marginTop: 10, marginBottom: 8 }}>
        Playlist
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: { xs: "20rem", sm: "60rem" },
        }}
      >
        {user.playlist && user.playlist.length > 0 && (
          <Grid
            container
            sx={{
              display: "flex",
              textAlign: "center",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {user.playlist &&
              user.playlist.map((element, index) => (
                <Grid
                  key={element.course}
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  sx={{
                    marginBottom: "2rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Box>
                    <img
                      style={{ width: "200px" }}
                      src={element.poster}
                      alt="playlist"
                    />
                    <Stack direction="row" justifyContent="space-evenly">
                      <Link
                        to={`/course/${element.course}`}
                        style={{ textDecoration: "none" }}
                      >
                        <Typography
                          className="profile-btn"
                          sx={{
                            color: "#FFEA20",
                            width: "100px",
                            marginTop: "10px",
                            marginBottom: "10px",
                          }}
                        >
                          Watch Now
                        </Typography>
                      </Link>

                      <DeleteIcon
                        className="profile-delete-icon"
                        onClick={() =>
                          removeFromPlaylistHandler(element.course)
                        }
                        style={{
                          width: "30px",
                          color: "black",
                          borderRadius: "30%",
                          cursor: "pointer",
                          backgroundColor: "#FFEA20",
                          marginTop: "10px",
                        }}
                      />
                    </Stack>
                  </Box>
                </Grid>
              ))}
          </Grid>
        )}
      </Box>

      <Box>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              p: 3,
              boxShadow: 24,
              backgroundColor: "#212121",
            }}
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ marginBottom: "10px" }}
            >
              <Typography
                className="changePhotoText"
                variant="h6"
                sx={{ color: "white", textAlign: "center", marginTop: "3px" }}
              >
                Change Photo
              </Typography>

              <IconButton sx={{ width: "40px" }} onClick={handleClose}>
                <ClearIcon sx={{ color: "white" }} />
              </IconButton>
            </Stack>
            <Stack>
              <form
                onSubmit={(e) => changeImageSubmitHandler(e, image)}
                action="#"
              >
                <div>
                  {imagePrev && (
                    <Avatar
                      src={imagePrev}
                      sx={{ width: 170, height: 170, margin: "auto" }}
                    />
                  )}
                  <Button
                    variant="outlined"
                    component="label"
                    sx={{
                      color: "white",
                      borderColor: "#FFEA20",
                      width: "100%",
                      height: "100%",
                      textTransform: "none",
                      marginTop: "20px",
                      fontSize: "15px",
                      transition: "0.5s",
                      ":hover": {
                        borderColor: "#FFEA20",
                      },
                    }}
                  >
                    Choose An Avatar
                    <input
                      hidden
                      accept="image/*"
                      multiple
                      type="file"
                      onChange={changeImage}
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
                    type="submit"
                    variant="contained"
                    sx={{
                      width: "100%",
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
                    disabled={loading}
                  >
                    Change
                  </Button>
                </Box>
              </form>
              <Stack alignItems="flex-end" sx={{ marginTop: "15px" }}>
                <Button
                  sx={{ color: "white", textTransform: "none" }}
                  size="large"
                  onClick={handleClose}
                >
                  Cancel
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Modal>
      </Box>
    </Box>
  );
};

export default Profile;

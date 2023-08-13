import React, { useContext, useEffect, useState } from "react";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import introVideo2 from "../../assets/videos/introVideo2.mp4";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getAllLectures } from "../../redux/actions/courseAction";
import { AlertContext } from "../../App";
import { getAllLecturesReset } from "../../redux/reducers/courseReducer";
import Loader from "../layout/loader/loader";

const CoursePage = ({ user }) => {
  const [lectureNumber, setLectureNumber] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { showAlert } = useContext(AlertContext);
  const { loading, error, lectures } = useSelector((state) => state.course);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getAllLectures(id)); 

    if (error) {
      showAlert("error", error);
      dispatch(getAllLecturesReset());
    }

    if (
      user.role !== "admin" &&
      (user.subscription === undefined || user.subscription.status !== "active")
    ) {
      return navigate("/subscribe");
    }
  }, [dispatch, id, navigate, user, error, showAlert]);

  return loading ? (
    <Loader />
  ) : (
    <Box sx={{ height: "90vh", backgroundColor: "#212121" }}>
      {lectures && lectures.length > 0 ? (
        <Stack direction={{ xs: "column", sm: "row" }}>
          <Box>
            <video
              style={{ width: "100%" }}
              autoPlay
              loop
              muted
              controls
              controlsList="nodownload nofull noremoteplayback"
              disablePictureInPicture
              disableRemotePlayback
              src={lectures[lectureNumber].video.url}
            ></video>

            <Stack
              spacing={1}
              mt={4}
              mb={4}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: { xs: "center", sm: "flex-start" },
                color: "white",
              }}
            >
              <Typography variant="h4">{`#${lectureNumber + 1} ${
                lectures[lectureNumber].title
              }`}</Typography>
              <Typography variant="h5">{lectures.description}</Typography>
              <Typography variant="body1">
                {lectures[lectureNumber].description}
              </Typography>
            </Stack>
          </Box>

          <Box
            sx={{
              width: { xs: "100%", sm: "60%" },
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {lectures.map((element, index) => (
              <Button
                className="coursePage-btn"
                key={element._id}
                size="large"
                onClick={() => setLectureNumber(index)}
                sx={{
                  textTransform: "none",
                  width: "100%",
                  padding: "1rem",
                  textAlign: "center",
                  margin: "0",
                  borderBottom: "1px solid rgba(0, 0, 0, 0.2)",
                }}
              >
                #{index + 1} {element.title}
              </Button>
            ))}
          </Box>
        </Stack>
      ) : (
        <div>
          <Typography>No Lectures Available</Typography>
        </div>
      )}
    </Box>
  );
};

export default CoursePage;

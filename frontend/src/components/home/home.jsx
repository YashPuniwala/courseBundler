import React from "react";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { CgGoogle, CgYoutube } from "react-icons/cg";
import { SiCoursera, SiUdemy } from "react-icons/si";
import { DiAws } from "react-icons/di";
import introVideo2 from "../../assets/videos/introVideo2.mp4";
import LearningImage from "../../assets/images/learningImage.png"
import "./home.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <Box className="container" sx={{backgroundColor:"#212121"}}>
        <Container
          className="container2"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-end",
            marginRight: "40px",
          }}
        >
          <Typography variant="h4" sx={{color:"white"}}>LEARN FROM THE EXPERTS</Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: "18px",
              margin: { xs: "auto", sm: "12px" },
              marginTop: "20px",
              color:"white"
            }}
          >
            Find Valueable Content At Reasonable Price
          </Typography>

            <Link to="/courses">
          <Button
            variant="contained"
            size="large"
            color="info"
            sx={{
              margin: { xs: "auto", md: "10px", sm: "auto" },
              marginTop:{ xs:"10px", sm:"20px" },
              width: "150px",
              textTransform:"none",
              backgroundColor:"#FFEA20",
              color:"black",
              ":hover": {
                backgroundColor:"#FFE600"
              }
            }}
            className="yash"
          >
            Explore Now
          </Button>
          </Link>
        </Container>

        <Stack alignItems="flex-end" direction="column">
          <img
          className="homeImage"
            src={LearningImage}
            alt="home-img"
          />
        </Stack>
      </Box>
      <Stack
        textAlign="center"
        sx={{ padding: "1rem", backgroundColor: "#2C3333" }}
      >
        <Typography variant="h4" style={{ color: "#FFEA20" }}>
          Our Brands
        </Typography>

        <Box
          className="brandBanner"
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            marginTop: "30px",
          }}
        >
          <CgGoogle />
          <CgYoutube />
          <SiCoursera />
          <SiUdemy />
          <DiAws />
        </Box>
      </Stack>
      <Box className="homeVideoBox" sx={{backgroundColor:"#212121"}}>
        <video
        className="homeVideo"
          autoPlay
          loop
          muted
          controls
          controlsList="nodownload nofull noremoteplayback"
          disablePictureInPicture
          disableRemotePlayback
          src={introVideo2}
        ></video>
      </Box>
    </>
  );
};

export default Home;

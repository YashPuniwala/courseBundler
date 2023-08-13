import React from "react";
import { DiGithub } from "react-icons/di";
import { Box, Stack, Typography } from "@mui/material";
import {
  TiSocialYoutubeCircular,
  TiSocialInstagramCircular,
} from "react-icons/ti";
import "./footer.css";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "black",
        color: "white",
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        alignItems: "center",
        justifyContent: { xs: "center", sm: "space-between" },
        textAlign: { xs: "center", sm: "left" },
        padding: { xs: "1rem", sm: "1rem" },
      }}
    >
      <Box>
        <Typography color="white" variant="h4">
          All Rights Reserved
        </Typography>
        <Typography
          variant="h5"
          mt={1}
          sx={{ fontFamily: "body", color: "#FFEA20" }}
        >
          Yash Puniwala
        </Typography>
      </Box>

      <Box className="banner">
        <a
          style={{
            color: "white",
            fontSize: "50px",
          }}
          href="https://www.youtube.com/channel/UCSe5UVj_UUm-JJVTHmObR3A"
          target={"blank"}
        >
          <TiSocialYoutubeCircular />
        </a>
        <a
          style={{
            color: "white",
            fontSize: "50px",
            marginLeft: "20px",
          }}
          href="https://www.instagram.com/yash_hp10/"
          target={"blank"}
        >
          <TiSocialInstagramCircular />
        </a>
        <a
          style={{
            color: "white",
            fontSize: "50px",
            marginLeft: "20px",
          }}
          href="https://github.com/YashPuniwala"
          target={"blank"}
        >
          <DiGithub />
        </a>
      </Box>
    </Box>
  );
};

export default Footer;

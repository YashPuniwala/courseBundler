import React from "react";
import { Box, Button, Typography } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ErrorIcon sx={{ width: "70px", height: "70px" }} />
      <Typography variant="h3" sx={{marginTop:"15px"}}>Page Not Found</Typography>
      <Link to="/" style={{ textDecoration: "none" }}>
        <Button
        className="notFound-btn"
          variant="text"
          sx={{ textTransform: "none", color: "white", fontSize: "20px", marginTop:"15px", color:"#FFEA20" }}
          size="large"
        >
          Go to Home
        </Button>
      </Link>
    </Box>
  );
};

export default NotFound;

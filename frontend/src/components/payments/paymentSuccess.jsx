import React from "react";
import { Space } from "antd";
import { Link, useSearchParams } from "react-router-dom";
import { Box, Button, Stack, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const Subscribe = () => {
  const reference = useSearchParams()[0].get("reference")
  return (
    <Box
      sx={{
        p: 9,
        backgroundColor:"#212121",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h4" sx={{width:"300px", marginLeft:"12px", color:"white"}}>You have Pro Pack</Typography>
      <Stack
        sx={{
          boxShadow: "2px 2px 2px 0px rgba(0, 0, 0, 0.2)",
          marginTop: "40px",
        }}
      >
        <Box
          sx={{
            p: 2,
            backgroundColor: "#FFEA20",
            color: "black",
            borderRadius: "8px 8px 0 0 ",
          }}
        >
          <Typography>Payment Success</Typography>
        </Box>

        <Box
          sx={{
            width:"270px",
            padding: {xs:"20px", sm:"45px"},
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography sx={{ textAlign: "center", color:"white" }}>
            Congratulations you're pro member. You have access to premium
            content.
          </Typography>

          <Box sx={{ marginTop: "30px" }}>
            <CheckCircleIcon sx={{ width: "100px", height: "100px", color:"white" }} />
          </Box>

          <Box sx={{textAlign:"center", marginTop:"40px"}}>
            <Link to="/profile" style={{ textDecoration: "none" }}>
              <Button
              className="paymentSuccess-btn"
                variant="text"
                sx={{ textTransform: "none", fontSize:"20px" }}
                size="large"
              >
                Go to Profile
              </Button>
            </Link>

            <Typography variant="body1" sx={{color:"white"}}>Reference: {reference}</Typography>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};

export default Subscribe;

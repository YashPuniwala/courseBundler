import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

const Loader = () => {
  return (
    <div
      style={{
        backgroundColor: "#212121",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress size={100} thickness={2} sx={{color:"#FFEA20"}}/>
    </div>
  );
};

export default Loader;

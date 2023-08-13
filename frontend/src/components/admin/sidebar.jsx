import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Backdrop } from "@mui/material";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import {
  RiDashboardFill,
  RiEyeFill,
  RiUser3Fill,
  RiAddCircleFill,
} from "react-icons/ri";
import { useSelector } from "react-redux";

const UserOptions = () => {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const {user} = useSelector((state) => state.user)

  const options = [
    { icon: <RiDashboardFill />, name: "Dashboard", func: dashboard },
    { icon: <RiAddCircleFill />, name: "Create Courses", func: createCourses },
    { icon: <RiEyeFill />, name: "Courses", func: adminCourses },
    { icon: <RiUser3Fill />, name: "Users", func: users },
  ];

  function dashboard() {
    navigate("/admin/dashboard");
    setOpen(false)
  }

  function createCourses() {
    navigate("/admin/createCourses");
    setOpen(false)
  }

  function adminCourses() {
    navigate("/admin/adminCourses");
    setOpen(false)
  }

  function users() {
    navigate("/admin/users");
    setOpen(false)
  }

  return (
    <>
      <Backdrop open={open} style={{ zIndex: "10" }} />
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        direction="down"
        icon={
          <img
            src={user.avatar.url}
            alt="UserProfile"
            style={{ width: "50px", height: "50px", borderRadius: "100%" }}
          />
        }
        sx={{ position: "fixed", right: "2vmax", top: "1vmax" }}
      >
        {options.map((option) => (
          <SpeedDialAction
            key={option.name}
            icon={option.icon}
            tooltipTitle={option.name}
            onClick={option.func}
            sx={{backgroundColor:"#FFEA20", color:"black"}}
          />
        ))}
      </SpeedDial>
    </>
  );
};

export default UserOptions;

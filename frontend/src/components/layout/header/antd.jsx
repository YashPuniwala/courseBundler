import { Drawer, Divider } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import Person2Icon from "@mui/icons-material/Person2";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CloseIcon from "@mui/icons-material/Close";

const Antd = () => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const isAuthenticated = true;
  const user = {
    role: "admin",
  };

  const drawer = (
    <React.Fragment>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CloseIcon
          onClick={onClose}
          sx={{
            cursor: "pointer",
            position: "absolute",
            right: "20px",
            color: "#FFEA20",
          }}
        />
      </div>

      <div
        className="divs"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Link to="/" style={{ textDecoration: "none" }}>
          <Button
            sx={{ color: "white", textTransform: "none" }}
            size="large"
            onClose={onClose}
          >
            Home
          </Button>
        </Link>
        <Link to="/browse" style={{ textDecoration: "none" }}>
          <Button
            sx={{
              color: "white",
              textTransform: "none",
              marginTop: "12px",
            }}
            onClick={onClose}
            size="large"
          >
            Browse All Courses
          </Button>
        </Link>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Button
            sx={{
              color: "white",
              textTransform: "none",
              marginTop: "12px",
            }}
            size="large"
          >
            Request A Course
          </Button>
        </Link>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Button
            sx={{
              color: "white",
              textTransform: "none",
              marginTop: "12px",
              display: "inherit",
            }}
            size="large"
          >
            Contact Us
          </Button>
        </Link>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Button
            sx={{
              color: "white",
              textTransform: "none",
              marginTop: "12px",
            }}
            size="large"
          >
            About Us
          </Button>
        </Link>
      </div>

      <div>
        {isAuthenticated ? (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              bottom: "60px",
              right: "90px",
            }}
          >
            <Link to="/" style={{ textDecoration: "none" }}>
              <Button
                sx={{
                  color: "#FFE600",
                  textTransform: "none",
                  marginRight: "17px",
                }}
                size="large"
                startIcon={<Person2Icon style={{ color: "#FFE600" }} />}
              >
                Profile
              </Button>
            </Link>

            <Button
              sx={{
                color: "white",
                textTransform: "none",
              }}
              size="large"
              startIcon={<LogoutIcon style={{ color: "white" }} />}
            >
              Logout
            </Button>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              bottom: "10px",
              right: "100px",
            }}
          >
            <Link to="/" style={{ textDecoration: "none" }}>
              <Button
                variant="contained"
                sx={{
                  color: "white",
                  textTransform: "none",
                  marginRight: "10px",
                  backgroundColor: "#FFEA20",
                  ":hover": {
                    backgroundColor: "#FFE600",
                  },
                }}
                size="medium"
              >
                Login
              </Button>
            </Link>

            <span
              style={{
                display: "flex",
                flexDIrection: "column",
                justifyContent: "center",
                alignItems: "center",
                color: "white",
              }}
            >
              OR
            </span>

            <Link to="/" style={{ textDecoration: "none" }}>
              <Button
                variant="contained"
                sx={{
                  color: "white",
                  textTransform: "none",
                  marginLeft: "10px",
                  backgroundColor: "#FFEA20",
                  ":hover": {
                    backgroundColor: "#FFE600",
                  },
                }}
                size="medium"
              >
                Register
              </Button>
            </Link>
          </div>
        )}
      </div>

      {user && user.role === "admin" && (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            position: "absolute",
            bottom: "14px",
            right: "136px",
          }}
        >
          <Link to="/" style={{ textDecoration: "none" }}>
            <Button
              sx={{
                color: "rgb(143, 55, 143)",
                textTransform: "none",
              }}
              size="large"
              startIcon={<DashboardIcon sx={{ color: "rgb(143, 55, 143)" }} />}
            >
              Dashboard
            </Button>
          </Link>
        </div>
      )}
    </React.Fragment>
  );

  return (
    <>
      <Button onClick={showDrawer}>Open</Button>
      <Drawer
        placement="left"
        onClose={onClose}
        closable={false}
        open={open}
        style={{
          backgroundColor: "#212121",
          color: "white",
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};
export default Antd;

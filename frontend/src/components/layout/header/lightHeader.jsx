import React, { useState, createContext } from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import Person2Icon from "@mui/icons-material/Person2";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CloseIcon from "@mui/icons-material/Close";
import CourseBundlerLogo from "../../../assets/images/coursebundler-logo2.png";

const drawerWidth = 280;
const navItems = [
  "Home",
  "Browser All Courses",
  "Request A Course",
  "Contact Us",
  "About Us",
];

function LightHeader() {
  const [state, setState] = useState(false);

  const handleDrawerToggle = () => {
    setState(!state);
  };

  const isAuthenticated = false;
  const user = {
    role: "admins",
  };

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{ height: "100%", backgroundColor: "white" }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
          justifyContent: "flex-start",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            my: 2,
            color: "black",
            marginLeft: "25px",
          }}
        >
          CourseBundler
        </Typography>

        <CloseIcon
          sx={{
            cursor: "pointer",
            color: "black",
            borderRadius:"20px",
            position: "absolute",
            right: "20px",
            top: "20px",
          }}
        />
      </Box>
      <Divider color="black" />
      <List>
        <ListItem disablePadding>
          <ListItemButton
            sx={{
              display: "flex",
              flexDirection: "column",
              textAlign: "left",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              width: "5px",
            }}
          >
            <Link to="/" style={{ textDecoration: "none", marginTop: "15px" }}>
              <Button
                sx={{ color: "black", textTransform: "none", fontSize: "15px" }}
                size="large"
              >
                Home
              </Button>
            </Link>
            <Link to="/courses" style={{ textDecoration: "none", marginTop: "15px" }}>
              <Button
                sx={{
                  color: "black",
                  textTransform: "none",
                  fontSize: "15px",
                }}
                size="large"
              >
                Browse All Courses
              </Button>
            </Link>
            <Link to="/request" style={{ textDecoration: "none", marginTop: "15px" }}>
              <Button
                sx={{
                  color: "black",
                  textTransform: "none",
                  fontSize: "15px",
                }}
                size="large"
              >
                Request A Course
              </Button>
            </Link>
            <Link to="/contact" style={{ textDecoration: "none", marginTop: "15px" }}>
              <Button
                sx={{
                  color: "black",
                  textTransform: "none",
                  fontSize: "15px",
                }}
                size="large"
              >
                Contact Us
              </Button>
            </Link>
            <Link
              to="/about"
              style={{ textDecoration: "none", marginTop: "15px" }}
            >
              <Button
                sx={{
                  color: "black",
                  textTransform: "none",
                  fontSize: "15px",
                }}
                size="large"
              >
                About Us
              </Button>
            </Link>

            {isAuthenticated ? (
              <>
                <Link
                  to="/"
                  style={{ textDecoration: "none", marginTop: "15px" }}
                >
                  <Button
                    sx={{
                      color: "#F6C90E",
                      textTransform: "none",
                      fontSize: "15px",
                    }}
                    size="large"
                    startIcon={
                      <Person2Icon
                        sx={{ color: "#F6C90E", fontSize: "15px" }}
                      />
                    }
                  >
                    Profile
                  </Button>
                </Link>

                <Button
                  sx={{
                    color: "black",
                    textTransform: "none",
                    fontSize: "15px",
                    marginTop:"15px"
                  }}
                  size="large"
                  startIcon={<LogoutIcon sx={{ color: "black" }} />}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login" style={{ textDecoration: "none", marginTop:"15px" }}>
                  <Button
                    sx={{
                      color: "black",
                      textTransform: "none",
                      fontSize: "15px",
                    }}
                    size="large"
                  >
                    Login
                  </Button>
                </Link>

                {/* <span
                  style={{
                    display: "flex",
                    flexDIrection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "black",
                    marginTop:"13px"
                  }}
                >
                  OR
                </span> */}

                <Link to="/register" style={{ textDecoration: "none", marginTop:"15px" }}>
                  <Button
                    sx={{
                      color: "black",
                      textTransform: "none",
                      fontSize: "15px",
                    }}
                    size="large"
                  >
                    Register
                  </Button>
                </Link>
              </>
            )}

            {user && user.role === "admin" && (
              <>
                <Link
                  to="/"
                  style={{ textDecoration: "none", marginTop: "15px" }}
                >
                  <Button
                    sx={{
                      color: "rgb(143, 55, 143)",
                      textTransform: "none",
                      fontSize: "15px",
                    }}
                    size="large"
                    startIcon={
                      <DashboardIcon sx={{ color: "rgb(143, 55, 143)" }} />
                    }
                  >
                    Dashboard
                  </Button>
                </Link>
              </>
            )}
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box
      sx={{
        marginLeft: "25px",
        position: "fixed",
        zIndex:"1"
      }}
    >
      <Box component="nav">
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
        >
          <MenuIcon
            fontSize="large"
            sx={{
              backgroundColor: "#FFEA20",
              borderRadius: "20px",
              padding: "3px",
              color: "black",
              marginTop: "8px",
            }}
          />
        </IconButton>
        <Drawer
          variant="temporary"
          open={state}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: { xs: "100%", sm: 280 },
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

export default LightHeader;

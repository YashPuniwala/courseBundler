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
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import Person2Icon from "@mui/icons-material/Person2";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../redux/actions/userAction";

const drawerWidth = 280;
const navItems = [
  "Home",
  "Browser All Courses",
  "Request A Course",
  "Contact Us",
  "About Us",
];

function DarkHeader({ isAuthenticated = false, user }) {
  const [state, setState] = useState(false);

  const navigate = useNavigate()

  const dispatch = useDispatch();

  const handleDrawerToggle = () => {
    setState(!state);
  };

  const logoutHandler = () => {
      navigate("/login");
      dispatch(logout());
      setState(false);
  };

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{ height: "100%", backgroundColor: "#212121" }}
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
            color: "white",
            marginLeft: "25px",
          }}
        >
          CourseBundler
        </Typography>

        <CloseIcon
          sx={{
            cursor: "pointer",
            color: "#FFEA20",
            position: "absolute",
            right: "20px",
            top: "20px",
          }}
        />
      </Box>
      <Divider color="white" />
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
            <Link to="/" style={{ textDecoration: "none", marginTop: "10px" }}>
              <Button
                sx={{ color: "white", textTransform: "none" }}
                size="large"
              >
                Home
              </Button>
            </Link>
            <Link
              to="/courses"
              style={{ textDecoration: "none", marginTop: "15px" }}
            >
              <Button
                sx={{
                  color: "white",
                  textTransform: "none",
                }}
                size="large"
              >
                Browse All Courses
              </Button>
            </Link>
            <Link
              to="/request"
              style={{ textDecoration: "none", marginTop: "15px" }}
            >
              <Button
                sx={{
                  color: "white",
                  textTransform: "none",
                }}
                size="large"
              >
                Request A Course
              </Button>
            </Link>
            <Link
              to="/contact"
              style={{ textDecoration: "none", marginTop: "15px" }}
            >
              <Button
                sx={{
                  color: "white",
                  textTransform: "none",
                  display: "inherit",
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
                  color: "white",
                  textTransform: "none",
                }}
                size="large"
              >
                About Us
              </Button>
            </Link>

            {isAuthenticated ? (
              <>
                <Link
                  to="/profile"
                  style={{ textDecoration: "none", marginTop: "15px" }}
                >
                  <Button
                    sx={{
                      color: "#FFE600",
                      textTransform: "none",
                    }}
                    size="large"
                    startIcon={<Person2Icon sx={{ color: "#FFE600" }} />}
                  >
                    Profile
                  </Button>
                </Link>

                  <Button
                    onClick={logoutHandler}
                    sx={{
                      color: "white",
                      textTransform: "none",
                      marginTop: "15px",
                    }}
                    size="large"
                    startIcon={<LogoutIcon sx={{ color: "white" }} />}
                  >
                    Logout
                  </Button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  style={{ textDecoration: "none", marginTop: "15px" }}
                >
                  <Button
                    sx={{
                      color: "white",
                      textTransform: "none",
                    }}
                    size="large"
                  >
                    Login
                  </Button>
                </Link>

                <Link
                  to="/register"
                  style={{ textDecoration: "none", marginTop: "15px" }}
                >
                  <Button
                    sx={{
                      color: "white",
                      textTransform: "none",
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
                  to="/admin/dashboard"
                  style={{ textDecoration: "none", marginTop: "15px" }}
                >
                  <Button
                    sx={{
                      color: "rgb(143, 55, 143)",
                      textTransform: "none",
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
        zIndex: "1",
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

export default DarkHeader;

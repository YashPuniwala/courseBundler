import React, { useContext, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Loader from "../../layout/loader/loader";
import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Sidebar from "../sidebar";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteUser,
  getAllUsers,
  updateUserRole,
} from "../../../redux/actions/adminAction";
import { AlertContext } from "../../../App";
import { updateProfilePictureReset } from "../../../redux/reducers/profileReducer";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#212121",
    color: "white",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function Users() {
  const { showAlert } = useContext(AlertContext);
  const dispatch = useDispatch();
  const { users, loading, error, message } = useSelector(
    (state) => state.admin
  );

  useEffect(() => {
    if (error) {
      showAlert("error", error);
      dispatch(updateProfilePictureReset());
    }

    if (message) {
      showAlert("success", message);
      dispatch(updateProfilePictureReset());
    }
    dispatch(getAllUsers());
  }, [dispatch, showAlert, error, message]);

  const updateHandler = async (userId) => {
    console.log(userId);
    await dispatch(updateUserRole(userId));
    dispatch(getAllUsers());
  };

  const deleteButtonHandler = async (userId) => {
    console.log(userId, "userId");
    await dispatch(deleteUser(userId));
    dispatch(getAllUsers());
  };
  
  return loading ? (
    <Loader />
  ) : (
    <Box
      sx={{
        backgroundColor: "#212121",
        height: "70vh",
        overflowX: "auto",
        paddingX: { xs: 1, sm: 10 },
        paddingY: { xs: 9, sm: 15 },
      }}
    >
      <Typography
        sx={{
          width: "100%",
          textTransform: "none",
          color: "white",
          marginBottom: "40px",
          textAlign: { xs: "center", sm: "left" },
        }}
        variant="h4"
      >
        All Users
      </Typography>
      <TableContainer component={Paper} sx={{ backgroundColor: "#212121" }}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow sx={{ borderBottom: "2px solid grey" }}>
              <StyledTableCell sx={{ backgroundColor: "#212121" }}>
                #ID
              </StyledTableCell>
              <StyledTableCell align="left">NAME</StyledTableCell>
              <StyledTableCell align="left">EMAIL</StyledTableCell>
              <StyledTableCell align="left">ROLE</StyledTableCell>
              <StyledTableCell align="left">SUBSCRIPTION</StyledTableCell>
              <StyledTableCell align="right">ACTION</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users &&
              users.map((user) => (
                <StyledTableRow
                  key={user._id}
                  sx={{ borderBottom: "2px solid grey" }}
                >
                  <StyledTableCell
                    component="th"
                    scope="row"
                    sx={{ color: "white" }}
                  >
                    {user._id}
                  </StyledTableCell>
                  <StyledTableCell sx={{ color: "white" }} align="left">
                    {user.name}
                  </StyledTableCell>
                  <StyledTableCell sx={{ color: "white" }} align="left">
                    {user.email}
                  </StyledTableCell>
                  <StyledTableCell sx={{ color: "white" }} align="left">
                    {user.role}
                  </StyledTableCell>
                  <StyledTableCell sx={{ color: "white" }} align="left">
                    {user &&
                    user.subscription &&
                    user.subscription.status === "active"
                      ? "Active"
                      : "Inactive"}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <Stack direction="row" justifyContent="right">
                      {user.email === "admin@gmail.com" ? (
                        <Button
                          variant="text"
                          size="small"
                          sx={{
                            width: { xs: "100px", sm: "120px" },
                            textTransform: "none",
                            backgroundColor: "purple",
                            color: "white",
                            fontSize: "15px",
                            transition: "0.5s",
                            ":hover": {
                              backgroundColor: "purple",
                            },
                          }}
                          onClick={() => updateHandler(user._id)}
                          disabled
                        >
                          Change Role
                        </Button>
                      ) : (
                        <Button
                          variant="text"
                          size="small"
                          sx={{
                            width: { xs: "100px", sm: "120px" },
                            textTransform: "none",
                            backgroundColor: "purple",
                            color: "white",
                            fontSize: "15px",
                            transition: "0.5s",
                            ":hover": {
                              backgroundColor: "purple",
                            },
                          }}
                          onClick={() => updateHandler(user._id)}
                        >
                          Change Role
                        </Button>
                      )}

                      {user.email !== "admin@gmail.com" && (
                        <IconButton
                          sx={{
                            width: "40px",
                            marginLeft: "15px",
                            borderRadius: "20%",
                          }}
                          onClick={() => deleteButtonHandler(user._id)}
                        >
                          <DeleteIcon
                            fontSize="medium"
                            sx={{ color: "white" }}
                          />
                        </IconButton>
                      )}
                    </Stack>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography
        sx={{
          textTransform: "none",
          color: "grey",
          width: "100%",
          textAlign: "center",
          marginTop: "40px",
        }}
      >
        All available user in database
      </Typography>
      <Sidebar />
    </Box>
  );
}

import express from "express";
import {
  addToPlaylist,
  changePassword,
  deleteMyProfile,
  deleteUser,
  forgetPassword,
  getAllUsers,
  getMyProfile,
  login,
  logout,
  register,
  removeFromPlaylist,
  resetPassword,
  updateProfile,
  updateProfilePicture,
  updateUserRole,
} from "../controllers/userController.js";
import { authorizeAdmin, isAuthenticated } from "../middlewares/auth.js";
import singleUpload from "../middlewares/multer.js";

const router = express.Router();

// To Register a new User
router.route("/register").post(singleUpload, register);

// Login
router.route("/login").post(login);

// Logout
router.route("/logout").get(logout);

// Get my Profile
router.route("/me").get(isAuthenticated, getMyProfile);

// Delete My Profile
router.route("/me").delete(isAuthenticated, deleteMyProfile);

// Change Password
router.route("/changePassword").put(isAuthenticated, changePassword);

// Update Profile
router.route("/updateProfile").put(isAuthenticated, updateProfile);

// Update Profile Picture
router
  .route("/updateProfilePicture")
  .put(singleUpload, isAuthenticated, updateProfilePicture);

// Forget Password
router.route("/forgetPassword").post(forgetPassword);

// Reset Password
router.route("/resetPassword/:token").put(resetPassword);

// Add to Playlist
router.route("/addToPlaylist").post(isAuthenticated, addToPlaylist);

// Remove from Playlist
router.route("/removeFromPlaylist/:id").delete(isAuthenticated, removeFromPlaylist);

// Admin Routes
router.route("/admin/users").get(isAuthenticated, authorizeAdmin, getAllUsers);

router
  .route("/admin/user/:id")
  .put(isAuthenticated, authorizeAdmin, updateUserRole)
  .delete(isAuthenticated, authorizeAdmin, deleteUser);

export default router;

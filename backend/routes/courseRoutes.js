import express from "express";
import {
  addLecture,
  createCourse,
  deleteCourse,
  deleteLecture,
  getAllCourses,
  getCourseDetails,
  getCourseLectures,
  updateCourse,
  updateLecture,
} from "../controllers/courseController.js";
import {
  authorizeAdmin,
  autorizeSubscriber,
  isAuthenticated,
} from "../middlewares/auth.js";
import singleUpload from "../middlewares/multer.js";

const router = express.Router();

// Get all courses without lectures
router.route("/courses").get(getAllCourses);

// create new courses - only admin
router
  .route("/createCourse")
  .post(isAuthenticated, authorizeAdmin, singleUpload, createCourse);

router
  .route("/getCourseDetails/:id")
  .get(isAuthenticated, authorizeAdmin, getCourseDetails);

// Update Course
router
  .route("/admin/updateCourse/:id")
  .put(isAuthenticated, authorizeAdmin, singleUpload, updateCourse);

// Update Lecture
router
  .route("/admin/updateLecture")
  .put(isAuthenticated, authorizeAdmin, singleUpload, updateLecture);

// Add lecture, Delete Course, Get course details
router
  .route("/course/:id")
  .get(isAuthenticated, autorizeSubscriber, getCourseLectures)
  .post(isAuthenticated, authorizeAdmin, singleUpload, addLecture)
  .delete(isAuthenticated, authorizeAdmin, deleteCourse);

// Delete lecture
router.route("/lecture").delete(isAuthenticated, authorizeAdmin, deleteLecture);

export default router;

import { Course } from "../models/course.js";
import ErrorHandler from "../utils/errorHandler.js";
import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import getDataUri from "../utils/dataUri.js";
import cloudinary from "cloudinary";
import { User } from "../models/user.js";
import { Stats } from "../models/stats.js";
import multer from "multer";
// Set up multer middleware
const upload = multer().single("file");

export const getAllCourses = catchAsyncError(async (req, res, next) => {
  const keyword = req.query.keyword || "";
  const category = req.query.category || "";
  const sortBy = req.query.sortBy || "createdAt,title, views";
  const sortFields = sortBy.split(",");

  const sortOptions = sortFields.map((field) => {
    let sortOrder;
    if (field.startsWith("-")) {
      sortOrder = -1;
    } else {
      sortOrder = 1;
    }

    const fieldName = field.replace(/^-/, "");
    if (fieldName === "views") {
      sortOrder = sortOrder * -1;
    }

    return [fieldName, sortOrder];
  });

  const courses = await Course.find({
    title: {
      $regex: keyword,
      $options: "i",
    },
    category: {
      $regex: category,
      $options: "i",
    },
  }).sort(sortOptions);

  res.status(200).json({
    success: true,
    courses,
  });
});

export const createCourse = catchAsyncError(async (req, res, next) => {
  const { title, description, category, createdBy } = req.body;

  if ((!title, !description, !category, !createdBy))
    return next(new ErrorHandler("Please add all fields", 400));

  const file = req.file;

  if (!file) {
    return next(new ErrorHandler("Please upload a file", 400));
  }

  const fileUri = getDataUri(file);

  const myCloud = await cloudinary.v2.uploader.upload(fileUri.content);

  await Course.create({
    title,
    description,
    category,
    createdBy,
    poster: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });

  res.status(201).json({
    success: true,
    message: "Course created successfully. You can add lectures now.",
  });
});

export const getCourseDetails = catchAsyncError(async (req, res, next) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    return next(new ErrorHandler("Course not found", 404));
  }
  res.status(200).json({
    success: true,
    course,
  });
});

export const updateCourse = catchAsyncError(async (req, res, next) => {
  const { title, description, category, createdBy } = req.body;

  // Get the course to be updated
  let course = await Course.findById(req.params.id);

  if (!course) return next(new ErrorHandler("Course Not Found", 404));

  // If a new image was uploaded, update the course's thumbnail
  if (req.file) {
    const fileUri = getDataUri(req.file);

    // Delete the old image from Cloudinary
    await cloudinary.v2.uploader.destroy(course.poster.public_id);

    // Upload the new image to Cloudinary
    const result = await cloudinary.v2.uploader.upload(fileUri.content);

    course.poster = {
      public_id: result.public_id,
      url: result.secure_url,
    };
  }

  // Update the course's other properties
  course.title = title;
  course.description = description;
  course.category = category;
  course.createdBy = createdBy;

  // Save the updated course to the database
  await course.save();

  res.status(200).json({
    success: true,
    message: "Course Updated Successfully",
  });
});

export const updateLecture = catchAsyncError(async (req, res, next) => {
  const { courseId, lectureId } = req.query;
  const { title, description } = req.body;

  if (!title || !description)
    return next(new ErrorHandler("Please add all fields", 400));

  const course = await Course.findById(courseId);
  console.log(courseId)

  if (!course) return next(new ErrorHandler("Course not found", 404));

  const lecture = course.lectures.find((lecture) => lecture._id == lectureId);

  if (!lecture)
    return next(new ErrorHandler("Lecture not found in the course", 404));

    
    const file = req.file;
    let videoUrl;
  
    if (file) {
      const fileUri = getDataUri(file);
      const myCloud = await cloudinary.v2.uploader.upload(fileUri.content, {
        resource_type: "video",
      });
      videoUrl = myCloud.secure_url;
      lecture.video.public_id = myCloud.public_id;
      lecture.video.url = videoUrl;
    }
  
    lecture.title = title;
    lecture.description = description;
  await course.save();

  res.status(200).json({
    success: true,
    message: "Lecture updated in Course",
  });
});

export const getCourseLectures = catchAsyncError(async (req, res, next) => {
  const course = await Course.findById(req.params.id);

  if (!course) return next(new ErrorHandler("Course not found", 404));

  course.views += 1;

  await course.save();

  res.status(200).json({
    success: true,
    lectures: course.lectures,
  });
});

export const addLecture = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const { title, description } = req.body;

  if (!title || !description)
    return next(new ErrorHandler("Please add all fields", 400));

  const course = await Course.findById(id);

  if (!course) return next(new ErrorHandler("Course not found", 404));

  const file = req.file;

  if (!file) {
    return next(new ErrorHandler("Please upload a file", 400));
  }

  const fileUri = getDataUri(file);

  const myCloud = await cloudinary.v2.uploader.upload(fileUri.content, {
    resource_type: "video",
  });

  const existingLectureFile = course.lectures.find(
    (lecture) => lecture.video.url === myCloud.url
  );

  if (existingLectureFile) {
    return next(
      new ErrorHandler(
        "Lecture with the same file already exists in the course",
        400
      )
    );
  }

  course.lectures.push({
    title,
    description,
    video: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });

  course.numOfVideos = course.lectures.length;

  await course.save();

  res.status(200).json({
    success: true,
    message: "Lecture added in Course",
  });
});

export const deleteCourse = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const course = await Course.findById(id);

  if (!course) return next(new ErrorHandler("Course not found", 404));

  await cloudinary.v2.uploader.destroy(course.poster.public_id);

  for (let i = 0; i < course.lectures.length; i++) {
    const singleLecture = course.lectures[i];

    await cloudinary.v2.uploader.destroy(singleLecture.video.public_id, {
      resource_type: "video",
    });
  }

  await course.remove();

  res.status(200).json({
    success: true,
    message: "Course Deleted Successfully",
  });
});

export const deleteLecture = catchAsyncError(async (req, res, next) => {
  const { courseId, lectureId } = req.query;

  const course = await Course.findById(courseId);

  if (!course) return next(new ErrorHandler("Course not found", 404));

  const lecture = course.lectures.find((item) => {
    if (item._id.toString() === lectureId.toString()) return item;
  });

  if (!lecture)
    return next(new ErrorHandler("Lecture Id is not incorrect or not found"));

  await cloudinary.v2.uploader.destroy(lecture.video.public_id, {
    resource_type: "video",
  });

  course.lectures = course.lectures.filter((item) => {
    if (item._id.toString() !== lectureId.toString()) return item;
  });

  course.numOfVideos = course.lectures.length;

  await course.save();

  res.status(200).json({
    success: true,
    message: "Lecture Deleted Successfully",
  });
});

Course.watch().on("change", async () => {
  const stats = await Stats.find({}).sort({ createdAt: "desc" }).limit(1);

  const courses = await Course.find({});

  let totalViews = 0;

  for (let i = 0; i < courses.length; i++) {
    totalViews += courses[i].views;
  }
  stats[0].views = totalViews;
  stats[0].createdAt = new Date(Date.now());

  await stats[0].save();
});

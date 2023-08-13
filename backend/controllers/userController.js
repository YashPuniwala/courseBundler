import ErrorHandler from "../utils/errorHandler.js";
import { User } from "../models/user.js";
import { sendToken } from "../utils/sendToken.js";
import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { sendEmail } from "../utils/sendEmail.js";
import { Course } from "../models/course.js";
import crypto from "crypto";
import cloudinary from "cloudinary";
import getDataUri from "../utils/dataUri.js";
import { Stats } from "../models/stats.js";
import { Payment } from "../models/payment.js";
import { instance } from "../server.js";

export const register = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;

  const file = req.file;

  if (!name || !email || !password || !file) {
    return next(new ErrorHandler("Please enter all fields", 400));
  }

  let user = await User.findOne({ email });

  if (user) {
    return next(new ErrorHandler("User already exist", 409));
  }

  // Upload File On Cloudinary

  const fileUri = getDataUri(file);

  const myCloud = await cloudinary.v2.uploader.upload(fileUri.content);

  user = await User.create({
    name,
    email,
    password,
    avatar:
      {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      } || null,
  });

  sendToken(res, user, "Registerd Successfully", 201);
});

export const login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please enter all fields", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("User Doesn't Exist", 401));
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    return next(new ErrorHandler("Incorrect Email or Password", 401));
  }

  sendToken(res, user, `Welcome Back ${user.name}`, 200);
});

export const logout = catchAsyncError(async (req, res, next) => {
  res
    .status(200)
    .cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
      secure: true,
      sameSite: "none",
    })
    .json({ success: true, message: "Logged Out Successfully" });
});

export const getMyProfile = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id).populate(
    "subscription",
    "id status"
  );
  res.status(200).json({ success: true, user });
});

export const changePassword = catchAsyncError(async (req, res, next) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;

  if ((!oldPassword || !newPassword, !confirmPassword)) {
    return next(new ErrorHandler("Please enter all fields", 400));
  }

  const user = await User.findById(req.user._id).select("+password");

  const isMatch = await user.comparePassword(oldPassword);

  if (!isMatch) {
    return next(new ErrorHandler("Incorrect Old Password", 400));
  } else {
    user.password = newPassword;
  }

  if (newPassword !== confirmPassword) {
    return next(new ErrorHandler("Password do not match", 400));
  }

  if (newPassword === oldPassword) {
    return next(
      new ErrorHandler("New Password cannot be same as Old Password", 400)
    );
  }

  await user.save();

  res.status(200).json({
    success: true,
    message: "Password Changed Successfully",
  });
});

export const updateProfile = catchAsyncError(async (req, res, next) => {
  const { name, email } = req.body;

  const user = await User.findById(req.user._id);

  if (name) {
    user.name = name;
  }

  if (email) {
    user.email = email;
  }

  await user.save();

  res.status(200).json({
    success: true,
    message: "Profile Changed Successfully",
  });
});

export const updateProfilePicture = catchAsyncError(async (req, res, next) => {
  // Cloudinary: TODO

  const user = await User.findById(req.user.id);

  const file = req.file;

  const fileUri = getDataUri(file);

  await cloudinary.v2.uploader.destroy(user.avatar.public_id);

  const myCloud = await cloudinary.v2.uploader.upload(fileUri.content);

  user.avatar = {
    public_id: myCloud.public_id,
    url: myCloud.secure_url,
  };

  await user.save();

  res.status(200).json({
    success: true,
    message: "Profile Picture Updated Successfully",
  });
});

export const forgetPassword = catchAsyncError(async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return next(new ErrorHandler("User not found", 400));
  } else {
    const resetToken = await user.getResetToken();

    await user.save();

    // Send token via Email

    const url = `${process.env.FRONTEND_URL}/resetPassword/${resetToken}`;

    const message = `Click on the link to Reset Password. ${url}. If you have not request then please ignore`;

    await sendEmail(user.email, "CourseBundler Reset Password", message);
  }

  res.status(200).json({
    success: true,
    message: `Reset token has been sent to ${user.email}`,
  });
});

export const resetPassword = catchAsyncError(async (req, res, next) => {
  const { token } = req.params;

  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: {
      $gt: Date.now(),
    },
  });

  if (!user)
    return next(new ErrorHandler("Token is Invalid or has been expired", 401));

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  res.status(200).json({
    success: true,
    token,
    message: "Password Changed Successfully",
  });
});

export const addToPlaylist = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  const course = await Course.findById(req.body.id);

  if (!course) {
    return next(new ErrorHandler("Invalid course Id", 404));
  } else {
    const existingCourse = user.playlist.find((item) => {
      if (item.course.toString() === course._id.toString()) return true;
    });

    if (existingCourse)
      return next(new ErrorHandler("Item already exist in playlist", 409));

    user.playlist.push({
      course: course._id,
      poster: course.poster.url,
    });

    await user.save();
  }

  res.status(200).json({
    success: true,
    message: "Added To Playlist",
  });
});

export const removeFromPlaylist = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  const course = await Course.findById(req.params.id);

  if (!course) {
    return next(new ErrorHandler("Invalid course Id", 404));
  }

  const newPlaylist = (user.playlist = user.playlist.filter(
    (item) => item.course.toString() !== course.id.toString()
  ));

  user.playlist = newPlaylist;
  await user.save();

  res.status(200).json({
    success: true,
    message: "Removed From Playlist",
  });
});

export const getAllUsers = catchAsyncError(async (req, res, next) => {
  const users = await User.find({});

  res.status(200).json({
    success: true,
    users,
  });
});

export const updateUserRole = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) return next(new ErrorHandler("User not found", 404));

  if (user.role === "user") user.role = "admin";
  else user.role = "user";

  await user.save();

  res.status(200).json({
    success: true,
    message: "Role Updated Successfully",
  });
});

export const deleteUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) return next(new ErrorHandler("User not found", 400));

  await cloudinary.v2.uploader.destroy(user.avatar.public_id);

  // Cancel Subscription

  const subscriptionId = user.subscription.id;
  let refund = false;

  if (subscriptionId) {
    await instance.subscriptions.cancel(subscriptionId);

    const payment = await Payment.findOne({
      razorpay_subscription_id: subscriptionId,
    });

    const gap = Date.now() - payment.createdAt;

    const refundTime = process.env.REFUND_DAYS * 24 * 60 * 60 * 1000;

    if (refundTime > gap) {
      await instance.payments.refund(payment.razorpay_payment_id);
      refund = true;
    }

    await payment.remove();
  }

  user.subscription = undefined;

  await user.remove();

  res
    .status(200)
    .cookie("token", null, { expires: new Date(Date.now()) })
    .json({
      message: refund
        ? "User has been deleted Successfully And Your Subscription also cancelled, You will receive full refund within 7 days."
        : "User has been deleted Successfully And Subscription cancelled, No refund initiated as subscription was cancelled after 7 days.",
    });
});

export const deleteMyProfile = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  await cloudinary.v2.uploader.destroy(user.avatar.public_id);

  // Cancel Subscription

  const subscriptionId = user.subscription?.id;
  console.log(subscriptionId, "subscriptionId")
  let refund = false;

  if (subscriptionId) {
    await instance.subscriptions.cancel(subscriptionId);

    const payment = await Payment.findOne({
      razorpay_subscription_id: subscriptionId,
    });

    const gap = Date.now() - payment.createdAt;

    const refundTime = process.env.REFUND_DAYS * 24 * 60 * 60 * 1000;

    if (refundTime > gap) {
      await instance.payments.refund(payment.razorpay_payment_id);
      refund = true;
    }

    await payment.remove();
  }

  user.subscription = undefined;

  await user.remove();

  res
    .status(200)
    .cookie("token", null, { expires: new Date(Date.now()) })
    .json({
      success: true,
      message: refund
        ? "User Profile has been deleted Successfully And Your Subscription also cancelled, You will receive full refund within 7 days."
        : "User Profile has been deleted Successfully And Subscription cancelled, No refund initiated as subscription was cancelled after 7 days.",
    });
});

User.watch().on("change", async () => {
  const stats = await Stats.find({}).sort({ createdAt: "desc" }).limit(1);

  const subscription = await User.find({ "subscription.status": "active" });

  stats[0].users = await User.countDocuments();
  stats[0].subscription = subscription.length;
  stats[0].createdAt = new Date(Date.now());

  await stats[0].save();
});

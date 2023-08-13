import express from "express";
import singleUpload from "../middlewares/multer.js";
import { authorizeAdmin, isAuthenticated } from "../middlewares/auth.js";
import { buySubscription, cancelSubscription, getRazorPayKey, paymentVerification } from "../controllers/paymentController.js";

const router = express.Router();

// Buy Subscription
router.route("/subscribe").get(isAuthenticated, buySubscription)

// Verify Payment and save reference in database
router.route("/paymentVerification").post(isAuthenticated, paymentVerification)

// Get RazorPay Key
router.route("/razorPayKey").get(getRazorPayKey)

// Cancel Subscription
router.route("/subscribe/cancel").delete(isAuthenticated, cancelSubscription)

export default router;

import express from "express";
import dotenv from "dotenv";
import course from "./routes/courseRoutes.js";
import user from "./routes/userRoutes.js";
import payment from "./routes/paymentRoutes.js";
import other from "./routes/otherRoutes.js";
import ErrorMiddleware from "./middlewares/error.js";
import cookieParser from "cookie-parser";

dotenv.config({
  path: "./config/config.env",
});

const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cookieParser())

// Importing and Using Routes

app.use("/api/v1", course);
app.use("/api/v1", user);
app.use("/api/v1", payment);
app.use("/api/v1", other)

export default app;

app.use(ErrorMiddleware);

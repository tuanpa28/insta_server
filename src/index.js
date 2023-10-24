import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import { connectDB } from "./config/database.js";
import router from "./router/index.js";
import passport from "passport";
import session from "express-session";
import cookieParser from "cookie-parser";
import configurePassport from "./config/passport.js";

// config
const app = express();
const port = process.env.PORT || 8080;
dotenv.config();

// connect database
try {
  (async () => {
    await connectDB();
  })();
} catch (error) {
  console.log("Error connect db !!!", error);
}

// middleware
app.use(cors());
// Sử dụng cookie-parser để xử lý cookie
app.use(cookieParser());
// Sử dụng express-session cho việc quản lý phiên (session)
app.use(
  session({
    secret: process.env.SECRET_KEY_SESSION,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(express.json());
app.use(morgan("tiny"));
app.use(passport.initialize());
app.use(passport.session());

configurePassport();

// routes
router(app);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

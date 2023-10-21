import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import { connectDB } from "./config/database.js";
import router from "./router/index.js";

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
app.use(express.json());
app.use(morgan("tiny"));

// routes
router(app);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

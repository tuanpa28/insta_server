import express from "express";
import { uploadMiddleware } from "../middlewares/index.js";
import { uploadController } from "../controllers/index.js";
import { authMiddleware } from "../middlewares/index.js";

const { verifyToken } = authMiddleware;
const routerUpload = express.Router();

const { upload } = uploadMiddleware;
const { uploadImages, uploadVideo } = uploadController;

// Upload Images
routerUpload.post(
  "/images",
  verifyToken,
  upload.array("image", 6),
  uploadImages
);

// Upload Video
routerUpload.post("/video", verifyToken, upload.single("video"), uploadVideo);

export default routerUpload;

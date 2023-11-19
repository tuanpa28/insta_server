import express from "express";
import { uploadMiddleware } from "../middlewares/index.js";
import { uploadController } from "../controllers/index.js";

const routerUpload = express.Router();

const { upload } = uploadMiddleware;
const { uploadImages, uploadVideo } = uploadController;

// Upload Images
routerUpload.post("/images", upload.array("image", 6), uploadImages);

// Upload Video
routerUpload.post("/video", upload.single("video"), uploadVideo);

export default routerUpload;

import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "insta",
    allowed_formats: ["jpg", "png", "mp4"],
    resource_type: "auto",
  },
});

export const upload = multer({ storage });

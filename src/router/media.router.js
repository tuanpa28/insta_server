import express from "express";
import { mediaController } from "../controllers/index.js";

const routerMedia = express.Router();

// Get All
routerMedia.get("/", mediaController.getList);

// Get By Id
routerMedia.get("/:id", mediaController.getById);

// Create
routerMedia.post("/", mediaController.create);

// Update
routerMedia.patch("/:id", mediaController.update);

// Delete
routerMedia.delete("/:id", mediaController.remove);

export default routerMedia;

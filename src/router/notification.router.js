import express from "express";
import { notificationController } from "../controllers/index.js";

const routerNotification = express.Router();

// Get All
routerNotification.get("/", notificationController.getList);

// Get By Id
routerNotification.get("/:id", notificationController.getById);

// Create
routerNotification.post("/", notificationController.create);

// Update
routerNotification.put("/:id", notificationController.update);

// Delete
routerNotification.delete("/:id", notificationController.remove);

export default routerNotification;

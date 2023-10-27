import express from "express";
import { userController } from "../controllers/index.js";

const routerUser = express.Router();

// Get All
routerUser.get("/", userController.getList);

// Get By Id
routerUser.get("/:id", userController.getById);

// Update
routerUser.patch("/:id", userController.update);

// Delete
routerUser.delete("/:id", userController.remove);

export default routerUser;

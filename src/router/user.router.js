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

// Follow User
routerUser.put("/follow/:id", userController.followUser);

// Get User Suggested
routerUser.get("/suggested/followings", userController.getUserSuggested);

export default routerUser;

import express from "express";
import { userController } from "../controllers/index.js";

const routerUser = express.Router();

// Get All
routerUser.get("/", userController.getList);

// Get By Id
routerUser.get("/:id", userController.getById);

// Update
routerUser.put("/:id", userController.update);

// Delete
routerUser.delete("/:id", userController.remove);

// Follow User
routerUser.put("/follow/:id", userController.followUser);

// Get User Suggested
routerUser.get("/suggested/results", userController.getUserSuggested);

// Search User
routerUser.get("/search/results", userController.searchUser);

// Get Followers
routerUser.get("/followers/results", userController.getFollowers);

// Get Followings
routerUser.get("/followings/results", userController.getFollowings);

export default routerUser;

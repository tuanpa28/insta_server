import express from "express";
import { userController } from "../controllers/index.js";
import { authMiddleware } from "../middlewares/index.js";

const { verifyToken, verifyAdmin } = authMiddleware;
const routerUser = express.Router();

// Get All
routerUser.get("/", verifyToken, verifyAdmin, userController.getList);

// Get By Id
routerUser.get("/:id", verifyToken, userController.getById);

// Update
routerUser.put("/:id", verifyToken, userController.update);

// Delete
routerUser.delete("/:id", verifyToken, userController.remove);

// Follow User
routerUser.put("/follow/:id", verifyToken, userController.followUser);

// Get User Suggested
routerUser.get(
  "/suggested/results",
  verifyToken,
  userController.getUserSuggested
);

// Search User
routerUser.get("/search/results", verifyToken, userController.searchUser);

// Get Followers
routerUser.get("/followers/results", verifyToken, userController.getFollowers);

// Get Followings
routerUser.get(
  "/followings/results",
  verifyToken,
  userController.getFollowings
);

export default routerUser;

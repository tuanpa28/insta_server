import express from "express";
import { postController } from "../controllers/index.js";
import { authMiddleware } from "../middlewares/index.js";

const { verifyToken, verifyAdmin } = authMiddleware;
const routerPost = express.Router();

// Get All
routerPost.get("/", verifyToken, verifyAdmin, postController.getList);

// Get By Id
routerPost.get("/:id", verifyToken, postController.getById);

// Create
routerPost.post("/", verifyToken, postController.create);

// Update
routerPost.put("/:id", verifyToken, postController.update);

// Delete
routerPost.delete("/:id", verifyToken, postController.remove);

// Like / Unlike Post
routerPost.put("/:id/like", verifyToken, postController.likePost);

// Share Post
routerPost.put("/:id/share", verifyToken, postController.sharePost);

// Posts On Timeline
routerPost.get(
  "/timeline/results",
  verifyToken,
  postController.postsOnTimeline
);

// Get All Post For One User
routerPost.get(
  "/user/results",
  verifyToken,
  postController.getAllPostForOneUser
);

// Get All Media Posts User
routerPost.get(
  "/medias/results",
  verifyToken,
  postController.getAllMediaPostsUser
);

export default routerPost;

import express from "express";
import { postController } from "../controllers/index.js";

const routerPost = express.Router();

// Get All
routerPost.get("/", postController.getList);

// Get By Id
routerPost.get("/:id", postController.getById);

// Create
routerPost.post("/", postController.create);

// Update
routerPost.put("/:id", postController.update);

// Delete
routerPost.delete("/:id", postController.remove);

// Like / Unlike Post
routerPost.put("/:id/like", postController.likePost);

// Share Post
routerPost.put("/:id/share", postController.sharePost);

// Posts On Timeline
routerPost.get("/timeline/results", postController.postsOnTimeline);

// Get All Post For One User
routerPost.get("/user/results", postController.getAllPostForOneUser);

// Get All Media Posts User
routerPost.get("/medias/results", postController.getAllMediaPostsUser);

export default routerPost;

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
routerPost.patch("/:id", postController.update);

// Delete
routerPost.delete("/:id", postController.remove);

// Like / Unlike Post
routerPost.put("/:id/like", postController.likePost);

// Share Post
routerPost.put("/:id/share", postController.sharePost);

export default routerPost;

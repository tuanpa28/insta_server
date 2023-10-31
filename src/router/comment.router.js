import express from "express";
import { commentController } from "../controllers/index.js";

const routerComment = express.Router();

// Get All
routerComment.get("/", commentController.getList);

// Get By Id
routerComment.get("/:id", commentController.getById);

// Create
routerComment.post("/", commentController.create);

// Update
routerComment.put("/:id", commentController.update);

// Delete
routerComment.delete("/:id", commentController.remove);

// Get All Comment For One Post
routerComment.get("/:id/post", commentController.getAllCommentForOnePost);

// Like / Unlike Comment
routerComment.put("/:id/like", commentController.likeComment);

// Create Comment Reply
routerComment.post("/reply/:id", commentController.createCommentReply);

// Delete Comment Reply
routerComment.delete("/reply/:id", commentController.deleteCommentReply);

// Get All Reply For One Comment
routerComment.get(
  "/reply/:id/results",
  commentController.getAllReplyForOneComment
);

export default routerComment;

import express from "express";
import { commentController } from "../controllers/index.js";
import { authMiddleware } from "../middlewares/index.js";

const { verifyToken, verifyAdmin } = authMiddleware;
const routerComment = express.Router();

// Get All
routerComment.get("/", verifyToken, verifyAdmin, commentController.getList);

// Get By Id
routerComment.get("/:id", verifyToken, commentController.getById);

// Create
routerComment.post("/", verifyToken, commentController.create);

// Update
routerComment.put("/:id", verifyToken, commentController.update);

// Delete
routerComment.delete("/:id", verifyToken, commentController.remove);

// Get All Comment For One Post
routerComment.get(
  "/:id/post",
  verifyToken,
  commentController.getAllCommentForOnePost
);

// Like / Unlike Comment
routerComment.put("/:id/like", verifyToken, commentController.likeComment);

// Create Comment Reply
routerComment.post(
  "/reply/:id",
  verifyToken,
  commentController.createCommentReply
);

// Delete Comment Reply
routerComment.delete(
  "/reply/:id",
  verifyToken,
  commentController.deleteCommentReply
);

// Get All Reply For One Comment
routerComment.get(
  "/reply/:id/results",
  verifyToken,
  commentController.getAllReplyForOneComment
);

export default routerComment;

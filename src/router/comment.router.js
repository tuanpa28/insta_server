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
routerComment.patch("/:id", commentController.update);

// Delete
routerComment.delete("/:id", commentController.remove);

export default routerComment;

import express from "express";
import { shareController } from "../controllers/index.js";

const routerShare = express.Router();

// Get All
routerShare.get("/", shareController.getList);

// Get By Id
routerShare.get("/:id", shareController.getById);

// Create
routerShare.post("/", shareController.create);

// Update
routerShare.patch("/:id", shareController.update);

// Delete
routerShare.delete("/:id", shareController.remove);

export default routerShare;

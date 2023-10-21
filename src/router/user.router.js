import express from "express";
import { userController } from "../controllers/index.js";

const routerUser = express.Router();

// LOGIN
routerUser.post("/login", userController.login);

export default routerUser;

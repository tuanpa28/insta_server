import express from "express";
import { authController } from "../controllers/index.js";

const routerUser = express.Router();

// LOGIN
routerUser.post("/login", authController.login);

// REGISTER
routerUser.post("/register", authController.register);

export default routerUser;

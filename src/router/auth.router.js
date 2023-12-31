import express from "express";
import { authController } from "../controllers/index.js";
import passport from "passport";
import "dotenv/config";

const routerAuth = express.Router();

// Login
routerAuth.post("/login", authController.login);

// Register
routerAuth.post("/register", authController.register);

// Refresh Token
routerAuth.post("/refreshToken", authController.refreshToken);

// Logout
routerAuth.delete("/logout", authController.logout);

// Login With Google;
routerAuth.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Xử lý kết quả sau khi người dùng đăng nhập bằng Google
routerAuth.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${process.env.URL_CLIENT}/login`,
  }),
  authController.loginWithGoogle
);

export default routerAuth;

import express from "express";
import { authController } from "../controllers/index.js";
import passport from "passport";

const routerAuth = express.Router();

// Login
routerAuth.post("/login", authController.login);

// Register
routerAuth.post("/register", authController.register);

// Refresh Token
routerAuth.post("/refreshToken", authController.refreshToken);

// Logout
routerAuth.post("/logout", authController.Logout);

// Login With Google;
routerAuth.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Xử lý kết quả sau khi người dùng đăng nhập bằng Google
routerAuth.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:3000/login",
  }),
  function (req, res) {
    res.send(
      '<script>window.opener.postMessage("success", "*"); window.close();</script>'
    );
  }
);

export default routerAuth;

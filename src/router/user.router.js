import express from "express";
import { authController } from "../controllers/index.js";
import passport from "passport";

const routerUser = express.Router();

// Login
routerUser.post("/login", authController.login);

// Register
routerUser.post("/register", authController.register);

// Login With Google;
routerUser.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Xử lý kết quả sau khi người dùng đăng nhập bằng Google
routerUser.get(
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

export default routerUser;

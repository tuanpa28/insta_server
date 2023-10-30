import badRequest from "../formatResponse/badRequest.js";
import serverError from "../formatResponse/serverError.js";
import successfully from "../formatResponse/successfully.js";
import generateToken from "../utils/generateToken.js";
import { userService } from "../services/index.js";
import { userValidation } from "../validations/index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const login = async (req, res) => {
  try {
    const { error } = userValidation.default.validate(req.body);
    if (error) {
      return res.status(400).json(badRequest(400, error.details[0].message));
    }

    const { email, password } = req.body;

    // check if email exists
    const user = await userService.getByOptions({
      field: "email",
      payload: email,
    });
    if (!user) {
      return res
        .status(400)
        .json(badRequest(400, "Tài khoản không tồn tại!!!"));
    }

    // Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json(badRequest(400, "Mật khẩu không hợp lệ!!!"));
    }

    const accessToken = generateToken({
      id: user._id,
      username: user.username,
      email: user.email,
    });

    res
      .status(200)
      .json(successfully({ accessToken }, "Đăng nhập thành công !!!"));
  } catch (error) {
    res.status(500).json(serverError(error.message));
  }
};

const register = async (req, res) => {
  try {
    const { error } = userValidation.default.validate(req.body);
    if (error) {
      return res.status(400).json(badRequest(400, error.details[0].message));
    }
    const { email, password, username, full_name } = req.body;
    // check username
    const checkUserName = await userService.getByOptions({
      field: "username",
      payload: username,
    });
    if (checkUserName) {
      return res
        .status(400)
        .json(badRequest(400, "Tên người dùng đã tồn tại!!!"));
    }
    // check email
    const checkEmail = await userService.getByOptions({
      field: "email",
      payload: email,
    });
    if (checkEmail) {
      return res
        .status(400)
        .json(badRequest(400, "Địa chỉ email đã tồn tại!!!"));
    }
    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await userService.create({
      username,
      email,
      password: hashedPassword,
      full_name,
    });
    res.status(200).json(successfully(newUser, "Đăng ký thành công !!!"));
  } catch (error) {
    res.status(500).json(serverError(error.message));
  }
};

const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken)
      return res.status(401).json(badRequest(401, "You`re not authenticate"));

    jwt.verify(refreshToken, process.env.SECRET_KEY, (error, user) => {
      if (error) {
        return res.status(401).json(badRequest(401, "Token is not valid!"));
      }

      const newRefreshToken = generateToken({
        id: user._id,
        username: user.username,
        email: user.email,
      });

      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: false,
        path: "/",
        sameSite: "strict",
      });
      return res
        .status(200)
        .json(successfully({ user, refreshToken }, "Refresh token success!!!"));
    });
  } catch (error) {
    res.status(500).json(serverError(error.message));
  }
};

const Logout = (req, res) => {
  res.clearCookie("refreshToken");
};

export { login, register, refreshToken, Logout };

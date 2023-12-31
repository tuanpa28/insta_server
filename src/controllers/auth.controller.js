import badRequest from "../formatResponse/badRequest.js";
import serverError from "../formatResponse/serverError.js";
import successfully from "../formatResponse/successfully.js";
import generateToken from "../utils/generateToken.js";
import { userService } from "../services/index.js";
import { authValidation } from "../validations/index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";

const isProduction = process.env.NODE_ENV === "production";

const login = async (req, res) => {
  try {
    const { error } = authValidation.default.validate(req.body);
    if (error) {
      return res.status(400).json(badRequest(400, error.details[0].message));
    }

    const { email, password, username } = req.body;

    // check if email or username exists
    const user = await userService.getByOptions({
      field: "$or",
      payload: [{ email }, { username }],
    });
    if (!user) {
      return res.status(400).json(badRequest(400, "Tài khoản không tồn tại!"));
    }

    // Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json(badRequest(400, "Mật khẩu không hợp lệ!"));
    }

    const accessToken = generateToken(
      {
        _id: user._id,
        username: user.username,
        email: user.email,
        full_name: user.full_name,
        profile_image: user.profile_image,
        bio: user.bio,
        date_of_birth: user.date_of_birth,
        gender: user.gender,
        current_city: user.current_city,
        from: user.from,
        tick: user.tick,
        isAdmin: user.isAdmin,
      },
      "10m"
    );

    const refreshToken = generateToken({ _id: user._id }, "1d");

    res
      .status(200)
      .cookie("refreshToken", refreshToken, {
        path: "/",
        httpOnly: true,
        secure: isProduction, // if https set secure = true
        sameSite: "Strict",
        maxAge: 60 * 60 * 24,
      })
      .json(successfully({ accessToken }, "Đăng nhập thành công !!!"));
  } catch (error) {
    res.status(500).json(serverError(error.message));
  }
};

const register = async (req, res) => {
  try {
    const { error } = authValidation.default.validate(req.body);
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
        .json(badRequest(400, "Tên người dùng đã tồn tại!"));
    }
    // check email
    const checkEmail = await userService.getByOptions({
      field: "email",
      payload: email,
    });
    if (checkEmail) {
      return res.status(400).json(badRequest(400, "Địa chỉ email đã tồn tại!"));
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
      return res.status(403).json(badRequest(403, "You`re not authenticate"));

    jwt.verify(refreshToken, process.env.SECRET_KEY, (error, user) => {
      if (error) {
        return res.status(403).json(badRequest(403, "Token is not valid!"));
      }

      const accessToken = generateToken(
        {
          _id: user._id,
          username: user.username,
          email: user.email,
          full_name: user.full_name,
          profile_image: user.profile_image,
          bio: user.bio,
          date_of_birth: user.date_of_birth,
          gender: user.gender,
          current_city: user.current_city,
          from: user.from,
          tick: user.tick,
          isAdmin: user.isAdmin,
        },
        "10m"
      );

      const newRefreshToken = generateToken({ _id: user._id }, "1d");

      return res
        .status(200)
        .cookie("refreshToken", newRefreshToken, {
          path: "/",
          httpOnly: true,
          secure: isProduction, // if https set secure = true
          sameSite: "Strict",
          maxAge: 60 * 60 * 24,
        })
        .json(successfully({ accessToken }, "Refresh token success!!!"));
    });
  } catch (error) {
    res.status(500).json(serverError(error.message));
  }
};

const loginWithGoogle = async (req, res) => {
  const user = req.user;
  try {
    const accessToken = generateToken(
      {
        _id: user._id,
        username: user.username,
        email: user.email,
        full_name: user.full_name,
        profile_image: user.profile_image,
        bio: user.bio,
        date_of_birth: user.date_of_birth,
        gender: user.gender,
        current_city: user.current_city,
        from: user.from,
        tick: user.tick,
        isAdmin: user.isAdmin,
      },
      "10m"
    );

    const refreshToken = generateToken({ _id: user._id }, "1d");

    res.cookie("refreshToken", refreshToken, {
      path: "/",
      httpOnly: true,
      secure: isProduction, // if https set secure = true
      sameSite: "Strict",
      maxAge: 60 * 60 * 24,
    });

    res.send(`
      <script>
        window.opener.postMessage({ type: "success", accessToken: "${accessToken}" }, "*");
        window.close();
      </script>
    `);
  } catch (error) {
    res.status(500).json(serverError(error.message));
  }
};

const logout = (req, res) => {
  res.status(200).clearCookie("refreshToken").json("Logout successfully!");
};

export { login, register, refreshToken, loginWithGoogle, logout };

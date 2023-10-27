import jwt from "jsonwebtoken";
import badRequest from "../formatResponse/badRequest.js";

const verifyToken = (req, res, next) => {
  // Kiểm tra có thông tin token không
  if (req.headers.authorization) {
    // Lấy mã token
    const accessToken = req.headers.authorization.split(" ")[1];
    jwt.verify(accessToken, process.env.SECRET_KEY, (error, user) => {
      if (error) {
        return res.status(401).json(badRequest(401, "Token is not valid!"));
      }
      req.user = user;
      next();
    });
  } else {
    res.status(401).json(badRequest(401, "You're not authenticated!"));
  }
};

const authorization = async (req, res, next) => {
  try {
    const user = req.user;
    // Kiểm tra xem user có phải admin hay không
    if (!(user.isAdmin === true)) {
      return res
        .status(401)
        .json(badRequest(401, "Bạn không có quyền thực hiện chức năng này!"));
    }
    next();
  } catch (error) {
    res.status(403).json(badRequest(403, error.message));
  }
};

export { verifyToken, authorization };

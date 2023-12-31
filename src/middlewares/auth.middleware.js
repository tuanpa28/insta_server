import jwt from "jsonwebtoken";
import badRequest from "../formatResponse/badRequest.js";

const verifyToken = (req, res, next) => {
  if (req.headers.authorization) {
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

const verifyAdmin = async (req, res, next) => {
  const user = req.user;

  if (user) {
    if (!(user.isAdmin === true)) {
      return res.status(401).json(badRequest(401, "You're not authorization!"));
    }
    next();
  } else {
    res.status(401).json(badRequest(401, "You're not authenticated!"));
  }
};

export { verifyToken, verifyAdmin };

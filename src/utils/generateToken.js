import jwt from "jsonwebtoken";
import "dotenv/config";

const generateToken = (data, expiresIn = "10m") => {
  const token = jwt.sign(data, process.env.SECRET_KEY, {
    expiresIn,
  });
  return token;
};

export default generateToken;

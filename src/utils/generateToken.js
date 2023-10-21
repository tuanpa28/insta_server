import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const generateToken = async (data) => {
  const token = jwt.sign(data, process.env.SECRET_KEY, {
    expiresIn: "1d",
  });
  return token;
};

export default generateToken;
